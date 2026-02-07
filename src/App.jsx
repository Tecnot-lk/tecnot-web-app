// ====================
// MAIN APP COMPONENT
// This sets up all the routes and layout
// ====================

import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'

// Components
import Sidebar from './components/Sidebar'
import PrivateRoute from './components/PrivateRoute'

// Import all page components
import Home from './pages/Home'
import Patients from './pages/Patients'
import PatientDetail from './pages/PatientDetail'
import NewSession from './pages/NewSession'
import SoapNote from './pages/SoapNote'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Notifications from './pages/Notifications'

// Import Sidebar component
import Sidebar from './components/Sidebar'

function App() {
  const { isAuthenticated, loading } = useAuth()

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tecnot-primary mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar - Only show when authenticated */}
        {isAuthenticated && <Sidebar />}
        
        {/* Sidebar - shows on all pages */}
        <Sidebar />
        
        {/* Main Content Area - Responsive margin */}
        <div className="flex-1 w-full lg:ml-64">
          <Routes>
            {/* Home/Dashboard page */}
            <Route path="/" element={<Home />} />
            
            {/* Patients list page */}
            <Route path="/patients" element={<Patients />} />
            
            {/* Individual patient folder page */}
            <Route path="/patient/:code" element={<PatientDetail />} />
            
            {/* Start new recording session */}
            <Route path="/new-session" element={<NewSession />} />
            
            {/* View/Edit SOAP note */}
            <Route path="/soap-note/:code/:sessionId" element={<SoapNote />} />
            
            {/* Notifications */}
            <Route path="/notifications" element={<Notifications />} />
            
            {/* User profile */}
            <Route path="/profile" element={<Profile />} />
            
            {/* Settings */}
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App