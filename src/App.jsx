// ====================
// MAIN APP - FIXED RESPONSIVE LAYOUT
// ====================

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Patients from './pages/Patients'
import PatientDetail from './pages/PatientDetail'
import NewSession from './pages/NewSession'
import SoapNote from './pages/SoapNote'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Notifications from './pages/Notifications'

import Sidebar from './components/Sidebar'

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content - NO MARGIN ON MOBILE, MARGIN ON DESKTOP */}
        <div className="flex-1 flex flex-col min-h-screen w-full lg:ml-64 xl:ml-72">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/patient/:code" element={<PatientDetail />} />
            <Route path="/new-session" element={<NewSession />} />
            <Route path="/soap-note/:id" element={<SoapNote />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App