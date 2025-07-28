# Deployment Instructions for Tropoja Tourism App

## Quick Deploy Options

### 1. Vercel (Recommended - Free)
1. Push your code to GitHub
2. Go to vercel.com and sign up with GitHub
3. Click "New Project" and import your repository
4. Vercel will auto-detect Vite and deploy
5. Your app will be live at: `https://your-app-name.vercel.app`

### 2. Netlify (Alternative - Free)
1. Push code to GitHub
2. Go to netlify.com and sign up
3. Click "New site from Git" and select your repo
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Deploy and get live URL

### 3. GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts:
   ```json
   "homepage": "https://yourusername.github.io/your-repo-name",
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
3. Run: `npm run deploy`

## Environment Variables Needed
For production, add these to your hosting platform:
- `VITE_SUPABASE_URL` (already in your code)
- `VITE_SUPABASE_ANON_KEY` (already in your code)
- `VITE_STRIPE_PUBLISHABLE_KEY` (already configured)

## Test Your App
Once deployed, test:
- Navigation between all sections
- WhatsApp chat (017327456789)
- Payment flows (use Stripe test cards)
- Premium account features
- Mobile responsiveness

**Fastest option: Push to GitHub → Import to Vercel → Live in 2 minutes!**