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
- Top-level pages (e.g. `services.html`) use 2 items: Home → page name.
- The JSON must parse — no trailing commas, use straight quotes, escape any `"` inside titles.
- Do NOT add breadcrumbs to `index.html` (homepage), `404.html`, or `thank-you.html` (the latter two are noindex).

Copy an existing recent post (e.g. `blog/how-much-do-solar-leads-cost.html`) as the starting point for any new post — it has the correct head/schema/breadcrumb structure.

## seo-tool/ — internal source folder, never served

`seo-tool/` holds the Free Audit funnel's supporting source (Cloudflare worker, README, client-delivery toolkit playbooks), consolidated from the old `positionxero-seo-tool` repo (deleted 2026-07-12). The live tool page is `free-audit.html` at the repo root (`/free-audit` — a question-by-question lead funnel that flows into the SEO report card; the earlier `seo-audit.html` was replaced before ever deploying and `/seo-audit` 301s to `/free-audit`). `.htaccess` returns 404 for everything under `/seo-tool/`. Never link to files in it from any page, sitemap.xml, or llms.txt. NOTE: this GitHub repo is public — anything truly confidential still belongs in `Desktop\Position Xero\02 Internal - DO NOT SEND\`, not here.

## Other conventions

- All canonical URLs use `https://www.positionxero.com` (https + www).
- New blog posts also need: title/meta description, canonical link, Article JSON-LD, and a listing card added to `blog/index.html`.
- See `SEO-AUDIT.md` for the full site audit history and open SEO items.
