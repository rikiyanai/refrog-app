#!/usr/bin/env python3
"""
Open Library Scraper - Fetches death-related quotes from public domain books via Open Library.
Outputs to: scripts/scraper-output/openlibrary-quotes.json
"""

import requests
import json
import re
from typing import List, Dict

OUTPUT_FILE = "scripts/scraper-output/openlibrary-quotes.json"

AUTHORS = [
    "Marcus Aurelius",  # Meditations
    "Epictetus",  # Enchiridion
    "Lao Tzu",  # Tao Te Ching
    "Confucius",  # Analects
    "Seneca",  # Letters
    "Thoreau",  # Walden
    "Emerson",  # Essays
]


def search_author(author: str) -> List[Dict]:
    """Search Open Library works."""
    try:
        resp = requests.get(
            f"https://openlibrary.org/search.json",
            params={"author": author, "limit": 3},
            timeout=20,
        )
        if resp.status_code == 200:
            return resp.json().get("docs", [])
    except:
        pass
    return []


def get_book_text(olid: str) -> str:
    """Get plain text from Open Library."""
    try:
        url = f"https://openlibrary.org/works/{olid}.json"
        resp = requests.get(url, timeout=15)
        if resp.status_code != 200:
            return ""

        data = resp.json()
        entries = data.get("ebooks", [])
        if entries:
            for entry in entries:
                if entry.get("format") == "Plain Text":
                    url = entry.get("url", "")
                    if url:
                        r = requests.get(url, timeout=30)
                        if r.status_code == 200:
                            return r.text[:100000]
    except:
        pass
    return ""


def extract_quotes(text: str) -> List[str]:
    """Extract death-related quotes."""
    death_words = [
        "death",
        "die",
        "dead",
        "dying",
        "mortal",
        "grave",
        "soul",
        "eternal",
        "perish",
    ]
    quotes = []
    seen = set()

    for line in text.split("\n"):
        line = line.strip()
        if len(line) < 30 or len(line) > 200:
            continue

        line_lc = line.lower()
        if not any(w in line_lc for w in death_words):
            continue

        key = line[:30].lower()
        if key in seen:
            continue
        seen.add(key)

        if line[0].isupper() and line[-1] in ".!?":
            quotes.append(line)

    return quotes[:5]


def main():
    print("=== Open Library Death Quotes ===\n")

    all_quotes = []

    for author in AUTHORS:
        print(f"Searching: {author}...")
        works = search_author(author)

        for work in works[:1]:
            olid = work.get("key", "").replace("/works/", "")
            title = work.get("title", "Unknown")
            print(f"  {title[:30]}...")

            text = get_book_text(olid)
            if text:
                q = extract_quotes(text)
                print(f"    +{len(q)} quotes")
                all_quotes.extend(
                    [
                        {
                            "text": t,
                            "author": author,
                            "title": title,
                            "source": "Open Library",
                        }
                        for t in q
                    ]
                )

    with open(OUTPUT_FILE, "w") as f:
        json.dump(
            {"source": "Open Library", "count": len(all_quotes), "quotes": all_quotes},
            f,
            indent=2,
        )

    print(f"\nDone: {len(all_quotes)} -> {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
