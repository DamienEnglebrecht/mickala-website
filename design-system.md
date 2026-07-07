# Mickala Design System — Industrial Specification Sheets

## Core Philosophy

"Engineered precision." Every pixel should feel intentional, machined, tested. A Mickala spec sheet should feel like walking up to the equipment itself — solid, capable, no bullshit.

---

## 1. Typography

### Font Stack
- **Headings:** Inter Bold (or system sans-serif bold)
- **Body:** Inter Regular (or system sans-serif regular)
- **Numbers/Data:** JetBrains Mono or system monospace (tabular figures)
- **Labels:** Inter Medium, uppercase, tracked 0.08em

### Size Scale
| Purpose | Size | Weight | Tracking | Case |
|---------|------|--------|----------|------|
| Hero Number (e.g. 2,000L) | 72px | 700 | -0.03em | — |
| Section Title | 28px | 700 | -0.02em | — |
| Spec Value | 16px | 600 | 0 | — |
| Spec Label | 11px | 500 | 0.08em | Uppercase |
| Body | 14px | 400 | 0 | — |
| Feature Title | 13px | 600 | 0 | — |
| Footnotes | 11px | 400 | 0 | — |

### Line Height
- Headings: 1.1
- Body: 1.6
- Specs: 1.4

---

## 2. Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Black | #0A0A0A | Backgrounds |
| Dark Grey | #1A1A1A | Card/panel backgrounds |
| Mid Grey | #2A2A2A | Borders, dividers |
| Text Primary | #F5F5F5 | Main body text |
| Text Secondary | #888888 | Labels, secondary info |
| Text Tertiary | #555555 | Disabled, footnotes |
| Accent | #DC2626 | Red — key data highlights, CTAs |
| Accent Hover | #B91C1C | Red hover state |
| Accent Subtle | rgba(220,38,38,0.1) | Red tint for subtle accents |
| Green | #22C55E | Positive indicators, compliance |
| White (bg) | #FFFFFF | Print mode |

**Rule of thumb for this palette:** The page should read as 90% black/white/grey with 10% red accent. Red is for emphasis, not decoration.

---

## 3. Layout & Grid

### Grid
- 12-column grid on desktop, 4-col on mobile
- Gutters: 24px (desktop), 16px (mobile)
- Max content width: 1200px

### Spacing Scale
| Token | Value | Usage |
|-------|-------|-------|
| Space-1 | 4px | Micro spacing |
| Space-2 | 8px | Tight grouping |
| Space-3 | 12px | Label-to-value gap |
| Space-4 | 16px | Card padding, row gap |
| Space-5 | 24px | Section padding, grid gap |
| Space-6 | 32px | Between major elements |
| Space-7 | 48px | Section bottom margin |
| Space-8 | 64px | Between sections |
| Space-9 | 96px | Hero bottom margin |

### Section Structure
Every section follows:
1. Eyebrow label (11px uppercase tracked)
2. Section title (28px bold)
3. Optional subtitle (14px secondary)
4. Content (with consistent internal spacing)
5. Bottom margin (64px)

---

## 4. Component Styles

### Spec Table
```
┌─────────────────────────────────────┐
│ CAPACITY                   2,000 L  │
│ TANK DESIGN                Tank in  │
│                            Tank     │
│ AXLE                       3 Tonne  │
│ PUMP                       12V Elec │
│ HOSE                       15m      │
└─────────────────────────────────────┘
```
- Alternating row background (or no fill, just clean spacing)
- Label: left-aligned, 11px uppercase tracked, secondary color
- Value: right-aligned or left-aligned with gap, 16px semibold, primary color
- No vertical borders. Horizontal hairline rule (1px, mid-grey) between rows
- Row padding: 12px 0

### Feature Grid Item
```
┌─────────────────────┐
│ 12 Months Warranty  │
│ Full manufacturer's │
│ warranty covering   │
│ defects.           │
└─────────────────────┘
```
- No icon (or minimal 16px icon)
- Title: 13px semibold
- Description: 13px secondary
- Padding: 16px
- No border (or thin 1px hairline)
- 3-column grid on desktop

### Model Selector
```
[MFT1100] [MFT2000]
```
- Clean pill tabs
- Active: filled red, white text
- Inactive: transparent, grey text, grey border
- No oversized buttons — compact and functional

### Hero
- Full-bleed image with dark gradient overlay (bottom 40%)
- No decorative elements
- Model name and one-line description only
- Optional: key stat overlayed (e.g., "2,000L capacity")

### Comparison Table
```
┌──────────────┬──────────┬──────────┐
│              │ MFT1100  │ MFT2000  │
├──────────────┼──────────┼──────────┤
│ Capacity     │ 1,100 L  │ 2,000 L  │
│ Pump         │ 12V Elec │ 12V Elec │
│ Axle         │ 3 Tonne  │ 3 Tonne  │
│ Warranty     │ 12 Mo    │ 12 Mo    │
└──────────────┴──────────┴──────────┘
```
- Clean bordered table
- Sticky header row
- Zebra striping optional
- Row hover: subtle highlight

---

## 5. Photography Principles

- **Hero:** Full-bleed, high-res, product in natural environment (mine site, construction site)
- **Detail shots:** Clean studio lighting, white/grey background, product straight-on
- **On-site photos:** Real environments, not staged. Show the product working.
- **Image ratio:** 16:9 for hero, 4:3 for detail shots, 1:1 for thumbnails
- **No decorative overlays on images** — let the photo speak

---

## 6. Print Stylesheet

The spec sheet MUST look professional when printed:
- White background, black text
- No interactive elements visible
- Clean table formatting with visible borders
- Header/footer with document name, page number, date
- QR code or URL for digital version

---

## 7. What NOT to Do

- ❌ No oversized icons (48px+ for features)
- ❌ No heavy borders (2px+)
- ❌ No gimmicky animations (fade, slide, bounce)
- ❌ No walls of text — spec sheets are data-first
- ❌ No click-to-expand features on a spec sheet
- ❌ No gradient backgrounds
- ❌ No decorative patterns or textures
- ❌ No social media share buttons
- ❌ No "interactive" gimmicks that don't add value
- ❌ No more than 2 font sizes per section

---

## 8. Quality Checklist

Before publishing any spec sheet page:

- [ ] Does this look as good printed as on screen?
- [ ] Is every spec value clearly labeled?
- [ ] Could someone print this and hand it to a client?
- [ ] Is the red accent used less than 10% of the page?
- [ ] Are all borders/hairlines 1px?
- [ ] Is breathing space consistent throughout?
- [ ] Could a client find the answer to "what size/weight/capacity" in under 3 seconds?
- [ ] Would a Caterpillar engineer consider this professional?

---

This is the standard I'll hold myself to going forward.
