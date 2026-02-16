import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Patients from './pages/Patients'
import PatientDetail from './pages/PatientDetail'
import NewSession from './pages/NewSession'
import SoapNote from './pages/SoapNote'
import Notifications from './pages/Notifications'
import Profile from './pages/Profile'
import Settings from './pages/Settings'

function AppContent() {
  const location = useLocation()
  const { isAuthenticated, loading } = useAuth()
  const noSidebarRoutes = ['/login', '/signup']
  const showSidebar = !noSidebarRoutes.includes(location.pathname)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-tecnot-primary dark:border-tecnot-light border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {showSidebar && <Sidebar />}
      
      {/* FIXED: Added proper margin for sidebar on desktop */}
      <main className={`flex-1 w-full ${showSidebar ? 'lg:ml-64 xl:ml-72' : ''}`}>
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
          <Route path="/signup" element={isAuthenticated ? <Navigate to="/" replace /> : <Signup />} />
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />} />
          <Route path="/patients" element={isAuthenticated ? <Patients /> : <Navigate to="/login" replace />} />
          <Route path="/patient/:mrn" element={isAuthenticated ? <PatientDetail /> : <Navigate to="/login" replace />} />
          <Route path="/new-session" element={isAuthenticated ? <NewSession /> : <Navigate to="/login" replace />} />
          <Route path="/soap-note/:id" element={isAuthenticated ? <SoapNote /> : <Navigate to="/login" replace />} />
          <Route path="/notifications" element={isAuthenticated ? <Notifications /> : <Navigate to="/login" replace />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" replace />} />
          <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/login" replace />} />
          <Route path="*" element={
            <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-tecnot-primary dark:text-tecnot-light mb-4">404</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">Page Not Found</p>
                <a href="/" className="text-tecnot-primary dark:text-tecnot-light hover:underline font-semibold">Go back home</a>
              </div>
            </div>
          } />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App