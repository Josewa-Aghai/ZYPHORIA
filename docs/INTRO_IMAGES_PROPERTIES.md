# Intro Sequence - Image Files & Properties

## Image File Summary

### Screen 1: RIT Logo
| Property | Value |
|----------|-------|
| **File Path** | `/public/ritlogo.png` |
| **Size (Responsive)** | Mobile: min(80vw, 28rem) / Tablet: min(70vw, 32rem) / Desktop: min(55vw, 36rem) |
| **Glow Color** | White (`rgba(255,255,255,0.x)`) |
| **Glow Accent** | lime (default) |
| **Clip Path** | None (full image) |
| **Filter** | `drop-shadow(0 0 7px rgba(255,255,255,0.65)) drop-shadow(0 0 14px rgba(255,255,255,0.35))` |
| **Image Rendering** | high-quality |
| **Mix Blend Mode** | None |
| **Display Duration** | 2000ms |
| **Label** | "Presented by" |
| **Alt Text** | "Rajalakshmi Institute of Technology" |

### Screen 2: iDataMind Logo
| Property | Value |
|----------|-------|
| **File Path** | `/public/idatamind.png` |
| **Size (Responsive)** | Mobile: 75vw / Tablet: 65vw / Desktop: min(50vw, 44rem) |
| **Glow Color** | Warm Orange (`rgba(251,146,60,0.22)`) |
| **Glow Accent** | warm |
| **Clip Path** | None (full image) |
| **Filter** | `drop-shadow(0 0 7px rgba(255,255,255,0.65)) drop-shadow(0 0 14px rgba(255,255,255,0.35))` |
| **Image Rendering** | auto |
| **Mix Blend Mode** | None |
| **Display Duration** | 2000ms |
| **Label** | "Associated with" |
| **Alt Text** | "iDataMind" |

### Screen 3: Zyphoria Logo
| Property | Value |
|----------|-------|
| **File Path** | `/public/zyphoria.png` |
| **Size (Responsive)** | Mobile: min(92vw, 44rem) / Tablet: min(84vw, 52rem) / Desktop: min(72vw, 58rem) |
| **Glow Color** | Lime Green (`rgba(200,250,100,0.22)` / `#C8FA64`) |
| **Glow Accent** | lime |
| **Clip Path** | `inset(32% 11% 34% 11%)` (crops image for focus) |
| **Filter** | `brightness(1.07) saturate(1.05) contrast(1.08) drop-shadow(0 0 10px rgba(200,250,100,0.28))` |
| **Image Rendering** | auto |
| **Mix Blend Mode** | lighten (additive blend) |
| **Display Duration** | 2300ms (longest) |
| **Label** | None |
| **Alt Text** | "Zyphoria '26" |

## Responsive Sizing Details

### RIT Logo Width Breakpoints
```
Mobile:  w-[min(80vw, 28rem)]      → 80% of viewport, max 28rem
Tablet:  sm:w-[min(70vw, 32rem)]  → 70% of viewport, max 32rem
Desktop: lg:w-[min(55vw, 36rem)]  → 55% of viewport, max 36rem
```

### iDataMind Logo Width Breakpoints
```
Mobile:  w-[75vw]           → 75% of viewport width
Tablet:  sm:w-[65vw]        → 65% of viewport width
Desktop: lg:w-[50vw] max-w-[44rem]  → 50% or max 44rem
```

### Zyphoria Logo Width Breakpoints
```
Mobile:  w-[min(92vw, 44rem)]      → 92% of viewport, max 44rem ⭐ LARGEST
Tablet:  sm:w-[min(84vw, 52rem)]  → 84% of viewport, max 52rem
Desktop: lg:w-[min(72vw, 58rem)]  → 72% of viewport, max 58rem
```

**Note**: Zyphoria logo uses the largest percentages and is given the most screen real estate, emphasizing its importance as the main event.

## Image Height Calculation
All three images use:
```css
h-auto  /* Auto height based on aspect ratio */
```
This preserves the aspect ratio of each logo while scaling width.

## Common Image Classes
```css
object-contain      /* Fit entire image within container */
max-w-full         /* Don't exceed 100% of container width */
h-auto             /* Maintain aspect ratio */
w-full             /* Fill available width */
draggable={false}  /* Prevent drag-and-drop */
```

## Filter Effects Explained

### RIT & iDataMind Drop Shadow
```
drop-shadow(0 0 7px rgba(255,255,255,0.65))
  ↓ Primary white glow effect
  └─ 7px blur, 65% opacity white

drop-shadow(0 0 14px rgba(255,255,255,0.35))
  ↓ Secondary softer white glow
  └─ 14px blur, 35% opacity white (expands the glow)
```
**Effect**: Bright white halo around logo

### Zyphoria Filters (Stacked)
```
brightness(1.07)
  ↓ 7% brighter than original
  └─ Increases overall luminosity

saturate(1.05)
  ↓ 5% more saturated colors
  └─ More vivid, less washed out

contrast(1.08)
  ↓ 8% more contrast
  └─ Darker darks, lighter lights

drop-shadow(0 0 10px rgba(200,250,100,0.28))
  ↓ Lime green glow (Zyphoria brand color)
  └─ 10px blur, 28% opacity lime green
```
**Effect**: Bright, vibrant, glowing logo with maximum visual impact

## Clip Path Details (Zyphoria Only)

### Clip Path: `inset(32% 11% 34% 11%)`
CSS inset values are: `inset(top right bottom left)`

```
Original Image:
┌─────────────────────────────┐
│ ████ 11% LEFT ████          │  ← 32% TOP
│ ████████████████████████    │
│          [VISIBLE AREA]     │  ← 34% BOTTOM
│ ████████████████████████    │
└─────────────────────────────┘
        ↑ 11% RIGHT ↑
```

**Visible Area Dimensions**:
- Width: 100% - (11% + 11%) = 78% of image width
- Height: 100% - (32% + 34%) = 34% of image height
- **Aspect Ratio**: Changes significantly (crops to roughly 2.3:1)

**Purpose**: Focus on core logo elements, remove unnecessary padding/background

## Text Alternatives (Alt Text)

| Logo | Alt Text | Purpose |
|------|----------|---------|
| RIT | "Rajalakshmi Institute of Technology" | Describes the organization |
| iDataMind | "iDataMind" | Company name (concise) |
| Zyphoria | "Zyphoria '26" | Event name and year |

Alt text is used for:
- Accessibility (screen readers)
- SEO (search engines)
- Broken image fallback (displays if image won't load)

## Image Loading Strategy

### Preloading (Not Currently Implemented)
Currently, images are loaded on-demand as they become visible. To optimize, consider:

```javascript
// In component mount effect:
const preloadImages = () => {
  const images = ['/ritlogo.png', '/idatamind.png', '/zyphoria.png']
  images.forEach(src => {
    const img = new Image()
    img.src = src
  })
}
```

### Current Loading
- **When**: Images load when LogoScreen mounts (not before)
- **Timing**: Causes brief delay on first render of each screen
- **Note**: ParticleField and animations are not delayed

## File Format & Optimization

### Recommended Formats
| File | Format | Reason |
|------|--------|--------|
| ritlogo.png | PNG | Logo (lossless) or WebP for modern browsers |
| idatamind.png | PNG | Logo (lossless) or WebP for modern browsers |
| zyphoria.png | PNG | Logo (lossless) or WebP for modern browsers |

### Optimization Tips
1. **PNG**: Compress with `pngquant` or similar
2. **WebP**: Provide fallback for older browsers
3. **SVG**: Consider if available (vector logos scale perfectly)
4. **Size Goal**: Keep each under 500KB (ideally 100-300KB)

## Image Requested Properties

The LogoScreen component automatically detects logo type using filename (lowercased):
```javascript
const lowerSrc = imageSrc?.toLowerCase() ?? ''
const isRit = lowerSrc.includes('ritlogo')
const isIdatamind = lowerSrc.includes('idatamind')
const isZyphoria = lowerSrc.includes('zyphoria')
const isZyphoria1 = lowerSrc.includes('zyphoria1')
```

This enables automatic styling based on logo identity without explicit props.

## Dynamic Styling Based on Image Type

### RIT Logo
- Gets `high-quality` image rendering
- Uses white drop-shadow glow
- Medium sizing (not too large, not too small)

### iDataMind Logo
- Uses `auto` image rendering
- Uses white drop-shadow glow (same as RIT)
- Different sizing calculation (percentage-based)

### Zyphoria Logo
- Uses `auto` image rendering
- Uses lime-green glow + enhanced brightness/contrast
- Largest responsive sizing
- Full logo displayed without clipping
- Blend mode: `lighten` (additive)

## Glow Accent System

The `accent` prop determines the glow background color:

```javascript
const glowClass = accent === 'lime'
  ? 'bg-[radial-gradient(circle,rgba(200,250,100,0.22),transparent_60%)]'
  : 'bg-[radial-gradient(circle,rgba(251,146,60,0.22),transparent_60%)]'
```

### Lime (Default & Screen 3)
- Center: `rgba(200,250,100,0.22)` (lime green)
- RGB: (200, 250, 100) / Hex: `#C8FA64`
- Opacity: 22%
- **Usage**: Screen 1 (RIT), Screen 3 (Zyphoria)

### Warm (Screen 2)
- Center: `rgba(251,146,60,0.22)` (warm orange)
- RGB: (251, 146, 60) / Hex: `#FB9E3C`
- Opacity: 22%
- **Usage**: Screen 2 (iDataMind)

Both glows:
- Radial gradient from center
- Fade to transparent at 60% radius
- Positioned at screen center (top: 50%, translated -50%)

