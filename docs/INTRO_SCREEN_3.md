# Intro Screen 3: Zyphoria Logo

## Overview
The final intro screen displays the Zyphoria '26 logo with a lime-green glow accent and no label text. This is the main event showcase screen.

## Display Timing
- **Start After**: Screen 2 completes (4000ms from intro start)
- **Duration**: 2300ms (2.3 seconds)
- **Transition In**: 550ms fade + scale-up
- **Exit Animation**: 420ms fade
- **Total Intro Time**: ~6720ms (2000 + 2000 + 2300 + 420)

## Visual Elements

### Background
- **Base Color**: `#050508` (dark navy-black, consistent with Screens 1 & 2)
- **Glow Effect**: Lime-green radial gradient
  - Center: `rgba(200,250,100,0.22)` (lime-green, signature Zyphoria color)
  - Fade to transparent at 60%
- **Particles**: ParticleField with 18 animated stars

### Label (None)
- **Text**: None rendered for this screen
- This screen focuses entirely on the Zyphoria branding
- No "Presented by" or "Associated with" label

### Image (Zyphoria '26 Logo)
- **Source**: `/zyphoria.png`
- **Alt Text**: "Zyphoria '26"
- **Responsive Width**:
  - Mobile: `w-[min(92vw,44rem)]`
  - Tablet: `sm:w-[min(84vw,52rem)]`
  - Desktop: `lg:w-[min(72vw,58rem)]`
- **Filter/Effects**:
  - Brightness: `brightness(1.07)` (brightened for prominence)
  - Saturation: `saturate(1.05)` (slightly more vibrant)
  - Contrast: `contrast(1.08)` (enhanced definition)
  - Drop Shadow: `drop-shadow(0 0 10px rgba(200,250,100,0.28))` (lime green glow)
  - Mix Blend Mode: `lighten` (blend mode for additive light effect)
- **Image Rendering**: `auto`
- **Clip Path**: `inset(32%_11%_34%_11%)` (crops the image to focus on core branding)
  - Removes 32% from top, 11% from right, 34% from bottom, 11% from left
  - Creates a zoomed/focused view of the logo
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
  key="screen-three"
  imageSrc="/zyphoria.png"
  imageAlt="Zyphoria '26"
  accent="lime"  // Creates lime-green glow
/>
```

## Accent System
The `accent="lime"` prop creates the lime-green glow:
```javascript
const glowClass = accent === 'lime'
  ? 'bg-[radial-gradient(circle,rgba(200,250,100,0.22),transparent_60%)]'
  : 'bg-[radial-gradient(circle,rgba(251,146,60,0.22),transparent_60%)]'
```

The lime color (`#C8FA64`) is the **primary brand color** for Zyphoria.

## Layout Structure
```
┌─ Motion Div (Shell) ─────────────────────────────────┐
│  ┌─ ParticleField (Background) ──────────────────┐  │
│  │  - Radial gradients (lime-green tone)         │  │
│  │  - 18 animated particles                       │  │
│  └────────────────────────────────────────────────┘  │
│                                                       │
│  ┌─ SkipForward Button ─────────────────────────┐   │
│  │  Top-right corner, z-index: 20               │   │
│  └────────────────────────────────────────────────┘  │
│                                                       │
│  ┌─ Motion Section (Content) ───────────────────┐   │
│  │  ┌─ Glow Container ──────────────────────┐   │   │
│  │  │  (Lime-green radial gradient)         │   │   │
│  │  └───────────────────────────────────────┘   │   │
│  │                                               │   │
│  │  (No Label Text)                              │   │
│  │                                               │   │
│  │  ┌─ Zyphoria Logo Image ──────────────────┐  │   │
│  │  │  Animation: blur unblur, scale         │  │   │
│  │  │  Lime-green glow + blend mode          │  │   │
│  │  │  Full logo presentation                │  │   │
│  │  │  Enhanced brightness & saturation      │  │   │
│  │  └───────────────────────────────────────┘  │   │
│  └────────────────────────────────────────────────┘  │
│                                                       │
└─────────────────────────────────────────────────────┘
```

## CSS Classes
- Container: `fixed inset-0 z-1000 overflow-hidden bg-[#050508] text-white`
- ParticleField: `absolute inset-0 overflow-hidden`
- Glow: `absolute inset-x-0 top-1/2 mx-auto h-144 w-[min(90vw,68rem)] -translate-y-1/2 rounded-full blur-2xl` + lime glow class
- Logo Wrapper: `relative flex items-center justify-center sm:mx-auto` with zyphoria1-specific width
- Image: `h-auto w-full max-w-full object-contain` + clipping

## Image Processing Details

### Clip Path
The normal Zyphoria intro logo is displayed without clipping so the full wordmark stays visible.

### Filter Chain
```
brightness(1.07)         → Increase brightness by 7%
saturate(1.05)          → Increase saturation by 5%
contrast(1.08)          → Increase contrast by 8%
drop-shadow(0 0 10px rgba(200,250,100,0.28))  → Green glow
```

### Mix Blend Mode
- **Mode**: `lighten`
- **Effect**: Blends the logo using "lighten" mode, making white areas glow more
- **Result**: Creates an additive light effect where logo meets background

## Skip Button
- **Position**: Top-right (right-4, top-4 on mobile; right-6, top-6 on desktop)
- **Styling**: Rounded-full border with white/12, glass-morphism backdrop
- **Icon**: SkipForward (14px) + "Skip" text
- **Hover**: Changes border to lime-300/40, bg to lime-300/10, text to lime-100

## Color Palette
| Element | Color | Usage |
|---------|-------|-------|
| Background | `#050508` | Base screen background |
| Glow Center | `rgba(200,250,100,0.22)` | Lime-green glow centerpoint |
| Primary Brand | `#C8FA64` | Zyphoria signature color |
| Drop Shadow | `rgba(200,250,100,0.28)` | Lime green shadow on logo |

## Responsive Sizing
Zyphoria logo uses largest responsive widths to maximize visual impact:
- Mobile: `w-[min(92vw,44rem)]` (92% of viewport, capped at 44rem)
- Tablet: `sm:w-[min(84vw,52rem)]` (84% of viewport, capped at 52rem)
- Desktop: `lg:w-[min(72vw,58rem)]` (72% of viewport, capped at 58rem)

This ensures the final screen has the largest, most prominent presentation.

## Auto-Advance Logic
After 2300ms on this screen:
1. Session storage flag set: `intro_seen = 'true'`
2. Closing state activated
3. Exit animation plays (420ms)
4. `onComplete()` callback fires
5. Intro sequence ends, main app loads

## Notes
- This is the **third and final screen** in the 3-screen intro sequence
- The lime-green (`#C8FA64`) is the **signature Zyphoria brand color**
- No label text keeps focus entirely on the Zyphoria branding
- The clip-path creates an intentional crop/focus effect
- Brightness, saturation, and contrast are all enhanced for maximum impact
- Only logo that uses the `lighten` blend mode (additive light effect)
- Image source file must exist at `public/zyphoria.png`
- Auto-advances after 2.3 seconds unless skipped
- Can be skipped at any time with the "Skip" button

