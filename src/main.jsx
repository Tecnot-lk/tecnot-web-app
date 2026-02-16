// =============================================================================
// MAIN ENTRY POINT
// =============================================================================
//
// PURPOSE:
// - Initialize React application
// - Wrap app with AuthProvider for authentication state
// - Render root component
//
// HOW IT WORKS:
// 1. Import React and ReactDOM
// 2. Import global styles
// 3. Import App component
// 4. Import AuthProvider
// 5. Render App wrapped in AuthProvider
//
// =============================================================================

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext'

// =============================================================================
// RENDER APPLICATION
// =============================================================================
/**
 * Renders the React application to the DOM
 * 
 * STRUCTURE:
 * - StrictMode: Helps catch bugs during development
 * - AuthProvider: Provides authentication state to entire app
 * - App: Main application component with routing
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
)