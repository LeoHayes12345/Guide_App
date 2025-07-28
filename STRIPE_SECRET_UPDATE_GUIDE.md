# How to Delete and Recreate Stripe Secret Key in Supabase

## Method 1: Through Edge Functions Dashboard

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Select your project

2. **Navigate to Edge Functions**
   - Click "Edge Functions" in the left sidebar
   - You should see your functions listed

3. **Access Function Settings**
   - Click on any of your functions (like `create-payment-intent`)
   - Look for a "Settings" or "Configuration" tab
   - OR look for "Environment Variables" or "Secrets" section

4. **Find the Secret**
   - Look for `STRIPE_SECRET_KEY` in the list
   - There should be three dots (...) or a trash/delete icon next to it
   - Click the three dots or delete icon

5. **Delete the Secret**
   - Click "Delete" or "Remove"
   - Confirm the deletion

6. **Create New Secret**
   - Click "Add Secret" or "New Secret" button
   - Name: `STRIPE_SECRET_KEY`
   - Value: Your new Stripe secret key (starts with `sk_test_` or `sk_live_`)
   - Click "Save" or "Create"

## Method 2: Through Project Settings

1. **Go to Project Settings**
   - Click the gear icon (⚙️) in the bottom left
   - Select "Settings"

2. **Find API or Configuration Section**
   - Look for "API" or "Configuration" in the settings menu
   - Check for "Environment Variables" or "Secrets"

3. **Manage Secrets**
   - Find `STRIPE_SECRET_KEY`
   - Delete and recreate as above

## Method 3: Using Supabase CLI (Alternative)

If the dashboard isn't working:

```bash
# Install Supabase CLI if not installed
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Set the secret
supabase secrets set STRIPE_SECRET_KEY=your_new_stripe_secret_key
```

## Troubleshooting

- **Can't find secrets section**: Try refreshing the page or logging out/in
- **No delete option**: Make sure you have admin/owner permissions
- **Changes not taking effect**: Redeploy your edge functions after updating secrets

## What to Look For

- **Three dots menu (⋮)** next to the secret name
- **Trash can icon (🗑️)** 
- **Delete button** in red text
- **Actions menu** or **More options**

The secret should appear as:
```
STRIPE_SECRET_KEY: sk_test_... [⋮] or [🗑️]
```