# 🏥 TECNOT - AI Clinical Scribe Frontend

**Premium Medical Web Application for Sri Lankan Clinicians**

---

## 🎯 What is This?

TECNOT is a beautiful, modern web application that helps doctors record patient consultations and automatically generate medical notes. This is the **frontend (user interface)** part of the project.

**Built with:**
- ⚛️ React (JavaScript library for building UIs)
- 🎨 Tailwind CSS (for styling)
- 🧭 React Router (for navigation between pages)
- 🎭 Lucide Icons (beautiful icons)

---

## 📁 Project Structure

```
tecnot-app/
├── src/
│   ├── components/         # Reusable pieces (Sidebar, Header)
│   │   ├── Sidebar.jsx     # Left navigation menu
│   │   └── Header.jsx      # Top bar with title and user info
│   │
│   ├── pages/              # Full pages
│   │   ├── Home.jsx        # Dashboard with stats and quick actions
│   │   ├── Patients.jsx    # List of all patients
│   │   ├── PatientDetail.jsx # Individual patient's session folder
│   │   ├── NewSession.jsx  # Recording interface
│   │   ├── SoapNote.jsx    # View/Edit SOAP notes
│   │   ├── Profile.jsx     # Doctor's profile settings
│   │   ├── Settings.jsx    # App settings (theme, notifications)
│   │   └── Notifications.jsx # Notification center
│   │
│   ├── App.jsx             # Main app with all routes
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
│
├── index.html              # HTML template
├── package.json            # Project dependencies
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── postcss.config.js       # PostCSS configuration
```

---

## 🚀 How to Run This Project

### Step 1: Install Node.js

**You need Node.js installed on your computer first.**

1. Go to: https://nodejs.org/
2. Download the **LTS version** (Long Term Support)
3. Install it (click Next → Next → Finish)
4. Verify installation by opening Terminal/Command Prompt and typing:
   ```bash
   node --version
   npm --version
   ```
   (You should see version numbers like `v18.17.0`)

---

### Step 2: Open Project in VS Code

1. **Download VS Code:** https://code.visualstudio.com/
2. Open VS Code
3. Go to: **File → Open Folder**
4. Select the `tecnot-app` folder

---

### Step 3: Install Dependencies

**Open Terminal in VS Code** (View → Terminal or Ctrl+`)

Type this command and press Enter:
```bash
npm install
```

**What this does:** Downloads all the libraries (React, Tailwind, etc.) needed for the project.

**Wait 1-2 minutes** for it to finish. You'll see a `node_modules` folder appear.

---

### Step 4: Start the Development Server

In the same terminal, type:
```bash
npm run dev
```

**What this does:** Starts a local web server so you can see your app in the browser.

You'll see something like:
```
  VITE v5.0.8  ready in 523 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

**Your browser should automatically open** with the app running! 🎉

If it doesn't open automatically, **copy the URL** (`http://localhost:3000/`) and paste it in your browser.

---

## 📱 Features Included

### ✅ Pages Completed:

1. **Home Dashboard** (`/`)
   - Quick stats (patients, sessions, notes)
   - Quick action cards
   - Recent activity feed

2. **Patients** (`/patients`)
   - List of all patients with search
   - Add new patient modal
   - Patient cards with session count

3. **Patient Detail** (`/patient/:code`)
   - Individual patient folder
   - Session history list
   - "View SOAP Note" for each session

4. **New Session** (`/new-session`)
   - Patient selection
   - Recording interface with timer
   - Start/Stop recording buttons
   - Language support indicator

5. **SOAP Note** (`/soap-note/:id`)
   - View SOAP sections (Subjective, Objective, Assessment, Plan)
   - Edit mode toggle
   - Export to PDF button

6. **Profile** (`/profile`)
   - Personal information tab
   - Security settings tab
   - Editable fields

7. **Settings** (`/settings`)
   - Theme selection (Light/Dark/System)
   - Notification toggles
   - Logout button

8. **Notifications** (`/notifications`)
   - System notifications
   - Color-coded by type (success, info, warning)

---

## 🎨 Design Features

### Color Scheme:
- **Primary Teal:** `#4DB8A8` (main brand color)
- **Dark Teal:** `#3A9688` (hover states)
- **Light Teal:** `#E0F7F4` (backgrounds)
- **White/Gray:** Clean medical aesthetic

### Animations:
- ✨ Smooth fade-in on page load
- 🎭 Hover effects on cards and buttons
- 🌊 Transitions on all interactive elements
- 📊 Pulse effect for recording indicator

### Responsive Design:
- 📱 Mobile-friendly (works on phones)
- 💻 Desktop-optimized
- 🎯 Adapts to all screen sizes

---

## 🔧 Making Changes

### Want to change a page?

1. **Find the file** in `src/pages/` (e.g., `Home.jsx`)
2. **Edit the text/layout** (all text is in plain English in the file)
3. **Save the file** (Ctrl+S)
4. **See changes instantly** in the browser! (Vite hot-reloads automatically)

### Want to change colors?

1. Open `tailwind.config.js`
2. Find the `colors` section
3. Change the hex values (e.g., `'#4DB8A8'` to your color)

### Want to add a new page?

1. Create new file: `src/pages/MyNewPage.jsx`
2. Copy structure from `Home.jsx` as template
3. Add route in `src/App.jsx`:
   ```jsx
   <Route path="/my-new-page" element={<MyNewPage />} />
   ```

---

## 📚 Understanding the Code

### What is JSX?

JSX is **HTML inside JavaScript**. Example:
```jsx
<div className="bg-white p-6">
  <h1>Hello World</h1>
</div>
```

### What are Components?

**Components are reusable pieces of UI.** Like building blocks!

Example:
```jsx
function Button() {
  return <button className="bg-blue-500">Click Me</button>
}
```

### What is Tailwind CSS?

Instead of writing CSS files, you use **class names** directly:
```jsx
<div className="bg-red-500 text-white p-4 rounded-lg">
  This is red background, white text, padding, and rounded corners!
</div>
```

**Common classes:**
- `bg-blue-500` = blue background
- `text-white` = white text
- `p-4` = padding
- `rounded-lg` = rounded corners
- `hover:bg-blue-700` = darker blue on hover

---

## 🐛 Common Issues & Fixes

### 1. "Cannot find module" error
**Fix:** Run `npm install` again

### 2. Port 3000 already in use
**Fix:** Change port in `vite.config.js`:
```js
server: {
  port: 3001  // Change to any number
}
```

### 3. Styles not showing
**Fix:** Restart dev server (Ctrl+C, then `npm run dev`)

### 4. Page not found
**Fix:** Check if route exists in `src/App.jsx`

---

## 🎓 Learning Resources

### Absolute Beginner?

1. **HTML/CSS Basics:** https://www.w3schools.com/html/
2. **JavaScript Basics:** https://javascript.info/
3. **React Tutorial:** https://react.dev/learn

### Quick References:

- **Tailwind CSS Classes:** https://tailwindcss.com/docs
- **React Hooks:** https://react.dev/reference/react
- **Lucide Icons:** https://lucide.dev/icons/

---

## 📝 Next Steps (Backend Integration)

**This is frontend only. To make it work with AI:**

1. **Backend API** (FastAPI with Python)
2. **Speech-to-Text** (Whisper integration)
3. **SOAP Generation** (Mistral LLM)
4. **Database** (SQLite for storing sessions)
5. **Authentication** (User login system)

---

## 🤝 Need Help?

**Getting errors?**
1. Check the Terminal for error messages
2. Google the error message
3. Ask ChatGPT or Claude for help
4. Check Stack Overflow

**Want to customize?**
- Every file has comments explaining what it does
- Read the comments (lines starting with `//`)
- Experiment! You can't break anything permanently

---

## 🎉 Congratulations!

You now have a **premium, production-quality frontend** for TECNOT!

**This is just the UI** - the backend with AI will come in later phases.

For now, explore the code, make changes, and learn how React works! 🚀

---

**Made with ❤️ for TECNOT SDGP Team 2025**
