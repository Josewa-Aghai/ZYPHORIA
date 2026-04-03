# SOLUTION - ZYPHORIA 404 FIX

**Problem:** Vercel deployment returns 404: NOT_FOUND  
**Root Cause:** vercel.json configuration doesn't match TanStack Start's server export

---

## ROOT CAUSE ANALYSIS

### The Issue
The `dist/server/server.js` file ends with:
```javascript
const server = createServerEntry({ fetch });
export {
  createServerEntry,
  server as default
};
```

This exports a **server object with a `fetch` method**, not a direct handler function.

### Vercel's Serverless Function Requirement
Vercel's `serverless.default` property expects one of these patterns:
1. A **Node.js HTTP handler**: `(req, res) => { ... }`
2. A **Web API handler**: `(request) => Promise<Response>`
3. A file that exports a default handler

### Why It's Failing
The current `vercel.json` tells Vercel to use `dist/server/server.js` as a serverless function entry, but Vercel cannot execute a module that exports `{ server as default }` without proper H3/node:http adaptation.

---

## THE FIX

### Option 1: Create a Vercel API Handler (RECOMMENDED)

Create a new file: `api/handler.js`

```javascript
// api/handler.js
import { server } from '../dist/server/server.js';

export default async function handler(request) {
  return await server.fetch(request);
}
```

Then update `vercel.json`:
```json
{
  "version": 2,
  "buildCommand": "npm run build"
}
```

**Why this works:**
- Vercel auto-detects `api/handler.js` (or `api/[...].js`)
- Routes ALL requests to this handler
- Handler calls the TanStack Start server's fetch method
- TanStack Start handles routing internally

---

### Option 2: Update vercel.json with API Directory (Alternative)

Keep the current setup but tell Vercel to use the new api handler:

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "builds": [
    {
      "src": "api/handler.js",
      "use": "@vercel/node",
      "config": { "zeroConfig": true }
    },
    {
      "src": "dist/client/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/.*",
      "dest": "api/handler.js"
    }
  ]
}
```

---

## IMPLEMENTATION STEPS

### Step 1: Create API Handler
Create new file at `api/handler.js`:

```javascript
import { server } from '../dist/server/server.js';

/**
 * Vercel serverless function handler
 * Routes all requests to TanStack Start server
 */
export default async function handler(request) {
  return await server.fetch(request);
}
```

### Step 2: Update vercel.json
Replace current content with:

```json
{
  "version": 2,
  "buildCommand": "npm run build"
}
```

This tells Vercel to:
- Run `npm run build` (generates dist/)
- Auto-detect `api/handler.js` as a serverless function
- Route all requests to this handler (Vercel's default behavior)
- Serve static files from dist/client/

### Step 3: Ensure dist/ is Generated
The `npm run build` command already runs `vite build`, which creates:
- `dist/client/` - Static assets
- `dist/server/server.js` - SSR server with `fetch` method

### Step 4: Deploy
```bash
git add api/handler.js vercel.json
git commit -m "fix: add Vercel API handler for TanStack Start"
git push origin main
```

Vercel will automatically redeploy and:
1. Run `npm run build`
2. Create serverless function from `api/handler.js`
3. Route all requests → `api/handler.js` → `server.fetch()` → TanStack Start router
4. Return proper HTML responses instead of 404

---

## WHY THIS WORKS

### Request Flow
```
Client Request
    ↓
Vercel Edge → Routes to api/handler.js
    ↓
handler(request) executes
    ↓
server.fetch(request) called
    ↓
TanStack Start processes request
    ↓
Router matches path (/, /register, /products/$id, etc.)
    ↓
renderRouterToStream() generates HTML
    ↓
Response returned to client
```

### What Gets Fixed
- ✅ `/` returns home page HTML (not 404)
- ✅ `/register` returns register page HTML (not 404)
- ✅ `/products/123` returns product page HTML (not 404)
- ✅ `/api/sync-to-sheets` works (API route)
- ✅ SSR rendering works (no more NOT_FOUND errors)
- ✅ Client-side hydration works (SPA functionality)

---

## VERIFICATION

After deployment:

1. **Check Vercel Logs**
   - Should show build completing
   - Should show API function deployed
   - No 404 errors on first request

2. **Test URLs**
   - https://zyphoria.vercelapp.com/ → Home page loads
   - https://zyphoria.vercelapp.com/register → Register page loads
   - https://zyphoria.vercelapp.com/products/1 → Product page loads

3. **Check Browser DevTools**
   - Response status: 200 (not 404)
   - Content-Type: text/html
   - HTML content present (not error page)

---

## FILES TO MODIFY

| File | Action | Status |
|------|--------|--------|
| `api/handler.js` | CREATE (new file) | ✓ Ready |
| `vercel.json` | UPDATE (simplify) | ✓ Ready |
| `.gitignore` | UPDATE (add api/) | Optional |
| All other files | NO CHANGE | ✓ Keep as is |

---

## DEPLOYMENT CHECKLIST

- [ ] Create `api/handler.js` with server fetch handler
- [ ] Update `vercel.json` to minimal config
- [ ] Run `git add api/handler.js vercel.json`
- [ ] Run `git commit -m "fix: add Vercel API handler for TanStack Start"`
- [ ] Run `git push origin main`
- [ ] Wait ~30 seconds for Vercel webhook
- [ ] Check deployment URL - should load without 404

---

## IF VERCEL STILL RETURNS 404

### Debugging Steps
1. Check Vercel logs: `$ vercel logs <url>`
2. Verify `dist/server/server.js` exports correctly
3. Check that `npm run build` creates both dist/client and dist/server
4. Verify `api/handler.js` can import from dist/server/server.js
5. Check for any build errors in Vercel Build tab

### Common Issues
- **Issue:** "Cannot find module 'dist/server/server.js'"
  - **Fix:** Ensure `npm run build` completes successfully

- **Issue:** Handler imports fail
  - **Fix:** Check that api/handler.js path is relative to root

- **Issue:** Still 404 on all routes
  - **Fix:** Verify api/handler.js is being called by adding console.log

---

## EXPECTED OUTCOME

After applying this fix:
- ✅ Vercel recognizes api/handler.js as serverless function
- ✅ All requests routed to TanStack Start server
- ✅ TanStack Start router matches paths
- ✅ SSR renders HTML for each route
- ✅ Client hydrates and SPA works
- ✅ 404 errors resolved
- ✅ Site is live and functional
