# Where and How to Run Git Commands

## Step 1: Open Terminal/Command Prompt

### On Windows:
- Press `Windows + R`, type `cmd`, press Enter
- OR Press `Windows + X`, select "Command Prompt" or "PowerShell"
- OR Search for "Command Prompt" in Start menu

### On Mac:
- Press `Cmd + Space`, type "Terminal", press Enter
- OR Go to Applications → Utilities → Terminal

### On Linux:
- Press `Ctrl + Alt + T`
- OR Search for "Terminal" in applications

## Step 2: Navigate to Your Project Folder

Your Kosovo Travel App files should be in a folder. You need to navigate there:

```bash
# Example: If your project is on Desktop
cd Desktop/kosovo-travel-app

# Or if it's in Documents
cd Documents/kosovo-travel-app

# Or wherever you saved the project files
cd path/to/your/project/folder
```

## Step 3: Verify You're in the Right Place

Check if you can see your project files:

```bash
# List files in current directory
ls        # On Mac/Linux
dir       # On Windows
```

You should see files like:
- package.json
- src/
- public/
- index.html
- etc.

## Step 4: Now Run the Git Commands

Once you're in the correct folder, run these commands one by one:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/your-repo-name.git
git push -u origin main
```

## Important Notes:
- Replace `yourusername` with your actual GitHub username
- Replace `your-repo-name` with your actual repository name
- Run each command and wait for it to complete before running the next one
- If you get errors, read them carefully - they usually tell you what's wrong

## Need Help Finding Your Project Folder?
If you downloaded from famous.ai or have a ZIP file:
1. Extract the ZIP file to a known location (like Desktop)
2. Navigate to that folder using `cd` command
3. Then run the git commands