# Client SEO Audit Playbook

**Position Xero** — SEO Client Toolkit · Internal · Last updated July 2026

## Purpose

This is our standard first-pass audit. Run it the same way for every client so results are comparable month to month and auditor to auditor. A junior should be able to complete it in roughly **2 hours** and hand over findings a non-technical client can understand.

**Ground rules before you start:**

- Everything we check and recommend is white-hat and within Google's guidelines. We never recommend keyword stuffing, doorway pages, link schemes, or mass-publishing AI-generated pages — the latter falls squarely under Google's **scaled content abuse** spam policy and works against the **helpful content** systems. If a client asks for it, escalate to the account lead; don't put it in the audit.
- Use free/established tools only: **Google Search Console (GSC)**, **PageSpeed Insights (PSI)**, **Google's Rich Results Test**, the **Schema.org validator**, **Screaming Frog SEO Spider** (free tier, 500 URLs — enough for most local clients), your browser's DevTools, and plain Google searches.
- Write findings in plain English. "Your services page has no title tag, so Google writes its own — usually badly" beats "Missing title element detected."

**Suggested time budget (2 hours):**

| Block | Time |
|---|---|
| Setup: confirm GSC access, pick 5–10 key pages | 10 min |
| Section 1 — On-page | 40 min |
| Section 2 — Technical | 45 min |
| Section 3 — Local/GBP (local clients only) | 15 min |
| Severity triage + write-up | 10 min |

**Setup:** Confirm we have GSC access (if not, that's finding #1 — nothing else matters until we do). Then pick 5–10 key pages with the client or account lead: homepage, top service/product pages, top locations page(s), and any page the client says drives revenue. Section 1 runs per key page; Sections 2–3 run once sitewide.

---

## Section 1 — On-Page (run per key page)

Work through this list for each of the 5–10 key pages. Keep a simple spreadsheet: one row per page, one column per check, pass/fail/note.

- [ ] **Title tag quality.**
  *How to check:* View the page source (Ctrl+U) and find `<title>`, or crawl the key pages in Screaming Frog and read the Page Titles tab.
  *Pass:* Unique on the site, roughly 50–60 characters, leads with what the page is about (the target keyword or a close variant), reads like something a human would click. Fail if it's missing, duplicated across pages, a bare brand name ("Home | Acme"), or a keyword list.

- [ ] **Meta description quality.**
  *How to check:* Same source view or Screaming Frog Meta Description tab.
  *Pass:* Present, unique, ~120–160 characters, makes a case for clicking (what you get, who it's for, a reason to choose them). **Client framing note:** meta descriptions are **not a ranking factor** — they influence click-through rate. Say exactly that in the report so the client understands why it still matters, and don't oversell it.

- [ ] **Single H1.**
  *How to check:* DevTools console: `document.querySelectorAll('h1').length` — or Screaming Frog's H1 tab.
  *Pass:* Exactly one H1, and it describes the page (not "Welcome" or the logo alt text wrapped in an H1). Two H1s is a fix, zero is a fix.

- [ ] **Heading hierarchy.**
  *How to check:* In DevTools, or skim the H2/H3 columns in Screaming Frog. Headings should outline the page like a document: H1 topic, H2 major sections, H3 subsections.
  *Pass:* No skipped levels used for structure (H2 → H4), no headings used purely for font styling, sections match what a reader would scan for.

- [ ] **Content depth vs. search intent.**
  *How to check:* Google the page's target keyword in an incognito window. Look at what actually ranks on page one: are they service pages, comparison guides, listicles, local packs, product pages? Then compare the client's page honestly.
  *Pass:* The page is the same *type* of content as what ranks, and covers the questions the ranking pages cover (pricing signals, process, FAQs, proof/trust elements). Fail if the page is a thin 150-word placeholder competing against 1,500-word guides — or the wrong format entirely (a blog post targeting a "near me" service query). Note: depth means answering the searcher's question fully, not padding word count.

- [ ] **Target keyword placement — without stuffing.**
  *How to check:* Ctrl+F for the target keyword and close variants. It should appear naturally in: the **title tag**, the **H1**, the **first 100 words**, and ideally the **URL slug**.
  *Pass:* Present in those four spots (or close variants that a human would read as the same topic) and the copy still sounds like a person wrote it. **Fail in the other direction too:** if the exact phrase is jammed in every paragraph, flag it as over-optimisation — that's a risk, not a strength, and we recommend rewriting for readers.

- [ ] **Image alt text.**
  *How to check:* Screaming Frog → Images tab → filter "Missing Alt Text", or right-click → Inspect on the page's main images.
  *Pass:* Meaningful images have alt text that describes the image ("Plumber replacing a hot water cylinder in an Auckland home"), not keyword strings. Decorative images can have empty alt (`alt=""`) — that's fine and correct for accessibility.

- [ ] **Internal linking.**
  *How to check:* On each key page, count contextual links to other relevant pages on the site (nav and footer don't count). In Screaming Frog, check Inlinks for each key page to see how many pages link *to* it.
  *Pass:* Each key page links out to at least 2–3 relevant sister pages with descriptive anchor text ("emergency plumbing services", not "click here"), and each key page has at least a handful of internal links pointing at it. A revenue page reachable only from the nav dropdown is an easy win to flag.

---

## Section 2 — Technical (run once, sitewide)

- [ ] **Indexing status.**
  *How to check:* GSC → Pages (Indexing report): compare indexed vs. not-indexed counts and read the exclusion reasons. Cross-check with a `site:clientdomain.com` search on Google — the count is rough, but it catches "the site is barely indexed" and "there are 900 junk pages indexed" instantly. Spot-check each key page with GSC's URL Inspection tool.
  *Pass:* All key pages indexed; not-indexed reasons are expected ones (redirects, intentional noindex, canonicals) rather than "Crawled – currently not indexed" piling up on pages we care about.

- [ ] **robots.txt and noindex traps.**
  *How to check:* Load `clientdomain.com/robots.txt` and read it. Then check key pages for a `noindex` robots meta tag (view source, search "noindex") or an `X-Robots-Tag` header. Screaming Frog flags both automatically.
  *Pass:* robots.txt doesn't block CSS/JS or whole sections we want ranked; no key page carries noindex. Classic trap: a staging-era `Disallow: /` or sitewide noindex left in place after launch. This is always **Critical** severity.

- [ ] **XML sitemap submitted.**
  *How to check:* GSC → Sitemaps. Also load the sitemap URL directly (usually `/sitemap.xml` or `/sitemap_index.xml`).
  *Pass:* A sitemap is submitted in GSC, shows "Success", and contains the live, canonical URLs — not 404s, redirects, or noindexed pages.

- [ ] **HTTPS and redirect hygiene.**
  *How to check:* Test all four versions of the homepage: `http://www`, `http://` bare, `https://www`, `https://` bare. Use `curl -I` on each (or a free redirect checker) and count the hops.
  *Pass:* All four resolve to **one** canonical version, each in a **single 301 hop** (http→https and www/non-www should not chain through 2–3 redirects). Whole site is HTTPS with no mixed-content warnings in the browser.

- [ ] **Core Web Vitals.**
  *How to check:* Run the homepage and 2–3 key pages through **PageSpeed Insights**. Read the *field data* (real-user CrUX numbers) first if it's available; lab scores second. Also check GSC → Core Web Vitals report for sitewide URL groups.
  *Pass:* Field data green (LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1). If there's no field data (low-traffic site), use lab data and flag the caveat. For clients: report the three metrics as "loading, responsiveness, visual stability" — not the acronyms.

- [ ] **Mobile viewport.**
  *How to check:* View source for `<meta name="viewport" content="width=device-width...">`, then actually load the site on your phone or DevTools device mode. Check tap targets, text size, and horizontal scrolling.
  *Pass:* Viewport meta present, no pinch-zooming needed, no content cut off, no interstitials blocking the page on mobile.

- [ ] **Canonicals.**
  *How to check:* View source on key pages for `<link rel="canonical">`, or Screaming Frog's Canonicals tab.
  *Pass:* Every key page has a self-referencing canonical (or a deliberate one). Fail if canonicals point at the wrong page, at http:// versions, or are missing while URL parameters/duplicates exist.

- [ ] **Structured data validity.**
  *How to check:* Run key pages through Google's **Rich Results Test** and the **Schema.org validator**. Check GSC → Enhancements for sitewide errors.
  *Pass:* No errors on existing markup; markup matches visible page content (marking up reviews that aren't on the page is a guideline violation — flag it for removal). Missing-but-relevant schema (LocalBusiness, FAQ, Product) goes in as an Opportunity, not a fail.

- [ ] **404s and broken links.**
  *How to check:* Screaming Frog crawl → Response Codes → Client Error (4xx). Cross-check GSC → Pages for "Not found (404)" URLs that used to have traffic or backlinks.
  *Pass:* No internal links pointing at 404s; any dead URLs with backlinks or history are 301-redirected to the closest live equivalent. A custom 404 page exists.

- [ ] **Duplicate titles.**
  *How to check:* Screaming Frog → Page Titles → Duplicate filter.
  *Pass:* No two indexable pages share a title. Duplicates usually reveal a template problem (paginated archives, near-identical location pages) — name the pattern, not just the count.

---

## Section 3 — Local / Google Business Profile (local clients only)

Skip this section for e-commerce or national/online-only clients.

- [ ] **Profile completeness.**
  *How to check:* Open the GBP dashboard (get manager access during onboarding) and walk every field: business name, address, phone, website link, hours (including holiday hours), services/products, description, attributes, booking link.
  *Pass:* Every applicable field filled in; business name is the **real-world name** with no keyword padding ("Acme Plumbing" not "Acme Plumbing | Best Emergency Plumber Auckland") — padding violates GBP guidelines and risks suspension.

- [ ] **Primary + secondary categories.**
  *How to check:* GBP dashboard → Edit profile → Business category. Compare against the categories the top 3 local-pack competitors use (visible via a plain Google search for the main service + suburb).
  *Pass:* Primary category is the single most specific match for the core money service; secondary categories cover real service lines only. Missing obvious secondaries is an easy win; irrelevant ones are a fix.

- [ ] **NAP consistency.**
  *How to check:* Google the business name + phone number and name + address. Compare Name/Address/Phone across the website footer, contact page, GBP, Facebook, and the top directory results that come up (Yellow, Yelp, industry directories).
  *Pass:* One consistent format everywhere — same suite numbering, same phone number, old addresses cleaned up. List every inconsistent citation you find; that list becomes a task, not just a finding.

- [ ] **Reviews: velocity and owner responses.**
  *How to check:* On the GBP listing, sort reviews by newest. Note total count, average rating, how many arrived in the last 90 days, and whether the owner responds — especially to negative reviews.
  *Pass:* Steady recent reviews (a profile whose last review is 14 months old looks dormant), and owner responses to most reviews within a reasonable window. We only ever recommend **asking real customers** for reviews — never incentivised or purchased reviews, and never review gating.

- [ ] **Photos.**
  *How to check:* GBP listing → Photos tab. Check count, recency, and whether they're real (team, premises, jobs) or stock.
  *Pass:* 10+ genuine photos, something added in the last few months, cover photo and logo set. Stock-only photo sections get flagged.

- [ ] **Google Posts.**
  *How to check:* Look at the Updates/Posts section on the listing.
  *Pass:* Any posting activity in the last 30–60 days. Dormant is an Opportunity (posts keep the profile visibly active), not Critical.

- [ ] **Local landing pages.**
  *How to check:* Does the website have a dedicated, substantive page for each service area / location that GBP links to? Review them against the Section 1 checks.
  *Pass:* One genuinely useful page per real location — local proof (address or genuine service-area detail, local jobs, local reviews), unique content. **Fail:** dozens of templated suburb pages where only the place name changes. That's doorway-page territory and increasingly reads as scaled content abuse — recommend consolidating, never expanding.

---

## Severity triage

Tag every finding with one of three levels before it goes in the report. This is what turns a checklist into a plan.

**Critical — actively blocking rankings or revenue. Fix first, this month.**
Examples: key pages noindexed or blocked in robots.txt, no GSC access, sitewide HTTPS broken, key revenue page returning 404, GBP suspended or wrong phone number.
*Test: "If we fix only this, results measurably improve or a disaster is averted."*

**Important — costing meaningful performance, scheduled over the next 1–2 months.**
Examples: thin content on money pages, missing/duplicate titles on key pages, redirect chains, failing Core Web Vitals field data, weak internal linking to revenue pages, stale reviews, inconsistent NAP.
*Test: "Clearly hurting, but the site still functions in search."*

**Opportunity — upside, not a defect. Feeds the ongoing backlog.**
Examples: adding FAQ/LocalBusiness schema, improving meta descriptions for CTR, starting Google Posts, deepening a page that ranks position 6–10, new internal-link opportunities.
*Test: "Nothing is broken; this is growth work."*

Rule of thumb for the write-up: a client should see **no more than 3–5 Criticals**. If everything is Critical, nothing is — re-triage.

---

## From audit to monthly plan

The audit is not the deliverable — the plan is. Map findings straight into the client's monthly cadence (see **03-monthly-cadence-reporting.md** for the reporting template and rhythm):

- [ ] **Month 1:** all Criticals, plus any Important items that are quick wins (under ~an hour each). Report these as "fixed" line items with before/after evidence where possible.
- [ ] **Months 2–3:** remaining Important items, ordered by revenue impact of the affected page — money pages before blog posts, always.
- [ ] **Ongoing backlog:** Opportunities feed the monthly content and optimisation slots in the cadence doc. Pull 2–3 per month; don't dump them all in month one.
- [ ] **Re-check loop:** every fixed item gets re-verified the following month (same how-to-check step from this playbook) and its status noted in the monthly report — clients trust "we fixed it and confirmed it" far more than "we fixed it."
- [ ] **Re-audit:** run this full playbook again at the 6-month mark, or after any site migration/redesign, and diff against the original spreadsheet.

File the completed audit spreadsheet and the written summary in the client's shared folder, named `YYYY-MM-audit-<client>`. The written summary should open with three sentences a business owner can read: what's working, what's broken, what we're doing about it first.
