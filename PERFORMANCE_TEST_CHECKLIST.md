# ZYPHORIA Performance Testing Checklist

**Build Status**: ✅ 2317 client modules + 54 server modules compiled successfully
**Bundle Sizes**: Main JS: 349.04 KB (109.96 KB gzip) | Register: 211.64 KB (56.77 KB gzip)

---

## 🧪 TESTING PROCEDURE

### **Part 1: Local Server Testing**

#### Step 1: Start Dev Server
```bash
npm run dev
# Should start on http://localhost:3002
# Note: Ports 3000, 3001 are occupied
```

#### Step 2: Test on Desktop/Laptop View

**INTRO SEQUENCE (Expected: 6.7 seconds total)**
- [ ] **0-550ms**: RIT Logo fade in smooth (no jank)
- [ ] **550-2000ms**: RIT Logo static display (smooth, no flickering)
- [ ] **2000-2550ms**: Transition to iDataMind smooth (no pause)
- [ ] **2550-4000ms**: iDataMind Logo static display (smooth)
- [ ] **4000-4550ms**: Transition to Zyphoria smooth (no pause)
- [ ] **4550-6300ms**: Zyphoria Logo static display (smooth)
- [ ] **6300ms+**: Exit animation smooth, main page fades in (no delay)

**DESKTOP CHECKS**:
- [ ] 60 FPS during intro animations
- [ ] No frame drops during fade/scale transitions
- [ ] StarField renders smoothly (120 animated stars)
- [ ] Navigation bar loads without lag after intro
- [ ] Events section scrolls smoothly
- [ ] Navbar doesn't flicker on scroll events
- [ ] All hover effects are instant (no delay on buttons)

**MOBILE CHECKS** (Use DevTools - Toggle Device Toolbar):

Simulate: iPhone 12 / iPhone 13 / Samsung S21

- [ ] Intro animations smooth at 60 FPS (not 30 FPS)
- [ ] No jank during screen transitions
- [ ] Text remains crisp (no blurry filters)
- [ ] Logo glows don't cause lag
- [ ] Touch events responsive (no delay)
- [ ] Scrolling through events smooth
- [ ] No memory leaks (DevTools Performance tab)

---

### **Part 2: Registration Page Testing (Desktop)**

**FORM PERFORMANCE**:
- [ ] Form loads instantly
- [ ] Team member input fields respond immediately to typing
- [ ] No lag when adding/removing team members
- [ ] File upload preview doesn't freeze the page
- [ ] Validation messages appear instantly

**POST-REGISTRATION SUCCESS SCREEN**:
- [ ] Logo + navbar visible at top (both mobile & desktop)
- [ ] Success message appears with smooth fade-in
- [ ] "BACK TO HOME" link works immediately
- [ ] No lag in the exit animation

---

### **Part 3: Mobile Registration Testing**

Test on: iPhone/Android DevTools emulation

- [ ] Form inputs responsive (no 300ms tap delay)
- [ ] Member fields don't cause layout shifts
- [ ] File picker opens instantly
- [ ] Success screen displays correctly (logo visible)
- [ ] Navigation after registration smooth
- [ ] No console errors (DevTools Console tab)

---

## 🔍 PERFORMANCE METRICS TO CHECK

### In Chrome DevTools:

**1. Performance Tab** (Main Tab → Start Recording → Interact → Stop)
```
✅ GOOD: First Contentful Paint (FCP) < 1.5s
✅ GOOD: Largest Contentful Paint (LCP) < 2.5s
✅ GOOD: Cumulative Layout Shift (CLS) < 0.1
✅ GOOD: Frame rate stays at 60 FPS (mobile: 55+ FPS)
⚠️ BAD: Frame rate drops below 30 FPS = LAG
```

**2. Lighthouse Tab** (Run Lighthouse → Performance score should be > 80)
```
- Performance: > 80
- Accessibility: > 90
- Best Practices: > 90
```

**3. Network Tab**
```
✅ JS files should load: register.js (211 KB) in < 500ms
✅ CSS should load: main.css (35 KB) in < 50ms
✅ Images should load: spiroga.png in < 200ms
```

**4. Console Tab**
```
✅ No red errors should appear
⚠️ Yellow warnings about "use client" are OK (library warnings)
❌ Any other errors = MUST FIX
```

---

## ⏱️ TIMING CHECKLIST

### Intro Sequence Validation:

| Screen | Start (ms) | Duration (ms) | End (ms) | Expected |
|--------|-----------|--------------|---------|----------|
| Screen 1 (RIT) | 0 | 2000 | 2000 | Fade in 550, static 1450 |
| Screen 2 (iDataMind) | 2000 | 2000 | 4000 | Fade in 550, static 1450 |
| Screen 3 (Zyphoria) | 4000 | 2300 | 6300 | Fade in 550, static 1750 |
| Exit/Transition | 6300 | 420 | 6720 | Smooth fade out |

**Test**: Open DevTools, go to Performance tab, record during intro, check timeline matches above.

---

## 🐛 KNOWN OPTIMIZATIONS APPLIED

✅ Added `will-change` CSS property to animated elements
✅ Reduced particle count from 120 to 18 in intro
✅ Optimized filter chains on logo images
✅ Lazy-loaded home page content until intro completes
✅ Removed `imageRendering: 'high-quality'` on mobile

---

## 🚨 IF YOU FIND LAG

**On Mobile**:
1. Check Network tab - is JS too large?
2. Check Performance tab - look for long tasks > 50ms
3. Check Memory tab - is it growing continuously?
4. Try lower-end device simulation (Moto G4)

**On Desktop**:
1. Enable "Show Paint Flashing" in DevTools rendering settings
2. Look for excessive repaints (red rectangles = bad)
3. Check if animations use GPU acceleration (transform/opacity)

**Report Format**:
```
LOCATION: [intro / register / events page]
DEVICE: [mobile / desktop + model]
ISSUE: [describe lag - freezes, jank, stutter]
TIMING: [when does it happen - on scroll, on transition?]
SCREENSHOT/VIDEO: [if possible]
```

---

## ✅ SUCCESS CRITERIA

- [ ] Intro sequence: Smooth 60 FPS throughout
- [ ] Registration form: All interactions instant
- [ ] Mobile: No jank or frame drops
- [ ] Desktop: Smooth scrolling through events
- [ ] Post-registration: Instant success display
- [ ] No console errors (except library warnings)
- [ ] Lighthouse performance score > 80
