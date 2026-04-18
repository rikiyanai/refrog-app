#!/usr/bin/env python3
"""
Internet Archive Scraper - Uses search to find public domain death texts.
Outputs to: scripts/scraper-output/archive-quotes.json
"""

import requests
import json
import re
import time

OUTPUT_FILE = "scripts/scraper-output/archive-quotes.json"

SEARCH_URL = "https://archive.org/advancedsearch.php"


def search_books(query: str) -> list:
    """Search archive.org."""
    params = {
        "q": f"title:({query}) AND mediatype:(texts)",
        "fl[]": "identifier,title,creator",
        "sort []": "downloads desc",
        "rows": 5,
        "output": "json",
    }
    try:
        resp = requests.get(SEARCH_URL, params=params, timeout=20)
        if resp.status_code == 200:
            return resp.json().get("response", {}).get("docs", [])
    except:
        pass
    return []


def get_text(identifier: str) -> str:
    """Download plain text."""
    urls = [
        f"https://archive.org/download/{identifier}/{identifier}__text.txt",
        f"https://archive.org/download/{identifier}/{identifier}.txt",
    ]
    for url in urls:
        try:
            r = requests.get(url, timeout=30)
            if r.status_code == 200 and len(r.text) > 5000:
                return r.text[:150000]
        except:
            continue
    return ""


def extract_quotes(text: str, author: str) -> list:
    """Extract death quotes."""
    death_words = [
        "death",
        "die",
        "dead",
        "dying",
        "mortal",
        "grave",
        "soul",
        "eternal",
    ]
    quotes = []
    seen = set()

    for line in text.split("\n"):
        line = line.strip()
        if len(line) < 25 or len(line) > 180:
            continue

        line_lc = line.lower()
        if not any(w in line_lc for w in death_words):
            continue

        if re.match(r"^(chapter|book|volume|section|pge|een)", line_lc):
            continue

        key = line[:25].lower()
        if key in seen:
            continue
        seen.add(key)

        if line[0].isupper() and line[-1] in ".!?":
            quotes.append(
                {"text": line, "author": author, "source": "Internet Archive"}
            )

    return quotes[:5]


def main():
    print("=== Internet Archive Death Quotes ===\n")

    all_quotes = []
    queries = ["meditations Aurelius", "walden Thoreau", "tao te ching"]

    for q in queries:
        print(f"Searching: {q}...")
        results = search_books(q)
        for doc in results[:1]:
            ident = doc.get("identifier", "")
            title = doc.get("title", "")
            author = doc.get("creator", "Unknown")
            print(f"  {title[:25]}...")

            text = get_text(ident)
            if text:
                q = extract_quotes(text, author)
                print(f"    +{len(q)}")
                all_quotes.extend(q)
            time.sleep(0.3)

    with open(OUTPUT_FILE, "w") as f:
        json.dump(
            {
                "source": "Internet Archive",
                "count": len(all_quotes),
                "quotes": all_quotes,
            },
            f,
            indent=2,
        )

    print(f"\nDone: {len(all_quotes)} -> {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
