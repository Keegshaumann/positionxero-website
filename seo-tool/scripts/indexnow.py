#!/usr/bin/env python3
"""
Ping IndexNow (Bing / Yandex / Seznam / Naver) with changed URLs.

Why this matters here: ChatGPT Search retrieves substantially from Bing's index,
so getting pages into Bing quickly is the cheapest lever on AI visibility.
IndexNow is free, needs no account, and works on a static site.

Usage, from the repo root:
    python3 seo-tool/scripts/indexnow.py                 # submit every URL in sitemap.xml
    python3 seo-tool/scripts/indexnow.py /blog/some-post # submit specific paths
    python3 seo-tool/scripts/indexnow.py --changed       # only files changed in the last commit

The key file lives at the web root as <key>.txt and is discovered automatically.
It is public by design — IndexNow verifies ownership by fetching it.
"""
import glob, json, os, re, subprocess, sys, urllib.request

HOST = "www.positionxero.com"
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


def find_key():
    for p in glob.glob(os.path.join(ROOT, "*.txt")):
        name = os.path.basename(p)[:-4]
        if re.fullmatch(r"[0-9a-f]{8,128}", name):
            with open(p) as fh:
                if fh.read().strip() == name:
                    return name
    sys.exit("No IndexNow key file found at the repo root (expected <hexkey>.txt containing that key).")


def url_for(path):
    path = path.replace("\\", "/").lstrip("./").lstrip("/")
    if path in ("index.html", ""):
        return f"https://{HOST}/"
    if path.endswith("/index.html"):
        return f"https://{HOST}/{path[:-len('index.html')]}"
    if path.endswith(".html"):
        return f"https://{HOST}/{path[:-5]}"
    return f"https://{HOST}/{path}"


def from_sitemap():
    xml = open(os.path.join(ROOT, "sitemap.xml")).read()
    return re.findall(r"<loc>([^<]+)</loc>", xml)


def from_last_commit():
    out = subprocess.run(["git", "-C", ROOT, "diff", "--name-only", "HEAD~1", "HEAD"],
                         capture_output=True, text=True).stdout.split()
    return [url_for(f) for f in out if f.endswith(".html")]


def main():
    key = find_key()
    args = [a for a in sys.argv[1:] if a != "--changed"]
    if "--changed" in sys.argv:
        urls = from_last_commit()
    elif args:
        urls = [a if a.startswith("http") else f"https://{HOST}/{a.lstrip('/')}" for a in args]
    else:
        urls = from_sitemap()

    urls = sorted(set(urls))
    if not urls:
        print("Nothing to submit.")
        return
    if len(urls) > 10000:
        sys.exit("IndexNow accepts at most 10,000 URLs per request.")

    payload = json.dumps({
        "host": HOST,
        "key": key,
        "keyLocation": f"https://{HOST}/{key}.txt",
        "urlList": urls,
    }).encode()

    req = urllib.request.Request(
        "https://api.indexnow.org/IndexNow",
        data=payload,
        headers={"Content-Type": "application/json; charset=utf-8"},
        method="POST",
    )
    print(f"Submitting {len(urls)} URL(s) with key {key[:8]}...")
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            code = r.status
    except urllib.error.HTTPError as e:
        code = e.code
    # 200 = accepted; 202 = accepted, key validation pending. Both are success.
    print({200: "200 OK - accepted", 202: "202 Accepted - key validation pending"}.get(
        code, f"{code} - see https://www.indexnow.org/documentation for meaning"))


if __name__ == "__main__":
    main()
