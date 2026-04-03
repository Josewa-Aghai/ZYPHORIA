# Intro Sequence - Complete Flow & Timing

## Overview
The ZYPHORIA intro sequence consists of 3 full-screen logo reveal animations with automatic progression and manual skip option. The entire sequence takes approximately 6.7 seconds to complete.

## Complete Timeline

```
┌─ 0ms: INTRO STARTS ─────────────────────────────────────────┐
│  [Initialize ParticleField]                                  │
│  [Set Screen = 1]                                            │
│  [Session Storage Check: 'intro_seen']                       │
│                                                              │
├─ 0-550ms: SCREEN 1 FADE-IN ────────────────────────────────┤
│  Animation: Content fades & scales up                        │
│  Display: RIT Logo with "Presented by" label                 │
│  Colors: White glow (lime accent)                            │
│                                                              │
├─ 550-2000ms: SCREEN 1 STATIC DISPLAY ──────────────────────┤
│  Duration: 1450ms                                            │
│  User can: Click Skip, Wait for auto-advance                 │
│                                                              │
├─ 2000ms: TRANSITION TO SCREEN 2 ───────────────────────────┤
│  Animation OUT: Content fades & scales out                   │
│  Animation IN: New content fades & scales in                 │
│  [Set Screen = 2]                                            │
│                                                              │
├─ 2000-2550ms: SCREEN 2 FADE-IN ────────────────────────────┤
│  Animation: Content fades & scales up                        │
│  Display: iDataMind Logo with "Associated with" label        │
│  Colors: Warm orange glow                                    │
│                                                              │
├─ 2550-4000ms: SCREEN 2 STATIC DISPLAY ─────────────────────┤
│  Duration: 1450ms                                            │
│  User can: Click Skip, Wait for auto-advance                 │
│                                                              │
├─ 4000ms: TRANSITION TO SCREEN 3 ───────────────────────────┤
│  Animation OUT: Content fades & scales out                   │
│  Animation IN: New content fades & scales in                 │
│  [Set Screen = 3]                                            │
│                                                              │
├─ 4000-4550ms: SCREEN 3 FADE-IN ────────────────────────────┤
│  Animation: Content fades & scales up                        │
│  Display: Zyphoria Logo (no label)                           │
│  Colors: Lime-green glow (#C8FA64)                           │
│                                                              │
├─ 4550-6300ms: SCREEN 3 STATIC DISPLAY ─────────────────────┤
│  Duration: 1750ms                                            │
│  User can: Click Skip, Wait for auto-advance                 │
│                                                              │
├─ 6300ms: INTRO COMPLETION TRIGGERED ────────────────────────┤
│  [Set closing = true]                                        │
│  [Set 'intro_seen' in sessionStorage]                        │
│  Exit animation begins                                       │
│                                                              │
├─ 6300-6720ms: EXIT FADE-OUT ───────────────────────────────┤
│  Animation: Shell opacity fade out (420ms)                   │
│  Scale: 1.005x (slight zoom out)                             │
│                                                              │
└─ 6720ms: INTRO COMPLETE ───────────────────────────────────┘
   [Main content visible]
   [onComplete() callback fired]
   [App ready to use]
```

## Timing Constants

```typescript
const INTRO_TIMINGS = {
  screenOne: 2000,      // Screen 1 duration (ms)
  screenTwo: 2000,      // Screen 2 duration (ms)
  screenThree: 2300,    // Screen 3 duration (ms) - LONGEST
  exit: 420,            // Exit animation duration (ms)
} as const
```

### Calculations
- **Screen 1 Visible**: 0 → 2000ms
- **Screen 2 Visible**: 2000 → 4000ms
- **Screen 3 Visible**: 4000 → 6300ms
- **Exit Animation**: 6300 → 6720ms
- **Total Duration**: ~6.7 seconds

## Screen Timeline Details

### Screen 1: RIT Logo
| Phase | Start | End | Duration | State |
|-------|-------|-----|----------|-------|
| Fade In | 0ms | 550ms | 550ms | invisible → visible |
| Display | 550ms | 2000ms | 1450ms | static |
| Fade Out | 1450ms | 2000ms | 550ms | visible → invisible |

### Screen 2: iDataMind Logo
| Phase | Start | End | Duration | State |
|-------|-------|-----|----------|-------|
| Fade In | 2000ms | 2550ms | 550ms | invisible → visible |
| Display | 2550ms | 4000ms | 1450ms | static |
| Fade Out | 3450ms | 4000ms | 550ms | visible → invisible |

### Screen 3: Zyphoria Logo
| Phase | Start | End | Duration | State |
|-------|-------|-----|----------|-------|
| Fade In | 4000ms | 4550ms | 550ms | invisible → visible |
| Display | 4550ms | 6300ms | 1750ms | static |
| Fade Out | 5750ms | 6300ms | 550ms | visible → invisible |
| Final Exit | 6300ms | 6720ms | 420ms | scale & fade |

## Animation Configuration

### Shell (Outer Container)
```javascript
Variants: shellVariants
- hidden: { opacity: 0 }
- visible: { opacity: 1, transition: 0.3s easeOut }
- exit: { opacity: 0, scale: 1.005, transition: 0.45s easeInOut }

Initial State: hidden
Trigger: closing ? 'exit' : 'visible'
```

### Content (Section Wrapper)
```javascript
Variants: contentVariants
- hidden: { opacity: 0, y: 20, scale: 0.96 }
- visible: { opacity: 1, y: 0, scale: 1, transition: 0.55s easeOut }
- exit: { opacity: 0, y: -8, scale: 1.01, transition: 0.24s easeInOut }

Initial State: hidden
Animation: Always animate to visible on mount
```

### Logo Image
```javascript
Variants: logoVariants
- hidden: { opacity: 0, scale: 0.9, filter: 'blur(4px)' }
- visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: 0.55s easeOut }

Initial State: hidden
Animation: Always animate to visible on mount
Transition: 0.5s easeOut
```

### Label Text
```javascript
Variants: labelVariants
- hidden: { opacity: 0, y: 10, scale: 0.99 }
- visible: { opacity: 1, y: 0, scale: 1, transition: 0.68s easeOut }
- exit: { opacity: 0, y: -7, scale: 1.01, transition: 0.24s easeInOut }

Initial State: hidden
Animation: Always animate to visible on mount
Conditional: Only rendered if label prop provided (Screen 3 has no label)
```

## Easing Curves

| Animation | Easing | Purpose |
|-----------|--------|---------|
| Shell Fade In | easeOut (0.3s) | Smooth, quick container reveal |
| Shell Exit | easeInOut (0.45s) | Balanced two-way exit |
| Content Fade In | easeOut (0.55s) | Element entrance |
| Content Exit | easeInOut (0.24s) | Quick element exit |
| Logo Reveal | easeOut (0.55s) | Smooth image unblur |
| Label Reveal | easeOut (0.68s) | Smooth, slightly longer text reveal |

## State Management

### useRef (closeTimerRef)
```javascript
const closeTimerRef = useRef<number | null>(null)
```
- Tracks the exit animation timer
- Prevents duplicate callback fires
- Cleared on component unmount

### useState (screen)
```javascript
const [screen, setScreen] = useState<1 | 2 | 3>(1)
```
- Current screen index (1, 2, or 3)
- Drives conditional rendering of LogoScreen components

### useState (closing)
```javascript
const [closing, setClosing] = useState(false)
```
- Triggers exit animations
- Animates entire shell to 'exit' state
- Set to true after INTRO_TIMINGS.screenThree expires

## User Interactions

### Skip Button
- **Location**: Top-right corner (fixed position)
- **Triggered State**: Visible during `phase === 'play'` in both components
- **Action**: 
  1. Set `intro_seen = 'true'` in sessionStorage
  2. Set `closing = true` to trigger exit animation
  3. Schedule `onComplete()` callback after 300ms
  4. User can skip from ANY point in the intro

### Keyboard Interactions
- None currently supported (focus is on skip button/visual experience)

### Session Storage
- **Key**: `'intro_seen'`
- **Value**: `'true'` (string)
- **Lifecycle**: Set when intro completes; checked on next visit
- **Effect**: If set, `onComplete()` fires immediately (skip entire intro)

## Component Integration

### IntroLoader Export
```typescript
export function IntroLoader({ 
  showIntro: boolean, 
  onComplete: () => void 
}: IntroLoaderProps)
```

### Usage in App
```typescript
const [showIntro, setShowIntro] = useState(true)

return (
  <>
    <IntroLoader 
      showIntro={showIntro} 
      onComplete={() => setShowIntro(false)} 
    />
    {/* Rest of app content */}
  </>
)
```

## Browser/Platform Notes

### ParticleField
- Uses random number generation for star positions
- Recalculated on every render (wrapped in useMemo for performance)
- 18 particles × random properties = enough visual noise without performance hit

### AnimatePresence
- Mode: `"wait"` - Existing screen exits before new one enters
- Only one LogoScreen rendered at a time
- Smooth transition between screens

### SessionStorage
- Client-side only (no server round-trip)
- Persists across page reloads within same session/tab
- Cleared when browser closed (in most browsers)

## Performance Considerations

- **Total Animation Time**: ~6.7 seconds → relatively short intro
- **Memory**: Only 1 screen rendered at a time (3 don't exist simultaneously)
- **Repaints**: Minimal (only 18 particles + 1 logo animating at a time)
- **GPU**: Framer Motion offloads to GPU (will-change, transform)

