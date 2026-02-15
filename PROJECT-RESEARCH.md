# ReFrog App (WeFrog) — Project Research

> Status: Initial research (agents failed mid-run, needs deeper web research)

## Concept

A **free clone of WeCroak** — the app that sends you 5 daily reminders that you're going to die, paired with a quote. Key differentiators:

- **Free** (WeCroak costs ~$5 one-time)
- **Relevant quotes** — curated/contextual quotes instead of random ones
- Frog-themed branding ("WeFrog" 🐸)

## WeCroak Analysis (the app we're cloning)

### What WeCroak does
- Based on a Bhutanese saying: "To be a happy person, one must contemplate death 5 times daily"
- Sends 5 push notifications per day at random intervals
- Each notification opens to a quote about mortality/life/meaning
- Minimalist design, calming aesthetic
- Available on iOS and Android (~$4.99)

### WeCroak's limitations (our opportunities)
- Quotes feel random and disconnected
- No personalization
- Costs money for a simple concept
- No community features
- Static quote database
- No theming or customization

## Differentiators for WeFrog

1. **Free** — Remove the paywall barrier entirely
2. **Relevant quotes** — Curated by theme, mood, or context:
   - Time-of-day appropriate (morning motivation vs evening reflection)
   - Seasonal/situational relevance
   - Categorized: philosophy, poetry, humor, spiritual, scientific
   - Option to favorite and revisit quotes
3. **Frog theme** — Playful branding that softens the mortality topic
4. **Personalization** — Choose quote categories you resonate with

## Technology Stack Options

### Mobile (primary platform)
- **React Native / Expo** — Cross-platform, fast development, large ecosystem
- **Flutter** — Cross-platform, beautiful animations for quote display
- **Swift (iOS) + Kotlin (Android)** — Native, best notification handling
- **Recommendation**: React Native/Expo for MVP speed

### Backend
- **Supabase** — Free tier, auth, database, real-time (great for quotes DB)
- **Firebase** — Push notifications (FCM), free tier generous
- **Simple JSON + local storage** — If quotes are bundled with app

### Push Notifications
- **Firebase Cloud Messaging (FCM)** — Cross-platform
- **Apple Push Notification Service (APNs)** — iOS native
- **Expo Notifications** — If using Expo (simplest)
- **Local notifications** — No server needed, schedule 5 random times daily

### Quote Management
- Local SQLite database with bundled quotes
- Remote API for quote updates without app store releases
- AI-assisted quote curation/categorization

## Feature Ideas

### MVP (Phase 1)
- [ ] 5 daily push notifications at random times
- [ ] Each notification opens a relevant quote
- [ ] Minimalist, calming UI with frog theme
- [ ] Quote categories (philosophy, poetry, humor, etc.)
- [ ] Basic settings (notification times window, e.g., 8am-10pm)
- [ ] Curated quote database (200+ quotes)

### Phase 2
- [ ] Favorite quotes / quote journal
- [ ] Share quotes (social, messages)
- [ ] Daily quote history
- [ ] Notification frequency customization (3-7 per day)
- [ ] Dark/light theme with frog aesthetics
- [ ] Widget for home screen

### Phase 3
- [ ] Quote submission from community
- [ ] Mood-based quote selection
- [ ] Streaks / gentle gamification
- [ ] Quote of the day (separate from reminders)
- [ ] Apple Watch / Wear OS support

## Architecture (React Native / Expo)

```
refrog-app/
├── app/                      # Expo Router screens
│   ├── (tabs)/               # Tab navigation
│   │   ├── index.tsx         # Home / latest quote
│   │   ├── journal.tsx       # Quote history & favorites
│   │   └── settings.tsx      # Preferences
│   └── quote/[id].tsx        # Full quote view
├── components/               # UI components
│   ├── QuoteCard.tsx
│   ├── FrogAnimation.tsx
│   └── NotificationBell.tsx
├── services/
│   ├── notifications.ts      # Schedule daily reminders
│   ├── quotes.ts             # Quote fetching & categorization
│   └── storage.ts            # Local persistence
├── data/
│   └── quotes.json           # Bundled quote database
├── assets/                   # Frog illustrations, fonts
└── constants/                # Theme, config
```

## Quote Relevance Strategy

Instead of random quotes, make them relevant by:
1. **Time-based**: Morning quotes = energizing, evening = reflective
2. **Category matching**: User selects preferred themes
3. **Seasonal**: Winter solstice, spring renewal, etc.
4. **Progressive**: Start lighter, gradually deeper over weeks
5. **No repeats**: Track shown quotes, cycle through full database

## Monetization (keeping it free)

- No ads (defeats the purpose of mindful reflection)
- Optional tip jar / "buy me a coffee"
- Premium icon packs (frog variations)
- Entirely free is fine if it's a passion project

## Next Steps

- [ ] Deep research on WeCroak's exact UX flow
- [ ] Curate initial quote database (200+ categorized quotes)
- [ ] Set up Expo project
- [ ] Implement local notification scheduling
- [ ] Design frog-themed UI
- [ ] Test notification reliability on iOS + Android
