# 🚀 Deploy Your Tropoja Tourism App to Vercel NOW

## Step 1: Push to GitHub (if not already done)
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

## Step 2: Deploy to Vercel (5 minutes)

### Option A: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Option B: Manual Deploy
1. Go to **[vercel.com](https://vercel.com)**
2. Click **"Sign up"** with GitHub
3. Click **"New Project"**
4. Select your repository
5. Vercel auto-detects Vite React app ✅
6. Click **"Deploy"** (takes 2-3 minutes)

## Step 3: Add Environment Variables
In Vercel dashboard → Settings → Environment Variables:

```
VITE_SUPABASE_URL = https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY = your_anon_key_here
VITE_STRIPE_PUBLISHABLE_KEY = pk_live_or_test_key
```

## Step 4: Redeploy
After adding env vars, go to Deployments → Click "..." → Redeploy

## 🎉 Your App is Live!
- URL: `https://your-app-name.vercel.app`
- Apple Pay & Google Pay will now work (HTTPS required)
- Free SSL certificate included
- Global CDN for fast loading

## Troubleshooting
- **Build fails?** Check environment variables
- **Payment issues?** Verify Stripe keys
- **Apple Pay not showing?** Only works on Safari/iOS with HTTPS

## Next Steps
1. Test payments on live site
2. Share URL with users
3. Monitor Stripe dashboard
4. Optional: Add custom domain

**Need help?** The app is production-ready and should deploy without issues!