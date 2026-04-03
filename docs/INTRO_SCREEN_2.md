# Intro Screen 2: iDataMind Logo

## Overview
The second intro screen displays the iDataMind logo with an "Associated with" label and a warm (orange) glow accent.

## Display Timing
- **Start After**: Screen 1 completes (2000ms from intro start)
- **Duration**: 2000ms (2 seconds)
- **Transition In**: 550ms fade + scale-up
- **Auto-advance To**: Screen 3 after 4000ms total

## Visual Elements

### Background
- **Base Color**: `#050508` (dark navy-black, same as Screen 1)
- **Glow Effect**: Warm (orange) radial gradient
  - Center: `rgba(251,146,60,0.22)` (warm orange tone)
  - Fade to transparent at 60%
- **Particles**: ParticleField with 18 animated stars (same as Screen 1)

### Label ("Associated with")
- **Text**: "Associated with"
- **Font**: `font-mono` (monospace)
- **Size**: `text-xs sm:text-sm` (responsive)
- **Color**: `rgba(255,255,255,0.8)` (off-white)
- **Text Shadow**: `0 0 16px rgba(255,255,255,0.4)`
- **Spacing**: `tracking-[0.2em]` (0.2em letter-spacing)
- **Margin Bottom**: `12px` from logo
- **Animation**: 
  - Hidden: `opacity: 0, y: 10, scale: 0.99`
  - Visible: `opacity: 1, y: 0, scale: 1`
  - Duration: 680ms, easeOut

### Image (iDataMind Logo)
- **Source**: `/idatamind.png`
- **Alt Text**: "iDataMind"
- **Responsive Width**:
  - Mobile: `w-[75vw]`
  - Tablet: `sm:w-[65vw]`
  - Desktop: `lg:w-[50vw] max-w-[44rem]`
- **Filter/Effects**:
  - Drop Shadow: `drop-shadow(0 0 7px rgba(255,255,255,0.65)) drop-shadow(0 0 14px rgba(255,255,255,0.35))`
  - (Same white drop-shadow as RIT logo)
- **Image Rendering**: `auto` (not high-quality)
- **Clip Path**: None (full image displayed)
- **Animation**:
  - Hidden: `opacity: 0, scale: 0.9, blur: 4px`
  - Visible: `opacity: 1, scale: 1, blur: 0px`
  - Duration: 550ms, easeOut

## Animation Variants

### Shell Variants (Container)
```javascript
{
  hidden: { opacity: 0 },
  visible: { opacity: 1, duration: 0.3, ease: 'easeOut' },
  exit: { opacity: 0, scale: 1.005, duration: 0.45, ease: 'easeInOut' }
}
```

### Content Variants (Section)
```javascript
{
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'easeOut' },
  exit: { opacity: 0, y: -8, scale: 1.01, duration: 0.24, ease: 'easeInOut' }
}
```

### Label Variants
```javascript
{
  hidden: { opacity: 0, y: 10, scale: 0.99 },
  visible: { opacity: 1, y: 0, scale: 1, duration: 0.68, ease: 'easeOut' },
  exit: { opacity: 0, y: -7, scale: 1.01, duration: 0.24, ease: 'easeInOut' }
}
```

### Logo Variants
```javascript
{
  hidden: { opacity: 0, scale: 0.9, filter: 'blur(4px)' },
  visible: { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.55, ease: 'easeOut' }
}
```

## Component Props
```typescript
<LogoScreen
  imageSrc="/idatamind.png"
  imageAlt="iDataMind"
  label="Associated with"
  accent="warm"  // Creates warm orange glow
/>
```

## Accent System
The `accent` prop determines the glow color:
- **`"lime"`** (default): Creates `rgba(200,250,100,0.22)` glow (lime-green)
- **`"warm"`** (this screen): Creates `rgba(251,146,60,0.22)` glow (warm orange)

```javascript
const glowClass = accent === 'lime'
  ? 'bg-[radial-gradient(circle,rgba(200,250,100,0.22),transparent_60%)]'
  : 'bg-[radial-gradient(circle,rgba(251,146,60,0.22),transparent_60%)]'
```

## Layout Structure
```
┌─ Motion Div (Shell) ─────────────────────────────────┐
│  ┌─ ParticleField (Background) ──────────────────┐  │
│  │  - Radial gradients (warm orange tone)        │  │
│  │  - 18 animated particles                       │  │
│  └────────────────────────────────────────────────┘  │
│                                                       │
│  ┌─ SkipForward Button ─────────────────────────┐   │
│  │  Top-right corner, z-index: 20               │   │
│  └────────────────────────────────────────────────┘  │
│                                                       │
│  ┌─ Motion Section (Content) ───────────────────┐   │
│  │  ┌─ Glow Container ──────────────────────┐   │   │
│  │  │  (Warm orange radial gradient)        │   │   │
│  │  └───────────────────────────────────────┘   │   │
│  │                                               │   │
│  │  ┌─ Label ("Associated with") ───────────┐   │   │
│  │  │  Animation: fade in, slide up         │   │   │
│  │  └───────────────────────────────────────┘   │   │
│  │                                               │   │
│  │  ┌─ iDataMind Logo Image ─────────────────┐  │   │
│  │  │  Animation: blur unblur, scale         │  │   │
│  │  │  Drop shadows for glow effect          │  │   │
│  │  └───────────────────────────────────────┘  │   │
│  └────────────────────────────────────────────────┘  │
│                                                       │
└─────────────────────────────────────────────────────┘
```

## CSS Classes
- Container: `fixed inset-0 z-1000 overflow-hidden bg-[#050508] text-white`
- ParticleField: `absolute inset-0 overflow-hidden`
- Label: `font-mono text-center uppercase tracking-[0.2em] relative z-30`
- Logo Wrapper: `relative flex items-center justify-center sm:mx-auto` with width sizing
- Image: `h-auto w-full max-w-full object-contain`

## Skip Button
- **Position**: Top-right (right-4, top-4 on mobile; right-6, top-6 on desktop)
- **Styling**: Rounded-full border with white/12, glass-morphism backdrop
- **Icon**: SkipForward (14px) + "Skip" text
- **Hover**: Changes border to lime-300/40, bg to lime-300/10, text to lime-100

## Color Palette
| Element | Color | Usage |
|---------|-------|-------|
| Background | `#050508` | Base screen background |
| Glow Center | `rgba(251,146,60,0.22)` | Warm orange glow centerpoint |
| Text | `rgba(255,255,255,0.8)` | Label text color |
| Text Shadow | `rgba(255,255,255,0.4)` | Label text glow |
| Drop Shadow | `rgba(255,255,255,0.65)` + `0.35` | Multi-layer white shadow on logo |

## Responsive Sizing
The iDataMind logo uses a different width calculation than the other logos:
- Not based on `min()` with viewport width
- Uses simpler percentage-based approach
- `w-[75vw]` on mobile (75% of viewport width)
- `sm:w-[65vw]` on tablet (65% of viewport width)
- `lg:w-[50vw] max-w-[44rem]` on desktop (50% or max 44rem)

## Notes
- This is the **second screen** in the 3-screen intro sequence
- The warm orange glow creates a distinct visual identity for iDataMind
- Screen automatically advances after 2 seconds (4000ms from intro start)
- Can be skipped at any time with the "Skip" button
- Image source file must exist at `public/idatamind.png`

