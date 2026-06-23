---
name: Data Architect Editorial
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c3c9b2'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8d937e'
  outline-variant: '#434938'
  surface-tint: '#a4d64c'
  primary: '#fefff1'
  on-primary: '#233600'
  primary-container: '#bef264'
  on-primary-container: '#4b6e00'
  inverse-primary: '#476800'
  secondary: '#c6c6c7'
  on-secondary: '#2f3131'
  secondary-container: '#454747'
  on-secondary-container: '#b4b5b5'
  tertiary: '#fcffff'
  on-tertiary: '#313030'
  tertiary-container: '#e4e1e0'
  on-tertiary-container: '#646363'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#bff365'
  primary-fixed-dim: '#a4d64c'
  on-primary-fixed: '#131f00'
  on-primary-fixed-variant: '#354e00'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474746'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-xl:
    fontFamily: Space Grotesk
    fontSize: 80px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  display-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.05em
  mono-code:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

This design system targets high-end technical recruitment and enterprise partnerships for data product developers. The aesthetic is "Technical Editorial"—a fusion of high-fashion typography with the rigorous precision of developer tools. It leverages **Minimalism** and **High-Contrast Bold** styles to communicate authority, clarity, and cutting-edge technical proficiency.

The emotional response should be one of "effortless complexity": the interface feels expansive and simple, while the content reveals deep technical sophistication. The system prioritizes content density within structured "Bento" containers, creating a visual rhythm that mimics high-performance data dashboards.

## Colors

The palette is anchored in a high-contrast dark-mode foundation. The base surface is a deep, near-black (`#0e0e0e`), providing a void-like backdrop that allows content to pop. The primary accent is an electric, high-visibility lime-green (`#bef264`), used exclusively for calls-to-action, status indicators, and critical highlights.

- **Primary:** Electric Lime (#bef264) — Interaction and emphasis.
- **Surface:** Obsidian (#0e0e0e) — Primary background.
- **Elevated Surface:** Graphite (#1a1a1a) — Card and container backgrounds.
- **Content:** Off-White (#f9f9f9) — Primary text and icons.
- **Muted:** Slate-Grey (#888888) — Secondary information and borders.

## Typography

The typography system pairs **Space Grotesk** for expressive, geometric headings with **Geist** for ultra-clean, technical body copy. 

Headings should use tight letter-spacing to create a "blocky" editorial feel. Body text leverages the monospaced-adjacent aesthetic of Geist to reinforce the developer persona. Large display type should be treated as a graphic element, often overlapping container boundaries or using extreme weights to anchor the page.

## Layout & Spacing

This design system utilizes a **Bento Grid** philosophy based on a 12-column fluid grid for desktop and a single-column flow for mobile. 

- **Grid:** Use 24px gutters. Elements should snap to a rigorous 4px baseline grid.
- **Margins:** Desktop views require generous side margins (minimum 80px) to maintain the editorial "island" feel.
- **Bento Pattern:** Content should be grouped into cards of varying aspect ratios (1x1, 2x1, 2x2) that tile seamlessly. Large sections of whitespace are encouraged between major narrative blocks to provide visual "breathing room."

## Elevation & Depth

Depth is achieved through **Tonal Layers** and **Low-Contrast Outlines** rather than heavy shadows.

- **Level 0 (Background):** #0e0e0e.
- **Level 1 (Cards/Sections):** #1a1a1a background with a 1px solid border of #2a2a2a.
- **Level 2 (Hover/Active):** Subtle 1px solid border of #bef264 or #444444.
- **Shadows:** Use a single, highly diffused "Ambient Shadow" for floating elements (e.g., tooltips): `0 20px 40px rgba(0,0,0,0.5)`. No shadows should be used on standard bento cards to maintain the flat, architectural look.
- **Blurs:** Use a 12px backdrop-blur on navigation bars to create a glass effect over content while scrolling.

## Shapes

The shape language is "Engineering Precision." While corners are not sharp, the radius is minimal (`0.25rem` to `0.75rem`) to maintain a serious, structured appearance. 

- **Standard Containers:** 8px (0.5rem) radius.
- **Interactive Elements:** (Buttons/Inputs) 4px (0.25rem) radius for a "tool-like" feel.
- **Large Sections:** 12px (0.75rem) for major bento-box wrappers.

## Components

### Buttons
- **Primary:** Background #bef264, Text #0e0e0e, Bold weight. Sharp 4px corners. No shadow.
- **Ghost:** Border 1px #2a2a2a, Text #f9f9f9. On hover, background becomes #1a1a1a.

### Cards (Bento)
All cards must have a 1px border (#2a2a2a) and a subtle background gradient (Top-Left #1a1a1a to Bottom-Right #121212). Padding should be a consistent 24px or 32px.

### Inputs
Dark backgrounds (#0e0e0e) with a 1px #2a2a2a border. On focus, the border changes to #bef264 with no outer glow. Typography is `mono-code`.

### Chips / Tags
Small, all-caps labels using #1a1a1a background and #888888 text. Used for "Tech Stack" or "Category" identifiers.

### Data Visualization
Charts and graphs must use the Primary Accent (#bef264) for data lines and #f9f9f9 for axes. Avoid multi-color palettes; use opacity of the primary color to represent different data series.