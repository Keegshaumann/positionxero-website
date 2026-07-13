# Monthly SEO Cadence & Client Reporting

**Position Xero** — SEO Client Toolkit · Internal · Last updated July 2026

This doc defines the monthly rhythm for every retainer client and the exact report format we send at the end of each month. The goal is that any team member can pick up any client account on the 1st of the month and know precisely what happens in each of the four weeks — and that every report we send proves the same promise: **qualified leads, not vanity metrics.**

---

## Part 1: The Monthly Rhythm

Every retainer month follows the same four-week structure. Deviate for genuine emergencies (site down, manual action, migration), not because a week "felt slow."

### Week 1 — Review & Carryover

Read the data before touching the site. Week 1 is diagnosis, not action.

- [ ] Pull last month's Google Search Console data: clicks, impressions, average position, CTR — compare against the prior month and the same month last year
- [ ] Check position movement on the client's target queries (GSC Performance report, filtered to the agreed query list)
- [ ] Identify pages gaining and pages losing clicks — flag anything down more than ~20% month-on-month for investigation
- [ ] Check GA4 for organic conversions/leads (form fills, calls, purchases — whatever the client's agreed conversion events are)
- [ ] For local clients: pull Google Business Profile insights (calls, direction requests, website clicks)
- [ ] Check Core Web Vitals status in GSC — note any URLs that dropped from "Good"
- [ ] Scan for new manual actions, security issues, or indexing anomalies in GSC
- [ ] Finish any carryover items from last month's plan — nothing rolls over two months in a row without being flagged to the account lead
- [ ] Update the audit backlog: anything the data review surfaced goes in, tagged with the Critical / Important / Opportunity severity levels from **01-audit-playbook.md** and prioritised accordingly

**Output of Week 1:** a short internal note — what moved, why we think it moved, and what this month's priorities should be.

### Week 2 — Content Production

Run the content workflow exactly as defined in **02-content-link-workflow.md**. Week 2 is heads-down production.

- [ ] Confirm this month's content targets from the keyword/topic plan
- [ ] Brief, draft, and edit per the 02 workflow (human-led, expert-reviewed — we do not mass-publish AI-generated pages; see the scaled-content note in Part 2)
- [ ] Get client sign-off on anything requiring subject-matter review (pricing, claims, legal/medical/financial statements)
- [ ] Publish or schedule approved pieces with correct internal links, meta titles/descriptions, and structured data where relevant
- [ ] Request indexing in GSC for newly published URLs

### Week 3 — Technical, On-Page & Links

Work the audit backlog and do outreach. Fixes come from the prioritised backlog, not from whatever looks interesting.

- [ ] Ship the top-priority items from the technical/on-page audit backlog — remaining **Criticals** first, then **Importants**, per the severity triage in **01-audit-playbook.md** (broken links, redirect chains, thin/duplicate pages, missing metadata, CWV fixes, crawl issues)
- [ ] Pull 2–3 **Opportunity** items from the audit backlog into this month's content and optimisation work (Week 2/Week 3) — don't clear them all at once
- [ ] Verify each fix after deployment — re-crawl the affected URLs, confirm in GSC where applicable
- [ ] Refresh or consolidate any underperforming pages flagged in Week 1
- [ ] Link outreach: pitch genuinely relevant sites — digital PR angles, industry directories, supplier/partner pages, local citations for local clients. White-hat only: no paid link schemes, no link exchanges, no PBNs, ever
- [ ] Log outreach sent, responses, and links earned in the client's link tracker

### Week 4 — Reporting & Next-Month Plan

- [ ] Compile the monthly report using the skeleton in Part 3 (data window: full previous calendar month, or the agreed reporting window)
- [ ] Sanity-check every number against the source (GSC, GA4, GBP) — no number goes to a client that we can't reproduce on a screen-share
- [ ] Draft next month's plan: content targets, backlog items, outreach focus
- [ ] Send report + plan to the client; book or hold the monthly call
- [ ] Log any client requests or blockers raised on the call into the backlog

---

## Part 2: What We Report — and What We Don't

Position Xero's positioning is literally **"qualified leads at scale, not vanity metrics."** The report must embody that. If a metric doesn't help the client understand whether SEO is bringing them business, it doesn't lead the report — and most of the time it doesn't appear at all.

### KPIs that matter (report these)

| KPI | Source | Why it matters |
|---|---|---|
| Qualified organic leads / conversions | GA4 (agreed conversion events) | This is the point of the engagement. Leads first, always. |
| Organic clicks + impressions trend | GSC | Real search demand reaching the site, from Google's own data |
| Target-query positions | GSC Performance (filtered query list) | Movement on the terms we agreed actually matter commercially |
| Pages gaining / losing | GSC (page-level MoM comparison) | Shows where growth is coming from and catches decay early |
| Core Web Vitals status | GSC CWV report | Page experience health, framed as pass/fail per URL group |
| GBP actions (local clients) | Google Business Profile insights | Calls, direction requests, website clicks — real local intent |

### Vanity metrics we exclude

- **Raw pageviews / sessions with no conversion context.** Traffic that doesn't convert isn't a win; it's a cost.
- **Follower-style stats.** Social counts, newsletter subscribers, and similar don't belong in an SEO report.
- **"Domain authority" as a goal.** DA/DR are third-party estimates, not Google metrics. We may glance at them internally as a rough proxy; we do not report them as achievements or set targets against them.
- **Keyword-count bragging.** "Ranking for 4,000 keywords" is meaningless if 3,950 are irrelevant long-tail accidents. We report the target list, not the raw count.

If a client asks for a vanity metric, we explain why we lead with leads — and add it as a clearly-labelled appendix line if they still want it. We don't build the report around it.

### A note on content volume claims

We never sell or report "X pages published" as a KPI on its own. Google's **scaled content abuse** policy and the helpful content guidance are explicit: publishing large volumes of low-value pages — AI-generated or otherwise — to manipulate rankings is a spam policy violation. Our content KPI is what the content *did* (clicks, positions, leads), and every piece we ship goes through the human-led review in the 02 workflow. If a client pushes for mass AI publishing, the answer is no, with this policy as the reason.

---

## Part 3: Monthly Report Skeleton (copy-paste)

Copy the block below into a new file per client per month. Replace everything in `[brackets]`. Keep the TL;DR to three bullets or fewer — if the client reads nothing else, they read that.

```markdown
# [Client Name] — SEO Report: [Month Year]

Prepared by Position Xero · Data window: [1–31 Month Year] · Sources: Google Search Console, GA4, Google Business Profile (all first-party Google data)

## TL;DR — this month's wins

- [Biggest lead/conversion outcome, in plain English, e.g. "22 qualified organic leads — up from 15 last month"]
- [Most meaningful ranking/visibility win on a target query or page]
- [One-line summary of the most important work shipped]

## The numbers

| Metric | This month | Last month | MoM | Same month last year | YoY |
|---|---|---|---|---|---|
| Qualified organic leads / conversions | [x] | [x] | [+x%] | [x] | [+x%] |
| Organic clicks | [x] | [x] | [+x%] | [x] | [+x%] |
| Organic impressions | [x] | [x] | [+x%] | [x] | [+x%] |
| Target queries in top 3 / top 10 | [x / x] | [x / x] | [±x] | [x / x] | [±x] |
| Core Web Vitals — URLs rated "Good" | [x%] | [x%] | [±x pts] | [x%] | [±x pts] |
| GBP actions (calls + directions + clicks) [local only] | [x] | [x] | [+x%] | [x] | [+x%] |

**What's driving this:** [2–3 sentences of honest interpretation. Name the pages/queries responsible. If something dropped, say so and say why — seasonality, algorithm update, lost link, technical issue — and what we're doing about it.]

### Pages gaining / losing

| Page | Clicks (MoM) | Note |
|---|---|---|
| [/winning-page/] | [+x%] | [why it's growing] |
| [/losing-page/] | [−x%] | [diagnosis + planned action] |

## Work shipped this month

- [Content: pieces published/updated, with URLs]
- [Technical/on-page: fixes deployed, from the audit backlog]
- [Links/outreach: links earned or citations built — quality over quantity]

## What's next ([Next Month])

- [Priority 1]
- [Priority 2]
- [Priority 3]

## Blockers / what we need from you

- [ ] [e.g. Sign-off on the two drafts sent 14th — publishing is blocked until approved]
- [ ] [e.g. Developer access to fix the redirect chain on /old-services/]
- [ ] [Nothing this month — you're all clear] 
```

**Skeleton rules:**

- Every number must be reproducible from GSC, GA4, or GBP on a live screen-share. All three sources are free — clients can verify anything themselves, and we should tell them so.
- MoM *and* YoY on every headline metric. MoM alone hides seasonality; YoY alone hides momentum.
- Never bury a bad month. A drop reported honestly with a diagnosis and a plan builds more trust than a report that quietly swaps in a friendlier metric.
- "Work shipped" lists outcomes-relevant work, not activity padding. "Fixed 3 redirect chains affecting /services/" beats "completed 47 optimisations."

---

## Part 4: Setting Expectations — the SEO Timeline

Use this framing in onboarding, in reports for months 1–3, and any time a client asks "when will this work?" Copy verbatim or adapt lightly:

> SEO compounds — it doesn't spike. Here's what a realistic timeline looks like:
>
> **Months 1–3: Foundations.** Technical fixes shipped, first content live, tracking in place. You'll see early movement — impressions rising, some target queries entering the top 20 — but lead flow changes are usually modest. If anyone promises page-one rankings in this window, they're either guessing or doing something Google penalises.
>
> **Months 3–6: Traction.** Content starts ranking, positions on target queries firm up, organic clicks trend visibly upward, and qualified leads begin to follow. This is where the graph starts bending.
>
> **Months 6–12: Compounding.** Earlier work keeps paying while new work stacks on top. Pages that ranked in month 4 are still producing leads in month 12 at no extra cost — this is why SEO's cost-per-lead falls over time while paid ads' stays flat.
>
> Two honest caveats: competitive markets sit at the slower end of these ranges, and no one — including us — controls Google's algorithm. What we control is doing the right work, measuring it against leads rather than vanity numbers, and showing you exactly what moved every month.

**Internal note:** never contractually promise rankings, traffic figures, or lead counts. We commit to the work, the cadence, and honest measurement — the timeline copy above is a framing of typical patterns, not a guarantee, and it must stay framed that way in every proposal and report.
