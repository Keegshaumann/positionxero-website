# Founders Proof Section — Design (2026-07-11)

## Goal
Answer "why should a stranger trust a new agency?" directly under the homepage hero: real faces, real named credentials, and an invitation to verify us — replacing the text-only founder story section.

## Decisions (user-confirmed)
- **Bio framing:** describe-the-work, no employer name, no years figure. Facts confirmed by owners: both previously worked at the same international company whose business was lead generation, web development, and SEO; Keegan Haumann = full-stack developer; Ronnie Botes = web development + Google/Meta paid-ads lead gen + SEO. AI/GEO expertise via their second company, **Cognexa** (AI business solutions).
- **Photo:** real photo (user-supplied), CSS-styled (rounded, bordered, soft shadow) — **not** AI-stylized. Asset path: `img/founders.jpg` (user must drop the file in; section renders with alt text until then).
- **Scorecard:** NO static SEOptimer grade chips (laypeople don't know the tool, a red F scares skimmers, static grades go stale). Instead an "audit us yourself" challenge card that names the honest weakness (young domain → weak backlink grade) in prose, with a link to SEOptimer. Self-updating, verifiable, no promised future grade ("watch it climb", never "B at worst").
- **Cognexa naming risk (flagged):** cognexa.com / Cognexa LLC / COGNEXA AI are existing unrelated companies. Name is included per owner instruction, unlinked until the owners provide their Cognexa URL. Follow-up: link it or reconsider.

## Implementation
- `index.html`: replace the existing `team-section` block (after `.rating-strip`) with a two-column `founders-grid`: photo `<figure>` (768×1366, lazy) + story column (label, H2 "Two Real People. One Open Book.", two bio paragraphs, `.audit-card`, existing CTA buttons kept).
- `css/style.css`: append `.founders-grid`, `.founders-photo`, `.audit-card` styles using existing vars (`--radius`, `--border`, `--bg-2`, `--muted`); single breakpoint stacks columns ≤820px.
- `about.html`: sync the two founder bio cards to the confirmed division (Keegan = full-stack dev; Ronnie = web dev + paid ads + SEO). Blog bylines unchanged.
- No new JSON-LD; no new claims beyond the confirmed facts.

## Out of scope (queued separately)
- SEOptimer grades push to A/A+ (all categories except Links) — requires deploy + fresh audit.
- Cognexa link/one-pager decision.
