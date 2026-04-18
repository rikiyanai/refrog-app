#!/usr/bin/env python3
"""
Gutenberg Simplified - Uses known working book IDs to extract quotes.
Outputs to: scripts/scraper-output/gutenberg-quotes.json
"""

import requests
import json
import re

OUTPUT_FILE = "scripts/scraper-output/gutenberg-quotes.json"

# Known working Gutenberg IDs with death-related content
BOOKS = [
    (7142, "Meditations", "Marcus Aurelius"),
    (2372, "Enchiridion", "Epictetus"),
]


def get_text(gutenberg_id: int) -> str:
    """Fetch text directly."""
    url = f"https://www.gutenberg.org/cache/epub/{gutenberg_id}/pg{gutenberg_id}.txt"
    try:
        r = requests.get(url, timeout=30)
        if r.status_code == 200:
            return r.text
    except:
        pass
    return ""


def clean_header(text: str) -> str:
    start = text.find("*** START OF")
    end = text.find("*** END OF")
    if start > 0:
        text = text[start:]
    if end > 0:
        text = text[:end]
    return text


def extract_quotes(text: str, author: str, title: str) -> list:
    """Extract quotes."""
    text = clean_header(text)
    found = []
    seen = set()

    death = ["death", "die", "dead", "dying", "mortal", "grave"]

    for line in text.split("\n"):
        line = line.strip()
        if len(line) < 30 or len(line) > 160:
            continue

        low = line.lower()
        if not any(w in low for w in death):
            continue

        key = line[:20].lower()
        if key in seen:
            continue
        seen.add(key)

        if line[0].isupper() and line[-1] in ".!?":
            found.append(
                {"text": line, "author": author, "title": title, "source": "Gutenberg"}
            )

    return found[:8]


def main():
    print("=== Gutenberg Scraper ===\n")

    all_quotes = []

    for gid, title, author in BOOKS:
        print(f"Fetching {title}...")
        text = get_text(gid)
        if text:
            q = extract_quotes(text, author, title)
            print(f"  +{len(q)} quotes")
            all_quotes.extend(q)

    with open(OUTPUT_FILE, "w") as f:
        json.dump(
            {"source": "Gutenberg", "count": len(all_quotes), "quotes": all_quotes},
            f,
            indent=2,
        )

    print(f"\nDone: {len(all_quotes)} -> {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
