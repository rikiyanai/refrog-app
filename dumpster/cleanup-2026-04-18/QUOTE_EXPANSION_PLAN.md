# Quote Database Expansion Plan

## Current State

### Quote Distribution
| Category | Current Count | Percentage |
|----------|--------------|------------|
| philosophy | ~140 | 65% |
| poetry | ~50 | 23% |
| humor | ~20 | 9% |
| spiritual | ~12 | 5% |
| science | ~5 | 2% |
| **Total** | **215** | 100% |

### Current Schema
```typescript
interface Quote {
  id: string;
  text: string;
  author: string;
  category: QuoteCategory;
  timeOfDay?: TimeOfDay;
}

type QuoteCategory = 'philosophy' | 'poetry' | 'humor' | 'spiritual' | 'science';
type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'any';
```

---

## Expansion Goals

### Target: 500+ quotes (2.3x growth)
| Category | Current | Target | New Needed |
|----------|---------|--------|------------|
| philosophy | 140 | 200 | 60 |
| poetry | 50 | 100 | 50 |
| humor | 20 | 50 | 30 |
| spiritual | 12 | 50 | 38 |
| science | 5 | 50 | 45 |
| **NEW: nature** | 0 | 30 | 30 |
| **NEW: stoicism** | 0 | 20 | 20 |
| **Total** | 215 | 500 | 273 |

---

## Phase 1: New Categories (Week 1)

### 1.1 Add "nature" category
Quotes about nature, seasons, animals, environment
- **Sources**: Nature poets (Mary Oliver, Whitman, Dickinson), environmental philosophers
- **Examples**: 
  - "In every walk with nature one receives far more than he seeks" - John Muir
  - "The earth has music for those who listen" - Shakespeare

### 1.2 Add "stoicism" category
Dedicated to Stoic philosophy (distinct from general philosophy)
- **Sources**: Marcus Aurelius, Seneca, Epictetus (already have many), modern Stoics
- **Examples**:
  - "We suffer more often in imagination than in reality" - Seneca
  - "Man is not worried by real problems so much as by his imagined anxieties" - Epictetus

---

## Phase 2: Category Expansion (Week 2)

### 2.1 Philosophy (60 new)
Focus areas:
- Modern philosophers (Camus, Sartre, Kierkegaard)
- Eastern philosophy (Confucius, Buddha, Lao Tzu)
- Women philosophers (Simone de Beauvoir, Hannah Arendt)

### 2.2 Poetry (50 new)
Focus areas:
- More classic poets (Rumi, Hafez, Dickinson)
- Modern poets (Maya Angelou, Rupi Kaur)
- Haiku and short form

### 2.3 Humor (30 new)
- More contemporary humor
- Death-related jokes (fitting app theme)
- Grateful Dead references (if applicable)

### 2.4 Spiritual (38 new)
- Non-Christian spiritual quotes
- Buddhist wisdom
- Indigenous wisdom
- Interfaith sources

### 2.5 Science (45 new)
- Physics (Einstein, Feynman)
- Biology (Darwin, Jane Goodall)
- Astronomy (Sagan, Tyson)
- Mathematics

---

## Phase 3: Enhanced Schema (Week 3)

### 3.1 Add Tags
```typescript
interface Quote {
  id: string;
  text: string;
  author: string;
  category: QuoteCategory;
  timeOfDay?: TimeOfDay;
  tags?: string[];        // NEW: for filtering
  source?: string;       // NEW: book/title
  year?: number;         // NEW: quote year
}
```

### 3.2 New Tags to Implement
- `memento-mori` - death awareness
- `impermanence` - change/transition
- `gratitude` - thankfulness
- `courage` - bravery
- `wisdom` - life lessons
- `connection` - relationships

---

## Phase 4: Data Management (Week 4)

### 4.1 Split into Multiple Files
```
data/
  quotes/
    index.ts       # exports all
    philosophy.ts
    poetry.ts
    humor.ts
    spiritual.ts
    science.ts
    nature.ts
    stoicism.ts
```

### 4.2 Add Search/Filter Functions
```typescript
export function getQuotesByTag(tag: string): Quote[]
export function getQuotesByAuthor(author: string): Quote[]
export function getQuotesByYearRange(start: number, end: number): Quote[]
```

---

## Implementation Priority

1. **P0**: Add nature & stoicism categories (new content)
2. **P1**: Expand each existing category by 50%
3. **P2**: Add tags to schema (enable better filtering)
4. **P3**: Split into multiple files (maintainability)

---

## Data Sources

### Recommended Books/Collections
- Meditations - Marcus Aurelius
- Letters from a Stoic - Seneca
- The Art of War - Sun Tzu
- Tao Te Ching - Lao Tzu
- Dhammapada - Buddha
- Complete Poetry - Emily Dickinson
- Leaves of Grass - Walt Whitman
- Devotions - Mary Oliver
- The Stranger - Camus
- Man's Search for Meaning - Viktor Frankl

### Websites
- Goodreads quote collections
- BrainyQuote
- QuoteGarden
- Stoic quotes databases

---

## Success Criteria
- [ ] Minimum 500 quotes
- [ ] 7 categories implemented
- [ ] Tag filtering functional
- [ ] Source attribution for all quotes
- [ ] Balanced distribution (no category < 20)
