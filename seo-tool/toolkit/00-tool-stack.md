# The SEO Tool Stack

**Position Xero** — SEO Client Toolkit · Internal · Last updated July 2026

This is the tool stack we actually use, task by task. The rule behind it: use Google's own data sources first, use the free tiers of established tools second, and only pay when a paid tool would change a client decision. No gimmicky lead-magnet tools, no credit-based "AI SEO platforms" — the real thing, on free tiers, used properly.

Every tool below is free (or has a genuinely usable free tier), and every entry tells you three things: what task it owns, where the free tier stops, and how often we touch it.

---

## The stack at a glance

| Tool | Owns this task | Free-tier limit | Cadence |
|---|---|---|---|
| Google Search Console | Query/click data, indexing status, sitemaps, Core Web Vitals field data | None that matter (16 months of data, 1,000 rows per report in UI; more via API) | Weekly per client; daily during launches/migrations |
| Google Business Profile | Local visibility, reviews, GBP posts, local insights | Fully free | Weekly (reviews); monthly (profile audit) |
| PageSpeed Insights / Lighthouse | Technical performance + Core Web Vitals diagnostics | Free; PSI API keyless for spot checks, ~25k requests/day with a free API key | Monthly per client; before/after any dev change |
| Position Xero SEO Report Card (`index.html`, this repo) | First-pass on-page audit + lead generation | Ours — no limits | Every new lead/prospect; kickoff of every engagement |
| Screaming Frog (free tier) | Site crawls: broken links, redirects, titles/metas, duplicate content | 500 URLs per crawl; no custom extraction, no scheduling, no API access | At kickoff, then quarterly; after any site restructure |
| Ahrefs Webmaster Tools + free checkers | Backlink profile, site audit on verified sites, quick keyword/backlink spot-checks | AWT: verified sites only, top ~1k backlinks per report; free checkers: top 10 results/top 100 backlinks | Monthly (audit + backlinks); ad hoc (checkers) |
| Semrush (free tier) | Cross-check keyword/competitor data, second opinion on domain metrics | 10 requests/day on analytics; 1 project; 100 pages/mo site audit; 10 keywords tracked | Ad hoc cross-checks; one free project for our own site |
| AnswerThePublic / AlsoAsked (free tiers) | Question research for content briefs | ATP: ~1–3 searches/day; AlsoAsked: 3 free searches/day | Per content brief — batch searches, export immediately |
| Google Trends | Seasonality, topic trajectory, regional demand | Fully free | Per content plan; quarterly strategy reviews |
| Google Alerts (+ free mention monitoring) | Brand mentions, unlinked-mention link reclamation | Fully free | Alerts run continuously; triage weekly |
| Bing Webmaster Tools | Free keyword research, Bing indexing, IndexNow, second crawler's opinion | Fully free (keyword tool has no meaningful cap) | Monthly; keyword research per content plan |
| Rich Results Test + Schema Markup Validator | Structured data validation | Fully free | Every schema deployment; quarterly spot-check |

---

## How we use each one

### Google Search Console
The single most important tool in the stack — first-party data straight from Google, and it's free forever.

- **Queries:** Performance report is our source of truth for impressions, clicks, CTR, and average position. We filter by page and by query, and we look for "striking distance" queries (positions 5–20) as the fastest wins.
- **Indexing:** Page Indexing report tells us what Google has actually indexed vs. what it's ignoring, and why. URL Inspection for individual pages.
- **Sitemaps:** Submit and monitor XML sitemaps here; discrepancies between submitted and indexed counts are an early warning.
- **Get access early:** GSC access (or verification) is a kickoff requirement for every client. No GSC, no engagement.

**Cadence:** Weekly review per client. Daily during a migration, redesign, or after a core update.

### Google Business Profile
For any client with a physical location or service area, GBP is half the SEO job.

- Complete every field: categories (primary category matters most), services, attributes, hours, photos.
- Reviews: monitor weekly, respond to every review — good and bad — in the client's voice (with their sign-off on templates).
- Posts and Q&A: monthly minimum; seed the Q&A section with real customer questions.
- Insights: pull calls, direction requests, and search terms into the monthly report.

**Cadence:** Weekly review check; monthly full-profile audit against competitors in the local pack.

### PageSpeed Insights / Lighthouse
Our technical performance layer, two views of the same problem:

- **PSI field data (CrUX):** what real users experience — this is what actually feeds Core Web Vitals assessment. Lab data is for diagnosis, field data is for judgement.
- **Lighthouse (in Chrome DevTools):** repeatable lab runs for before/after comparisons when the client's developer ships a fix.
- We report LCP, INP, and CLS — not the headline performance score, which clients over-index on.
- For bulk checks across many pages, the free PSI API (keyless for light use, free API key for heavier use) plus a spreadsheet does the job.

**Cadence:** Monthly per client; always before and after any performance-related dev work.

### Position Xero SEO Report Card (this repo, `index.html`)
Our own tool, and the front door of the funnel.

- **First-pass audits:** run every prospect's site through it before the first call. It surfaces the obvious on-page issues (titles, metas, headings, basic technical hygiene) in a format a non-SEO business owner can read.
- **Lead gen:** the Report Card is the free deliverable we offer publicly. It's genuinely useful on its own, which is exactly why it converts — it demonstrates competence instead of claiming it.
- **Positioning rule:** the Report Card is a first pass, never the audit. It opens the conversation; Screaming Frog, GSC, and AWT do the deep work. Never present Report Card output as a full technical audit.

**Cadence:** Every inbound lead, every outbound prospect, and at the start of every engagement (it gives us a client-friendly baseline snapshot to show progress against).

### Screaming Frog SEO Spider (free tier)
The crawler. The free tier caps at 500 URLs per crawl, which covers most local-business and small-business sites completely.

- Kickoff crawl for: broken links (4xx), redirect chains, missing/duplicate titles and meta descriptions, thin pages, missing alt text, canonical issues.
- For sites over 500 URLs: crawl by directory/subfolder in separate passes, or crawl the sitemap URL list first — you can cover the pages that matter without the licence.
- Free-tier gaps to know about: no crawl scheduling, no custom extraction, no GSC/GA integration, no saved crawls. Export everything to CSV the moment a crawl finishes.
- If a client's site genuinely needs 10k+ URL crawls with custom extraction regularly, that's the one licence worth buying — see the note at the end.

**Cadence:** Full crawl at kickoff, then quarterly; immediately after any migration, redesign, or URL restructure.

### Ahrefs Webmaster Tools + free checkers
Two separate things, both free:

- **Ahrefs Webmaster Tools (AWT):** for sites we've verified (every client site — verification is part of onboarding), we get Site Audit and Site Explorer on their own domain: backlink profile, referring domains, broken backlinks, top pages, and a scheduled technical audit. This is the closest thing to paid Ahrefs you can get for free, and it's per-client gold.
- **Free checkers** (backlink checker, keyword generator, keyword difficulty checker, SERP checker): capped previews — top ~100 backlinks, top ~10 keyword ideas per query. Fine for spot-checking a competitor or sanity-checking a keyword call; not for building a full competitive analysis.

**Cadence:** AWT Site Audit scheduled monthly per verified client; backlink review monthly; free checkers ad hoc.

### Semrush (free tier)
We use the free account as a second opinion, not a primary source.

- 10 analytics requests/day: enough to cross-check a domain overview or a keyword's metrics when Ahrefs and Bing disagree.
- 1 free project (site audit ~100 pages/mo, 10 tracked keywords): we point this at our own site, since clients already get AWT audits.
- Keyword Magic Tool gives 10 requests/day on the free tier — usable for quick expansion, batch your queries.

**Cadence:** Ad hoc. If we're hitting the daily cap regularly across the team, that's a signal to re-evaluate — not a reason to work around it with multiple accounts (against their ToS).

### AnswerThePublic / AlsoAsked (free tiers)
Question research for content briefs — what real people actually ask around a topic.

- **AnswerThePublic:** question wheels (who/what/why/how), prepositions, comparisons. Free tier is roughly 1–3 searches/day depending on current limits.
- **AlsoAsked:** People-Also-Ask trees — better for understanding how Google clusters follow-up questions. 3 free searches/day.
- Because both are heavily rate-limited: decide the seed terms before you open the tool, run them in one batch, and screenshot/export everything into the brief immediately.
- Free supplement: Google's own "People also ask" and autocomplete cost nothing and have no limits — mine those first, use ATP/AlsoAsked to fill gaps.

**Cadence:** Once per content brief or topic cluster. Not a daily tool.

### Google Trends
- Seasonality: know when demand peaks so content ships 2–3 months ahead of it.
- Topic trajectory: rising vs. declining interest informs whether a content investment makes sense.
- Regional breakdown: for local clients, compare demand across cities/regions before recommending location pages.
- Compare up to five terms to pick between phrasings ("hire a plumber" vs. "emergency plumber") — Trends shows relative interest, not volume; pair it with Bing WMT or GSC data for absolute numbers.

**Cadence:** Every content plan; quarterly strategy reviews.

### Google Alerts + brand-mention monitoring
The unlinked-mention play: find places that already talk about the client, and politely ask for the link. White-hat, high-conversion outreach because the mention already exists.

- **Google Alerts:** set alerts per client for brand name, key product/service names, founder/owner names, and common misspellings. Use quoted phrases and `-site:clientdomain.com` to cut noise.
- **Free Content-Explorer-style alternatives:** since Ahrefs Content Explorer alerts are paid, we approximate with: Google Alerts (above), Talkwalker Alerts (free, similar to Google Alerts, sometimes catches what Google misses), and periodic manual searches — `"Brand Name" -site:clientdomain.com` filtered to the past month.
- Triage: for each mention, check whether it links. No link + relevant site = outreach candidate. Log in the client's link-reclamation sheet.

**Cadence:** Alerts run continuously; triage the inbox weekly; outreach batch monthly.

### Bing Webmaster Tools
Chronically underused and completely free.

- **Keyword research:** Bing WMT's keyword research tool gives real query volume data (Bing's own) with no meaningful cap — our free workhorse for volume estimates, cross-checked against GSC impression data for the Google picture.
- **Indexing:** submit sitemaps, use URL submission and IndexNow for fast indexing on Bing (and IndexNow partners).
- **Second opinion:** Bing's Site Scan and SEO reports occasionally flag issues Google tooling doesn't surface. Import is one click if the site's already verified in GSC.

**Cadence:** Verify at onboarding; keyword research per content plan; check reports monthly.

### Rich Results Test + Schema Markup Validator
Two validators, two jobs — always run both:

- **Rich Results Test (Google):** answers "is this eligible for a rich result in Google?" Only checks schema types Google actually uses for rich results.
- **Schema Markup Validator (schema.org):** answers "is this valid schema at all?" Catches structural errors in types Google's tool ignores.
- Validate before deployment (paste the code) and after deployment (fetch the live URL) — templating engines mangle JSON-LD more often than you'd think.
- Then confirm in GSC's enhancement reports that Google sees it in the wild.

**Cadence:** Every schema change, both before and after it ships; quarterly spot-check of key templates per client.

---

## What we deliberately don't pay for, and why

- **All-in-one paid suites (Ahrefs/Semrush paid plans) — for now.** GSC + AWT + Bing WMT covers 90% of what our client base needs, with first-party data the paid suites can only estimate. The moment free-tier caps are genuinely blocking client work weekly — not occasionally annoying us — the first paid line item is one suite subscription, chosen then, not pre-emptively.
- **Rank trackers.** GSC average position plus Bing WMT covers reporting honestly. Daily rank-tracking dashboards mostly generate anxiety, not decisions.
- **Credit-based "AI SEO" and content-generation platforms.** Two reasons. First, the pricing model is designed to leak money. Second, and more importantly: mass-publishing AI-generated pages is exactly what Google's scaled content abuse policy targets, and it's a fast way to burn a client's site in a helpful content assessment. We don't do it, we don't buy tools built for it, and we tell clients why when they ask.
- **Paid backlink databases beyond AWT.** For our clients' own profiles, AWT covers the large majority of what we need (reports are capped — see the table). Competitor backlink gaps are the one thing we lose — the free checkers give enough of a preview to know if deeper analysis would even be worth it.
- **Paid audit/report generators.** The Report Card is ours, it's on-brand, and every improvement we make to it compounds — for the funnel and for kickoff audits. Renting a white-label audit tool would pay someone else to own our front door.

The discipline: when someone on the team wants a paid tool, the question is never "is it good?" — most are. It's "which client decision this month would have gone differently with it?" If there's no concrete answer, the free stack stands.
