# Vercel Deployment Guide for Tropoja Tourism App

## Quick Deployment Steps

### 1. Prepare Your Code
Your app is ready! Just make sure all changes are committed to your Git repository.

### 2. Deploy to Vercel (FREE)
1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with GitHub
3. Click "New Project"
4. Import your repository
5. Vercel will auto-detect it's a Vite React app
6. Click "Deploy"

### 3. Environment Variables
After deployment, add these in Vercel dashboard:
- `VITE_SUPABASE_URL` = your Supabase URL
- `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
- `VITE_STRIPE_PUBLISHABLE_KEY` = your Stripe publishable key

### 4. Custom Domain (Optional)
- Add your own domain in Vercel settings
- Or use the free `.vercel.app` domain

## About Apple Pay & Google Pay

**Why you can't see them:**
1. **HTTPS Required**: Apple Pay/Google Pay only work on HTTPS domains
2. **Domain Verification**: Apple Pay needs domain verification
3. **Testing Environment**: They don't show in localhost/development

**After Vercel Deployment:**
- Apple Pay will appear on Safari (iOS/macOS)
- Google Pay will appear on Chrome (Android/supported browsers)
- Both require HTTPS (which Vercel provides automatically)

## Next Steps After Deployment
1. Test payments on the live HTTPS site
2. Apple Pay/Google Pay should now be visible
3. Share your live app URL with users
4. Monitor payments in Stripe dashboard

Your app will be live at: `https://your-app-name.vercel.app`