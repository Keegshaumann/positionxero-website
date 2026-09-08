#!/usr/bin/env python3
"""Publish a staged blog post.

Staged posts live in blog/ carrying <meta name="robots" content="noindex, follow" />
and are deliberately absent from the blog listing, sitemap.xml and llms.txt, so Google
never sees them before their date. This script performs every step of going live:

  1. removes the noindex tag
  2. stamps datePublished / dateModified and the visible "Last updated" month
  3. adds the card to blog/index.html
  4. adds the BlogPosting entry to that page's Blog schema
  5. adds the URL to sitemap.xml
  6. adds the line to the Blog Articles section of llms.txt

Every step is idempotent, so re-running is safe. Nothing is written unless all steps succeed.

    python3 seo-tool/publish-post.py <slug> --thumb "<image url>"
    python3 seo-tool/publish-post.py <slug> --thumb "<url>" --dry-run
"""
import argparse, datetime, html, json, os, re, sys, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = "https://www.positionxero.com"


def read(p):
    with open(os.path.join(ROOT, p), encoding="utf-8") as fh:
        return fh.read()


def grab(pattern, text, what, flags=re.S):
    m = re.search(pattern, text, flags)
    if not m:
        sys.exit(f"ERROR: could not find {what} in the post. Aborted, nothing written.")
    return m.group(1).strip()


def strip_tags(s):
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", "", s))).strip()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("slug")
    ap.add_argument("--thumb", help="listing card image URL")
    ap.add_argument("--headline", help="short card headline (defaults to the h1)")
    ap.add_argument("--date", help="publish date YYYY-MM-DD (defaults to today)")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--skip-thumb-check", action="store_true")
    a = ap.parse_args()

    slug = a.slug.removesuffix(".html").removeprefix("blog/")
    rel = f"blog/{slug}.html"
    if not os.path.exists(os.path.join(ROOT, rel)):
        sys.exit(f"ERROR: {rel} does not exist.")

    date = a.date or datetime.date.today().isoformat()
    d = datetime.date.fromisoformat(date)
    month_year = f"{d:%B} {d.year}"
    url = f"{SITE}/blog/{slug}"

    post = read(rel)
    title = strip_tags(grab(r"<title>(.*?)</title>", post, "<title>"))
    h1 = strip_tags(grab(r"<h1[^>]*>(.*?)</h1>", post, "<h1>"))
    desc = grab(r'name="description" content="([^"]*)"', post, "meta description")
    author = grab(r'name="author" content="([^"]*)"', post, "author meta")
    tag = strip_tags(grab(r'<span class="article-tag">(.*?)</span>', post, "article tag"))
    read_time = grab(r"(\d+)\s*min read", post, "read time")
    author_id = grab(r'"@id":\s*"(https://www\.positionxero\.com/#[a-z-]+)"[^}]*"name":\s*"%s"'
                     % re.escape(author), post, "author @id")

    changes = []

    # 1 + 2. post file: unstage and stamp dates
    new_post = re.sub(r'\s*<meta name="robots" content="noindex, follow" />', "", post, count=1)
    if new_post != post:
        changes.append("removed noindex")
    for field in ("datePublished", "dateModified"):
        new_post, n = re.subn(rf'"{field}":\s*"\d{{4}}-\d{{2}}-\d{{2}}"', f'"{field}": "{date}"', new_post)
        if n:
            changes.append(f"stamped {field}={date}")
    new_post, n = re.subn(r"(Last updated:\s*)[A-Z][a-z]+ \d{4}", rf"\g<1>{month_year}", new_post)
    if n:
        changes.append(f"visible date -> {month_year}")

    # 3 + 4. blog/index.html: card + schema
    index = read("blog/index.html")
    if f'href="/blog/{slug}"' in index:
        print(f"  = already in blog/index.html, skipping card")
        new_index = index
    else:
        if not a.thumb:
            sys.exit("ERROR: --thumb is required (the listing card needs an image). Nothing written.")
        if not a.skip_thumb_check:
            try:
                req = urllib.request.Request(a.thumb, method="HEAD", headers={"User-Agent": "Mozilla/5.0"})
                code = urllib.request.urlopen(req, timeout=15).status
                if code != 200:
                    sys.exit(f"ERROR: thumb URL returned HTTP {code}. Nothing written.")
            except Exception as e:
                sys.exit(f"ERROR: could not verify thumb URL ({e}). Use --skip-thumb-check to override.")
        card = (
            f'        <a href="/blog/{slug}" class="blog-card fade-in">\n'
            f'          <div class="blog-thumb"><img src="{html.escape(a.thumb)}" alt="{html.escape(h1)}" '
            f'width="800" height="420" decoding="async" loading="lazy" /></div>\n'
            f'          <div class="blog-body">\n'
            f'            <span class="blog-tag">{html.escape(tag)}</span>\n'
            f'            <h2>{html.escape(a.headline or h1)}</h2>\n'
            f'            <p>{html.escape(desc)}</p>\n'
            f'            <div class="blog-meta"><span>By {html.escape(author)}</span><span>&middot;</span>'
            f'<span>{month_year}</span><span>&middot;</span><span>{read_time} min read</span></div>\n'
            f'          </div>\n'
            f'        </a>\n'
        )
        anchor = '      <div class="blog-grid">\n'
        if anchor not in index:
            sys.exit("ERROR: could not find the blog-grid container. Nothing written.")
        new_index = index.replace(anchor, anchor + card, 1)

        entry = (
            '      {\n'
            '        "@type": "BlogPosting",\n'
            f'        "headline": {json.dumps(title)},\n'
            f'        "url": "{url}",\n'
            '        "publisher": { "@id": "https://www.positionxero.com/#organization" },\n'
            f'        "author": {{ "@type": "Person", "@id": "{author_id}", "name": {json.dumps(author)}, '
            '"jobTitle": "Co-Founder", "worksFor": { "@id": "https://www.positionxero.com/#organization" }, '
            '"url": "https://www.positionxero.com/about" }\n'
            '      },\n'
        )
        sa = '    "blogPost": [\n'
        if sa not in new_index:
            sys.exit("ERROR: could not find the blogPost schema array. Nothing written.")
        new_index = new_index.replace(sa, sa + entry, 1)
        changes.append("added listing card + schema entry")

    # 5. sitemap.xml
    sm = read("sitemap.xml")
    if f"<loc>{url}</loc>" in sm:
        print("  = already in sitemap.xml")
        new_sm = sm
    else:
        block = (f"  <url>\n    <loc>{url}</loc>\n    <lastmod>{date}</lastmod>\n"
                 f"    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n")
        new_sm = sm.replace("</urlset>", block + "</urlset>", 1)
        changes.append("added to sitemap.xml")

    # 6. llms.txt
    lt = read("llms.txt")
    if url in lt:
        print("  = already in llms.txt")
        new_lt = lt
    else:
        heading = "## Blog Articles\n\n"
        if heading not in lt:
            sys.exit("ERROR: could not find the Blog Articles section in llms.txt. Nothing written.")
        new_lt = lt.replace(heading, f"{heading}- {title.split(' | ')[0]}: {url}\n", 1)
        changes.append("added to llms.txt")

    if a.dry_run:
        print(f"\nDRY RUN for {slug} (publish date {date}) - nothing written\n")
        print(f"  title      {title}")
        print(f"  h1         {h1}")
        print(f"  author     {author}  ({author_id})")
        print(f"  tag        {tag} | {read_time} min read")
        print(f"  card head  {a.headline or h1}")
        for c in changes:
            print(f"  would: {c}")
        return

    with open(os.path.join(ROOT, rel), "w", encoding="utf-8") as fh: fh.write(new_post)
    with open(os.path.join(ROOT, "blog/index.html"), "w", encoding="utf-8") as fh: fh.write(new_index)
    with open(os.path.join(ROOT, "sitemap.xml"), "w", encoding="utf-8") as fh: fh.write(new_sm)
    with open(os.path.join(ROOT, "llms.txt"), "w", encoding="utf-8") as fh: fh.write(new_lt)

    # validate what we just wrote
    for f in ("blog/index.html", rel):
        for blk in re.findall(r'<script type="application/ld\+json">(.*?)</script>', read(f), re.S):
            json.loads(blk)
    import xml.etree.ElementTree as ET
    ET.parse(os.path.join(ROOT, "sitemap.xml"))

    print(f"\nPublished {slug} ({date}):")
    for c in changes:
        print(f"  - {c}")
    print("  - JSON-LD and sitemap.xml revalidated")
    print(f"\n  Live at {url} once you deploy.")


if __name__ == "__main__":
    main()
