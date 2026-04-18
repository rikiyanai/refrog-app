#!/usr/bin/env python3
"""
Type.fit API Scraper - Fetches quotes from type.fit public API.
Outputs to: scripts/scraper-output/typefit-quotes.json
"""

import requests
import json

OUTPUT_FILE = "scripts/scraper-output/typefit-quotes.json"


def fetch_all_quotes() -> list:
    """Fetch from type.fit API."""
    try:
        resp = requests.get("https://type.fit/api/quotes", timeout=30)
        if resp.status_code == 200:
            return resp.json()
    except Exception as e:
        print(f"Error: {e}")
    return []


def main():
    print("=== Type.fit Quotes Scraper ===\n")

    all_quotes = fetch_all_quotes()
    print(f"Fetched {len(all_quotes)} quotes")

    death_words = [
        "death",
        "die",
        "dead",
        "dying",
        "mortality",
        "grave",
        "soul",
        "eternal",
        "life",
    ]
    filtered = []
    seen = set()

    for q in all_quotes:
        text = q.get("text", "").strip()
        author = q.get("author", "").strip()

        if not text or not author:
            continue

        key = f"{text[:30]}-{author}"
        if key in seen:
            continue
        seen.add(key)

        text_lc = text.lower()
        if any(w in text_lc for w in death_words):
            filtered.append({"text": text, "author": author, "source": "type.fit"})

    result = {"source": "type.fit API", "count": len(filtered), "quotes": filtered}

    with open(OUTPUT_FILE, "w") as f:
        json.dump(result, f, indent=2)

    print(f"Death quotes: {len(filtered)}")
    print(f"Output: {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
