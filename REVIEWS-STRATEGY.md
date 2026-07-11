# Position Xero — Reviews & Reputation Strategy (GBP + Third-Party)

> **⚠️ REALITY UPDATE 2026-07-11:** GBP is **ON HOLD indefinitely** — the business has no place of operations customers can visit and no one travels to customers from the listed area, so it is not eligible under Google's guidelines, and no verification workaround should be attempted (suspension risk + it's deception). There is also **no registered legal entity yet** and **zero clients**, so no platform reviews can exist yet either. Sequence is therefore: first client(s) → register US LLC (Doola) → Clutch/Trustpilot reviews from real clients. Skip Part 1 until there is a genuinely eligible location; start at Part 2/3 once real clients exist.

> **Why this doc exists:** Reviews on *your own site* (self-serving `Review`/`AggregateRating` schema) are **ignored by Google for rich results and can trigger a manual action** — which is why we removed them. The reviews that move rankings and get you cited by AI live **off-site**, on platforms Google and LLMs trust. This is the plan to build that, legitimately.
>
> **The AI angle (your selling point):** AI assistants cite *third-party* sources ~6.5× more often than a brand's own domain. When someone asks ChatGPT/Perplexity "best lead-gen agency for law firms" or "is Position Xero legit," the answer is assembled from Google reviews, Clutch, and directory listings — not from positionxero.com. Owning those is owning the AI answer.

---

## TL;DR — do these in order

1. **Google Business Profile** — claim, verify, fully complete it. (Biggest single ranking + trust lever.)
2. **Get your first 5 Google reviews** in week 1 from real, recent clients using the templates below.
3. **Clutch profile** — the #1 review platform for marketing agencies; heavily cited by AI for "best agency" queries.
4. **Trustpilot** (consumer trust) + pick **one** of UpCity / DesignRush / G2.
5. **Wire the real profiles into the site** (footer links, review CTA, schema `sameAs`) — I'll do this the moment you send me the URLs.
6. **Run a standing review cadence** so velocity never stops (Google weights recency).

---

## Part 1 — Google Business Profile (the foundation)

GBP is the highest-leverage asset. It powers the Map Pack, the knowledge panel, "near me" results, and is a primary source for AI Overviews.

**Setup (https://business.google.com):**
- **Business name:** `Position Xero` — exactly as on the site (no keyword stuffing like "Position Xero | Best SEO Agency" — that's a suspension risk).
- **Categories:**
  - Primary: **Marketing agency**
  - Secondary: **Advertising agency**, **Internet marketing service**, **Website designer**, **Marketing consultant**
- **Eligibility (this is what put GBP on hold):** GBP requires a location customers visit OR that you travel to customers from your base. A remote agency with no real presence at the listed address does not qualify — and Google's video verification is designed to catch exactly that. Revisit only if the business ever has a genuine place of operations.
- **NAP must match the site exactly:** `Position Xero` · `+1 (307) 500-4020` · `hello@positionxero.com` — **no street address** (the site no longer shows one, deliberately). Inconsistent NAP across the web is the #1 local-SEO killer.
- **Services:** add each with a description + price/"from" where comfortable (mirror `pricing.md`): Google Ads Management, Meta Ads Management, Lead Generation, SEO, AI SEO / LLM SEO, Website & Landing Page Design.
- **Website link:** `https://www.positionxero.com` · **Appointment link:** `https://www.positionxero.com/contact.html`
- **Photos:** logo (use `/img/logo.png`), cover, 5+ team/work photos, and screenshots of result dashboards (blur client names). Profiles with photos get materially more clicks.
- **Description (750 chars):** lead with what you do + who for + proof, in plain language AI can extract. Draft:
  > Position Xero is a founder-led performance-marketing agency helping US service businesses — law firms, real estate, recruitment, home services — generate consistent, qualified leads through Google Ads, Meta Ads, SEO, AI SEO, and high-converting websites. Month-to-month, no lock-in, open-book reporting on cost-per-lead and revenue (not vanity metrics). You work directly with the two co-founders. Free 30-minute audit delivered as a personalized video.
- **Google Posts:** publish weekly (offers, case studies, blog links). Signals an active business.
- **Q&A:** seed 3–5 real FAQs yourself (allowed) — "Do you require long contracts?", "What's your minimum ad spend?" — answer factually.

**Your review short-link:** once verified, GBP gives a share link like `https://g.page/r/XXXXXXXX/review`. Grab it — every request below uses it. (Also make a QR code of it for invoices/email signatures.)

---

## Part 2 — Third-party platforms (priority order for an agency)

| Platform | Why it matters for you | Priority |
|---|---|---|
| **Google Business Profile** | Map Pack, knowledge panel, AI Overviews, "near me" | **Do first** |
| **Clutch.co** | *The* B2B directory for marketing agencies; verified reviews; frequently cited by AI for "best/top agency" queries; ranks for "[service] agency [city]" | **High** |
| **Trustpilot** | Broad consumer-trust signal; appears in brand SERPs and AI answers | **High** |
| **UpCity** / **DesignRush** | Agency directories that rank well and feed "top agencies" lists AI pulls from | **Medium — pick one** |
| **G2 / Capterra** | Only if you productize (software/tools); skip for pure services | Low |
| **Facebook & LinkedIn recommendations** | Social proof + matches your `sameAs` profiles | Medium |

**Clutch specifics:** Clutch verifies reviews via a short recorded/written interview with your client, which is why AI trusts them. Create the company profile, list services + portfolio, then nominate 2–3 willing clients for verified reviews. A Clutch profile with even 5 reviews routinely wins "best [service] agency" AI citations.

---

## Part 3 — How to actually get the reviews (the velocity engine)

**Rules of the road (keep it compliant):**
- Only request from **real clients**. ✅ Ask everyone; ❌ never offer payment/discounts *in exchange for a positive review* (FTC violation + Google policy). Incentivizing a review at all is risky; if you ever do, it must be unconditional (for *any* honest review) and disclosed.
- **No review gating** (don't filter happy clients to Google and unhappy ones to a private form) — that's against Google policy and the FTC rule.
- **Ask at the peak happiness moment:** right after a great result call, a milestone hit (first 10 leads, CPL drop), or a renewal.
- **Make it one tap:** send the direct GBP review link / QR. Every extra click halves completion.
- **Cadence:** request from every client at onboarding+90 days and at each big win. Aim for **2–4 new Google reviews/month** — steady velocity beats a one-time pile.

**Respond to every review** (Google weights owner responses): thank by name, reference a specific result, stay calm and solution-oriented on any negative one.

---

## Part 4 — On-site integration (I'll wire these when you send URLs)

These are the *only* legitimate on-site review elements — they point to or reflect verified third-party data, not invented testimonials:

- [ ] **Footer + contact-page links/badges** to your live GBP, Clutch, and Trustpilot profiles.
- [ ] Add those profile URLs to the **Organization `sameAs`** array in the homepage JSON-LD (strengthens entity consolidation + lets AI connect your reviews to your brand).
- [ ] A **"Leave us a review" CTA** (GBP short-link) on the contact page and post-onboarding emails.
- [ ] Once you have a real GBP rating, embed a **live reviews widget** (e.g., the free Google reviews embed, or a tool like EmbedSocial/Trustpilot's widget) — this pulls real, verifiable reviews, so it's safe to mark up with schema because it's not self-serving.
- [ ] Replace or relabel the current placeholder homepage/about testimonials (James M., Sarah B., …) with real client quotes (with written permission) or remove them until real ones exist.

> Send me the GBP review link + Clutch/Trustpilot profile URLs and I'll implement all of the above in one pass.

---

## Part 5 — Measure it

Track monthly: total reviews & average rating per platform · review velocity (new/month) · "share of voice" vs. competitors in AI answers (manually ask ChatGPT/Perplexity "best [service] agency for [niche]" and log who's cited) · referral traffic from GBP/Clutch in GA4.

---

## Appendix — ready-to-send request templates

**Email (post-result):**
> Subject: Quick favor, [First name]?
>
> Hi [First name] — thrilled we got [specific result, e.g. "your cost-per-lead down to $89"]. Reviews are how other [law firms / contractors / agencies] decide to trust us. If you've got 60 seconds, a quick Google review would mean a lot:
> 👉 [GBP review link]
> No script needed — just a sentence or two on your experience. Thank you!

**SMS:**
> Hi [First name], so glad [result] is working out! If you have a sec, a quick Google review would really help us out: [GBP review link] 🙏 — [Your name], Position Xero

**Clutch nomination (email):**
> Hi [First name] — we're building our profile on Clutch, the main review platform for marketing agencies. They do a short (~10 min) verified interview about working with us. Would you be open to it? It'd carry real weight for us. I'll intro you to their team if so.

---

*Compliance note: US FTC rules (16 CFR Part 465, effective 2024) prohibit fake, AI-generated, or incentivized-for-positive consumer reviews, with civil penalties per violation. Everything in this plan is built on real, consented client feedback — which is also what actually ranks and gets cited.*
