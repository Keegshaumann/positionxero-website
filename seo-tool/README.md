# Position Xero — Free Audit lead funnel

**We Turn Ad Spend Into Revenue.** The Free Audit is our free lead-gen funnel: a visitor answers a short question-by-question flow about their business (industry, service they want, ad spend), and — for visitors interested in SEO — that flow continues into an instant graded SEO report card, unlocked by handing over contact details. Every submission is a qualified lead in the pipeline — not a vanity metric.

## Where this lives

The tool itself is **not** in this folder. It's a single page, `free-audit.html`, at the **root of the main website repo**, served live at:

**https://www.positionxero.com/free-audit**

(the site's `.htaccess` maps the extensionless `/free-audit` URL to `free-audit.html` — see the root repo's clean-URL rules. The old `/seo-audit` URL and `seo-audit.html` page are retired; `.htaccess` 301-redirects `/seo-audit` to `/free-audit`.)

This `seo-tool/` folder holds everything *around* the page:

| Path | What it is |
|---|---|
| `cloudflare-worker.js` | The CORS proxy + lead-relay backend (see below). Deployed separately to Cloudflare. |
| `README.md` | This file. |
| `toolkit/` | 5 client-delivery playbooks for turning audit results into paid work (see table below). |

**This whole folder is never served.** The root `.htaccess` blocks `/seo-tool/` with a 404 (`RedirectMatch 404 ^/seo-tool(/|$)`), same as it blocks internal docs. It's source/reference material only — the live page is `free-audit.html` at the repo root.

## How lead capture works

`free-audit.html` posts JSON lead payloads directly — no third-party form service in the loop. Everything you configure lives in the `CONFIG` block near the top of the script in `free-audit.html`:

```js
const CONFIG = {
  BRAND_NAME: 'Position Xero',
  BRAND_URL: 'https://www.positionxero.com',
  BRAND_TAGLINE: 'We Turn Ad Spend Into Revenue.',
  CONTACT_CTA_URL: 'https://www.positionxero.com/contact',
  LEAD_WEBHOOK: '',   // Your Cloudflare Worker's /lead endpoint. Empty = leads only log to the browser console (dev mode).
  WEB3FORMS_KEY: '',  // Web3Forms access key — quick-start alternative to the worker. Empty = unused.
  PROXY_URL: '',      // Your own Cloudflare Worker CORS proxy, e.g. 'https://seo-proxy.YOURNAME.workers.dev/?url='. Empty = fall back to free public proxies.
}
```

| Key | What it does |
|---|---|
| `LEAD_WEBHOOK` | POST target for lead payloads — your Cloudflare Worker's `https://YOUR-WORKER.workers.dev/lead`. Production path. |
| `WEB3FORMS_KEY` | Web3Forms access key. Quick-start path — no backend to deploy. |
| `PROXY_URL` | Your private Cloudflare Worker proxy (with trailing `?url=`), used to fetch the audited page around CORS. Empty = free public proxies. |

**With neither `LEAD_WEBHOOK` nor `WEB3FORMS_KEY` set, the page still works end-to-end** — the audit runs normally, but leads are not sent anywhere (the console shows a one-line warning per submission). Useful for local development; useless for pipeline.

There are two ways to actually receive leads:

### Quick setup (Web3Forms, ~2 minutes, no backend)

1. Go to [web3forms.com](https://web3forms.com) and create a free access key for `founder@positionxero.com`. No account required — the key is emailed to that address.
2. Paste the key into `WEB3FORMS_KEY` in the `CONFIG` block of `free-audit.html`.
3. Leave `LEAD_WEBHOOK` empty (or set both — the page tries the worker webhook first if configured, per the logic in `free-audit.html`).

Good for testing or a low-volume launch. Web3Forms' free tier and formatting are outside our control.

### Production setup (Cloudflare Worker, ~5 minutes, full control)

1. Deploy `cloudflare-worker.js` — see the deploy steps in the comment block at the top of that file. Free Cloudflare account, ~2 minutes.
2. In the worker's **Settings → Variables and Secrets**, set:
   - `RESEND_API_KEY` — API key from [resend.com](https://resend.com) (free tier). Add as an **encrypted secret**.
   - `LEAD_TO` — `founder@positionxero.com` (or wherever leads should land).
   - `LEAD_FROM` *(optional)* — e.g. `'SEO Report Card <leads@positionxero.com>'`, once the `positionxero.com` sending domain is verified in Resend. Until then, omit it — it defaults to Resend's shared test sender (`SEO Report Card <onboarding@resend.dev>`), which works out of the box but is less deliverable long-term.
3. Back in `free-audit.html`, set:
   ```js
   LEAD_WEBHOOK: 'https://YOUR-WORKER.workers.dev/lead',
   PROXY_URL: 'https://YOUR-WORKER.workers.dev/?url=',
   ```
   (same worker, two routes — see [Reliability](#reliability-the-proxy-chain) below for `PROXY_URL`.)

This is the recommended long-term setup: no third-party form vendor in the loop, full control over formatting and deliverability, and the same worker already doing the CORS proxy work.

## The lead payload contract

`free-audit.html` and `cloudflare-worker.js` must agree on this shape exactly — if you change one, change the other. The funnel is a question-by-question flow (industry → service interested in → monthly ad spend → contact details) that then branches: SEO-interested visitors continue into the graded SEO report card; visitors who chose ads/web/leads do not. Three stages fire independently:

- **`captured`** — fires once the question flow + contact details validate, for **any** chosen service. For the SEO branch this fires before the audit starts.
- **`no-website`** — replaces `captured` when the visitor chose the SEO service but says they don't have a website (no audit runs; SEO branch only).
- **`enriched`** — fires once the audit settles (success *or* failure), with score/grade/emails attached if the audit succeeded. SEO branch only.
- **`fix-request`** — fires when the visitor clicks "contact me to fix this" on their finished report card. Carries the lead plus the report's grade/score/top issues; this is the hottest signal the funnel produces — the visitor explicitly asked to be contacted about paid work. SEO branch only.

A single SEO-branch visitor with a website typically produces **two** payloads (`captured` then `enriched` — two emails to the founder by design; **three** if they click the fix-request button); an SEO-branch visitor without a website produces exactly one (`no-website`); a visitor who chose ads/web/leads produces exactly one (`captured`).

```json
{
  "source": "seo-report-card",
  "stage": "captured",
  "name": "Jane Doe",
  "business": "Acme Ltd",
  "email": "jane@acme.com",
  "phone": "+27 82 555 1234",
  "industry": "Roofing",
  "service": "seo",
  "adSpend": "500-2k",
  "hasWebsite": true,
  "website": "https://acme.com/",
  "keyword": "plumber sydney",
  "auditOk": true,
  "grade": "B",
  "score": 71,
  "topIssues": ["Thin content (253 words)"],
  "emailsFound": ["info@acme.com"],
  "page": "https://www.positionxero.com/free-audit",
  "ts": "2026-07-12T14:00:00.000Z"
}
```

| Field | Required | Notes |
|---|---|---|
| `source` | always | Constant `"seo-report-card"`. |
| `stage` | always | One of `"captured"` \| `"no-website"` \| `"enriched"` \| `"fix-request"`. |
| `name`, `business`, `email`, `phone` | always | Non-empty strings. `email` must be a valid email format; `phone` is lenient (7–15 digits after stripping spaces/dashes/parens, optional leading `+`). |
| `industry` | optional | Free text, may be `""`. Capped at 120 chars server-side. |
| `service` | optional | One of `"seo"` \| `"ads"` \| `"web"` \| `"leads"`, or `""`. Any other value is dropped to `""` server-side. |
| `adSpend` | optional | One of `"none"` \| `"under-500"` \| `"500-2k"` \| `"2k-10k"` \| `"over-10k"`, or `""`. Any other value is dropped to `""` server-side. |
| `hasWebsite` | always | Boolean. |
| `website` | always | URL string, or `null` when `hasWebsite` is `false`. |
| `keyword` | optional | May be `""`. |
| `auditOk` | `enriched` only | `false` if every proxy in the chain failed. |
| `grade`, `score` | `enriched` + `auditOk` only | `score` is an integer 0–100. |
| `topIssues` | `enriched` + `auditOk` only | Max 5 issue titles. |
| `emailsFound` | `enriched` only | Max 10, deduped, lowercased. |
| `page` | always | The tool page URL the lead came from — `https://www.positionxero.com/free-audit`. |
| `ts` | always | `new Date().toISOString()` at send time. |

`cloudflare-worker.js` re-validates and re-sanitizes all of this server-side on `POST /lead` — it never trusts the client. Unknown fields are stripped; `emailsFound` is hard-capped at 10 and `topIssues` at 5 regardless of what's sent; missing/invalid required fields are rejected with a 400 before any email is sent. `service` and `adSpend` are validated against fixed enums — anything outside them is silently coerced to `""` rather than rejecting the submission, since they're optional.

## Reliability: the proxy chain

Browsers can't fetch arbitrary third-party sites directly (CORS), so the tool routes page fetches through a proxy. If `PROXY_URL` is set, **your own worker is tried first.** Either way, the tool falls back through four free public proxies in order, each with a ~15s timeout:

1. `api.allorigins.win` — works, but intermittently returns 500s (the tool retries it once)
2. `corsproxy.io` — generally fine from a real browser page
3. `api.codetabs.com` — flaky
4. `proxy.cors.sh` — last resort; unauthenticated use is rate-limited

**Verified quirk:** `corsproxy.io` works fine when called from an actual browser origin (i.e. the live page or `localhost:8000`), but it rejects server-to-server calls and `file://` page testing — so double-clicking `free-audit.html` locally will not exercise that fallback correctly. Use a local static server (below) to test the real chain.

That chain is **best-effort.** Free public proxies rate-limit, go down, and block traffic without notice — fine for testing, not what a lead-gen page should depend on in production. **Deploy the private Cloudflare Worker for production** (same one used for `/lead` — see [Production setup](#production-setup-cloudflare-worker-5-minutes-full-control) above). Full proxy deploy steps are in the comment block at the top of [`cloudflare-worker.js`](cloudflare-worker.js).

## Local testing

This machine has no Node or Python install for a throwaway server — local preview instead uses a small PowerShell `HttpListener` script to serve the repo root as a real HTTP origin (not `file://`, which breaks CORS proxy fallbacks and looks different from production).

Serve the **website repo root** (not this `seo-tool/` folder) with any static file server on `http://localhost:8000`, then visit:

```
http://localhost:8000/free-audit
```

The clean-URL mapping (`/free-audit` → `free-audit.html`) is handled by `.htaccess` in production; locally, either request `free-audit.html` directly or configure your local server to do the same extensionless mapping if you want the URL to match production exactly.

With `LEAD_WEBHOOK` and `WEB3FORMS_KEY` both empty, each submitted lead logs a one-line console warning (stage only — full payloads are deliberately never printed, they contain PII). To inspect full payloads locally, point `LEAD_WEBHOOK` at a local request logger and watch what arrives. To test the full worker round trip locally, temporarily add `http://localhost:8000` to `LEAD_ALLOWED_ORIGINS` in `cloudflare-worker.js` — and remove it again before deploying (the comment above that constant explains why).

## Toolkit

Playbooks for converting audit leads into paid engagements:

| File | What it is |
|---|---|
| `toolkit/00-tool-stack.md` | The SEO Tool Stack — what we use to run audits and campaigns. |
| `toolkit/01-audit-playbook.md` | Client SEO Audit Playbook — turning a report card into a scoped proposal. |
| `toolkit/02-content-link-workflow.md` | Safe Content & Link Workflow. |
| `toolkit/03-monthly-cadence-reporting.md` | Monthly SEO Cadence & Client Reporting — includes a report template. |
| `toolkit/04-seo-myths-onepager.md` | SEO Myths: What Actually Moves the Needle — client-facing one-pager. |

---

**Position Xero** · Google Ads · Meta Ads · SEO · Lead Generation · [positionxero.com](https://www.positionxero.com)
