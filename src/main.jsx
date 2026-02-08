// ====================
// MAIN ENTRY POINT
// This is where React starts running
// ====================

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ThemeProvider } from './pages/ThemeContext'

// Find the 'root' div in index.html and inject our React app into it
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
    <App />
    </ThemeProvider>
   
  </React.StrictMode>
)
