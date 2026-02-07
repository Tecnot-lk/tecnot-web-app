import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'

// Components
import Sidebar from './components/Sidebar'
import PrivateRoute from './components/PrivateRoute'

// Pages
//import Login from './pages/Login'
//import Signup from './pages/Signup'
import Home from './pages/Home'
import Patients from './pages/Patients'
import PatientDetail from './pages/PatientDetail'
import NewSession from './pages/NewSession'
import SoapNote from './pages/SoapNote'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Notifications from './pages/Notifications'

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
        
        {/* Main Content Area */}
        <div className={`flex-1 flex flex-col min-h-screen w-full ${isAuthenticated ? 'lg:ml-64 xl:ml-72' : ''}`}>
          <Routes>
            {/* Public Routes */}
            <Route 
              path="/login" 
              element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/signup" 
              element={!isAuthenticated ? <Signup /> : <Navigate to="/" replace />} 
            />

            {/* Protected Routes */}
            <Route 
              path="/" 
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/patients" 
              element={
                <PrivateRoute>
                  <Patients />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/patient/:code" 
              element={
                <PrivateRoute>
                  <PatientDetail />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/new-session" 
              element={
                <PrivateRoute>
                  <NewSession />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/soap-note/:id" 
              element={
                <PrivateRoute>
                  <SoapNote />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/notifications" 
              element={
                <PrivateRoute>
                  <Notifications />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              } 
            />

            {/* Fallback - Redirect to login or home */}
            <Route 
              path="*" 
              element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} 
            />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App