# Google Sheets Setup Guide for Zyphoria Registration

## Prerequisites
1. Google Account with Google Sheets access
2. Google Cloud Console access

## Step 1: Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

## Step 2: Create a Service Account
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the details:
   - Service account name: `zyphoria-sheets-service`
   - Service account ID: auto-generated
   - Description: `Service account for Zyphoria registration Google Sheets integration`
4. Click "Create and Continue"
5. Skip the optional steps (you can add roles later)
6. Click "Done"

## Step 3: Generate Service Account Key
1. In the "Credentials" page, find your new service account
2. Click on the service account name
3. Go to the "Keys" tab
4. Click "Add Key" > "Create new key"
5. Select "JSON" format
6. Click "Create"
7. The JSON file will be downloaded automatically

## Step 4: Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new spreadsheet
3. Name it "Zyphoria Registrations" or similar
4. Add headers in row 1 (columns A-X):
   ```
   A: TIMESTAMP
   B: TEAM NAME
   C: MEMBER 1
   D: MAIL ID
   E: PHONE NUMBER
   F: DEPARTMENT
   G: COLLEGE NAME
   H: MEMBER 2
   I: MAIL ID
   J: PHONE NUMBER
   K: DEPARTMENT
   L: COLLEGE NAME
   M: MEMBER 3
   N: MAIL ID
   O: PHONE NUMBER
   P: DEPARTMENT
   Q: COLLEGE NAME
   R: MEMBER 4
   S: MAIL ID
   T: PHONE NUMBER
   U: DEPARTMENT
   V: COLLEGE NAME
   W: EVENT NAME
   X: PAYMENT PROOF
   ```

## Step 5: Share the Sheet with Service Account
1. In Google Sheets, click "Share"
2. Paste the service account email (from the JSON file, field "client_email")
3. Give it "Editor" permissions
4. Click "Send"

## Step 6: Configure Environment Variables
1. Open the downloaded JSON file from Step 3
2. Copy the values to your `.env` file:

```env
# Google Sheets Configuration
GOOGLE_SHEET_ID=your_sheet_id_here
GOOGLE_CLIENT_EMAIL=your_service_account_email@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_RANGE=Sheet1
```

**How to find the SHEET_ID:**
- In the Google Sheets URL: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit`
- Copy the long string between `/d/` and `/edit`

**For the PRIVATE_KEY:**
- Copy the entire "private_key" value from the JSON file
- Keep the quotes and \n characters exactly as they are

## Step 7: Test the Integration
1. Restart your development server
2. Try registering on the site
3. Check your Google Sheet - new rows should appear

## Troubleshooting

### Common Issues:

1. **"The caller does not have permission"**
   - Make sure you shared the sheet with the service account email
   - Verify the service account has "Editor" permissions

2. **"Invalid JWT" or token errors**
   - Check that the private key is correctly formatted
   - Ensure there are no extra spaces or characters

3. **"Sheet not found"**
   - Verify the GOOGLE_SHEET_ID is correct
   - Make sure the sheet name in GOOGLE_SHEETS_RANGE exists (default: Sheet1)

4. **Environment variables not loading**
   - Restart your development server after adding .env variables
   - Check that .env is in the root directory

### Testing Commands:
```bash
# Test Supabase (should work now)
node check_supabase.mjs

# Test registration form
# Visit http://localhost:3002/register and submit a test registration
```

## Security Notes
- Never commit the .env file to version control
- The service account JSON file should not be committed
- Keep the private key secure
- For production, use environment variables in your deployment platform (Vercel, etc.)