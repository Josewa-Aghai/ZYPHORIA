# ZYPHORIA - Production Environment Setup Guide

## Issue: Supabase & Google Sheets Not Working in Deployed App

The local `.env` file is not used in production. You must configure environment variables in your deployment platform.

---

## 🚀 VERCEL DEPLOYMENT SETUP

### Step 1: Set Environment Variables in Vercel

1. Go to **https://vercel.com/dashboard**
2. Select your project: **ZYPHORIAmain** or similar
3. Click **Settings** → **Environment Variables**
4. Add the following variables:

#### **Supabase Variables** (Client-side):
```
VITE_SUPABASE_URL = https://ttifqicjgtugqeyfgbqp.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0aWZxaWNqZ3R1Z3FleWZnYnFwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTE1MTUzMSwiZXhwIjoyMDkwNzI3NTMxfQ.7xiO21T6SX9Q0SrO-EsyBjGRzsoF8WMbIjVMNYfoivg
```

#### **Google Sheets Variables** (Server-side):
```
GOOGLE_SHEET_ID = 1Ec1q99g0QY5g-MfF7is6gpBEBYPKGHnfaaiMCaeMEnU
GOOGLE_CLIENT_EMAIL = zyphoria-event@zyphoria-492205.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY = -----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDUjQ/y/vxnZc6B\ngp+zvy4e2SkhdWzTDjNmpzuFdQERm2ZggBhI/MiVzfIR2C3zIqpFNbSrKLhDea/i\nWT2dg5rY3bN2zqKlPQ3sXWH2SumtuXUWtsV1l07S3O4CDxy0RRDPGXk5Hc3xFjgi\n4YVy+2h0QDjwTh15JrdZtGJgl4HGn9Kqqd7nFFb/omuBpmHGfKlMSmC0Uy+Vwgwr\nf1hVgPtlwU7n00+P7235DQ1Js0Jv6OILuGxIJen9iJGHETmqzyAFI+8enAXPU/KS\npjR6vIASW9dC/VZmhukT6teQ3BvZ7e0AecZhWgzsbR/5RCUNeRk7ZnOYmozBhMCZ\nO3lveYG9AgMBAAECggEAJnAXKwrNQvaghH/GmUcw1D/R5hzZ8AYQqhcCltUsuw4n\nErr/iU17icnLZco6Lw69C5SVhmFwBzXNpqmcUKyw11iqgIkIVUkICE9v7I4qGbJg\n+BlX9rbE+LGe8izg9EHMMyOobjmTWW66+qXdkAhioKlPkreRsWvcuwJ5yv2DKNPA\nS2ntETD3m7KBiwqPjrsJOLDoBzdCMvF6ukmhbPefPYr3CTjJxJPAfMDUcUAZqtDd\nB0qTL+5LWnwJcjrB7/R1CpdaMcstGJC8hqy1agmOlShjuG6abbiwhuZXORlc4zqd\nRurRisDw6jZSqcdMeS7HWTK5aC24Z1APp5b3vN29+QKBgQD30Yd/oRt7kzQF4m5y\nNeFAcdSOdT39qRerUg/FFBAm7IiKSP1MohszPGM6v/+nSyq/JG/9hH/pHilz4kgB\nX1UiL539foETkuhkeWZhSy9BTaw6o/i++BqjFwMU+h3HQG8l9bRzoRHTGZsZjEJh\n/Ecspm5zurjtoC1DxjJYijiIdQKBgQDbkXcqAphQY/H/DW0BXM7MJmBxcqyOBJV5\n+FJfYBGbQaf/GrS/VCjTPrYTh/edsbRyVbTNH+GzPwqH7VNqDpwHMluTBjTsP19H\nXukFzk2MjoYsqnWD0RcMxcHrWYVzupeRqXRZtc/Soti+1c/Sgv7cUqeUaGwTt25w\nQVQ254ArKQKBgQDD5JgkVljgJSthX20I0Ph+tbxc4+adxfVU0qhuk/50llMUZL/9\nvMKdjKWvwie3uV5P++Ce2Qc3YkVIOl3K3+3u+Q79W+tyapVTHvfD/ueaymhTblxp\nsLt1ofIoudGiOJfjvMbpBDCP21TULCApTn+AlwsGZlpaVFyTj28quBAaJQKBgQCx\nvxrWuW8QdThsnzPFTJpkjhS5AnpKJc/UA4C7kQvvwcD8NWRpFvpNuJCxUvrTgA5y\nGIvbGpod/0TJMQi77MPG169mYDnrnonFP0Io3w/MX3yjIAMuCNA+GMGZgskUHNOi\nqal1DkgFXqtUIcaxxjYHqinbbIVBmNcgrOI96D7LsQKBgQDoSfSlfG/3sy0oLIVx\nZ20Bf6Gf58vXpr8zxvI6qcTfNjAgYliSWk052Rr6n92FBj+MPiESJjuj2Y4NiDGd\nId73r7MhBb8OgrlBzT3ggkxcsxaG8I62wEPvUVvFiiFZEg2EZE9Y5SNzwmlzQQJt\nfdl/CmXJ3uwoJ/lAM4nd9ybmVQ==\n-----END PRIVATE KEY-----\n
GOOGLE_SHEETS_RANGE = Sheet1
```

⚠️ **IMPORTANT**: For `GOOGLE_PRIVATE_KEY`, make sure:
- Keep the `\n` as literal `\n` (NOT actual line breaks)
- Don't include the surrounding quotes
- Copy the ENTIRE key including `-----BEGIN` and `-----END`

---

### Step 2: Redeploy

After adding env vars in Vercel:
1. Go to **Deployments**
2. Click the **⋮ menu** on the latest deployment
3. Select **Redeploy**
4. Wait for deployment to complete

---

## ✅ VERIFICATION CHECKLIST

After deployment, test these:

### **1. Test Supabase Connection**
- Go to your deployed app `/register` page
- Fill out the form and submit
- Check **https://supabase.com/dashboard** → Select your project → **Table Editor**
- Look for the registration row in the `registrations` table
- If NOT there → Supabase connection issue

### **2. Test Google Sheets Sync**
- Go to your Google Sheet: **https://docs.google.com/spreadsheets/d/1Ec1q99g0QY5g-MfF7is6gpBEBYPKGHnfaaiMCaeMEnU**
- Submit another test registration
- Wait 5 seconds
- Check if a new row appears in the sheet
- If NOT there → Google Sheets connection issue

### **3. Check Vercel Logs**
If data isn't syncing:
1. Go to **Vercel Dashboard** → Your project → **Deployments**
2. Click latest deployment
3. Click **Logs** tab
4. Look for error messages starting with "Google" or "Supabase"
5. Common errors:
   - `Failed to get Google token` → Private key format error
   - `Failed to read Google Sheet` → Sheet not shared with service account
   - `Missing env variables` → Env vars not set in Vercel

---

## 🔐 SECURITY NOTE

Never commit `.env` to git. The `.env` file is for **local development only**.

For production, ALWAYS use:
- Vercel Environment Variables (for Vercel hosting)
- AWS Secrets (if using AWS Lambda)
- GitHub Secrets (if using GitHub Actions)

---

## 📋 QUICK CHECKLIST

- [ ] Supabase env vars set in Vercel (VITE_SUPABASE_*)
- [ ] Google Sheets env vars set in Vercel (GOOGLE_*)
- [ ] Redeployed after adding env vars
- [ ] Tested registration form on deployed app
- [ ] Checked Supabase table for new records
- [ ] Checked Google Sheet for new rows
- [ ] Verified error logs in Vercel if issues exist

---

## ❌ TROUBLESHOOTING

### Data not appearing in Supabase
```
✓ Check: VITE_SUPABASE_URL is correct
✓ Check: VITE_SUPABASE_ANON_KEY is correct  
✓ Check: Supabase project is active (not paused)
✓ Check: `registrations` table exists in Supabase
```

### Data not appearing in Google Sheets  
```
✓ Check: GOOGLE_SHEET_ID is correct
✓ Check: GOOGLE_PRIVATE_KEY has no quotes
✓ Check: Sheet is shared with zyphoria-event@zyphoria-492205.iam.gserviceaccount.com (Editor access)
✓ Check: Sheet tab is named "Sheet1" (case-sensitive)
✓ Check: Vercel logs show successful sync
```

### Still not working?
1. Check Vercel deployment logs for specific errors
2. Verify Google Sheet has Editor permissions shared with service account email
3. Try submitting a test registration and check error messages

---
