# PROJECT ANALYSIS - ZYPHORIA DEPLOYMENT ISSUE

**Date:** April 3, 2026  
**Status:** 404 NOT_FOUND on Vercel deployment  
**Deployment URL:** https://zyphoria.vercelapp.com  
**Source:** main branch (commit: 05ab4b7)

---

## 1. PROJECT STRUCTURE ANALYSIS

### Tech Stack Verification
- **Framework:** TanStack Start v1.120.20 ✓
- **React:** 19.2.0 ✓
- **Vite:** 7.1.7 ✓
- **TanStack Router:** 1.120.19 ✓
- **TypeScript:** 5.7.2 ✓
- **Deployment:** Vercel ✓

### Directory Structure
```
src/
├── routes/
│   ├── __root.tsx          ✓ Root layout with HeadContent, Scripts
│   ├── index.tsx           ✓ Home page (/)
│   ├── register.tsx        ✓ Registration page
│   ├── api.sync-to-sheets.ts ✓ API endpoint for Google Sheets
│   └── products/
│       └── $productId.tsx  ✓ Product detail page
├── components/
├── hooks/
├── data/
├── styles.css             ✓ Tailwind imports
└── router.tsx             ✓ Router setup
dist/
├── client/                ✓ Static assets present
│   ├── favicon.ico
│   ├── assets/
│   └── images
└── server/                ✓ SSR server built
    ├── server.js          ✓ Entry point (956 lines, properly formatted)
    └── assets/
```

---

## 2. BUILD CONFIGURATION ANALYSIS

### package.json
```json
{
  "scripts": {
    "dev": "vite dev --port 3000",
    "build": "vite build"
  }
}
```
**Status:** ✓ Correct for TanStack Start

### vite.config.ts
```typescript
plugins: [
  tanstackStart({
    server: {
      preset: 'vercel',  // ← Configured for Vercel
    },
  }),
  // ... other plugins
]
```
**Status:** ✓ Server preset is `vercel` (correct)

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```
**Status:** ✓ Proper TypeScript configuration

### vercel.json (Current)
```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "serverless": {
    "default": "dist/server/server.js"
  }
}
```
**Status:** ⚠️ **POTENTIAL ISSUE** - See section 3

---

## 3. DEPLOYMENT CONFIGURATION ANALYSIS

### Current vercel.json Setup
The current configuration uses `serverless.default` pointing to `dist/server/server.js`. 

**What this does:**
- Tells Vercel to run the built server.js as a serverless function
- Should handle all routing including API routes and SPA fallback

**Problem Analysis:**
The 404 error suggests Vercel is either:
1. Not properly invoking the serverless function
2. Routing requests incorrectly to the function
3. Build output is incomplete or malformed
4. Missing required configuration for TanStack Start

---

## 4. ROOT CAUSE IDENTIFICATION

### TanStack Start on Vercel Requirements
TanStack Start requires **proper H3 server configuration** on Vercel. Looking at `dist/server/server.js`:
- ✓ Imports H3Event and toResponse from h3-v2
- ✓ Uses defineHandlerCallback for request handling
- ✓ Renders with renderRouterToStream (SSR support)

**Issue:** The `serverless.default` approach may be bypassing H3 server initialization.

### Routes Structure Verification
- ✓ __root.tsx properly uses createRootRoute with HeadContent/Scripts
- ✓ index.tsx uses createFileRoute('/')
- ✓ register.tsx exists
- ✓ api.sync-to-sheets.ts uses correct createFileRoute('/api/sync-to-sheets')
- ✓ $productId.tsx uses dynamic routing

All routes are correctly defined.

---

## 5. ENVIRONMENT VARIABLES

### .env File Status
```dotenv
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
GEMINI_API_KEY=
OLLAMA_BASE_URL=
```
**Status:** ✓ File exists with placeholders

**Missing in Vercel:**
- These need to be set in Vercel dashboard for API features to work
- For the 404 issue, environment variables are NOT the root cause
- The 404 happens before any code execution

---

## 6. ROOT CAUSE: VERCEL CONFIGURATION

### The Real Problem
Vercel's `serverless` property with `"default": "dist/server/server.js"` is **not the correct pattern** for TanStack Start.

TanStack Start needs:
1. The **HTTP server instance** to be exported
2. Proper **H3 app integration** with Vercel's runtime
3. Correct **entry point configuration** in vercel.json

### What We Have vs What We Need
**Current (`dist/server/server.js`):**
- Uses H3Event internally
- Uses defineHandlerCallback and renderRouterToStream
- But: No exported HTTP server instance that Vercel can invoke

**What Vercel Expects:**
- An exported default handler function, OR
- An exported HTTP server (Express, Node http, etc.)

---

## 7. SOLUTION STRATEGY

### The Fix Required
Vercel needs a **proper API handler** that:
1. Creates an H3 app or uses the TanStack Start HTTP handler
2. Exports it in a format Vercel recognizes
3. Vercel.json should point to this handler

There are two valid approaches:

**Option A:** Use `api/` directory pattern (Vercel's native serverless functions)
- Create `api/handler.js` or `api/[...].js`
- Export a handler function
- Vercel auto-detects and routes all requests to it

**Option B:** Fix vercel.json to use proper entry point
- Ensure dist/server/server.js exports a proper handler
- Update vercel.json with correct configuration

---

## 8. FILES THAT NEED INSPECTION

### Critical Files for Fix
1. ✓ dist/server/server.js - Present and properly formatted
2. ✓ vite.config.ts - Server preset is "vercel"
3. ✓ vercel.json - EXISTS but may need adjustment
4. ✓ package.json - Build command correct
5. ✓ All routes - Properly defined

### Files to Check (Build Artifacts)
- Are there any Vercel-specific build outputs missing?
- Does dist/server need additional configuration?

---

## 9. DEPLOYMENT LOGS ANALYSIS

### Vercel Deployment Status
From screenshot:
- ✓ Build Completed successfully (26s)
- ✓ Status: Ready (Latest)
- ✓ No build errors in logs
- ✗ Runtime 404 NOT_FOUND error when accessing site

**This means:**
- npm run build succeeded
- dist/ artifacts were created
- But runtime request handling is broken

---

## 10. GIT STATUS VERIFICATION
- ✓ Local repo has node_modules/
- ✓ dist/ folder exists with built artifacts
- ✓ package-lock.json present
- ✓ All source files intact

---

## DIAGNOSIS SUMMARY

| Component | Status | Issue |
|-----------|--------|-------|
| Build System | ✓ Works | None - Vite builds successfully |
| Routes | ✓ Defined | None - All routes properly configured |
| SSR Setup | ✓ Configured | None - dist/server/server.js generated |
| TypeScript | ✓ Valid | None - No type errors |
| Vercel Config | ⚠️ Configured | **POSSIBLE: Incorrect handler export or routing config** |
| Environment | ✓ Ready | None - .env exists, vars can be added in Vercel dashboard |
| Deployment | ✓ Uploaded | Build succeeds but runtime fails |

---

## ROOT CAUSE

**The 404 error on Vercel occurs because:**

The `serverless.default` property in vercel.json points to `dist/server/server.js`, but this file may not be properly exporting a handler function that Vercel's runtime can execute.

TanStack Start's server.js is designed to work with Node.js HTTP servers or H3 servers, but Vercel's serverless runtime needs a specific export pattern.

---

## NEXT STEPS (See separate SOLUTION.md)

1. Verify what dist/server/server.js exports
2. Create proper Vercel API handler if needed
3. Update vercel.json with correct configuration
4. Test deployment
