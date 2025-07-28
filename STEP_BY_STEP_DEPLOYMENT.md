# Step-by-Step Vercel Deployment Guide

## Prerequisites (2 minutes)
1. **GitHub Account**: Sign up at github.com if you don't have one
2. **Vercel Account**: Go to vercel.com and sign up with your GitHub account
3. **Your Code**: Have your Tropoja app code ready

## Step 1: Upload Code to GitHub (3 minutes)

### Option A: Using GitHub Desktop (Recommended)
1. Download GitHub Desktop from desktop.github.com
2. Install and sign in with your GitHub account
3. Click "Create a New Repository on your hard drive"
4. Name it: `tropoja-tourism-app`
5. Choose your app folder location
6. Click "Create Repository"
7. Copy all your app files into this folder
8. In GitHub Desktop, you'll see all files listed
9. Add commit message: "Initial Tropoja tourism app"
10. Click "Commit to main"
11. Click "Publish repository" 
12. Make sure "Keep this code private" is UNCHECKED
13. Click "Publish Repository"

### Option B: Using Command Line
```bash
cd your-app-folder
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/tropoja-tourism-app.git
git push -u origin main
```

## Step 2: Deploy to Vercel (2 minutes)
1. Go to vercel.com and sign in
2. Click "New Project"
3. You'll see your GitHub repositories
4. Find "tropoja-tourism-app" and click "Import"
5. Vercel will detect it's a Vite React app automatically
6. **IMPORTANT**: Add Environment Variables:
   - Click "Environment Variables"
   - Add: `VITE_SUPABASE_URL` = `your_supabase_url`
   - Add: `VITE_SUPABASE_ANON_KEY` = `your_supabase_key`
   - Add: `VITE_STRIPE_PUBLISHABLE_KEY` = `your_stripe_key`
7. Click "Deploy"
8. Wait 2-3 minutes for build to complete

## Step 3: Get Your Live URL (1 minute)
1. Once deployed, you'll see "Congratulations!"
2. Click "Visit" to see your live app
3. Your URL will be: `https://tropoja-tourism-app.vercel.app`
4. Test all features work correctly

## Step 4: Custom Domain (Optional - 5 minutes)
1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., tropoja-guide.com)
4. Follow DNS setup instructions
5. Wait for SSL certificate (automatic)

## Troubleshooting

### Build Fails?
- Check Environment Variables are set correctly
- Ensure all files are uploaded to GitHub
- Check the build logs in Vercel for specific errors

### App Loads but Features Don't Work?
- Verify Supabase URL and keys are correct
- Check browser console for errors
- Ensure Supabase project is active

### Need Help?
- Vercel has excellent docs: vercel.com/docs
- Check deployment logs in Vercel dashboard
- GitHub issues tab for your repository

## Success! 🎉
Your Tropoja tourism app is now live and accessible worldwide!

**Next Steps:**
- Share your URL with users
- Monitor usage in Vercel analytics
- Update code by pushing to GitHub (auto-deploys)
- Set up custom domain for professional look

**Your app includes:**
✅ Interactive tourism guide
✅ Maps and attractions
✅ Restaurant recommendations  
✅ Accommodation booking
✅ Payment processing
✅ WhatsApp support
✅ Mobile-responsive design