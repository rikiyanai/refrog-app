#!/usr/bin/env python3
"""
Quotable.io Scraper - Uses random quotes endpoint (no SSL issues).
Outputs to: scripts/scraper-output/quotable-quotes.json
"""

import requests
import json
from typing import List, Dict

OUTPUT_FILE = "scripts/scraper-output/quotable-quotes.json"


def fetch_random_quotes(min_count: int = 30) -> List[Dict]:
    """Fetch random quotes until we have enough."""
    all_quotes = []

    for _ in range(min_count * 2):
        try:
            resp = requests.get("https://api.quotable.io/quotes/random", timeout=10)
            if resp.status_code == 200:
                data = resp.json()
                if isinstance(data, list):
                    all_quotes.extend(data)
                elif isinstance(data, dict):
                    all_quotes.append(data)
        except:
            pass

    return all_quotes[:min_count]


def main():
    print("=== Quotable.io Random Quotes Scraper ===\n")

    quotes = fetch_random_quotes(min_count=30)
    print(f"Fetched {len(quotes)} quotes")

    death_keywords = ["death", "die", "dead", "dying", "mortality", "life", "soul"]
    filtered = []
    seen = set()

    for q in quotes:
        text = q.get("content", "").strip()
        author = q.get("author", "")
        key = f"{text[:30]}-{author}"

        if text and key not in seen:
            seen.add(key)
            if any(kw in text.lower() for kw in death_keywords):
                filtered.append(
                    {
                        "text": text,
                        "author": author,
                        "tags": q.get("tags", []),
                        "source": "quotable.io",
                    }
                )

    result = {"source": "quotable.io", "count": len(filtered), "quotes": filtered}

    with open(OUTPUT_FILE, "w") as f:
        json.dump(result, f, indent=2)

    print(f"Output: {OUTPUT_FILE}")
    print(f"Death-related quotes: {len(filtered)}")


if __name__ == "__main__":
    main()
