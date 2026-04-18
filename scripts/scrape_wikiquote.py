#!/usr/bin/env python3
"""
Wikiquote Scraper - Fetches curated quotes from Wikiquote.
Outputs to: scripts/scraper-output/wikiquote-quotes.json
"""

import requests
import json
import re
from typing import List, Dict

OUTPUT_FILE = "scripts/scraper-output/wikiquote-quotes.json"

TOPICS = [
    "Death",
    "Mortality",
    "Death_quotes",
    "Funeral",
    "Afterlife",
    "Immortality",
    "Grief",
]


def get_wikiquote(topic: str) -> List[Dict]:
    """Fetch quotes from Wikiquote API."""
    url = f"https://en.wikiquote.org/w/api.php"
    params = {"action": "parse", "page": topic, "format": "json", "prop": "text"}

    try:
        resp = requests.get(url, params=params, timeout=30)
        if resp.status_code == 200:
            data = resp.json()
            html = data.get("parse", {}).get("text", {}).get("*", "")

            quotes = []
            seen = set()

            # Extract quotes from HTML
            quote_blocks = re.findall(r"<ul>(.+?)</ul>", html, re.DOTALL)
            for block in quote_blocks:
                items = re.findall(r"<li>(.+?)</li>", block, re.DOTALL)
                for item in items:
                    # Strip HTML
                    text = re.sub(r"<[^>]+>", "", item)
                    text = text.strip()
                    text = re.sub(r"\[edit\]", "", text)

                    if len(text) < 20 or len(text) > 250:
                        continue

                    key = text[:30].lower()
                    if key in seen:
                        continue
                    seen.add(key)

                    if text[0].isupper():
                        quotes.append(
                            {"text": text, "author": topic, "source": "Wikiquote"}
                        )

            return quotes[:10]
    except Exception as e:
        print(f"Error: {e}")
    return []


def main():
    print("=== Wikiquote Death Quotes ===\n")

    all_quotes = []

    for topic in TOPICS:
        print(f"Fetching: {topic}...")
        quotes = get_wikiquote(topic)
        print(f"  +{len(quotes)} quotes")
        all_quotes.extend(quotes)

    with open(OUTPUT_FILE, "w") as f:
        json.dump(
            {"source": "Wikiquote", "count": len(all_quotes), "quotes": all_quotes},
            f,
            indent=2,
        )

    print(f"\nDone: {len(all_quotes)} -> {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
