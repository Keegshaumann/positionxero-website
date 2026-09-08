# This repo is not the live site

**Do not work in this repo.** Nothing here reaches positionxero.com.

The live site is **[ronniejbotes/positionxero-website-live](https://github.com/ronniejbotes/positionxero-website-live)** (called `alche-copy-website` until 2026-09-08). It deploys to positionxero.com automatically from `main`, in about 90 seconds.

## What this repo is

An older parallel copy of the same site with a **completely different design**: a light theme with Outfit and DM Sans, `lang="en-US"` and American spelling, against the live site's dark theme with Archivo, Inter and IBM Plex Mono, `lang="en"` and British spelling. The two stylesheets differ by more than 3000 lines. Files cannot be copied between the repos; content has to be rewritten into the other design.

## Why the warning exists

On 2026-09-08 a full day of work went in here by mistake: a careers section, four blog posts, sitewide copy corrections, an em dash cleanup and a lead-capture overlay. None of it appeared on the live site, and the reason took a long time to find, because everything about this repo looks correct. It was all rebuilt in the live repo afterwards.

Symptoms that you are in the wrong repo:

- You push and the live site does not change.
- The live homepage loads `/assets/main-*.css`; the pages here load `/css/style.css`.
- The phone number here differs from the one on the live site.

## If you want the history

The work done here on 2026-09-08 is in commits `5e93b98`, `0a8dc7c` and `f860d52`, and the equivalent work now lives in the live repo. Keep this repo for reference if you like, but treat it as read-only.
