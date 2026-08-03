# PositionXero Website

Static HTML site (no build step, no Node). Live at https://www.positionxero.com. Pages are hand-edited HTML; blog posts live in `blog/`.

## URL convention (since 2026-07-12): extensionless

Canonical URLs do NOT carry `.html`: the canonical for `services.html` is `https://www.positionxero.com/services`; for `blog/post.html` it is `https://www.positionxero.com/blog/post`. `.htaccess` 301-redirects `.html` URLs to the clean form and serves clean URLs from the `.html` files. Every internal `href` is root-relative and extensionless (`/services`, `/blog/post-slug`, `/blog/`, `/`). Canonicals, og:url, ALL JSON-LD URLs (BreadcrumbList items, mainEntityOfPage, @id), sitemap.xml locs, and llms.txt links use the extensionless form. One exception: `pricing.md` keeps its extension (deliberately public machine-readable file). Internal strategy docs must NEVER live in this repo — they belong in `Desktop\Position Xero\02 Internal - DO NOT SEND\` (all repo `.md` except pricing.md are blocked from serving by `.htaccess`).

## Breadcrumbs — required on every new page and blog post

Google Search Console tracks our BreadcrumbList rich results (currently 0 invalid / all valid). Every new blog post MUST include **both** of the following, and they must match each other exactly:

### 1. JSON-LD in `<head>`

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type":"ListItem","position":1,"name":"Home","item":"https://www.positionxero.com/"},
    {"@type":"ListItem","position":2,"name":"Blog","item":"https://www.positionxero.com/blog/"},
    {"@type":"ListItem","position":3,"name":"POST TITLE HERE","item":"https://www.positionxero.com/blog/POST-SLUG"}
  ]
}
</script>
```

### 2. Visible breadcrumb nav (first element inside `.article-header .container`)

```html
<nav class="breadcrumb" aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/blog/">Blog</a></li>
    <li aria-current="page">POST TITLE HERE</li>
  </ol>
</nav>
```

### Rules (violating any of these creates GSC breadcrumb errors)

- The position-3 `item` URL must **exactly** equal the page's `rel="canonical"` href — same slug, extensionless (no `.html`), `https://www.positionxero.com` host with `www`.
- The position-3 `name` must match the post's `<h1>` (and the visible breadcrumb's last item).
- Positions are sequential integers starting at 1. Blog posts always have exactly 3 items (Home → Blog → post).
- Top-level pages (e.g. `services.html`, and every market/industry page) use 2 items: Home → page name.
- **Exception, deliberate:** the four service sub-pages `seo.html`, `ads.html`, `lead-gen.html`, `web-design.html` use 3 items (Home → Services → page). This is intentional — it is the only contextual internal link `/services` receives from them. Keep it.
- The JSON must parse — no trailing commas, use straight quotes, escape any `"` inside titles.
- Do NOT add breadcrumbs to `index.html` (homepage), `404.html`, or `thank-you.html` (the latter two are noindex).

Copy an existing recent post (e.g. `blog/how-much-do-solar-leads-cost.html`) as the starting point for any new post — it has the correct head/schema/breadcrumb structure.

## seo-tool/ — internal source folder, never served

`seo-tool/` holds the Free Audit funnel's supporting source (Cloudflare worker, README, client-delivery toolkit playbooks), consolidated from the old `positionxero-seo-tool` repo (deleted 2026-07-12). The live tool page is `free-audit.html` at the repo root (`/free-audit` — a question-by-question lead funnel that flows into the SEO report card; the earlier `seo-audit.html` was replaced before ever deploying and `/seo-audit` 301s to `/free-audit`). `.htaccess` returns 404 for everything under `/seo-tool/`. Never link to files in it from any page, sitemap.xml, or llms.txt. NOTE: this GitHub repo is public — anything truly confidential still belongs in `Desktop\Position Xero\02 Internal - DO NOT SEND\`, not here.

## Dual-market targeting: United States + South Africa (since 2026-08-04)

The site targets **both** the US and South Africa. The founders are genuinely based in South Africa and serve US clients remotely — this is stated plainly on `/about` and must never be obscured or contradicted.

Architecture (decided against parallel `/us/` `/za/` trees, which would have doubled the page count with near-duplicate content on a zero-backlink domain):

- **Country-neutral core.** `/`, `/services`, `/seo`, `/ads`, `/lead-gen`, `/web-design` serve both markets. Their `Service` schema carries `areaServed: [United States, South Africa]`.
- **Five South Africa pillar pages**, each with genuinely SA-specific content (ZAR pricing, POPIA, SA metros, load-shedding-driven verticals, click-to-WhatsApp): `/lead-generation-south-africa`, `/seo-south-africa`, `/google-ads-south-africa`, `/meta-ads-south-africa`, `/web-design-south-africa`. These use `<html lang="en-ZA">`, `og:locale` `en_ZA`, and `areaServed: South Africa`.
- **US market/industry pages:** `/lead-generation-dallas` (DFW is the chosen US geo focus — Hail Alley roofing, extreme-summer HVAC, freeze-event plumbing give it near-year-round home-services demand), `/hvac-marketing`, `/roofing-marketing`.

Rules:

- **No hreflang.** The SA pages are distinct content, not translations of the US pages, so hreflang does not apply (and `/google-ads-south-africa` + `/meta-ads-south-africa` both map to `/ads`, which would break the required 1:1 pairing). Do not add it.
- **No `geo.position` / `geo.placename` meta tags** — Google ignores them.
- **Never city-doorway pages.** SA metro names (Johannesburg, Cape Town, Durban, Pretoria, Sandton, Centurion, Gqeberha) and DFW city names (Fort Worth, Plano, Arlington, Frisco) are woven into pillar-page body copy instead. Local-pack head terms need a Google Business Profile, which is off the table.
- **USD is the source of truth** for pricing (`pricing.md`). ZAR figures appear only as clearly-labelled approximations on SA pages, and never as a hard number in a `<title>` (exchange rates move; the title goes stale).

## Honest-schema policy (zero clients, no entity, no office)

Use `BusinessAudience` with `geographicArea` to signal geo targeting — it needs no physical presence:

```json
{"@context":"https://schema.org","@type":"BusinessAudience","audienceType":"HVAC Companies","geographicArea":{"@type":"Country","name":"United States"}}
```

**Never add** `LocalBusiness`, `PostalAddress`, `GeoCoordinates`, `OpeningHoursSpecification`, `Review`, or `AggregateRating` schema — every competitor using those ties them to a real, verifiable address or review platform. Never write testimonials, client counts, case studies, or results attributed to past clients. Where a competitor would put a case study, substitute buyer-education or transparent methodology.

(Prose *advising readers* to add `LocalBusiness` schema to **their own** sites is fine — the ban is on it appearing in this site's own JSON-LD.)

## Other conventions

- All canonical URLs use `https://www.positionxero.com` (https + www).
- Every internal `href` is root-relative — including assets (`/css/style.css`, `/js/main.js`, `/img/...`) and `/blog/`. No relative or `../` paths anywhere.
- The primary nav and mobile menu carry all five money pages: Services, SEO, Ads, Lead Gen, Web Design (+ About, Blog).
- New blog posts also need: title/meta description, canonical link, Article JSON-LD, and a listing card added to `blog/index.html`.
- `<title>` and `<h1>` should be **different** strings — the title optimizes for SERP click-through, the H1 for on-page keyword relevance. Keep titles ≤60 chars.
- Keep the `X min read` label honest (~225 words/minute); inflated read times are a visible trust tell.
- See `SEO-AUDIT.md` for the full site audit history and open SEO items.
