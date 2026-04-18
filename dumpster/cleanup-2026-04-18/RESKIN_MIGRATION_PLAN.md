# ReFrog Reskin Migration Plan

## Overview
Migrate ReFrog from current green-themed design to use Sacred UI asset library's terminal aesthetic.

## Current State Analysis

### ReFrog App Structure
| Component | Current Implementation |
|-----------|----------------------|
| Framework | Expo/React Native |
| Navigation | 3-tab layout (Home, Journal, Settings) |
| Styling | StyleSheet API with inline styles |
| Colors | Green theme (#22c55e, #16a34a) |
| Persistence | AsyncStorage |
| Quotes | 215 quotes, 5 categories |

### Sacred UI Assets
| Asset | Description |
|-------|-------------|
| Theme System | CSS variables for light/dark + 7 tint colors |
| Font | Monospace (GeistMono fallback) |
| Components | Button, Input, Select, Modal, Table, etc. |
| Aesthetic | Terminal/retro computer style |

---

## Phase 1: Foundation (Week 1)

### 1.1 Theme System Setup
- [ ] Create `src/theme/` directory
- [ ] Extract Sacred CSS variables to JS constants
- [ ] Implement theme context (light/dark toggle)
- [ ] Add tint color selection (default: green for brand continuity)

### 1.2 Color Mapping
```
Current -> Sacred (tint-green light)
#22c55e -> var(--color-neon-green-50)
#16a34a -> var(--color-neon-green-60)
#f0fdf4 -> var(--color-neon-green-10)
#dcfce7 -> var(--color-neon-green-20)
#ffffff -> var(--color-white)
#1a1a1a -> var(--color-black-100)
```

---

## Phase 2: Component Migration (Week 2)

### 2.1 Tab Navigation
- [ ] Replace Tabs with Sacred-styled bottom navigation
- [ ] Use monospace icons
- [ ] Apply tint colors to active states

### 2.2 Home Screen (Quotes)
- [ ] Card component: add border styling, remove shadows
- [ ] Buttons: convert to Sacred Button component style
- [ ] Typography: switch to monospace, adjust line heights

### 2.3 Journal Screen
- [ ] FlatList: apply Sacred list styling
- [ ] Empty state: add terminal-style messaging

### 2.4 Settings Screen
- [ ] Toggle switches: use Sacred checkbox/switch styling
- [ ] Option buttons: apply Sacred button variants
- [ ] Reset button: use danger tint styling

---

## Phase 3: Advanced Features (Week 3)

### 3.1 Animations
- [ ] Add Sacred's block loader patterns
- [ ] Implement matrix-style loading states

### 3.2 Interactive Elements
- [ ] Add hover/focus states using Sacred patterns
- [ ] Implement keyboard navigation

---

## Technical Implementation Notes

### Key Differences React Native vs Web
1. **CSS Modules** → Use `StyleSheet.create` with extracted constants
2. **CSS Variables** → Create JS theme object, pass via Context
3. **CSS Selectors** → Use React Native Pressable/View states

### Recommended File Structure
```
src/
  theme/
    colors.ts      # Extract Sacred colors
    tokens.ts      # Spacing, typography tokens
    ThemeContext.tsx
  components/
    Button.tsx     # Sacred-style button
    Card.tsx      # Quote card
    Toggle.tsx    # Settings toggle
    ...
  screens/
    index.tsx     # Home
    journal.tsx   # Journal
    settings.tsx  # Settings
```

### Dependencies to Add
- none required (Sacred is CSS/React patterns, not npm package)

---

## Risk Mitigation
1. **Monospace font**: Test readability on mobile; may need larger font sizes
2. **Terminal aesthetic**: Balance retro feel with usability
3. **Dark mode**: Essential for terminal aesthetic; prioritize implementation

---

## Success Criteria
- [ ] All screens maintain current functionality
- [ ] Dark mode fully implemented
- [ ] Brand green tint preserved (continuity)
- [ ] Monospace typography throughout
- [ ] Responsive to all screen sizes
