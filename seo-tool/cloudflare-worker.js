/**
 * Position Xero SEO Report Card — Cloudflare Worker
 * ----------------------------------------------------------------------
 * What this is:
 *   A single free-tier Cloudflare Worker with two jobs for the free-audit
 *   lead funnel (free-audit.html, served at /free-audit):
 *
 *   1. GET  /?url=<encoded target>   — CORS proxy. Fetches a target web
 *      page on the tool's behalf and returns the HTML with CORS headers,
 *      so the browser can audit any site. Replaces flaky free public
 *      proxies with infrastructure you own.
 *
 *   2. POST /lead                    — Lead relay. Accepts a JSON lead
 *      payload from the tool's email-gate / audit flow and emails it to
 *      the founder's inbox via the Resend API — no third-party form
 *      service in the loop.
 *
 *   Free tier = 100,000 requests/day, far more than this tool will ever
 *   need for either route.
 *
 * Contract — GET / (proxy):
 *   GET https://<your-worker>/?url=<encodeURIComponent'd absolute http(s) URL>
 *   → returns the target's body, passes through content-type, strips
 *     set-cookie, 15s timeout, ~3MB response cap, JSON errors on rejection.
 *
 * Contract — POST /lead (lead relay):
 *   POST https://<your-worker>/lead
 *   Content-Type: application/json
 *   Body: see SHARED LEAD PAYLOAD CONTRACT in seo-tool/README.md — must
 *   match what free-audit.html sends exactly. Required fields: name,
 *   business, email, phone, stage (one of "captured" | "no-website" |
 *   "enriched" | "fix-request"). Optional fields: industry, service (one of "seo" |
 *   "ads" | "web" | "leads"), adSpend (one of "none" | "under-500" |
 *   "500-2k" | "2k-10k" | "over-10k"). Body capped at 32KB; unknown
 *   fields are stripped; emailsFound capped at 10 items, topIssues
 *   capped at 5.
 *   → { "ok": true } on success, { "ok": false, "error": "..." } on
 *   rejection. Never echoes submitted PII back in error responses.
 *
 * Deploy in 5 steps (free, ~2 minutes):
 *   1. Go to dash.cloudflare.com → Workers & Pages → Create → Create Worker.
 *   2. Name it (e.g. "seo-proxy") and hit Deploy to claim the URL.
 *   3. Click "Edit code", delete the boilerplate, paste this entire file.
 *   4. Hit Deploy again.
 *   5. Copy your worker URL into the CONFIG block at the top of
 *      free-audit.html:
 *        PROXY_URL: 'https://seo-proxy.<your-account>.workers.dev/?url='
 *        LEAD_WEBHOOK: 'https://seo-proxy.<your-account>.workers.dev/lead'
 *      (keep the trailing "/?url=" on PROXY_URL — the tool appends the
 *      encoded target).
 *
 * Environment variables (Settings → Variables and Secrets on the worker):
 *   RESEND_API_KEY  (required for /lead) — API key from resend.com. Add
 *                   it as an encrypted secret, not a plaintext variable.
 *   LEAD_TO         (required for /lead) — inbox that receives lead
 *                   emails, e.g. you@yourdomain.com.
 *   LEAD_FROM       (optional) — sender identity, e.g.
 *                   'SEO Report Card <leads@yourdomain.com>'. Requires
 *                   verifying the sending domain in Resend. Defaults to
 *                   'SEO Report Card <onboarding@resend.dev>', which
 *                   works out of the box for testing.
 *   Until RESEND_API_KEY and LEAD_TO are both set, POST /lead responds
 *   with { "ok": false, "error": "not-configured" } (503) and sends no
 *   email — the GET proxy route is unaffected either way.
 */

// Origins allowed to call the GET proxy route from a browser.
// '*' works out of the box, but once the tool is live you should lock this
// down to your own domain(s) so nobody else free-rides on your worker, e.g.:
//   const ALLOWED_ORIGINS = ['https://positionxero.com', 'https://audit.positionxero.com'];
const ALLOWED_ORIGINS = ['*'];

const TIMEOUT_MS = 15000;              // abort slow proxy targets after 15s
const MAX_BYTES = 3 * 1024 * 1024;     // ~3MB cap on proxied bodies; truncated beyond this

// Origins allowed to call the POST /lead route. Deliberately not '*' —
// this route sends email on your dime, so only the real site may call it.
// The matching Origin is reflected back; no wildcard. When testing locally,
// temporarily add 'http://localhost:8000' here — remove it again before
// deploying: localhost is a common dev port, and any page a visitor runs
// on it could otherwise trigger real sends on your Resend quota.
const LEAD_ALLOWED_ORIGINS = [
  'https://www.positionxero.com',
  'https://positionxero.com',
];

const MAX_LEAD_BODY_BYTES = 32 * 1024; // 32KB cap on the /lead JSON body
const LEAD_STAGES = ['captured', 'no-website', 'enriched', 'fix-request'];
const LEAD_SERVICES = ['seo', 'ads', 'web', 'leads'];
const LEAD_AD_SPEND_BRACKETS = ['none', 'under-500', '500-2k', '2k-10k', 'over-10k'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/lead') {
      return handleLead(request, env);
    }
    return handleProxy(request);
  },
};

/* ------------------------------ GET / (proxy) ------------------------------ */

async function handleProxy(request) {
  const corsOrigin = resolveCorsOrigin(request);

  // CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        ...corsHeaders(corsOrigin),
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  // GET only
  if (request.method !== 'GET') {
    return jsonError(405, 'Method not allowed. Use GET with ?url=<encoded URL>.', corsOrigin);
  }

  // Browser origin not on the allowlist → refuse outright
  if (corsOrigin === null) {
    return jsonError(403, 'Origin not allowed by this proxy.', corsOrigin);
  }

  // Validate the url param
  const rawUrl = new URL(request.url).searchParams.get('url');
  if (!rawUrl) {
    return jsonError(400, 'Missing required query parameter: url', corsOrigin);
  }

  let target;
  try {
    target = new URL(rawUrl);
  } catch {
    return jsonError(400, 'Invalid url parameter. Must be an absolute http(s) URL.', corsOrigin);
  }

  if (target.protocol !== 'http:' && target.protocol !== 'https:') {
    return jsonError(400, 'Only http: and https: URLs are allowed.', corsOrigin);
  }

  if (isForbiddenHost(target.hostname)) {
    return jsonError(403, 'Target host is not allowed (private, loopback, or reserved address).', corsOrigin);
  }

  // Fetch the target with a hard timeout
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let upstream;
  try {
    upstream = await fetch(target.toString(), {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        // A realistic UA avoids reflexive bot-blocking on many sites.
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 PositionXeroSEOAudit/1.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en',
      },
    });
  } catch (err) {
    clearTimeout(timer);
    const timedOut = err && (err.name === 'AbortError' || /abort/i.test(String(err)));
    return jsonError(
      timedOut ? 504 : 502,
      timedOut ? `Target did not respond within ${TIMEOUT_MS / 1000}s.` : 'Failed to fetch target URL.',
      corsOrigin
    );
  }

  // Defense-in-depth: if redirects landed somewhere forbidden, bail out.
  try {
    const finalHost = new URL(upstream.url).hostname;
    if (isForbiddenHost(finalHost)) {
      clearTimeout(timer);
      return jsonError(403, 'Target redirected to a forbidden host.', corsOrigin);
    }
  } catch {
    /* upstream.url unavailable — ignore */
  }

  // Read the body with a size guard (truncate past MAX_BYTES)
  let bodyBytes;
  try {
    bodyBytes = await readCapped(upstream.body, MAX_BYTES, controller);
  } catch (err) {
    clearTimeout(timer);
    const timedOut = err && err.name === 'AbortError';
    return jsonError(
      timedOut ? 504 : 502,
      timedOut ? 'Timed out while reading the response body.' : 'Failed reading the response body.',
      corsOrigin
    );
  }
  clearTimeout(timer);

  // Build a clean response: pass through content-type + status, strip
  // everything else (including set-cookie), never cache.
  const headers = {
    ...corsHeaders(corsOrigin),
    'Content-Type': upstream.headers.get('content-type') || 'text/html; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  };

  // Null-body statuses (204/205/304 etc.) forbid any body — even an empty
  // Uint8Array — so pass null there to avoid a TypeError from Response().
  const nullBody = [101, 204, 205, 304].includes(upstream.status);
  return new Response(nullBody ? null : bodyBytes, { status: upstream.status, headers });
}

/* --------------------------- POST /lead (relay) --------------------------- */

async function handleLead(request, env) {
  const corsOrigin = resolveLeadCorsOrigin(request);

  // CORS preflight
  if (request.method === 'OPTIONS') {
    if (corsOrigin === null) {
      return leadJson(403, { ok: false, error: 'origin-not-allowed' }, corsOrigin);
    }
    return new Response(null, {
      status: 204,
      headers: {
        ...leadCorsHeaders(corsOrigin),
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  if (request.method !== 'POST') {
    return leadJson(405, { ok: false, error: 'method-not-allowed' }, corsOrigin);
  }

  // Browser origin not on the allowlist → refuse outright, no wildcard fallback
  if (corsOrigin === null) {
    return leadJson(403, { ok: false, error: 'origin-not-allowed' }, corsOrigin);
  }

  if (!env.RESEND_API_KEY || !env.LEAD_TO) {
    return leadJson(503, { ok: false, error: 'not-configured' }, corsOrigin);
  }

  const contentType = (request.headers.get('content-type') || '').trim();
  if (!/^application\/json/i.test(contentType)) {
    return leadJson(400, { ok: false, error: 'invalid-content-type' }, corsOrigin);
  }

  let text, tooLarge;
  try {
    ({ text, tooLarge } = await readCappedText(request, MAX_LEAD_BODY_BYTES));
  } catch {
    return leadJson(400, { ok: false, error: 'invalid-body' }, corsOrigin);
  }
  if (tooLarge) {
    return leadJson(413, { ok: false, error: 'payload-too-large' }, corsOrigin);
  }

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    return leadJson(400, { ok: false, error: 'invalid-json' }, corsOrigin);
  }
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return leadJson(400, { ok: false, error: 'invalid-json' }, corsOrigin);
  }

  const validated = validateLead(data);
  if (validated.error) {
    return leadJson(400, { ok: false, error: validated.error }, corsOrigin);
  }

  const sent = await sendLeadEmail(validated.value, env);
  if (!sent.ok) {
    // Never surface upstream error detail (may contain configuration
    // hints) or any submitted PII to the caller.
    return leadJson(502, { ok: false, error: 'email-send-failed' }, corsOrigin);
  }

  return leadJson(200, { ok: true }, corsOrigin);
}

/** Required-field check shared by name/business/email/phone. */
function requiredString(v) {
  return typeof v === 'string' && v.trim().length > 0 && v.length < 500;
}

/**
 * Strip C0/C1 control chars (CR/LF included) then trim. Scraped or submitted
 * text must never smuggle extra lines into the notification email body/subject.
 */
function cleanString(s) {
  return s.replace(/[\x00-\x1f\x7f]/g, ' ').trim();
}

/**
 * The service question is a multi-select: the page sends a comma-joined
 * string ('seo, web'). Keep known values only, preserving pick order.
 */
function sanitizeServices(raw) {
  if (typeof raw !== 'string') return '';
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter((s) => LEAD_SERVICES.includes(s))
    .join(', ');
}

/** Keep only strings from arr, cleaned/truncated, up to maxItems. */
function sanitizeStringArray(arr, maxItems, maxLen) {
  if (!Array.isArray(arr)) return [];
  const out = [];
  for (const item of arr) {
    if (out.length >= maxItems) break;
    if (typeof item === 'string' && item.trim()) out.push(cleanString(item).slice(0, maxLen));
  }
  return out;
}

/**
 * Validate + sanitize a raw parsed lead body against the shared payload
 * contract. Unknown fields are dropped by construction (we only ever read
 * known keys off `data`). Returns { value } on success or { error } (a
 * short machine code, never containing submitted PII) on failure.
 */
function validateLead(data) {
  if (!requiredString(data.name)) return { error: 'invalid-name' };
  if (!requiredString(data.business)) return { error: 'invalid-business' };
  if (!requiredString(data.email) || !EMAIL_RE.test(data.email.trim())) return { error: 'invalid-email' };
  if (!requiredString(data.phone)) return { error: 'invalid-phone' };
  if (typeof data.stage !== 'string' || !LEAD_STAGES.includes(data.stage)) return { error: 'invalid-stage' };

  const value = {
    source: typeof data.source === 'string' && data.source.trim() ? cleanString(data.source).slice(0, 100) : 'seo-report-card',
    stage: data.stage,
    name: cleanString(data.name),
    business: cleanString(data.business),
    email: cleanString(data.email),
    phone: cleanString(data.phone),
    industry: typeof data.industry === 'string' ? cleanString(data.industry).slice(0, 120) : '',
    service: sanitizeServices(data.service),
    adSpend: typeof data.adSpend === 'string' && LEAD_AD_SPEND_BRACKETS.includes(data.adSpend) ? data.adSpend : '',
    hasWebsite: typeof data.hasWebsite === 'boolean' ? data.hasWebsite : null,
    website: typeof data.website === 'string' && data.website.trim() ? cleanString(data.website).slice(0, 2000) : null,
    keyword: typeof data.keyword === 'string' ? cleanString(data.keyword).slice(0, 500) : '',
    auditOk: typeof data.auditOk === 'boolean' ? data.auditOk : null,
    grade: typeof data.grade === 'string' ? cleanString(data.grade).slice(0, 10) : '',
    score: Number.isInteger(data.score) && data.score >= 0 && data.score <= 100 ? data.score : null,
    topIssues: sanitizeStringArray(data.topIssues, 5, 300),
    emailsFound: sanitizeStringArray(data.emailsFound, 10, 320).map((e) => e.toLowerCase()),
    page: typeof data.page === 'string' ? cleanString(data.page).slice(0, 2000) : '',
    ts: typeof data.ts === 'string' && !Number.isNaN(Date.parse(data.ts)) ? data.ts : new Date().toISOString(),
  };

  return { value };
}

/** Send the validated lead as a plain-text email via the Resend API. */
async function sendLeadEmail(lead, env) {
  const from = env.LEAD_FROM || 'SEO Report Card <onboarding@resend.dev>';
  const gradeSuffix = lead.stage === 'enriched' && lead.grade ? `, grade ${lead.grade}` : '';
  const subject = `SEO lead: ${lead.business} — ${lead.stage}${gradeSuffix}`;

  const lines = [
    `Source: ${lead.source}`,
    `Stage: ${lead.stage}`,
    `Name: ${lead.name}`,
    `Business: ${lead.business}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone}`,
    `Industry: ${lead.industry || '(none)'}`,
    `Services interested in: ${lead.service || '(none)'}`,
    `Monthly ad spend: ${lead.adSpend || '(none)'}`,
    `Has website: ${lead.hasWebsite === null ? 'unknown' : lead.hasWebsite}`,
    `Website: ${lead.website || '(none)'}`,
    `Keyword: ${lead.keyword || '(none)'}`,
    `Audit OK: ${lead.auditOk === null ? 'n/a' : lead.auditOk}`,
    `Grade: ${lead.grade || '(none)'}`,
    `Score: ${lead.score === null ? '(none)' : lead.score}`,
    `Top issues: ${lead.topIssues.length ? lead.topIssues.join(', ') : '(none)'}`,
    `Emails found: ${lead.emailsFound.length ? lead.emailsFound.join(', ') : '(none)'}`,
    `Page: ${lead.page || '(none)'}`,
    `Timestamp: ${lead.ts}`,
  ];

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [env.LEAD_TO],
        subject,
        text: lines.join('\n'),
      }),
    });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}

/**
 * Resolve the Access-Control-Allow-Origin value for the /lead route.
 * Unlike the proxy route, this never returns '*' — returns the echoed
 * allowed origin, '' (no Origin header — curl / server-to-server, fine to
 * serve without ACAO), or null (browser origin present but NOT on the
 * allowlist → reject).
 */
function resolveLeadCorsOrigin(request) {
  const origin = request.headers.get('Origin');
  if (!origin) return '';
  return LEAD_ALLOWED_ORIGINS.includes(origin) ? origin : null;
}

function leadCorsHeaders(corsOrigin) {
  const h = {};
  if (corsOrigin) {
    h['Access-Control-Allow-Origin'] = corsOrigin;
    h['Vary'] = 'Origin';
  }
  return h;
}

function leadJson(status, body, corsOrigin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...leadCorsHeaders(corsOrigin === null ? '' : corsOrigin),
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

/** Read a request body up to maxBytes as text; flags tooLarge instead of throwing. */
async function readCappedText(request, maxBytes) {
  if (!request.body) return { text: '', tooLarge: false };
  const reader = request.body.getReader();
  const chunks = [];
  let total = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) {
      try { await reader.cancel(); } catch { /* already stopped */ }
      return { text: '', tooLarge: true };
    }
    chunks.push(value);
  }

  const out = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return { text: new TextDecoder('utf-8').decode(out), tooLarge: false };
}

/* ------------------------------ shared helpers ------------------------------ */

/**
 * Resolve the Access-Control-Allow-Origin value for the proxy route.
 * Returns '*' (open), the echoed allowed origin, '' (no Origin header —
 * curl / server-to-server, fine to serve without ACAO), or null (browser
 * origin present but NOT on the allowlist → reject).
 */
function resolveCorsOrigin(request) {
  if (ALLOWED_ORIGINS.includes('*')) return '*';
  const origin = request.headers.get('Origin');
  if (!origin) return '';
  return ALLOWED_ORIGINS.includes(origin) ? origin : null;
}

function corsHeaders(corsOrigin) {
  const h = {};
  if (corsOrigin) {
    h['Access-Control-Allow-Origin'] = corsOrigin;
    if (corsOrigin !== '*') h['Vary'] = 'Origin';
  }
  return h;
}

function jsonError(status, message, corsOrigin) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: {
      ...corsHeaders(corsOrigin === null ? '' : corsOrigin),
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

/** SSRF guard: block localhost, private/reserved IPs, and internal suffixes. */
function isForbiddenHost(hostname) {
  const host = hostname.toLowerCase().replace(/\.$/, '');

  // Name-based blocks
  if (host === 'localhost' || host.endsWith('.localhost')) return true;
  if (host.endsWith('.local') || host.endsWith('.internal') || host === 'internal') return true;
  if (host === 'metadata.google.internal') return true;

  // IPv6 literals (URL hostname keeps the brackets)
  if (host.startsWith('[') || host.includes(':')) {
    const v6 = host.replace(/^\[|\]$/g, '');
    if (v6 === '::' || v6 === '::1') return true;                 // unspecified / loopback
    if (/^f[cd]/.test(v6)) return true;                           // fc00::/7 unique local
    if (/^fe[89ab]/.test(v6)) return true;                        // fe80::/10 link-local
    if (v6.startsWith('::ffff:')) {                               // IPv4-mapped
      return isForbiddenIPv4(v6.slice(7));
    }
    return false;
  }

  // IPv4 literals
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host)) {
    return isForbiddenIPv4(host);
  }

  return false;
}

function isForbiddenIPv4(ip) {
  const parts = ip.split('.').map(Number);
  if (parts.length !== 4 || parts.some((n) => Number.isNaN(n) || n < 0 || n > 255)) {
    return true; // malformed → refuse
  }
  const [a, b] = parts;
  if (a === 0) return true;                        // 0.0.0.0/8 "this network"
  if (a === 10) return true;                       // 10.0.0.0/8 private
  if (a === 127) return true;                      // 127.0.0.0/8 loopback
  if (a === 169 && b === 254) return true;         // 169.254.0.0/16 link-local (incl. cloud metadata)
  if (a === 172 && b >= 16 && b <= 31) return true; // 172.16.0.0/12 private
  if (a === 192 && b === 168) return true;         // 192.168.0.0/16 private
  if (a === 192 && b === 0) return true;           // 192.0.0.0/24 special-purpose
  if (a === 100 && b >= 64 && b <= 127) return true; // 100.64.0.0/10 CGNAT
  if (a === 198 && (b === 18 || b === 19)) return true; // 198.18.0.0/15 benchmarking
  if (a >= 224) return true;                       // multicast + reserved
  return false;
}

/** Read a ReadableStream up to maxBytes, truncating anything beyond. */
async function readCapped(stream, maxBytes, controller) {
  if (!stream) return new Uint8Array(0);
  const reader = stream.getReader();
  const chunks = [];
  let total = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (total + value.byteLength >= maxBytes) {
      chunks.push(value.subarray(0, maxBytes - total));
      total = maxBytes;
      controller.abort(); // stop pulling from the origin
      try { await reader.cancel(); } catch { /* already aborted */ }
      break;
    }
    chunks.push(value);
    total += value.byteLength;
  }

  const out = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return out;
}
