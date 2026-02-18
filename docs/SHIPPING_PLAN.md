# ReFrog v1 Shipping Plan

## Active Web Patch Plan (February 18, 2026)

Goal: keep GitHub Pages static deployment (`dist/`) while closing missing v1 UX gaps.

1. Restore dedicated **Settings** page in bottom nav.
Status: implemented in static web app (`dist/index.html`).

2. Implement **Bookshelf** feature for saved quote organization.
Status: implemented with shelf creation, quote assignment, quote removal, and shelf deletion.

3. Implement **Dislike** feature for quote filtering.
Status: implemented with persistent disliked IDs, automatic rotation filtering, and reset control in Settings.

4. Keep compatibility with `https://rikiworld.com/refrog-app/`.
Status: preserved (static artifact flow unchanged; features live in `dist/index.html`).

## Deployment Options

### 1. Standalone Mobile App (iOS/Android)

**Build for iOS:**
```bash
npx expo run:ios
```

**Build for Android:**
```bash
npx expo run:android
```

**Requirements:**
- Apple Developer account ($99/year) for iOS App Store
- Google Play Developer account ($25 one-time) for Play Store
- Expo Doctor to verify build configuration

### 2. Web App on rikiworld.com/WEFROG

**Current Setup:**
- Domain: rikiworld.com (GitHub Pages managed)
- Target: rikiworld.com/WEFROG

**Option A: GitHub Pages (Recommended)**
1. Build web version: `npx expo export --platform web`
2. Deploy to GitHub Pages
3. Configure custom domain in GitHub settings
4. Update DNS if needed

**Option B: Vercel (Easier)**
1. Connect repo to Vercel
2. Auto-deploy on push to main
3. Add custom domain in Vercel settings

**Option C: Netlify**
1. `npm install -g netlify-cli`
2. `netlify deploy --prod --dir=dist`
3. Configure domain in Netlify

### 3. Recommended v1 Release Order

1. **Web Version First** (lowest barrier)
   - Deploy to Vercel/Netlify
   - Test thoroughly on mobile browsers
   - Share via rikiworld.com/WEFROG

2. **iOS App** (higher reach)
   - Build with Expo
   - Test on TestFlight
   - Submit to App Store

3. **Android App** (optional, lower priority)
   - Build APK/AAB
   - Publish to Play Store

---

## v2 Feature: Book Shelf

### Overview
Add a "Book Shelf" accordion that lets users:
- Add books (title, author)
- Add quotes from each book
- Import CSV lists of books
- Suggest books/quotes via email

---

## v2+ Feature: Dislike Button

### Overview
Add a dislike button to filter out unwanted quotes.

### Implementation
- Add [DISLIKE] button next to heart
- Store disliked quote IDs in AsyncStorage
- Filter out disliked quotes from rotation
- Option to "undo" or reset dislikes in settings

### Data Structure

```typescript
interface Book {
  id: string;
  title: string;
  author: string;
  quotes: BookQuote[];
  createdAt: number;
}

interface BookQuote {
  id: string;
  text: string;
  page?: number;
  createdAt: number;
}

interface BookSuggestion {
  id: string;
  type: 'book' | 'quote';
  text: string;
  contact?: string;
  createdAt: number;
}
```

### UI Components

1. **Book Shelf Accordion** (new)
   - List of books with [+] button to add
   - Each book shows title, author, quote count
   - Tap to expand and see quotes
   - "Suggest Book/Quotes" button at bottom

2. **Add Book Modal**
   - Title input (required)
   - Author input (optional)
   - CSV import option

3. **Book Detail View**
   - Book info header
   - List of quotes
   - Add quote input

4. **Suggestion Form**
   - Type toggle: [BOOK] / [QUOTE]
   - Text input
   - Optional contact
   - [SEND RECOMMENDATION] button → email to yanairikI@gmail.com

### Implementation Steps

1. Add book service (CRUD operations)
2. Create BookShelfAccordion component
3. Create AddBookModal component
4. Create BookDetail view
5. Create SuggestionForm with email
6. Integrate into main app

### Email Integration

Use React Native Linking to open email:
```typescript
const mailto = `mailto:yanairikI@gmail.com?subject=ReFrog Suggestion&body=${encodeURIComponent(suggestion)}`;
Linking.openURL(mailto);
```

### CSV Import Format

```csv
title,author
"The Alchemist","Paulo Coelho"
"Meditations","Marcus Aurelius"
```

---

## Immediate Next Steps

1. User takes screenshots of app
2. Update README with screenshots
3. Deploy web version to test
4. Build iOS app
5. Implement Book Shelf feature
