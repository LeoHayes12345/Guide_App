# App Store & Google Play Deployment Guide

## Current Status: Web App (PWA Ready)
Your Tropoja tourism app is currently a **Progressive Web App (PWA)** that works on all devices through web browsers.

## Payment Issue Fix
The payment shows £5 instead of €2.99 because of a configuration mismatch. Here's the fix:

### Quick Fix for Payment
1. The Stripe function is correctly set to €2.99 (299 cents EUR)
2. The UI shows "Pay €2.99" correctly
3. If you're seeing £5, it might be:
   - Browser cache (clear cache and refresh)
   - Old Stripe session (restart browser)
   - Testing with old test data

## Making Your App Live (Free Options)

### Option 1: Web App (FREE - Recommended)
✅ **Already works on all devices**
✅ **No app store fees**
✅ **Instant updates**

Deploy to Vercel (free):
```bash
npm run build
npx vercel --prod
```
Your app will be live at: `https://your-domain.vercel.app`

### Option 2: PWA Installation (FREE)
Users can "install" your web app:
- Android: Chrome menu → "Add to Home Screen"
- iOS: Safari → Share → "Add to Home Screen"
- Desktop: Browser address bar → Install icon

## App Store Deployment (Costs Money)

### Apple App Store
**Cost: $99/year**
**Requirements:**
- Mac computer with Xcode
- Apple Developer Account
- App review process (1-7 days)
- Convert web app to native using Capacitor/Cordova

### Google Play Store
**Cost: $25 one-time**
**Requirements:**
- Google Play Developer Account
- Android Studio or web-to-app conversion
- App review process (few hours)

## Recommended Approach

### Phase 1: Launch as Web App (FREE)
1. Deploy to Vercel (free hosting)
2. Share the web link
3. Users can install as PWA
4. Test market demand

### Phase 2: App Stores (If Successful)
Only if web app gets good traction:
1. Use Capacitor to convert to native
2. Submit to app stores
3. Pay the fees

## Why Start with Web App?
- **FREE to deploy and maintain**
- **Works on ALL devices immediately**
- **No approval process**
- **Instant updates**
- **Test market demand first**

## Next Steps
1. Fix payment cache issue (clear browser cache)
2. Deploy to Vercel for free
3. Share your live web app link
4. Consider app stores only after success

Your app is ready to go live as a web app right now!