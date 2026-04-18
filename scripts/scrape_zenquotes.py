#!/usr/bin/env python3
"""
ZenQuotes Targeted Scraper - Fetches death-specific quotes.
Outputs to: scripts/scraper-output/zenquotes-quotes.json
"""

import requests
import json
import time

OUTPUT_FILE = "scripts/scraper-output/zenquotes-quotes.json"


def fetch_quote() -> dict:
    """Fetch single random quote."""
    try:
        resp = requests.get("https://zenquotes.io/api/random", timeout=15)
        if resp.status_code == 200:
            data = resp.json()
            if data:
                return data[0]
    except:
        pass
    return {}


def main():
    print("=== ZenQuotes Death Quotes Scraper ===\n")

    death_words = [
        "death",
        "die",
        "dead",
        "dying",
        "mortality",
        "grave",
        "soul",
        "eternal",
        "perish",
    ]
    quotes = []
    seen = set()

    # Fetch many quotes and filter for death
    for i in range(100):
        q = fetch_quote()
        if not q:
            continue

        text = q.get("q", "").strip()
        author = q.get("a", "").strip()

        if not text:
            continue

        key = f"{text[:30]}-{author}"
        if key in seen:
            continue
        seen.add(key)

        text_lc = text.lower()
        if any(w in text_lc for w in death_words):
            quotes.append({"text": text, "author": author, "source": "ZenQuotes"})
            print(f"+ {text[:50]}...")

        if len(quotes) >= 20:
            break

        time.sleep(0.3)

    result = {"source": "ZenQuotes", "count": len(quotes), "quotes": quotes}

    with open(OUTPUT_FILE, "w") as f:
        json.dump(result, f, indent=2)

    print(f"\nDone: {len(quotes)} quotes -> {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
