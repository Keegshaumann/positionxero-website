# Safe Content & Link Workflow

**Position Xero** — SEO Client Toolkit · Internal · Last updated July 2026

This is our standard operating procedure for producing content and earning links for clients. Everything in here is white-hat and aligned with Google's spam policies (scaled content abuse, link spam) and the helpful content guidance now baked into core updates. If a tactic isn't in this doc, check with the account lead before using it on a client site.

---

## Part 1 — Content

### 1.1 Keyword research flow

Work in this order. Each step narrows the list and grounds it in reality instead of tool guesswork.

1. **Seed from client expertise.** Interview the client (or mine the onboarding questionnaire): What do customers actually ask you? What jobs do you get paid for? What do you know that competitors get wrong? Every seed keyword must map to something the client can speak on with genuine first-hand authority — this is the E-E-A-T foundation and it's non-negotiable.
2. **Mine Google Search Console.** Performance report → Queries, last 12 months. Look for:
   - Queries with impressions but low CTR (page exists, snippet or intent match is weak).
   - Queries ranking positions 5–20 (striking distance — improve the existing page before writing a new one).
   - Query themes with no matching page at all (genuine content gaps).
3. **Expand with free question tools.** AlsoAsked, AnswerThePublic (free tier), Google autocomplete, the People Also Ask boxes on the actual SERP, and Reddit/forum threads in the niche. These surface the exact phrasing real people use.
4. **Prioritise long-tail first for new or weak domains.** A domain with little authority will not rank for head terms — don't burn months trying. Target specific, lower-competition queries ("how much does X cost in [city]", "X vs Y for [use case]") where the client's expertise wins on merit. Head terms come later, supported by the topical cluster you build underneath them.

Log everything in the client's keyword sheet with: query, monthly volume estimate (treat as rough), current ranking URL (if any), intent, and priority.

### 1.2 Search-intent match — check before you brief

Before briefing any keyword, search it in an incognito window and look at what Google actually rewards:

- [ ] What format dominates page 1? (guides, product pages, comparison tables, local packs, videos, calculators)
- [ ] What intent does that imply? (informational / commercial investigation / transactional / local / navigational)
- [ ] Can we match that format with something genuinely better or different, given the client's expertise?
- [ ] If page 1 is all major brands or aggregators, deprioritise — pick a longer-tail variant instead.

Never write a blog post for a query where Google ranks only product pages, and vice versa. Intent mismatch is the most common reason good content doesn't rank.

### 1.3 Content brief template

Every piece gets a brief before drafting. Copy this block into the client's content tracker:

```
CONTENT BRIEF
--------------------------------------------------
Target query:        [primary keyword]
Secondary queries:   [2–5 close variants / PAA questions]
Search intent:       [informational / commercial / transactional / local]
SERP format to match:[e.g. how-to guide with steps + FAQ]
Target URL:          [new slug or existing page to improve]

H2 outline:
  - [H2 #1]
  - [H2 #2]
  - [H2 #3 ...]
  (Derived from SERP analysis + PAA + client interview — not padded to hit a word count.)

Entities to cover:   [people, products, standards, places, concepts
                      Google associates with this topic — pull from top-
                      ranking pages and the client's own vocabulary]

Internal links IN:   [existing pages that should link TO this piece, with anchor ideas]
Internal links OUT:  [pages this piece should link TO — service pages, related guides]

Schema type:         [Article / HowTo / FAQPage / LocalBusiness / Product / Service]
Author:              [named client expert — real person, real credentials]
Unique angle:        [what first-hand experience, data, or example makes this
                      better than what already ranks? If blank, don't write it.]
--------------------------------------------------
```

### 1.4 Drafting rules

AI-assisted drafting is allowed on client work **only** under all of these conditions:

- The draft is grounded in the client's real expertise — a recorded interview, their notes, their process docs, their data. The AI structures and phrases; the substance comes from the client.
- A human editor substantially rewrites and edits. If the published piece reads like the raw AI output, it didn't get enough editing.
- Every factual claim, statistic, price, and regulation is verified. AI-invented facts on a client site are a fireable-offence-level problem.
- Real experience is added: the client's own examples, photos, case numbers, mistakes they've seen, local specifics. This is what "Experience" in E-E-A-T means and it's what generic AI output can never fake.
- A named, real author with a bio is attached wherever the topic warrants it.

> **⚠️ WARNING — do not run the "content machine" pattern.**
>
> "Record a quick video → AI turns it into a post → publish one every day" **at scale is off-limits at Position Xero.** Publishing many pages of lightly-edited AI output primarily to capture search rankings is exactly what Google's **scaled content abuse** spam policy targets — regardless of whether a human "was involved". Sites doing this have been hit with manual actions and sitewide ranking collapses, and recovery takes many months if it happens at all. It doesn't matter that the seed was a real video; what matters is scaled, low-effort output whose main purpose is manipulating rankings. If a client asks for this (they will — it's all over LinkedIn), explain the policy risk in writing and offer the quality-cadence alternative below. Escalate to the account lead if they push.

**Publish cadence: quality over quantity.** One genuinely useful, well-edited piece per week or fortnight beats daily filler on every timescale that matters. Fewer, better pages also concentrate internal link equity and are easier to keep updated. Set cadence expectations with the client at kickoff so nobody measures us on post count.

### 1.5 On-page checklist — run before every publish

- [ ] Title tag: includes target query naturally, under ~60 characters, written for clicks not stuffing
- [ ] Meta description: compelling, ~150 characters, matches intent
- [ ] URL slug: short, readable, keyword-relevant, no dates
- [ ] One H1, matching the topic; H2/H3s follow the brief outline
- [ ] Target query and variants appear naturally in the intro, at least one H2, and body — no forced repetition
- [ ] All facts, figures, prices, and claims verified against a source
- [ ] Real experience present: client example, original photo/screenshot, first-hand detail
- [ ] Internal links IN added from the pages listed in the brief (edit those pages now, not "later")
- [ ] Internal links OUT to relevant service/related pages with descriptive anchors
- [ ] Images compressed, descriptive filenames, alt text written
- [ ] Schema markup added per brief and validated (Google Rich Results Test / Schema.org validator)
- [ ] Author name and bio displayed where appropriate
- [ ] Mobile check: renders cleanly, no layout breaks, tap targets fine
- [ ] Page indexed path clear: linked from at least one crawled page, in the sitemap, no accidental noindex
- [ ] After publish: request indexing in GSC and log the URL + date in the client tracker

---

## Part 2 — Links

Our position: we **earn** links; we never buy or manufacture them. Every tactic below produces links Google's own documentation treats as legitimate.

### 2.1 Approved tactics

**1. Linkable assets.**
Build things people cite: original data (survey the client's customers, aggregate their job stats), free tools/calculators, definitive how-to guides, checklists, and templates. One strong asset outperforms fifty outreach emails for generic posts. Plan at least one linkable asset per client per quarter where budget allows.

**2. Unlinked brand mentions.**
The easiest links on the internet — someone already mentioned the client, they just didn't link.
- Set up **Google Alerts** for the brand name, product names, and founder names.
- Sweep periodically with free mention finders: Google search operators (`"brand name" -site:client.com`), Talkwalker Alerts, and Bing search.
- When you find an unlinked mention, send a short, polite ask (skeleton in 2.3). Conversion on these is high because the hard part — being mentioned — already happened.

**3. Local citations and industry directories that are real.**
Google Business Profile first, then genuine directories: Bing Places, Apple Business Connect, the local chamber of commerce, and the recognised directories for the client's industry (trade bodies, licensing boards, professional registers). The test: **would a real customer plausibly find businesses through this directory?** If a directory exists only to sell listings and links, skip it. Keep NAP (name, address, phone) identical everywhere.

**4. Supplier, partner, and association links.**
Ask the client: Who do you buy from? Who do you install/stock/certify for? What associations are you a member of? Suppliers often have "find a dealer/installer" pages; associations have member directories. These are legitimate, relevant, and usually free — they just require asking.

**5. Digital PR.**
Pitch genuinely newsworthy stories to journalists and niche publications: original data from a linkable asset, expert commentary on industry news, local-interest stories. Monitor journalist request channels (e.g. #journorequest on X/Bluesky, free tiers of source-request services) and respond fast with the client's real expertise. Never fabricate data or credentials for a pitch.

**6. Guest posts — narrow rules.**
Only on sites that are genuinely relevant to the client's industry and have a real human audience (real engagement, real editorial standards, real authors). The article must be written to be useful to that audience, with the client's expertise, not as a link wrapper. If a site advertises "write for us — dofollow link included" as a product, or publishes on every topic under the sun, walk away. Volume target: quality placements only; zero guest posts is an acceptable monthly number.

### 2.2 Hard list — what we never do

These violate Google's **link spam policy**, and beyond the policy risk, they build nothing of durable value. Any of these can trigger a manual action or get links algorithmically nullified (SpamBrain devalues paid/spam links, meaning the client paid for nothing) — and cleanup costs more than the links ever returned.

- **Buying or selling links** (including "sponsored posts" passing PageRank without `rel="sponsored"`/`nofollow`, and paying with products/services instead of cash — Google treats all of it as link buying).
- **PBNs (private blog networks)** or any network of sites that exists to link out. These leave footprints, get deindexed in batches, and take every client linked from them down with them.
- **Mass link exchanges** — "link to me and I'll link to you" schemes and three-way swaps done at scale for rankings.
- **Comment spam, forum signature spam, wiki/profile spam** — any low-effort placement of keyword-rich links in user-generated areas.
- **Automated link building tools** of any kind.
- **Widget/footer links** distributed with keyword anchors, and site-wide paid footer placements.
- **Expired-domain tricks** — buying expired domains to redirect or repurpose purely for their old link equity (also covered by Google's expired domain abuse policy).

If a client arrives with a history of any of the above, flag it in the audit and plan remediation (removal requests, disavow only where a manual action or clear toxic pattern justifies it) before we invest in new content.

### 2.3 Outreach email skeleton

Short, honest, specific. No "I hope this email finds you well", no fake flattery, no "quick question" bait subject lines. Adapt per tactic:

```
Subject: [specific and honest — e.g. "You mentioned {Client} in your {topic} article"]

Hi {first name},

[1 sentence: who you are and the genuine reason you're writing —
 reference the specific page/article, prove you actually read it.]

[1–2 sentences: the ask, stated plainly.
 - Unlinked mention: "You mention {Client} in {article} — would you be
   open to linking the mention to {URL} so readers can find them?"
 - Asset pitch: "We just published {asset} — original data on {topic}.
   Thought it might be useful for your piece on {related page}."]

[1 sentence: what's in it for their readers — not for us.]

No worries at all if not — thanks either way.

{Name}
{Role}, Position Xero (on behalf of {Client})
{Phone / site}
```

Rules for use:

- [ ] One follow-up maximum, 5–7 days later. Never a third email.
- [ ] Never offer payment, "compensation", or reciprocal links in outreach.
- [ ] Personalise the first line for real — templated openers get deleted and screenshot-shamed.
- [ ] Log every send, reply, and placement in the client's link tracker (prospect, contact, date, status, live URL).

---

## Quick reference — the two policies this doc protects against

- **Scaled content abuse:** producing many pages (AI, human, or hybrid) primarily to manipulate rankings rather than help people. Our defence: expertise-grounded briefs, heavy human editing, real experience in every piece, quality-first cadence.
- **Link spam:** any link intended to manipulate rankings — bought, exchanged at scale, automated, or self-placed in bulk. Our defence: the approved tactics in 2.1 and nothing else.

When in doubt, ask one question: **would we do this if Google didn't exist?** If the content would still help the client's customers and the link would still send real referral traffic, it's safe. If not, don't do it.
