# ReFrog — Canonical Project Spec

> Last updated: 2026-04-18
> Repo: https://github.com/rikiyanai/refrog-app
> Live: https://rikiworld.com/refrog-app

---

## Project Overview

A **free open-source clone of WeCroak** — sends 5 daily reminders that you're going to die, paired with a curated quote. Based on the Bhutanese saying: *"To be a happy person, one must contemplate death 5 times daily."*

**Why ReFrog over WeCroak (~$4.99):**
- Free and open source
- Curated quotes (not random)
- Frog-themed branding
- Personalizable: categories, favorites, dislikes, custom books

---

## Tech Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | React Native / Expo | Cross-platform |
| Navigation | Expo Router (tabs) | Home, Journal, Settings |
| Styling | StyleSheet API → Sacred UI tokens (v2) | Terminal/monospace aesthetic |
| Persistence | AsyncStorage (local) → Supabase (v2) | See cross-device portability |
| Notifications | Expo local notifications | No server needed for scheduling |
| Web deploy | GitHub Pages (`dist/`) | Static HTML artifact |
| Backend | None (v0/v1) → Supabase (v2) | Quotes bundled in `data/quotes.json` |
| Quote pipeline | Python scripts + Claude API | See update routine below |

---

## Architecture

```
refrog-app/
├── app/                       # Expo Router screens
│   ├── (tabs)/
│   │   ├── index.tsx          # Home / current quote
│   │   ├── journal.tsx        # Favorites & history
│   │   └── settings.tsx       # Preferences + bug report
│   └── quote/[id].tsx         # Full quote view
├── components/
├── services/
│   ├── notifications.ts       # Schedule 5 daily reminders
│   ├── quotes.ts              # Fetch, filter, categorize
│   ├── storage.ts             # AsyncStorage helpers
│   ├── bugReport.ts           # Bug capture + GitHub Issue delivery
│   └── sync.ts                # Export/import + future cloud sync
├── data/
│   └── quotes.json            # Bundled quote database
├── scripts/                   # Quote pipeline tools (Python)
├── dist/                      # Static web artifact
└── www-sacred/                # Sacred UI asset library
```

---

## Critical TODOs (Pre-Alpha Blockers)

These must be resolved before calling this an alpha release.

### 1. Bug / Complaint Report Button (web + mobile)

Every pre-alpha user must have a direct path to file a bug or complaint. Follow the asciicker-pipeline-v2 pattern:

- **UI**: a "Report a Bug" or "Complaint" button in Settings (and optionally a long-press gesture on quotes)
- **Behavior**: captures a short user description + current app state snapshot (OS, version, last quote shown)
- **Delivery**:
  - `local` — save to `data/bug_reports/` (always, as durable fallback)
  - `github` — post as GitHub Issue to `rikiyanai/refrog-app` using a PAT with `issues:write` scope
  - `both` — default for production (local save + GitHub Issue)
- **Web version**: form posts to a lightweight serverless function or uses `mailto:` fallback if no token configured
- **Token safety**: PAT is never exposed in the browser bundle; use a proxy endpoint or env var server-side

**Why:** pre-alpha users will hit bugs. Without a direct report path, feedback is lost.

---

### 2. Cross-Device Portability

Currently all user data (favorites, dislikes, bookshelf, settings) is stored in `AsyncStorage` — device-local and lost on reinstall or when switching devices.

**Required:**
- Export / import user data as JSON (offline minimum)
- Cloud sync option (Supabase anonymous sessions or email-based accounts)
- Web ↔ mobile parity: data created on the web app should be accessible in the mobile app and vice versa

**Priority order:**
1. JSON export/import (ship first — no server needed)
2. Anonymous cloud sync via Supabase (v2)
3. Full account system (v3, only if user demand warrants it)

---

### 3. Book Shelf System (redesign)

The current bookshelf is underdefined. Needs a clear model before further development.

**Intended model:**
- A **Book** is a container with title + author, holding a list of custom quotes
- Books live alongside the built-in quote pool but are user-owned (never overwritten by updates)
- **Quote sources**: manual entry, CSV import (`title,author` header, one quote per row), in-app "suggest" form (emails `yanairikI@gmail.com`)
- **Interaction**: quotes from books enter the daily rotation unless explicitly excluded
- **Open questions (product decisions required before implementation):**
  - Can a book quote be favorited / disliked independently?
  - Do book quotes count toward the 5-daily-notification pool or are they additive?
  - Is there a per-book toggle to include/exclude from rotation?

**Required before v2:**
- Answers to the open questions above
- Bookshelf screen with: list of books, expand to see quotes, add/remove, import CSV
- Shelf-level toggle: include in rotation yes/no

---

### 4. Systemic Quote Bank Update Routine

The quote database must not be updated ad hoc. Establish a repeatable pipeline:

**Pipeline:**
1. **Scrape** — automated scripts pull from public domain sources (Gutenberg, Wikiquote, Stoic APIs, etc.)
2. **Review** — Claude-assisted curation: filter duplicates, score relevance, tag with category + timeOfDay
3. **PR** — quotes added via pull request (reviewable diff, not a bulk blob)
4. **Merge** — approved quotes merged into `data/quotes.json`; version bump in `app.json`

**Tooling to build:**
- `scripts/scrape_quotes.py` — fetch from approved sources
- `scripts/review_quotes.py` — dedupe, score, auto-tag via Claude API
- `scripts/diff_quotes.py` — generate PR-friendly diff showing additions
- CI check: reject quotes with `text` < 10 chars or without `author`

**Cadence:** monthly scrape, quarterly merge. Interim: manual additions via PR template.

---

### 5. User Data Collection

To improve quote relevance over time, collect opt-in behavioral signals:

**Signals to collect (with user consent):**
- Like / dislike per quote (already stored locally)
- Time-of-day when quote was shown vs. liked
- Category preferences (explicit from settings + implicit from likes)
- Quote completion rate (did user read it or dismiss immediately?)

**Architecture:**
- All collection is opt-in, disclosed in onboarding
- Local-first: signals stored in `AsyncStorage` and exportable
- Optional anonymous upload to Supabase analytics table
- No PII collected without explicit account creation

**Use cases:**
- Tune time-of-day weighting (philosophy in morning vs. evening)
- Surface underliked categories for removal or refresh
- Personalized quote ordering (likes-weighted shuffle)

---

## Phase 0 — Pre-Alpha (Current)

**State:** Web app live at rikiworld.com/refrog-app. Mobile app runs locally. Not distributed.

### What's Shipped
- [x] 5 daily push notifications (local scheduling — random times within configurable window)
- [x] Notification frequency picker (3 / 4 / 5 per day)
- [x] Notification time window picker (8am–8pm or 9am–9pm)
- [x] Quote rotation (philosophy, poetry, humor, spiritual, science — 215 quotes)
- [x] Quote pool cycling (tracks shown IDs; resets when pool exhausted)
- [x] Favorites / journal
- [x] Book Shelf (basic — needs redesign per Critical TODO #3)
- [x] Dislike filter
- [x] Settings page (accordion: notifications, frequency, time window)
- [x] Static web deployment (pure HTML `dist/index.html`)
- [x] Sacred UI reskin (monospace, dark mode, neon-green — Xanh Mono font)
- [x] `timeOfDay` detection in notification service (morning/afternoon/evening/any buckets — not yet used for quote weighting)
- [x] 203 curated death quotes scraped and committed (`scripts/scraper-output/pending-review.json`) — awaiting review + merge

### Must Fix Before Alpha
- [ ] **Bookshelf product decisions** (Critical TODO #3) — answer 3 open questions; blocks all bookshelf implementation
- [ ] **Review and merge pending quotes** — walk `scripts/scraper-output/pending-review.json` (203 entries); assign `id`, `category`, `timeOfDay`; append to `data/quotes.json`
- [ ] **Bug report button** (Critical TODO #1)
- [ ] **JSON export/import** for user data (Critical TODO #2, minimum viable portability)
- [ ] Verify notifications fire reliably on both iOS and Android
- [ ] Add app version number visible in Settings

---

## Phase 1 — Alpha (Mobile Distribution)

**Goal:** Distribute to TestFlight (iOS) and a small Android group. Gather structured feedback.

### Features
- [ ] Bug report button live (GitHub Issues delivery)
- [ ] JSON export/import
- [ ] Notification reliability hardened
- [ ] Quote count: 215 → 300+ (pending-review merge + additional scrape pass)
- [ ] App version displayed in Settings
- [ ] Onboarding screen (1-2 slides: what the app does, opt-in data collection)
- [ ] Crash reporting (Sentry free tier)

### Distribution
- iOS: TestFlight (requires Apple Developer account, $99/yr)
- Android: APK sideload or Google Play internal track

---

## Phase 2 — Beta (Quote Expansion + Sync)

**Goal:** Robust quote database, cross-device data, refined bookshelf.

### Features
- [ ] Quote database: 500+ quotes across 7 categories (add nature + stoicism)
- [ ] Automated scrape pipeline (`scripts/scrape_quotes.py`)
- [ ] Supabase anonymous sync (favorites, dislikes, bookshelf)
- [ ] Bookshelf redesign (per Critical TODO #3 decisions)
- [ ] CSV import for custom quotes
- [ ] ~~Notification frequency setting~~ — **already shipped** (3/4/5 per day picker; expand to 6/7 if demand warrants)
- [ ] Daily quote history view

### Quote Schema v2
```typescript
interface Quote {
  id: string;
  text: string;
  author: string;
  category: QuoteCategory;
  timeOfDay?: TimeOfDay;
  tags?: string[];    // memento-mori, impermanence, gratitude, courage, wisdom, connection
  source?: string;    // book or collection title
  year?: number;
}

type QuoteCategory =
  | 'philosophy' | 'poetry' | 'humor' | 'spiritual'
  | 'science' | 'nature' | 'stoicism';

// TimeOfDay bucket definitions (canonical — matches notificationService.ts getTimeOfDay())
type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'any';
// morning   = 05:00–11:59
// afternoon = 12:00–16:59
// evening   = 17:00–04:59 (wraps midnight)
// any       = shown at any hour (default for untagged quotes)
```

### Notification Scheduling (current implementation)

- **Trigger**: local calendar triggers (non-repeating); rescheduled each time the user opens the app or toggles notifications
- **Spread**: N notifications randomly distributed across the selected time window; collision-resistant (minute-level dedup, up to 50 retries per slot)
- **Quote selection**: random from unshown pool; pool resets when all quotes exhausted
- **Time window options**: 08:00–20:00 (default) or 09:00–21:00
- **Frequency options**: 3, 4, or 5 per day (default 5)
- **timeOfDay weighting**: detection is implemented (`getTimeOfDay()` called at scheduling time) but not yet connected to quote selection — all selection is still random. Connecting this is Phase 3 step 24.
- **Web**: notifications not supported; preference saved to AsyncStorage only
- **Permission flow**: requested on first notification enable; no re-prompt if denied (user must go to system settings)

### Quote Distribution Target

| Category | Current | Target |
|----------|---------|--------|
| philosophy | 140 | 200 |
| poetry | 50 | 100 |
| humor | 20 | 50 |
| spiritual | 12 | 50 |
| science | 5 | 50 |
| nature (new) | 0 | 30 |
| stoicism (new) | 0 | 20 |
| **Total** | **215** | **500** |

*"Current" reflects pre-merge state. After merging `pending-review.json` (203 quotes), counts will update significantly.*

---

## Phase 3 — v1.0 (Design Polish + Data Loop)

**Goal:** Shippable App Store release with refined UX and a data feedback loop.

### Features
- [x] Reskin to Sacred UI terminal aesthetic (monospace, dark mode, neon-green tint)
- [ ] User data collection (opt-in likes/dislikes signals to Supabase)
- [ ] Time-of-day weighted quote selection (morning/afternoon/evening)
- [ ] Share quote (share sheet — text + attribution)
- [ ] Home screen widget (iOS WidgetKit, Android Glance)
- [ ] App Store + Play Store submission

### Reskin Color Mapping (Sacred UI)
```
Current          →  Sacred token
#22c55e          →  var(--color-neon-green-50)
#16a34a          →  var(--color-neon-green-60)
#f0fdf4 (bg)     →  var(--color-neon-green-10)
#ffffff           →  var(--color-white)
#1a1a1a           →  var(--color-black-100)
```
- No new npm deps needed (Sacred is CSS/React patterns)
- Monospace font: validate readability at small sizes before committing

---

## Phase 4 — v2+ (Community + Platform)

- [ ] Community quote submission (in-app form → email or GitHub PR)
- [ ] Mood-based quote selection
- [ ] Streaks / gentle gamification
- [ ] Quote of the day (separate from 5 reminders)
- [ ] Apple Watch / Wear OS support
- [ ] Optional tip jar (no ads — preserves mindfulness intent)
- [ ] Premium icon packs (frog variations)

---

## Deployment

### Web (Current)

- URL: `https://rikiworld.com/refrog-app`
- Artifact: `dist/index.html` (vanilla HTML/CSS/JS)
- CI: GitHub Actions pushes `dist/` on merge to master
- **Known issue**: Expo Router cannot run at a subdirectory path. The `dist/` HTML fallback sidesteps this entirely. See `FAILURE_LOG.md`.

### Mobile

| Store | Requirement | Cost |
|-------|-------------|------|
| iOS App Store | Apple Developer account | $99/yr |
| Google Play | Play Developer account | $25 one-time |

**Build commands:**
```bash
npx expo run:ios
npx expo run:android
```

### Alternate Hosting (if GitHub Pages breaks)
- **Vercel**: `vercel` — handles subdirectory routing automatically
- **Netlify**: `netlify deploy --prod --dir=dist`

---

## Unified Sequence of Tasks

All tasks across all phases in strict execution order. Tasks within a phase can often be parallelized, but are listed in dependency order where ordering matters.

### Phase 0 — Pre-Alpha (Do Now)

1. **Make bookshelf product decisions** — answer 3 open questions: (a) Can book quotes be liked/disliked independently? (b) Do book quotes count toward the 5-notification pool or are they additive? (c) Is there a per-book rotation toggle? Answers block all bookshelf implementation downstream.
2. **Review and merge pending quotes** — walk `scripts/scraper-output/pending-review.json` (203 entries); assign `id` (continuing from current max in `data/quotes.json`), `category`, and `timeOfDay` per entry; append approved entries to `data/quotes.json`.
3. **Add app version to Settings** — expose `expo.version` from `app.json` as a visible field in the Settings screen.
4. **Implement bug report button** — Settings UI + optional long-press on quotes; capture OS/version/last-quote snapshot; deliver to `data/bug_reports/` (local) and GitHub Issues via PAT (PAT never exposed to browser).
5. **Implement JSON export/import** — serialize user data (favorites, dislikes, bookshelf, settings) to/from JSON; accessible via Settings screen.
6. **Verify push notifications** — test 5-daily scheduling on iOS and Android; document any reliability gaps found.

### Phase 1 — Alpha

7. **Build onboarding screen** — 2 slides: (a) what the app does, (b) opt-in disclosure for future data collection.
8. **Integrate Sentry** — free tier crash reporting; verify events appear in dashboard before distributing.
9. **Distribute to TestFlight** — build iOS release, upload, invite pre-alpha testers. (Requires Apple Developer account, $99/yr.)
10. **Distribute to Android** — APK sideload or Google Play internal track for Android testers.
11. **Collect structured feedback** — triage bug report button results + direct outreach into GitHub Issues.

### Phase 2 — Beta

12. **Build scrape pipeline** — implement `scripts/scrape_quotes.py` to pull from Gutenberg, Wikiquote, Stoic APIs, and other approved public-domain sources.
13. **Build review pipeline** — implement `scripts/review_quotes.py`: dedupe against existing `data/quotes.json`, score relevance, auto-tag `category` and `timeOfDay` via Claude API.
14. **Build diff tool** — implement `scripts/diff_quotes.py`: generate PR-friendly diff showing additions only (no deletions, no reformatting noise).
15. **Add CI quote validation** — GitHub Actions check: reject any quote with `text` < 10 chars or missing `author`.
16. **Run first automated scrape** — execute full pipeline; submit additions as PR; merge approved quotes; bump version in `app.json`. Target: 500+ quotes across 7 categories.
17. **Implement Supabase anonymous sync** — favorites, dislikes, bookshelf synced via anonymous session; no account required.
18. **Implement bookshelf redesign** — per decisions from step 1: list of books, expand to see quotes, add/remove quotes, import CSV, shelf-level rotation toggle.
19. **Add CSV import for custom quotes** — accept `title,author` header, one quote per row; validate and merge into user's bookshelf.
20. ~~**Add notification frequency setting**~~ — **DONE** (3/4/5 picker already live in Settings). Expand to 6/7 only if user demand warrants.
21. **Add daily quote history view** — show which quotes were shown on which day; accessible from Journal tab.

### Phase 3 — v1.0

22. ~~**Reskin to Sacred UI**~~ — **DONE** (shipped in Phase 0; Xanh Mono, dark mode, neon-green).
23. **Implement opt-in data collection** — disclose in Settings; collect like/dislike + time-of-day + category signals; write to Supabase analytics table.
24. **Implement time-of-day weighted quote selection** — `getTimeOfDay()` already detects the bucket at scheduling time; connect it to quote selection so morning quotes prefer `morning`/`any`, etc. Bucket definitions: morning 05:00–11:59, afternoon 12:00–16:59, evening 17:00+.
25. **Add share quote** — system share sheet: quote text + author attribution; no custom share card needed for v1.
26. **Build home screen widget** — iOS WidgetKit + Android Glance; displays current/next quote; refreshes on notification trigger.
27. **Submit to App Store** — prepare screenshots, description, privacy policy; submit for App Store review.
28. **Submit to Google Play** — prepare store listing; submit for Play Store review.

### Phase 4 — v2+

29. **Community quote submission** — in-app form that emails `yanairikI@gmail.com` or opens a pre-filled GitHub PR template.
30. **Mood-based quote selection** — user sets mood at open; selection weighted accordingly.
31. **Streaks / gamification** — gentle streak counter for daily app opens; no aggressive nudges.
32. **Quote of the day** — single curated quote separate from the 5 death-reminder notifications.
33. **Apple Watch / Wear OS support** — display current quote on watch face; tap to like.
34. **Optional tip jar** — in-app purchase; no ads.
35. **Premium icon packs** — alternate frog icons as one-time purchases.

---

## Conductor Workflow

**Always run conductor status before any task:**
```bash
python3 scripts/conductor_tools.py status --auto-setup
```

**Day-to-day:**
1. `conductor_status`
2. Update `.conductor/context/PROJECT_CONTEXT.md`
3. Write spec → `.conductor/specs/YYYY-MM-DD-feature-spec.md`
4. Write plan → `.conductor/plans/YYYY-MM-DD-feature-plan.md`
5. Implement and verify

**Sync skills from upstream:**
```bash
conductor_check_updates --repo owner/repo --source-path skills
```
