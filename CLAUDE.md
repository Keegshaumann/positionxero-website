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

## Honest-schema policy (no registered entity, no office, no review profile)

Use `BusinessAudience` with `geographicArea` to signal geo targeting — it needs no physical presence:

```json
{"@context":"https://schema.org","@type":"BusinessAudience","audienceType":"HVAC Companies","geographicArea":{"@type":"Country","name":"United States"}}
```

**Never add** `LocalBusiness`, `PostalAddress`, `GeoCoordinates`, `OpeningHoursSpecification`, `Review`, or `AggregateRating` schema — every competitor using those ties them to a real, verifiable address or review platform. Never write testimonials, client counts, case studies, or results attributed to past clients. Where a competitor would put a case study, substitute buyer-education or transparent methodology.

(Prose *advising readers* to add `LocalBusiness` schema to **their own** sites is fine — the ban is on it appearing in this site's own JSON-LD.)

## Honest-copy policy: who the company is (corrected 2026-09-08)

Position Xero is **founder-led**: Ronnie James Botes and Keegan Shane Haumann founded it and still run it. It is **no longer only the two of them doing every piece of client work**. Other people now run services for clients. Site copy written before 2026-09-08 claimed otherwise and was false; do not reintroduce it.

What the founders actually do now: Ronnie, web development and SEO (**not** paid ads — most ads management is handled by the team). Keegan, full-stack development: the sites, landing pages and tracking that campaigns run on. Some development work is also done by other developers.

Rules for all site copy, JSON-LD, `llms.txt` and `pricing.md`:

- **Only Ronnie James Botes and Keegan Shane Haumann may ever be named, described, pictured or profiled on this site.** No other person gets a name, a title, a bio or a photo. There is no team page and there must not be one.
- **Never publish a headcount or team size, in any form, anywhere.** No number, no "a team of X", no "a small team of specialists", no "a handful of", and no count implied by listing people or roles. This repo is public, so the actual number is deliberately not recorded in this file either — ask the owner, never guess.
- **Never say a founder does something "always", "personally" or "every time" for every client.** A founder *tries* to be in meetings and stays close to the account. That is the honest ceiling on the claim.
- **The differentiator that survives, and should be kept:** the person you deal with is the person doing the work, not a middleman who relays messages. Day to day the client works with whoever runs their service, with a founder close to the account and joining meetings where they can.
- **Claims that died — do not reintroduce, in copy or in schema:** "no account managers" stated as an absolute, "the two of us" / "two real people" / "run by the two of us", "two founders, no handoffs", "no handoffs to a junior team", "first hire" / "our first team members", and any promise that a founder personally runs, builds or reports on every account.
- **Response promise keeps the speed and drops the who:** "We'll be in touch within 24 hours", never "a founder will call/review/reach out within 24 hours". First contact is a founder for some enquiries and sales for others, so no page may state which.
- **Careers copy frames roles as ongoing recruitment** ("we're adding to the team", "we hire for this role on an ongoing basis"), never as a one-off vacancy and never as "our first" anything. All three roles are open and being hired for repeatedly.
- Still true and still safe to state: month-to-month with no lock-in; founder-led; run from South Africa, delivering remotely to clients in the United States and South Africa.
- The bans in the honest-schema policy above are unchanged: no invented clients, results, testimonials, case studies, perks or equity.

## `/works` and `/cognexa` — rebuilt into this repo 2026-09-08

Both pages were live on positionxero.com but had **never been in this repo**: they were deployed from a separate build (they loaded `/assets/ui-*.css` + `/assets/subpage-*.css`, hashed bundler output, and used a different nav — NEWS / WORKS / ABOUT / COGNEXA). That made them an orphaned island: no repo page linked to them, they linked to none of the money pages, and they were missing from `sitemap.xml` and `llms.txt`.

They have now been rebuilt as hand-written HTML on the normal site template (`/css/style.css`, standard nav + footer, `page-header` hero, visible breadcrumb + BreadcrumbList, WebPage schema) and wired into the footer "Company" column, `sitemap.xml` and `llms.txt`.

**When deploying, make sure the old build's `/works` and `/cognexa` output is removed from the host**, or it may keep winning over `works.html` / `cognexa.html`. Check whether `/assets/` still needs to exist at all.

`works.html` uses the previously-unused `.results-grid` / `.result-card` / `.rc-*` components already in `style.css`, plus a page-scoped `<style>` block for the filter chips and a small inline script for filtering. It deliberately carries **no invented metrics** — the outcome labels ("Online quotes", "Booked hires") are the client-supplied phrasing, which keeps it inside the honest-schema policy above. Do not add `Review`, `AggregateRating`, or fabricated result numbers to it.

## `/careers/` — job postings (added 2026-09-08)

The careers section is a real directory: `careers/index.html` serves the hub at `https://www.positionxero.com/careers/` (trailing slash, via DirectoryIndex) and each role file serves a nested clean URL — `/careers/ads-manager`, `/careers/sales-closer`, `/careers/full-stack-developer`, plus the `noindex` `/careers/thank-you`. This works on the existing `.htaccess` rules exactly the way `/blog/` does; **no `.htaccess` change is needed** to add another role page.

- **Breadcrumbs.** Role pages carry 3 items (Home → Careers → role), the hub carries 2 (Home → Careers). The position-2 `item` is `https://www.positionxero.com/careers/` **with** the trailing slash. `/careers/thank-you` is `noindex, follow`, so it gets no breadcrumb nav and no `BreadcrumbList`.
- **`JobPosting` JSON-LD belongs only on the three role pages — never on the hub.** Google's policy is one job per dedicated page; `JobPosting` on a list page triggers the manual action "A list page should not include structured data for individual jobs". The hub carries `WebPage`/`CollectionPage` + `BreadcrumbList` only.
- **The `JobPosting` `description` must stay in sync with the visible page copy.** Markup that says something the rendered page does not is a Google Jobs content violation. Edit the copy and the JSON string together, or neither.
- **No `baseSalary`, no `estimatedSalary`, no address object — deliberate, not a gap.** No pay figures appear on the pages, so none may appear in the markup. `"jobLocationType": "TELECOMMUTE"` plus `applicantLocationRequirements` replaces `jobLocation` entirely, which is why a worldwide-remote posting needs no `PostalAddress` and stays inside the honest-schema policy above. Never attach an `address` to `hiringOrganization` or upgrade it to `LocalBusiness` to "satisfy" the location field.
- **`datePosted` is `2026-09-08`, `validThrough` is `2026-12-08`.** Both hard-coded — never call a date function. **Leaving an expired posting live is a Google Jobs manual-action risk.** On or before 2026-12-08 every role page must have its `validThrough` refreshed or the posting removed.
- **When a role is filled:** delete the role page, remove its `sitemap.xml` entry and its `llms.txt` line, and remove its card from the hub. Do not leave the page up with stale `JobPosting` markup.
- **The application form lives on each role page, not the hub** (a job page with no way to apply is also a policy violation). It posts to FormSubmit at `hello@positionxero.com` — same mechanism as `contact.html` — carries `_captcha` `false` (the captcha interstitial would make `directApply: true` untrue) and `_next` set to `https://www.positionxero.com/careers/thank-you`. That thank-you page stays `noindex` and stays out of `sitemap.xml` and `llms.txt`.
- **No pay, no perks, no headcount anywhere in the careers copy** — the honest-copy rules that govern the rest of the site apply unchanged. The roles are framed as **ongoing recruitment**, never as "our first" hires (see the honest-copy policy above). Pay is "discussed on the first call"; the Sales Closer role is "commission-based with uncapped earnings", with no figures attached.

## Blog posts — what to write, and how to write it (playbook, 2026-09-08)

Read this whole section before drafting a post. It exists so a new session does not have to re-derive the brief.

### What a post has to earn its place on

Two tests, both required:

1. **Commercial relevance.** It supports a money page (`/ads`, `/seo`, `/lead-gen`, `/web-design`, the five SA pillars, or the US industry pages) and the reader could plausibly become a client. Traffic that cannot buy is not the goal.
2. **Real search demand.** Someone is actually typing this. Prefer commercial-intent queries — "how much does X cost", "X vs Y", "is X worth it", "how to do X" — over thought-leadership topics nobody searches.

Then check it is not already covered: `ls blog/`. As of 2026-09-08 there are 28 posts, and "buying leads" is covered from ~14 angles. **Do not add another buying-leads post.** The standing gaps are: South Africa (five pillar pages, almost no blog support), paid-ads execution, web design and CRO, conversion tracking and measurement, and AI search beyond the single `/blog/what-is-ai-seo` post.

Where a topic is close to an existing post, read that post in full first and write to complement it, linking to it rather than restating it.

### Research rules

- Research with real sources before writing. **Every number, benchmark, percentage or price that is not Position Xero's own published pricing must come from a source actually opened during the task, and must be attributed visibly in the prose.** If it cannot be verified, write the sentence without the number. Never estimate a statistic and present it as fact.
- Prefer sources from the current year and say when one is older.
- Position Xero's own pricing is in `pricing.md` and is the one set of figures that needs no external source.
- USD is the source of truth. ZAR figures are clearly-labelled approximations, and never go in a `<title>` (rates move, the title goes stale).

### Structure

Copy `blog/how-much-do-solar-leads-cost.html` as the structural template. Every post needs, without exception:

- `<title>` ≤60 chars and a **different string** from the `<h1>`.
- canonical, og/twitter tags, all using the extensionless `/blog/<slug>` URL.
- `BlogPosting` JSON-LD (headline, description, datePublished, dateModified, author, publisher `@id`, mainEntityOfPage, image).
- `BreadcrumbList` JSON-LD with exactly 3 items, plus the matching visible breadcrumb. See the Breadcrumbs section above; the rules there are enforced and GSC tracks them.
- Byline and meta line: `By <author>`, `Last updated: <Month Year>`, `<N> min read`.
- **Honest read time**: real word count ÷ 225, rounded. Inflated read times are a visible trust tell.
- Length 1800–2600 words. Depth, not padding. If the honest answer to a section is three sentences, write three sentences.
- Genuine internal links to the relevant money pages and 2–3 related posts, worked into the prose. No link stuffing.

**Byline convention (confirmed by the owner 2026-09-08):** split by topic. Ronnie James Botes takes ads, lead generation and pricing; Keegan Shane Haumann takes SEO, web, development and tracking. Author `@id` is `https://www.positionxero.com/#ronnie-botes` or `#keegan-haumann`. Never byline a post to anyone else.

### Images

Listing card images are Unsplash, in this exact form:

```
https://images.unsplash.com/photo-<id>?w=800&h=420&fit=crop&q=80
```

**Never let a model invent a photo ID.** Find real ones by fetching `https://unsplash.com/s/photos/<term>` and extracting the IDs, then verify each candidate before use:

```bash
curl -s -o /dev/null -w "%{http_code}" -I "https://images.unsplash.com/<id>?w=800&h=420&fit=crop&q=80"   # must be 200
grep -rl "<id>" --include='*.html' .                                                                     # must return nothing
```

Both checks matter. On 2026-09-08, of four plausible-looking IDs, one 404'd and one was already used on two existing posts. Pick images that read as the subject (a trade, a city, a screen), not as stock-photo handshakes.

### Voice: do not let it read as AI-written

This is the owner's explicit standing instruction. The blog is the company's credibility, and readers spot machine prose instantly.

**Banned outright:**

- **Em dashes.** Not the character, not `&mdash;`. The entire site was stripped of 392 of them on 2026-09-08. Use commas, colons, full stops or parentheses. (`&ndash;` stays, but only inside number ranges like `6&ndash;8%`.)
- **The antithesis tic**: "It's not an X problem, it's a Y problem." Every variant is banned: "This isn't about X, it's about Y", "X isn't the issue. Y is.", "Not because X, but because Y", "It's not that X. It's that Y." This is the single most recognisable LLM sentence shape. If a contrast is genuinely worth making, make it across two plain sentences without the mirrored construction.
- **Filler openers**: "In today's fast-paced...", "In the world of...", "Let's be clear", "Here's the thing", "The reality is", "It's worth noting", "It's important to note", "At the end of the day".
- **Connective throat-clearing** at the start of sentences: "Moreover", "Furthermore", "Additionally", "That said" used as a reflex.
- **Vocabulary**: delve, leverage (as a verb), robust, seamless, landscape, navigate the complexities, unlock, supercharge, game-changer, elevate, harness, realm, testament, tapestry, "dive into".
- **Rule-of-three padding**: three adjectives or three list items where two carry the meaning. Vary list lengths.
- **Fragment-for-drama**: one-word or three-word paragraphs used as punctuation. "Simple." "That's it." "Full stop."
- **Rhetorical-question openers** for a section.

**Do instead:** vary sentence length, including some genuinely long ones. Use concrete arithmetic and specific examples. Let a paragraph end without a summarising flourish. Say the awkward part plainly — the house voice is "here is the honest version, including the part that costs us money to admit". Turning down a claim you cannot support reads as more credible than making it.

**Check before finishing:**

```bash
grep -c -e '—' -e '&mdash;' blog/<slug>.html                                    # must be 0
grep -niE "isn't (a|an|about) .*(it's|it is)|not (a|an) .* problem,? it's" blog/<slug>.html   # must be empty
```

### Honesty

The honest-copy and honest-schema policies above apply in full to blog posts. No invented client results, case studies, testimonials, client counts or "we've seen X for our clients". No claims that the founders personally do all the work. No headcount. No promises of rankings or lead volumes. Where a competitor would drop a case study, use buyer education or transparent methodology.

## Staged blog posts — scheduled release (added 2026-09-08)

This site has no CMS and no build step, so a post cannot publish itself on a date. Scheduled posts are **staged**: the file exists in `blog/` but carries `<meta name="robots" content="noindex, follow" />` and is deliberately **absent** from `blog/index.html`, `sitemap.xml` and `llms.txt`. Google therefore never sees it before its date, even if the repo is deployed.

Going live is one command, not fifteen manual edits:

```bash
python3 seo-tool/publish-post.py <slug> --thumb "<listing image url>"
python3 seo-tool/publish-post.py <slug> --thumb "<url>" --dry-run   # preview first
```

It removes the noindex tag, stamps `datePublished`/`dateModified` and the visible "Last updated" month to the publish date, adds the listing card and its `BlogPosting` entry to `blog/index.html`, adds the `sitemap.xml` URL, adds the `llms.txt` line, then revalidates every JSON-LD block and the sitemap. It is idempotent, verifies the image URL returns 200, and writes nothing if any step fails. It lives in `seo-tool/`, which `.htaccess` 404s.

### Current staged queue (set 2026-09-08)

| Publish date | Slug | Byline | Card image (verified 200, unused elsewhere) |
|---|---|---|---|
| 2026-09-08 (live) | `local-services-ads-vs-google-ads` | Ronnie | `photo-1642749776312-aa42ce20c9f5` |
| 2026-09-15 | `google-ads-cost-south-africa` | Ronnie | `photo-1636706519609-988babca3dd5` |
| 2026-09-22 | `how-to-rank-in-google-ai-overviews` | Keegan | `photo-1553895501-af9e282e7fc1` |
| 2026-09-29 | `conversion-tracking-for-lead-generation` | Keegan | `photo-1526628953301-3e589a6a8b74` |

Publish each on its date with:

```bash
python3 seo-tool/publish-post.py <slug> --thumb "https://images.unsplash.com/<photo-id>?w=800&h=420&fit=crop&q=80"
```

**Do not publish a staged post early**, and do not "tidy up" a staged post by adding it to the sitemap or listing by hand. If a post is staged, that is deliberate. Check the schedule with the owner before releasing one.

## Other conventions

- All canonical URLs use `https://www.positionxero.com` (https + www).
- Every internal `href` is root-relative — including assets (`/css/style.css`, `/js/main.js`, `/img/...`) and `/blog/`. No relative or `../` paths anywhere.
- The primary nav and mobile menu carry all five money pages: Services, SEO, Ads, Lead Gen, Web Design (+ About, Blog, Careers). The Careers link points at `/careers/` with the trailing slash.
- New blog posts also need: title/meta description, canonical link, Article JSON-LD, and a listing card added to `blog/index.html`.
- `<title>` and `<h1>` should be **different** strings — the title optimizes for SERP click-through, the H1 for on-page keyword relevance. Keep titles ≤60 chars.
- **No em dashes in site-facing copy** (removed site-wide 2026-09-08: they read as AI-written). Neither the literal `—` nor `&mdash;` belongs in any served file, including `llms.txt` and `pricing.md`. Use a comma, colon, full stop, parentheses or a rewrite. En dashes (`–` / `&ndash;`) are correct and stay: they carry number and date ranges (6&ndash;8%, $5&ndash;$16) and "Dallas&ndash;Fort Worth". This file is internal and blocked from serving, so its own em dashes are fine.
- Keep the `X min read` label honest (~225 words/minute); inflated read times are a visible trust tell.
- See `SEO-AUDIT.md` for the full site audit history and open SEO items.
