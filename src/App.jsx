// ====================
// MAIN APP COMPONENT
// This sets up all the routes and layout
// ====================

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

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
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        
        {/* Sidebar - shows on all pages */}
        <Sidebar />
        
        {/* Main Content Area */}
        <div className="flex-1 ml-64">
          <Routes>
            {/* Home/Dashboard page */}
            <Route path="/" element={<Home />} />
            
            {/* Patients list page */}
            <Route path="/patients" element={<Patients />} />
            
            {/* Individual patient folder page */}
            <Route path="/patient/:code" element={<PatientDetail />} />
            
            {/* Start new recording session */}
            <Route path="/new-session" element={<NewSession />} />
            
            {/* View/Edit SOAP note - UPDATED to accept both code and sessionId */}
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