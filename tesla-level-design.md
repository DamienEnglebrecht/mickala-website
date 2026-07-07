# Mickala Website — Tesla/Apple Level Design Guide

## Core Philosophy

"Confidence through restraint." The best industrial brands don't shout. Caterpillar, Komatsu, Sandvik — their sites are clean, minimal, and let the product speak. Tesla and Apple do the same but for consumer products. The principles are identical.

---

## What I Learned From Tesla & Apple

| Principle | Tesla/Apple | Mickala Before | Mickala After |
|-----------|-------------|----------------|---------------|
| **Hero** | Full-screen product shot, minimal text | Card with gradient overlay | Full-viewport product photo |
| **Text density** | Short, confident statements | Paragraphs of description | One line, one idea |
| **Typography** | Massive headings (80px+), light weight | 28px headers, bold everywhere | 64-96px headings, restrained |
| **Colors** | 95% monochrome, 5% accent | Red everywhere | Black/white/grey, tiny red accent |
| **Navigation** | Barely visible, sticky | Full menu, loud | Thin sticky bar, subtle |
| **Specs** | Big numbers with labels | Tables in cards | Clean rows, side by side |
| **Features** | Simple bullet list | Cards with icons | Red dot + text |
| **Motion** | Subtle scroll reveals, 3D configurators | No motion | Hover zooms, smooth transitions |
| **Borders** | Hairline 0.5px | 1-2px visible borders | `0.5px white/[0.06]` |

---

## The Design Language (Applied to Fuel Trailers)

### New Page Structure
```
1. STICKY NAV ── Overview | Specs | Features | Gallery | Call
   (barely visible, 40px tall, backdrop blur)

2. HERO ── 100vh full-bleed product photo
   Model name in 80px+ font
   One-line description
   Nothing else

3. STAT STRIP ── 4 key facts in a clean row
   (Models | Capacity | Containment | Warranty)

4. SPECS ── Side-by-side model comparison
   Left: context paragraph
   Right: clean alternating rows

5. FEATURES ── Simple bullet list
   "Everything you need. Nothing you don't."
   Red dots, no icons

6. GALLERY ── 3 photos in clean grid

7. CTA ── Minimal: phone / quote link

8. FOOTER ── Thin, text only
```

### Typography Scale
```
H1 hero:   80px / 6xl  → "MFT1100 MFT2000"
H2:        48px / 5xl   → "Built for the toughest sites."
H3:        24px / 2xl   → Model names
Body:      14px / base  → Context paragraphs
Label:     11px / xs    → Uppercase tracked labels
```

### Production sites in qld and nsw

Take this and apply it to every page on the site. Start with the pages that customers see first.
