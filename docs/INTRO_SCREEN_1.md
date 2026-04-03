# Intro Screen 1: RIT Logo

## Overview
The first intro screen displays the Rajalakshmi Institute of Technology logo with a "Presented by" label.

## Display Timing
- **Duration**: 2000ms (2 seconds)
- **Transition In**: 550ms fade + scale-up
- **Auto-advance To**: Screen 2 after 2000ms

## Visual Elements

### Background
- **Base Color**: `#050508` (dark navy-black)
- **Glow Effect**: White radial gradient
  - Center: `rgba(255,255,255,0.22)` 
  - Fade to transparent at 60%
- **Particles**: ParticleField with 18 animated stars

### Label ("Presented by")
- **Text**: "Presented by"
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

### Image (RIT Logo)
- **Source**: `/ritlogo.png`
- **Alt Text**: "Rajalakshmi Institute of Technology"
- **Responsive Width**:
  - Mobile: `w-[min(80vw,28rem)]`
  - Tablet: `sm:w-[min(70vw,32rem)]`
  - Desktop: `lg:w-[min(55vw,36rem)]`
- **Filter/Effects**:
  - Drop Shadow: `drop-shadow(0 0 7px rgba(255,255,255,0.65)) drop-shadow(0 0 14px rgba(255,255,255,0.35))`
  - (High drop-shadow intensity for bright effect)
- **Image Rendering**: `high-quality`
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
  imageSrc="/ritlogo.png"
  imageAlt="Rajalakshmi Institute of Technology"
  label="Presented by"
  accent="lime"  // Default, creates white glow
/>
```

## Layout Structure
```
┌─ Motion Div (Shell) ─────────────────────────────────┐
│  ┌─ ParticleField (Background) ──────────────────┐  │
│  │  - Radial gradients                            │  │
│  │  - 18 animated particles                       │  │
│  └────────────────────────────────────────────────┘  │
│                                                       │
│  ┌─ SkipForward Button ─────────────────────────┐   │
│  │  Top-right corner, z-index: 20               │   │
│  └────────────────────────────────────────────────┘  │
│                                                       │
│  ┌─ Motion Section (Content) ───────────────────┐   │
│  │  ┌─ Glow Container ──────────────────────┐   │   │
│  │  │  (Decorative radial gradient)         │   │   │
│  │  └───────────────────────────────────────┘   │   │
│  │                                               │   │
│  │  ┌─ Label ("Presented by") ──────────────┐   │   │
│  │  │  Animation: fade in, slide up         │   │   │
│  │  └───────────────────────────────────────┘   │   │
│  │                                               │   │
│  │  ┌─ RIT Logo Image ───────────────────────┐   │   │
│  │  │  Animation: blur unblur, scale         │   │   │
│  │  │  Drop shadows for glow effect          │   │   │
│  │  └───────────────────────────────────────┘   │   │
│  └────────────────────────────────────────────────┘  │
│                                                       │
└─────────────────────────────────────────────────────┘
```

## CSS Classes
- Container: `fixed inset-0 z-1000 overflow-hidden bg-[#050508] text-white`
- ParticleField: `absolute inset-0 overflow-hidden`
- Label: `font-mono text-center uppercase tracking-[0.2em] relative z-30`
- Logo Wrapper: `relative flex items-center justify-center sm:mx-auto`
- Image: `h-auto w-full max-w-full object-contain`

## Skip Button
- **Position**: Top-right (right-4, top-4 on mobile; right-6, top-6 on desktop)
- **Styling**: Rounded-full border with white/12, glass-morphism backdrop
- **Icon**: SkipForward (14px) + "Skip" text
- **Hover**: Changes border to lime-300/40, bg to lime-300/10, text to lime-100

## Notes
- This is the **first screen** in the 3-screen intro sequence
- RIT glow is **white** (accent="lime" creates white glow by default for RIT)
- The accent for this screen should be changed if a different colored glow is desired
- Image source file must exist at `public/ritlogo.png`
- All animations use Framer Motion with custom easing curves
- Screen automatically advances after 2 seconds unless skipped

