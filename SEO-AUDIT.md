# Position Xero — Technical & On-Page SEO Audit

> ## ✅ Implementation Status — 2026-06-11
> This audit has been **acted on**. Score moved from a baseline **61/100** toward best-in-class. Implemented across all 20 pages via a multi-agent workflow + deterministic passes:
> - **Fixed all leftover South-Africa locale leaks** (`R3→$3`, `CPL of R1,000→$1,000`, `spend a rand→dollar`, `once-off→one-time`) and **~135 British→US spellings** (`optimise→optimize`, `specialisation→specialization`, `behavioural→behavioral`, etc.).
> - **Removed the self-serving / fabricated review schema** (aggregateRating + James M./Sarah B. reviews) and built **one canonical `#organization` entity** (`@id`, logo, contactPoint, `Country` areaServed) referenced sitewide; added Service / FAQPage / BlogPosting (`@id` publisher+author) / Breadcrumb / About / Contact schema. **All 56 JSON-LD blocks validate.**
> - **Completed head meta** on every page (robots, author, theme-color, `og:site_name`/`og:locale`, `twitter:image`, `og:image` dims), **non-blocking font loading**, apple-touch-icon + `site.webmanifest`, and `lang="en-US"`.
> - **Visible breadcrumbs** on all 18 content pages, **internal-link cluster** wired (fixed the blog "link sink"), **accessibility** (skip links, `:focus-visible`, `prefers-reduced-motion`, `<main>`, FAQ + hamburger ARIA), **CWV** (reduced-motion/IntersectionObserver-gated hero canvas, image dimensions, lazy/async).
> - **New assets/files:** real 1200×630 `og-image.jpg`, `logo.png`, icon set, branded `404.html`, `.htaccess`, `sitemap.xml` with `lastmod`, expanded `llms.txt` (all 9 posts), dated `pricing.md`, documented `robots.txt`.
> - **Replaced third-party stock-photo avatars** (randomuser.me) with on-brand CSS monograms.
>
> **Remaining = owner decisions only** (cannot be done without real data — see "User-Decision Flags" below): real attributable client reviews, a named author for E-E-A-T, verified statistic sources, confirmed geo-coordinates/hours, and verified social-profile URLs.

---

**Domain audited:** https://www.positionxero.com
**Stack:** Static HTML (20 pages) + one CSS file + vanilla JS, deployed via static upload (Hostinger). All SEO must live in the static HTML — there is no server-side rendering.
**Audit date:** 2026-06-11
**Auditors consolidated:** 8 specialist dimensions (Head & Meta, Structured Data, On-Page Content, Internal Linking, Performance/CWV, Accessibility, AI/LLM SEO, Crawlability & Local SEO).

---

## Executive Summary

Position Xero **sells SEO, AI SEO, and LLM SEO as core services**, so its own site must be best-in-class — and right now it is "competent but not credible-as-an-expert." The foundations are genuinely good: every page has a unique title, meta description, and self-referencing canonical; 53 JSON-LD blocks are all valid; BreadcrumbList is on every inner page; the blog cluster is well-structured with direct-answer definitions and FAQ blocks; robots.txt correctly allows every major AI crawler; and a machine-readable `pricing.md` and `llms.txt` already exist.

But for an agency that charges clients to do this, several issues are reputationally damaging:

1. **The homepage embeds a self-serving `aggregateRating` (4.9, 50 reviews) plus two reviews from "James M." and "Sarah B."** — the same names attached to fabricated-looking randomuser.me stock-photo avatars in the visible testimonials. This violates Google's review-snippet policy (a business cannot mark up reviews about itself on its own Organization entity) and risks a "spammy structured markup" manual action. **This is the single highest-risk item.**
2. **There is no canonical Organization entity.** Every page repeats a thin, logo-less `Organization` with no shared `@id`, so Google cannot consolidate the brand into one knowledge-graph entity — the exact "entity authority" the agency's own pages tell clients to build. No `logo` property exists anywhere, which means all 9 blog posts technically fail Google's Article rich-result requirement (`publisher.logo` is required).
3. **British spelling ("optimise/optimised") is used across 15+ pages**, plus two locale leaks — "Every rand is tracked" (South African currency) on services.html and "once-off" pricing (SA/UK phrasing) on web-design.html. A US agency selling "search engine optimization" whose own copy never contains the US keyword string is a self-inflicted relevance and credibility wound.
4. **Performance is left on the table:** Google Fonts is loaded twice (a `<link>` in every page AND an `@import` inside style.css — the worst, fully-serialized pattern), the hero canvas runs an infinite `requestAnimationFrame` loop forever with no reduced-motion guard or off-screen pause, and every blog image hot-links unsplash.com with no preconnect.
5. **Accessibility gaps double as crawl/semantic gaps:** zero visible keyboard focus indicator site-wide, the homepage is the only page missing a `<main>` landmark, 40+ FAQ accordion buttons expose no `aria-expanded`, and there is no skip link anywhere.
6. **The internal link graph only flows downward** — blog posts link up to money pages, but no money page or the homepage links to a single blog post, and there is almost no blog-to-blog cross-linking. BreadcrumbList schema sits on 18 pages with no matching visible breadcrumb on any of them.

**Good news from verification:** the previously-reported broken `og-image.jpg` is **now fixed** — `img/og-image.jpg` exists at the correct 1200×630. Icon assets (`apple-touch-icon.png`, `icon-192.png`, `icon-512.png`) also now exist — but they are **orphaned** (never referenced in any page) and there is no web manifest, so the work is half-done.

Most fixes are low-risk, copy-paste HTML/CSS/JS edits that one implementer can ship in a day. The two items that need a **human business decision** are the review/testimonial authenticity question and the absence of a real named author for E-E-A-T.

---

## Scores

| Dimension | Score | One-line verdict |
|---|---:|---|
| Head & Meta Tags | 62 | Fundamentals solid; social/discovery layer (robots meta, og:site_name, icons, twitter:image on home) incomplete; some titles/descriptions over length. |
| Structured Data / JSON-LD | 58 | Broad & valid, but no canonical Org `@id`, no logo, and a self-serving fabricated-review block on the homepage. |
| On-Page Content & Keywords | 68 | Strong IA; held back by British spelling, a ZAR/UK locale leak, seo.html↔blog cannibalization, and keyword-less money-page H1s. |
| Internal Linking & Architecture | 62 | Clean nav & sitemap, but blog is a link sink, no visible breadcrumbs, web-design & FAQ demoted to footer-only. |
| Performance & Core Web Vitals | 58 | Double-loaded fonts, infinite canvas loop, un-preconnected third-party images, no modern image formats or preloads. |
| Accessibility (SEO-adjacent) | 58 | No focus indicator, homepage missing `<main>`, FAQ/hamburger ARIA missing, no skip link. |
| AI / LLM SEO (AEO/GEO) | 62 | Above-average extractability, but stale `llms.txt`, faceless "Team" authorship, unsourced stats, 3 stale flagship dates. |
| Crawlability, Files & Local SEO | 62 | robots.txt clean & og-image fixed, but no `lastmod`, skeletal geo signals, orphaned icons, no 404 page. |
| **OVERALL** | **61** | Competent foundation; not yet the flawless showcase an SEO agency must run on its own domain. |

---

## Severity-Ordered Findings (de-duplicated)

| # | Sev | Finding | Files | Owner dimension |
|---|---|---|---|---|
| 1 | Critical | Self-serving `aggregateRating` + 2 fabricated-looking reviews on the Organization entity (review-spam policy violation) | index.html | Structured Data / A11y / Local SEO |
| 2 | Critical | No canonical Organization `@id` shared across pages; thin duplicated publisher with no `logo`/`image` (breaks Article rich-result requirement on all 9 posts) | all HTML | Structured Data |
| 3 | Critical | No visible keyboard focus indicator anywhere; form fields actively strip outline (WCAG 2.4.7) | css/style.css | Accessibility |
| 4 | Critical | `llms.txt` is stale & incomplete — lists only 3 of 9 posts, no freshness date | llms.txt | AI/LLM SEO |
| 5 | Critical | No real-person author/E-E-A-T — all content attributed to faceless "Position Xero Team" Organization | 9 blog posts, about.html | AI/LLM SEO |
| 6 | High | Google Fonts loaded twice (`<link>` in every page + `@import` in style.css) — double render-blocking | all HTML, css/style.css | Performance |
| 7 | High | Hero `<canvas>` runs an infinite rAF loop forever; no `prefers-reduced-motion`, no off-screen pause | js/main.js, css/style.css | Performance / A11y |
| 8 | High | British spelling "optimise/optimised" site-wide on a US "optimize" market | 15+ pages | On-Page Content |
| 9 | High | Locale/currency leak: "Every rand is tracked" + "once-off" pricing (ZAR/SA-English) | services.html, web-design.html, blog/google-ads-vs-meta-ads.html | On-Page Content |
| 10 | High | No page-level robots meta (`max-image-preview:large`, `max-snippet:-1`) on any page | all HTML | Head & Meta |
| 11 | High | Missing `og:site_name` + `og:locale` on every page | all HTML | Head & Meta |
| 12 | High | Homepage missing `twitter:image`, `twitter:url`, and `og:image` dimensions | index.html | Head & Meta |
| 13 | High | Newly-added icon assets orphaned (never referenced) + no web manifest | all HTML | Crawlability |
| 14 | High | Blog is a link sink — no money page or homepage links to any individual post | index.html + all money pages | Internal Linking |
| 15 | High | BreadcrumbList schema on 18 pages with NO visible breadcrumb trail (schema/UI mismatch) | 18 pages, css/style.css | Internal Linking |
| 16 | High | Hamburger has stale `aria-label`, no `aria-expanded`; mobile menu has no ARIA/focus management/Escape | all HTML, js/main.js | Accessibility |
| 17 | High | FAQ accordion (40+ buttons) exposes no `aria-expanded`/`aria-controls` state | faq.html + 9 pages, js/main.js | Accessibility |
| 18 | High | No "skip to content" link on any page (WCAG 2.4.1) | all HTML, css/style.css | Accessibility |
| 19 | High | Org entity missing geo, openingHours, priceRange; `areaServed` is a bare "US" string | index.html | Structured Data / Local SEO |
| 20 | High | Service pages lack provider `@id`, `offers`/`priceRange`, `url`/`mainEntityOfPage` despite public pricing | seo/ads/lead-gen/web-design.html | Structured Data |
| 21 | High | Statistics have no clickable source citations; several read as invented | 4 blog posts | AI/LLM SEO |
| 22 | High | Flagship "What Is AI SEO?" + 2 posts frozen at dateModified 2026-01-01 | what-is-ai-seo, google-ads-vs-meta-ads, lead-generation-for-small-business | AI/LLM SEO |
| 23 | High | services.html & web-design.html have no FAQ/definition block & no FAQPage schema | services.html, web-design.html | On-Page / AEO |
| 24 | High | seo.html and the AI-SEO blog post cannibalize "What is AI SEO" (duplicated definition + identical 5-step framework) | seo.html, blog/what-is-ai-seo.html | On-Page Content |
| 25 | High | Service-page money H1s omit the primary keyword (title↔H1 mismatch) | index, services, lead-gen, blog/index.html | On-Page Content |
| 26 | High | Every sitemap URL missing `<lastmod>` | sitemap.xml | Crawlability / AEO |
| 27 | High | team.jpg (248KB JPEG) has no width/height, no fetchpriority, not WebP/AVIF, no srcset | index.html, img/team.jpg | Performance |
| 28 | High | All blog images hot-link unsplash.com with no preconnect (LCP on 3rd-party origin) | 10 blog files | Performance |
| 29 | Medium | Titles over 60 chars (truncated) on 11 pages; descriptions over ~160 on 10 pages | see per-file plan | Head & Meta |
| 30 | Medium | Blog OG/Twitter + BlogPosting images hot-link Unsplash (not owned, fragile) | 9 blog posts | Head & Meta / Structured Data |
| 31 | Medium | Almost no blog-to-blog cross-linking (1 link across 9 posts); no Related Articles modules | 9 blog posts | Internal Linking |
| 32 | Medium | web-design.html (a money page) missing from primary nav; FAQ page is footer-only | all HTML, services.html | Internal Linking |
| 33 | Medium | Missing `og:image:alt`/`twitter:image:alt`; missing `twitter:url`/`twitter:site` | all HTML | Head & Meta |
| 34 | Medium | WebSite schema lacks `@id`; blog/index Blog node doesn't enumerate posts | index.html, blog/index.html | Structured Data |
| 35 | Medium | Decorative stars (★★★★★) read literally by screen readers | index.html, about.html | Accessibility |
| 36 | Medium | randomuser.me avatars: 3rd-party, no preconnect, no dimensions/lazy/async (also authenticity) | index.html, about.html | Performance / A11y |
| 37 | Medium | blog/index thumbnails lack width/height + decoding=async | blog/index.html | Performance |
| 38 | Medium | No `rel=preload` for LCP image or stylesheet anywhere; no critical-CSS | all HTML, css/style.css | Performance |
| 39 | Medium | No custom 404 page (Hostinger default dead-end) | 404.html (new), .htaccess (new) | Crawlability |
| 40 | Medium | Footer NAP omits the street address on every page | all HTML | Crawlability / Local SEO |
| 41 | Medium | pricing.md has no freshness/effective date | pricing.md | AEO |
| 42 | Low | Leftover `meta keywords` tag on homepage | index.html | Head & Meta |
| 43 | Low | `<html lang="en">` should be `en-US` | all HTML | Head & Meta |
| 44 | Low | No `theme-color` meta tag | all HTML | Head & Meta |
| 45 | Low | Generic "Learn more" anchor text on all 6 homepage service cards | index.html | Internal Linking |
| 46 | Low | Orphaned duplicate og-image.png alongside active og-image.jpg | img/ | Crawlability |
| 47 | Low | Unverified sameAs (LinkedIn/Instagram) with no on-page corroboration | index.html | Structured Data |
| 48 | Low | No author meta on blog posts; nav unlabeled; hamburger tap target < 44px; footer H4 outline skips; CCBot stance implicit; HowTo deprecated | various | Head/A11y/AEO |

---

## Per-File Action Plan

> Edits are grouped so one implementer owns each file end-to-end, ordered by impact within the file. Where an asset (logo, branded og-image, real author) is required first, it is called out — **do not deploy schema/tags that point at a non-existent asset.**

### index.html
1. **Remove the `aggregateRating` and the two `review` objects** from the ProfessionalService JSON-LD (the "James M." / "Sarah B." block). Do not self-host star ratings on the Organization entity. *(See user flag #1.)*
2. **Rebuild the ProfessionalService block as the single canonical entity** with `"@id": "https://www.positionxero.com/#organization"`, and add: `logo` (ImageObject → `/img/logo.png` once created, or interim `/img/og-image.jpg`), `image`, `priceRange: "$$"`, `geo` (GeoCoordinates — verify real lat/long for 1558 Trail Ridge Rd), `openingHoursSpecification` (confirm real hours), `contactPoint` (sales, +17815078289, hello@positionxero.com), and change `areaServed` from the string `"US"` to `{"@type":"Country","name":"United States"}`. Keep `sameAs` only after verifying the profiles resolve.
3. **Rebuild the WebSite block** with `"@id":"https://www.positionxero.com/#website"` and `"publisher":{"@id":"https://www.positionxero.com/#organization"}`. Do not add a SearchAction (no working search).
4. Add `<meta property="og:image:width" content="1200">`, `og:image:height` `630`, `og:image:alt`, `<meta name="twitter:image" content="https://www.positionxero.com/img/og-image.jpg">`, `<meta name="twitter:url" content="https://www.positionxero.com/">`.
5. Add the shared head block (see "Shared head additions" below): robots meta, og:site_name, og:locale, theme-color, icon/manifest links.
6. **Remove the `<meta name="keywords">` line.**
7. Change `<html lang="en">` → `<html lang="en-US">`.
8. Replace the font `<link>` with the non-blocking font pattern (see "Shared font fix").
9. Wrap content in `<main id="main">` (open before `<!-- HERO -->`, close after the CTA section, before `<!-- FOOTER -->`). Add `<a class="skip-link" href="#main">Skip to main content</a>` as the first element inside `<body>`.
10. Add `aria-expanded="false" aria-controls="mobileMenu"` to the hamburger; add `aria-label="Primary"` to `<nav>`.
11. Fold the primary keyword into the H1, e.g. `<h1>Google Ads, Meta Ads & Lead Generation<br><span class="gradient-text">That Turn Ad Spend Into Revenue</span></h1>`.
12. Make the 6 service-card CTAs descriptive (e.g. "Explore Google Ads management →") instead of 6× "Learn more".
13. Add a **"Latest Insights"** section before the CTA linking the 3 newest posts with descriptive anchor text (real-estate, what-is-a-landing-page, local-seo) → completes the blog-to-homepage link.
14. Add `aria-hidden="true"` to decorative ★★★★★ spans (the "4.9/5" text already conveys the rating).
15. Avatars: add `width="46" height="46" loading="lazy" decoding="async"` (and ideally self-host / replace per user flag #4).
16. team.jpg: wrap in `<picture>` with AVIF/WebP sources + `width="1537" height="900" decoding="async" loading="lazy"` (see new image assets).
17. Add the full street address to the footer "Get In Touch" block: `<li><address style="font-style:normal">1558 Trail Ridge Rd, Alpine, WY 83128</address></li>` (byte-for-byte identical to the PostalAddress schema).

### services.html
1. Add the canonical-entity reference: change the inline publisher/provider Organization to `{"@id":"https://www.positionxero.com/#organization"}`. Add a `Service` JSON-LD block with `url` + `mainEntityOfPage`.
2. Add a **FAQPage JSON-LD block** + a visible 3–5 question FAQ section (reuse the seo.html `.faq-item` pattern). Use only on-page facts: "What services does Position Xero offer?", "What results can I expect?", etc.
3. Add a visible breadcrumb (`Home › Services`) matching the schema; add `.breadcrumb` CSS once (shared).
4. **Fix the locale leak:** line 95 "Every rand is tracked and optimised." → "Every dollar is tracked and optimized."
5. British→US spelling pass (`optimis*` → `optimiz*`) across visible copy + JSON-LD text.
6. Fold keyword into H1: `<h1>Performance Marketing Services<br><span class="gradient-text">Under One Roof</span></h1>`.
7. Add an in-body link to faq.html and ensure all four service sub-pages (incl. web-design) are equal clickable cards with descriptive anchors.
8. Shared head additions + font fix + `lang="en-US"` + skip link + `<main id="main">` (already has `<main>`; just add `id`) + hamburger/nav ARIA + footer address.
9. Trim title/description to length targets if over (verify on edit).

### seo.html
1. Service JSON-LD: provider → `{"@id":".../#organization"}`; `areaServed` → Country object; add `url` + `mainEntityOfPage`; add an `Offer` only if a real starting price exists (else omit — do not invent).
2. **De-cannibalize vs. the AI-SEO blog post:** remove the duplicate "What Is AI SEO?" definition prose (line ~166) and reframe to commercial intent ("Our AI SEO service gets your brand cited inside…"), linking to `blog/what-is-ai-seo.html` as the informational guide. Replace the verbatim "How to Optimise for AI SEO in 5 Steps" walkthrough with a short "Our AI SEO process" framing that links to `blog/what-is-ai-seo.html#how-to`.
3. British→US spelling pass (14 occurrences here — the heaviest page) including JSON-LD `text` fields.
4. Add 2–3 in-body links to supporting posts (what-is-ai-seo, local-seo-for-service-businesses) and a link to faq.html.
5. Add visible breadcrumb (`Home › Services › SEO Services`) matching schema.
6. Shared head additions + font fix + `lang="en-US"` + skip link + add `id="main"` to `<main>` + hamburger/nav ARIA + FAQ `aria-expanded`/`aria-controls` (sync in main.js) + footer address.
7. Trim description (currently 200 chars) to ~150–160.

### ads.html
1. Service JSON-LD: provider → `{"@id":".../#organization"}`; `areaServed` → Country; add `url`+`mainEntityOfPage`; add `Offer` using the real $850/mo figure.
2. British→US spelling pass (3) incl. JSON-LD.
3. Trim the "Google Ads vs Meta Ads" H2 section to a short takeaway + link `blog/google-ads-vs-meta-ads.html` as the canonical deep-dive.
4. Add in-body links to `how-much-do-google-ads-cost.html` and `google-ads-vs-meta-ads.html`.
5. Add visible breadcrumb matching schema.
6. Shared head additions + font fix + `lang="en-US"` + skip link + `id="main"` + hamburger/nav ARIA + FAQ ARIA + footer address.
7. Trim title (68 chars) to ≤60.

### lead-gen.html
1. Service JSON-LD: provider → `{"@id":".../#organization"}`; `areaServed` → Country; `url`+`mainEntityOfPage`; add `Offer` only with a real price (else omit).
2. Fold keyword into H1: `<h1>Lead Generation That Delivers<br><span class="gradient-text">Qualified Leads, On Demand</span></h1>`.
3. Add in-body links to its 4 supporting posts (lead-generation-for-small-business, law-firm-lead-generation, real-estate-lead-generation, cost-per-lead-benchmarks).
4. Add visible breadcrumb matching schema.
5. British→US spelling pass.
6. Shared head additions + font fix + `lang="en-US"` + skip link + `id="main"` + hamburger/nav ARIA + FAQ ARIA + footer address.
7. Trim title (66 chars) to ≤60.

### web-design.html
1. **Fix locale leaks:** line 144 "From $750 once-off" → "From $750 one-time"; line 149 "From $1,800 once-off" → "From $1,800 one-time".
2. Add a **definition block** ("What is a landing page? …") + a **4–6 question FAQ section** with **FAQPage JSON-LD** (reuse seo.html pattern). Questions: "How much does a landing page cost?" ($750 one-time / $1,800 full site), "How fast will my site load?", "How long does a website take to build?".
3. Service JSON-LD: provider → `{"@id":".../#organization"}`; `areaServed` → Country; `url`+`mainEntityOfPage`; add `Offer` (price 750, one-time).
4. Add in-body link to `blog/what-is-a-landing-page.html`.
5. Add visible breadcrumb matching schema.
6. British→US spelling pass (5) incl. "optimised".
7. Shared head additions + font fix + `lang="en-US"` + skip link + `id="main"` + hamburger/nav ARIA + footer address.
8. Trim title (69 chars) to ≤60.

### about.html
1. Add a **named team/Person section** (founder + lead strategist) with real names, roles, 2–3 sentence credentialed bios, photo (reuse img/team.jpg) and matching `Person` JSON-LD. *(See user flag #2.)*
2. British→US spelling pass (4).
3. Avatars (3× randomuser.me): self-host or replace per user flag #4; meanwhile add `width/height/loading=lazy/decoding=async` and `aria-hidden="true"` on adjacent ★ spans.
4. Shared head additions + font fix + `lang="en-US"` + skip link + `id="main"` + hamburger/nav ARIA + footer address.
5. Trim description (181 chars) to ~155.

### contact.html
1. Set ContactPage publisher to `{"@id":".../#organization"}`; rely on the org `contactPoint` (added on index.html).
2. Either remove `novalidate` or add scripted, ARIA-announced validation (aria-describedby errors, aria-invalid, aria-live region); add `aria-required`/sr-only "(required)" to the `*` labels.
3. Shared head additions + font fix + `lang="en-US"` + skip link + `id="main"` + hamburger/nav ARIA + footer address.

### faq.html
1. British→US spelling pass (9 — the heaviest non-seo page) incl. all FAQPage JSON-LD `text`.
2. Add `aria-expanded="false"`, unique `aria-controls`, and panel `id`/`role="region"` to every FAQ button/answer pair; `aria-hidden="true"` on every `.faq-icon`. (JS sync handled in main.js.)
3. Add visible breadcrumb matching schema.
4. Convert footer column `<h4>` labels to `<p class="footer-heading">` to fix the H2→H4 outline skip.
5. Shared head additions + font fix + `lang="en-US"` + skip link + `id="main"` + hamburger/nav ARIA + footer address.
6. Trim title (80 chars) → e.g. `FAQ: Google Ads, SEO & Lead Generation | Position Xero`; trim description (182) to ~155.

### blog/index.html
1. Add `blogPost`/`ItemList` enumeration of all 9 posts to the `Blog` JSON-LD; set publisher → `{"@id":".../#organization"}`.
2. Fold keyword into H1: `<h1>Performance Marketing Blog<br><span class="gradient-text">Insights & Guides</span></h1>`.
3. Add `width="800" height="420" decoding="async"` to all 9 thumbnail `<img>` (keep `loading="lazy"`).
4. Add `<link rel="preconnect" href="https://images.unsplash.com" crossorigin>` (until images are self-hosted).
5. Add visible breadcrumb (`Home › Blog`).
6. Shared head additions (use root-relative `/img/...` and `/site.webmanifest` icon hrefs so they resolve from /blog/) + font fix + `lang="en-US"` + skip link + `id="main"` + hamburger/nav ARIA + footer address.

### blog/what-is-ai-seo.html  *(template applies to all 9 posts)*
1. **Author:** replace `"author":{"@type":"Organization","name":"Position Xero Team"}` with a real `Person` (name, jobTitle, worksFor, url, sameAs) and update the visible "By Position Xero Team" byline. *(User flag #2.)*
2. **Publisher:** change to `{"@id":"https://www.positionxero.com/#organization"}` (now carries logo → satisfies Article requirement).
3. **Dates:** bump `datePublished`/`dateModified` and the visible "Last updated: January 2026" to a real recent date **only after genuinely refreshing** content (do not back-date). *(Applies to what-is-ai-seo, google-ads-vs-meta-ads, lead-generation-for-small-business — the other 6 are already staggered.)*
4. **Stats:** add real, clickable source links or remove the figure (esp. "15% of queries (Google, 2026)" and "10M queries/day (Perplexity, 2026)"). *(User flag #3.)*
5. **De-cannibalize:** keep this as the canonical "what is AI SEO" guide (seo.html defers to it). Add `id` anchors to H2s + a short jump-to TOC.
6. **Self-host hero image:** replace the unsplash `og:image`/`twitter:image`/BlogPosting `image` with `/img/blog/<slug>.jpg` (ImageObject 1200×630); add `fetchpriority="high" decoding="async"` to the featured `<img>` and a `<link rel="preload" as="image">`. Until self-hosted, add `<link rel="preconnect" href="https://images.unsplash.com" crossorigin>`.
7. **Cross-link:** add a "Related Articles" block (3 links) + 1–2 in-body cross-links per the cluster map.
8. Add `articleSection` + `keywords` to BlogPosting.
9. British→US spelling pass (9 here).
10. Shared head additions (root-relative icon/manifest hrefs) + font fix + `lang="en-US"` + skip link + `id="main"` + hamburger/nav ARIA + FAQ ARIA (where present) + footer address + visible breadcrumb (`Home › Blog › <Title>`).

### blog/google-ads-vs-meta-ads.html
Same template as above. Specifics: bump stale 2026-01-01 dates after refresh; British→US (incl. "before you spend a rand" → "before you spend a dollar" on line 218); Related Articles → cost-per-lead-benchmarks; this is the canonical "Google Ads vs Meta Ads" deep-dive (ads.html defers to it). Trim title to ≤60. Trim description (186).

### blog/lead-generation-for-small-business.html
Same template. Bump stale 2026-01-01 dates after refresh; add stat sources (the "7x more clicks (Google, 2024)" claim); Related Articles → law-firm + real-estate; British→US (3); link up to lead-gen.html; trim title (81)/description (195).

### blog/how-much-do-google-ads-cost.html
Same template. Already links to google-ads-vs-meta-ads; add `cost-per-lead-benchmarks.html`; British→US (2); link up to ads.html; trim title (75).

### blog/cost-per-lead-benchmarks.html
Same template. Related Articles → how-much-do-google-ads-cost + lead-generation-for-small-business; link up to lead-gen.html; trim title (80)/description (195).

### blog/law-firm-lead-generation.html
Same template. Related Articles → real-estate-lead-generation + cost-per-lead-benchmarks; British→US (2); link up to lead-gen.html; trim title (77).

### blog/local-seo-for-service-businesses.html
Same template. Related Articles → what-is-ai-seo; British→US (10 — heaviest blog page); link up to seo.html; trim title (86)/desc.

### blog/what-is-a-landing-page.html
Same template. Add stat source (2.35%/5.31% conversion figures); Related Articles → google-ads-vs-meta-ads; British→US (4); link up to web-design.html; trim title (80)/description (199).

### blog/real-estate-lead-generation.html
Same template. Related Articles → law-firm + lead-generation-for-small-business; British→US (2); link up to lead-gen.html; trim title (84). (Dates already current: 2026-06-14.)

### css/style.css
1. **Delete line 6** (`@import url('https://fonts.googleapis.com/css2?...')`) — fonts must never load via CSS @import.
2. Add a global focus indicator near the top: `:focus-visible{outline:3px solid #4F46E5;outline-offset:3px;border-radius:4px} :focus:not(:focus-visible){outline:none}`. Replace the bare `outline:none` on form fields (line ~895) with a real indicator.
3. Add a `prefers-reduced-motion` block: disable orb/dot animations, hide `#heroGrid`, set `scroll-behavior:auto`, and short-circuit transitions.
4. Add `.skip-link` styles (off-screen, visible on focus) and `.breadcrumb` styles.
5. Add `.footer-heading{font-size:…;font-weight:600}` to restyle the de-headinged footer labels.
6. `.hamburger`: add `min-width:44px;min-height:44px;align-items:center;justify-content:center`.
7. Optional: reduce orb `blur(100px)` → `~60px` to cut compositing cost.

### js/main.js
1. **Canvas:** at the top of the IIFE add `if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;` then gate the rAF loop behind an `IntersectionObserver` on the hero (pause when off-screen) and an idle short-circuit when the mouse is parked.
2. **FAQ handler:** after toggling `.open`, sync `aria-expanded` on every `.faq-question` to its item's open state.
3. **Hamburger handler:** after toggling, set `aria-expanded` and swap `aria-label` ("Open menu"/"Close menu"); add an Escape-to-close that returns focus to the hamburger; ensure hidden mobile menu uses `display:none`/`visibility:hidden` so its links aren't tab-focusable.
4. Add `{passive:true}` to the nav scroll listener (line ~122).
5. Optional polish: animate the testimonial progress bar with `transform:scaleX()` instead of `width %`; coalesce scroll writes via rAF.

### sitemap.xml
1. Add a `<lastmod>` (ISO-8601) to all 19 `<url>` entries using each page's real last-modified/publish date (mirror blog `dateModified`). Do not fabricate or use always-today.
2. Keep llms.txt and pricing.md out of the sitemap (correct as-is).

### robots.txt
1. Optional: add a header comment documenting the intentional AI-bot allow stance.
2. **Decide CCBot explicitly** (`User-agent: CCBot` + `Allow: /` recommended given LLM-SEO goals, or `Disallow: /`). *(User flag #6.)*

### llms.txt
1. Add the **6 missing blog articles** under "## Blog Articles".
2. Add a freshness line under the H1: `> Last updated: 2026-06-11`.

### pricing.md
1. Add after the H1: `Last updated: 2026-06-11. All prices in USD.`
2. Change "once-off" → "one-time" on the website/landing-page lines and "optimised" → "optimized" for consistency.

### Shared head additions (every page)
Add near the top of `<head>` (after viewport). Use **root-relative** icon/manifest paths so /blog/ pages resolve correctly:
```
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
<meta name="theme-color" content="#0D0D0D" />
<meta property="og:site_name" content="Position Xero" />
<meta property="og:locale" content="en_US" />
<meta property="og:image:alt" content="<page-specific alt>" />
<meta name="twitter:image:alt" content="<page-specific alt>" />
<meta name="twitter:url" content="<page canonical URL>" />
<link rel="icon" type="image/png" sizes="192x192" href="/img/icon-192.png" />
<link rel="icon" type="image/png" sizes="512x512" href="/img/icon-512.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/img/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
```
(Add `twitter:site` only after confirming a real X handle — the site lists only LinkedIn/Instagram. See user flag #5.)

### Shared font fix (every page)
Replace the single font `<link>` with the non-blocking pattern (preconnect already present on most pages):
```
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap"></noscript>
```
Best-in-class: self-host WOFF2 + `@font-face{font-display:swap}` and drop the third-party origin entirely.

---

## New Files to Create

| Path | Purpose |
|---|---|
| `/site.webmanifest` | PWA/installability — wires up the orphaned icon assets. |
| `/404.html` | Branded, noindexed error page with nav + CTA (no more Hostinger dead-end). |
| `/.htaccess` | `ErrorDocument 404 /404.html` so unmatched paths return the branded 404 with a real 404 status. |
| `/img/logo.png` | Square (≥512×512) brand logo for `publisher.logo`/`#organization.logo`. **Design asset — must be produced.** |
| `/img/blog/<slug>.jpg` ×9 | Self-hosted 1200×630 hero images replacing Unsplash hot-links (+ matching 800×420 thumbs). **Content/design deliverable.** |
| `/img/team.avif`, `/img/team.webp` (+768w variants) | Modern responsive versions of team.jpg to cut ~130KB. |
| `/img/avatars/*.webp` (optional) | Self-hosted real client avatars if testimonials are kept (else replace with CSS monograms). |

**Delete:** `/img/og-image.png` (175KB, referenced by nothing — only the .jpg is used).

---

## User-Decision Flags (do NOT proceed without a human)

1. **Self-serving review schema + testimonials.** index.html embeds `aggregateRating` (4.9/50) and reviews by "James M." / "Sarah B." paired with randomuser.me stock-photo avatars (also on about.html). This is a Google review-policy violation and likely fabricated. **Decision needed:** confirm whether any real, attributable client reviews exist. If not, remove the schema entirely and replace placeholder avatars with real client photos (with permission) or CSS monograms. Collect future reviews on Google Business Profile/Clutch and let that platform show the stars — never mirror them into the Organization entity.
2. **Real named author for E-E-A-T.** All blog content is attributed to a faceless "Position Xero Team." A real person (founder/lead strategist) with name, role, credentials, and a LinkedIn URL must be supplied for the `Person` author schema and visible bylines/about-page bios. **Do not invent a person.**
3. **Statistic sources.** Several blog stats ("15% of queries (Google, 2026)", "10M Perplexity queries/day (Perplexity, 2026)", "7x more clicks", landing-page conversion rates) have no source URL and may be invented. Each needs a verified real source link or must be removed. **Do not guess URLs.**
4. **Branded OG image + self-hosted blog images.** `img/og-image.jpg` now exists at 1200×630 — confirm it is genuinely branded (logo + value prop), not a placeholder. The 9 blog hero images still hot-link Unsplash and should be replaced with owned, license-clear files.
5. **Verify social profiles before adding `twitter:site`/finalizing `sameAs`.** The LinkedIn/Instagram `sameAs` URLs appear only in JSON-LD with no on-page corroboration and may be guesses. Confirm each resolves to the real, owned profile; add a real X handle only if one exists. Add the confirmed profiles as visible footer links.
6. **Business facts to confirm before publishing local schema:** exact geo-coordinates for 1558 Trail Ridge Rd (Alpine WY centroid is approximate), real business hours, and the real starting prices for any `Offer` on seo.html/web-design.html.
7. **CCBot stance** (allow vs. block training-only Common Crawl) — recommended allow given LLM-SEO goals, but make it an explicit, documented choice.

---

*Prepared by the lead SEO strategist. All findings were verified against the live repository on 2026-06-11; where the raw auditor inputs were based on a stale snapshot (e.g. the previously-broken og-image.jpg, which is now fixed, and the icon assets, which now exist but are unreferenced), the findings above reflect the current verified state.*
