# Google OAuth Setup Guide for Supabase

## Prerequisites
Before you can use Google authentication, you need to configure it in both Google Cloud Console and Supabase.

## Step 1: Google Cloud Console Setup

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/

2. **Create or Select a Project**
   - Create a new project or select an existing one
   - Note down your project ID

3. **Enable Google+ API**
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it

4. **Configure OAuth Consent Screen**
   - Go to "APIs & Services" > "OAuth consent screen"
   - Choose "Internal" if you want to restrict to your organization only
   - Fill in the required fields:
     - App name: "VITKULT"
     - User support email: Your VIT Bhopal email
     - Developer contact information: Your VIT Bhopal email
   - Save and continue

5. **Create OAuth 2.0 Credentials**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Add these to "Authorized redirect URIs":
     ```
     https://your-project-ref.supabase.co/auth/v1/callback
     http://localhost:3000/auth/callback (for local development)
     ```
   - Save and note down your:
     - Client ID
     - Client Secret

6. **Configure Domain Restrictions (Important!)**
   - In your OAuth 2.0 Client settings, you can optionally add domain restrictions
   - This adds an extra layer of security to ensure only VIT Bhopal accounts can authenticate

## Step 2: Supabase Configuration

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Select your project

2. **Configure Google OAuth**
   - Go to "Authentication" > "Providers"
   - Find "Google" and toggle it ON
   - Enter your Google OAuth credentials:
     - **Client ID**: (from Google Cloud Console)
     - **Client Secret**: (from Google Cloud Console)
   - Save the configuration

## Step 3: Domain Validation Implementation

The application now includes automatic domain validation:

### **Built-in Features:**
- **Google OAuth Domain Hint**: Uses `hd=vitbhopal.ac.in` parameter to suggest VIT Bhopal accounts
- **Post-Authentication Validation**: Checks user email domain after Google OAuth
- **Automatic Sign-out**: Removes users with invalid domains immediately
- **User-Friendly Messages**: Clear error messages for domain validation failures

### **How It Works:**
1. User clicks "Sign in with Google"
2. Google OAuth suggests VIT Bhopal accounts (due to domain hint)
3. After successful OAuth, app validates email domain
4. If domain is invalid, user is signed out with error message
5. If domain is valid, user is logged in successfully

## Step 4: Test the Integration

1. **Start your development server**
   ```bash
   npm run dev
   ```

2. **Test Google Sign-in**
   - Go to your login page
   - Click "Sign in with Google"
   - Complete the Google OAuth flow
   - You should be redirected back to your app and logged in

## Important Notes

- **Domain Validation**: The app automatically validates that Google OAuth users have `@vitbhopal.ac.in` emails
- **Domain Hint**: Google OAuth will suggest VIT Bhopal accounts first due to the `hd` parameter
- **Automatic Rejection**: Users with non-VIT Bhopal emails are automatically signed out
- **User Data**: Valid Google OAuth users will automatically create user records in your Supabase auth.users table
- **Admin Access**: Google OAuth users are subject to the same admin access rules as email/password users
- **Callback Route**: The app includes a dedicated `/auth/callback` route for handling OAuth redirects

## Troubleshooting

### Common Issues:

1. **"redirect_uri_mismatch" error**
   - Make sure your redirect URI in Google Cloud Console exactly matches your Supabase project URL

2. **"Access blocked" error**
   - Ensure the Google+ API is enabled in Google Cloud Console
   - Check that your OAuth consent screen is properly configured

3. **Email domain validation**
   - Users must sign in with their `@vitbhopal.ac.in` Google accounts
   - Personal Gmail accounts will be automatically rejected with an error message
   - The app validates domains both during OAuth setup and after authentication

### Testing Checklist:

- [ ] Google Cloud Console project created
- [ ] Google+ API enabled
- [ ] OAuth 2.0 credentials created with correct redirect URIs
- [ ] Supabase Google provider configured with correct credentials
- [ ] Test with VIT Bhopal Google account
- [ ] Verify user is created in Supabase auth.users table
- [ ] Test admin access (if applicable)

## Security Considerations

- Keep your Google Client Secret secure and never expose it in client-side code
- Regularly rotate your OAuth credentials
- Monitor your Google Cloud Console for any suspicious activity
- Consider implementing additional security measures like email verification for OAuth users