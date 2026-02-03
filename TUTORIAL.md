# 🎓 TECNOT Frontend - Complete Beginner's Tutorial

**For people with ZERO coding experience**

---

## 📖 Part 1: Understanding What You Have

### What is a "Frontend"?

Think of a website like a house:
- **Frontend** = What you SEE (walls, paint, furniture, decorations)
- **Backend** = What you DON'T see (plumbing, electricity, foundation)

**TECNOT Frontend = The beautiful interface doctors will use**

---

## 🖥️ Part 2: Setting Up Your Computer

### Step 1: Install Node.js

**What is Node.js?**
- It's like a translator that helps your computer understand JavaScript
- You MUST have this to run React projects

**How to install:**

1. Go to: https://nodejs.org/
2. You'll see two buttons - click **"LTS"** (the green one)
3. Download will start
4. Open the downloaded file
5. Click "Next" → "Next" → "I Agree" → "Next" → "Install"
6. Wait 2-3 minutes
7. Click "Finish"

**Verify it worked:**

1. Open **Command Prompt** (Windows) or **Terminal** (Mac)
   - Windows: Press Windows Key + R, type `cmd`, press Enter
   - Mac: Press Cmd + Space, type `terminal`, press Enter

2. Type this and press Enter:
   ```
   node --version
   ```

3. You should see something like: `v18.17.0`
   - If you see this, SUCCESS! ✅
   - If you see "command not found", restart computer and try again

---

### Step 2: Install VS Code (Your Code Editor)

**What is VS Code?**
- It's like Microsoft Word, but for code
- Makes code colorful and easy to read

**How to install:**

1. Go to: https://code.visualstudio.com/
2. Click the big blue "Download" button
3. Install like any normal program
4. Open VS Code when done

---

## 📂 Part 3: Opening Your Project

### Step 1: Extract the Project Folder

1. You have a folder called `tecnot-app`
2. Put it somewhere easy to find (like Desktop or Documents)
3. Make sure it's NOT inside a zip file

### Step 2: Open in VS Code

1. Open VS Code
2. Click **File → Open Folder**
3. Find your `tecnot-app` folder
4. Click "Select Folder"

**You should now see:**
- Left sidebar with folders: `src`, `node_modules`, etc.
- Middle area showing files

---

## 🎮 Part 4: Running the Project

### Step 1: Open Terminal in VS Code

**Two ways to do this:**

**Option A:**
- Click **View** at the top
- Click **Terminal**

**Option B:**
- Press `` Ctrl + ` `` (the key above Tab)

**You'll see a black box at the bottom** - this is the Terminal!

---

### Step 2: Install Everything

**In the Terminal, type this EXACTLY and press Enter:**

```
npm install
```

**What you'll see:**
- Lots of text scrolling
- Lines like "added 234 packages"
- Takes 1-2 minutes

**Wait until you see your cursor blinking again** (no more text appearing)

**If you see errors:**
- Close VS Code
- Restart your computer
- Try again

---

### Step 3: Start the Server

**In the Terminal, type:**

```
npm run dev
```

**What you'll see:**
```
  VITE v5.0.8  ready in 523 ms

  ➜  Local:   http://localhost:3000/
```

**Your browser should AUTOMATICALLY open with TECNOT! 🎉**

**If it doesn't:**
1. Open your browser (Chrome, Firefox, etc.)
2. Type in the address bar: `localhost:3000`
3. Press Enter

---

## 🎨 Part 5: Exploring TECNOT

### What you should see:

**Sidebar (left side):**
- Home
- Patients
- New Session
- Notifications
- My Profile
- Settings (at bottom)

**Main area:**
- Dashboard with colorful stats
- Quick action cards
- Recent activity

### Click around!

Try clicking everything to see what each page looks like.

**Pages to explore:**
1. **Home** - Main dashboard
2. **Patients** - List of patients (try clicking "Add New Patient")
3. **New Session** - Recording interface (try clicking buttons)
4. **My Profile** - Profile settings
5. **Settings** - App preferences

---

## 🛠️ Part 6: Making Your First Change

### Let's change the homepage title!

**Step 1: Find the file**

1. In VS Code's left sidebar, click: `src` → `pages` → `Home.jsx`
2. File will open in the middle

**Step 2: Find the text**

1. Press `Ctrl + F` (Windows) or `Cmd + F` (Mac)
2. Type: `Welcome back`
3. You'll see it highlighted

**Step 3: Change it**

1. Change `Welcome back, Dr. Malik!` to `Welcome back, YOUR NAME!`
2. Press `Ctrl + S` to SAVE (or File → Save)

**Step 4: See the change**

1. Go back to your browser
2. **BOOM! It changed automatically!** ✨

---

## 🎯 Part 7: Understanding the Code

### Let's look at a simple component:

```jsx
function Button() {
  return (
    <button className="bg-blue-500 text-white p-4 rounded-lg">
      Click Me!
    </button>
  )
}
```

**Breaking it down:**

- `function Button()` = Creating a piece of UI called "Button"
- `return (...)` = What this piece looks like
- `<button>` = An HTML button
- `className="..."` = Styling (using Tailwind CSS)
- `bg-blue-500` = Blue background
- `text-white` = White text
- `p-4` = Padding (space inside)
- `rounded-lg` = Rounded corners

---

### Tailwind CSS = Easy Styling

Instead of writing complex CSS files, you use class names:

**Common ones:**
```
bg-red-500      = Red background
text-white      = White text
p-4             = Padding (space inside)
m-6             = Margin (space outside)
rounded-lg      = Rounded corners
shadow-lg       = Drop shadow
hover:bg-red-700 = Darker red when you hover
```

**Example:**
```jsx
<div className="bg-blue-500 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl">
  This is a blue card with rounded corners and shadow!
</div>
```

---

## 🎨 Part 8: Customizing Colors

### Want to change the teal color to purple?

**Step 1: Open `tailwind.config.js`**

**Step 2: Find this:**
```js
'tecnot': {
  primary: '#4DB8A8',    // Main teal color
  dark: '#3A9688',       // Darker teal
  light: '#E0F7F4',      // Light teal
}
```

**Step 3: Change to purple:**
```js
'tecnot': {
  primary: '#8B5CF6',    // Purple
  dark: '#7C3AED',       // Darker purple
  light: '#F3E8FF',      // Light purple
}
```

**Step 4: Save** (Ctrl+S)

**Step 5: Go to browser** - EVERYTHING IS NOW PURPLE! 💜

---

## 🐛 Part 9: When Things Go Wrong

### Error: "Cannot find module"

**Fix:**
```
npm install
```

### Error: "Port 3000 already in use"

**Fix:**
1. Open `vite.config.js`
2. Change `port: 3000` to `port: 3001`
3. Save
4. Stop server (Ctrl+C in Terminal)
5. Start again: `npm run dev`

### Nothing shows up / White screen

**Fix:**
1. Press `Ctrl+C` in Terminal (stops server)
2. Type: `npm run dev` (starts again)

### Code doesn't look right

**Fix:**
1. Install "Prettier" extension in VS Code
2. Right-click in code
3. Click "Format Document"

---

## 📚 Part 10: Learning More

### Want to understand better?

**Free resources:**

1. **HTML/CSS Basics**
   - https://www.w3schools.com/html/
   - Learn in 1-2 hours

2. **JavaScript Basics**
   - https://javascript.info/
   - Start with "An Introduction" section

3. **React Tutorial**
   - https://react.dev/learn
   - Official React tutorial

4. **Tailwind CSS**
   - https://tailwindcss.com/docs
   - Reference for all styling classes

5. **YouTube Channels**
   - "Web Dev Simplified" (for beginners)
   - "Traversy Media" (for React)
   - "Net Ninja" (for everything)

---

## ✅ Part 11: Checklist

**Before you start coding:**

- [ ] Node.js installed
- [ ] VS Code installed
- [ ] Project opened in VS Code
- [ ] `npm install` completed
- [ ] `npm run dev` running
- [ ] Browser showing TECNOT

**You're ready!** 🎉

---

## 🚀 Part 12: Next Steps

### What you can do now:

1. **Change text** on any page (just edit the JSX files)
2. **Change colors** in `tailwind.config.js`
3. **Add new pages** (copy an existing page as template)
4. **Customize layout** (move things around in JSX)

### What comes later:

1. **Backend API** (Python with FastAPI)
2. **Connect to AI** (Whisper for speech-to-text)
3. **Database** (Save patient data permanently)
4. **Deploy online** (Make it accessible on the internet)

---

## 🎊 You Did It!

You now have a **working, beautiful medical app** that you can customize!

**Remember:**
- Don't be afraid to break things (you can always undo)
- Google is your friend
- Read the comments in code files
- Practice makes perfect!

**Welcome to web development! 🌟**

---

Made with ❤️ for TECNOT Team  
*"From zero to hero in 1 month"*
