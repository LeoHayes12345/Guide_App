# How to Set Up Stripe Payment Keys

## Step 1: Find the File
The file `src/lib/stripe.ts` is in your project folder structure:
```
your-project/
  src/
    lib/
      stripe.ts  ← This is the file you need to edit
```

## Step 2: Get Your Stripe Keys
1. Go to https://dashboard.stripe.com/apikeys
2. Sign in to your Stripe account
3. Copy your **Publishable key** (starts with `pk_test_` or `pk_live_`)
4. Copy your **Secret key** (starts with `sk_test_` or `sk_live_`)

## Step 3: Update the File
Open `src/lib/stripe.ts` and replace this line:
```javascript
const key = 'pk_test_51QdQxBJNLxqCqNLr...'; // This is fake
```

With your real key:
```javascript
const key = 'pk_test_YOUR_ACTUAL_KEY_HERE';
```

## Step 4: Update Supabase Secret
The secret key goes in your Supabase dashboard (not in the code file):
1. Go to your Supabase project dashboard
2. Go to Settings → Edge Functions → Secrets
3. Update `STRIPE_SECRET_KEY` with your real secret key

## Test Card Numbers
- Success: 4242 4242 4242 4242
- Any future expiry date
- Any 3-digit CVC

Your payment should work after these changes!