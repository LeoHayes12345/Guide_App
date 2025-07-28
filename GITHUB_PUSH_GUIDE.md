# How to Push Your Kosovo Travel App to GitHub

## What Files to Push
Push ALL these files and folders (the .gitignore will exclude what shouldn't go):

### Core Files:
- `package.json` (dependencies)
- `vite.config.ts` (build config)
- `tsconfig.json` (TypeScript config)
- `tailwind.config.ts` (styling)
- `index.html` (entry point)

### Source Code:
- `src/` folder (all your React components)
- `public/` folder (static assets)

### Config Files:
- `.gitignore` (already excludes node_modules, dist, etc.)
- `components.json`
- `postcss.config.js`
- `eslint.config.js`

## Step-by-Step Instructions

### 1. Create GitHub Repository
1. Go to github.com → Sign in
2. Click "+" → "New repository"
3. Name: `kosovo-travel-app`
4. Make it Public
5. ✅ Add README
6. Click "Create repository"

### 2. Push Your Code
Open terminal in your project folder:

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial Kosovo Travel App"

# Connect to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/kosovo-travel-app.git

# Push to GitHub
git push -u origin main
```

### 3. Verify Upload
Check github.com/YOUR_USERNAME/kosovo-travel-app
You should see all your files there!

## What Gets Excluded
The .gitignore automatically excludes:
- `node_modules/` (too large, installed via package.json)
- `dist/` (build output, generated automatically)
- `.env` files (secrets, add manually to Vercel)

## Next: Deploy to Vercel
Once on GitHub, import to Vercel for live deployment!