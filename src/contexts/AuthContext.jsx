// =============================================================================
// AUTHENTICATION CONTEXT
// =============================================================================
//
// PURPOSE:
// - Manage user authentication state across the entire app
// - Handle login, logout, signup
// - Store user information and auth token
// - Provide theme switching (light/dark mode)
//
// HOW IT WORKS:
// 1. User logs in → Store token in localStorage → Set user state
// 2. On app load → Check if token exists → Auto-login if valid
// 3. On logout → Clear token and user state
//
// BACKEND INTEGRATION POINTS:
// - Line 75: login() - POST /api/auth/login
// - Line 95: register() - POST /api/auth/register  
// - Line 115: googleLogin() - POST /api/auth/google
// - Line 135: Check token validity on app load - GET /api/auth/me
//
// =============================================================================

import React, { createContext, useContext, useState, useEffect } from 'react'
import * as authService from '../services/authService'

// Create Context
// This allows any component in the app to access auth state
const AuthContext = createContext(null)

// Custom hook to use auth context
// Usage: const { user, login, logout } = useAuth()
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

// ============================================================================
// AUTH PROVIDER COMPONENT
// ============================================================================
export const AuthProvider = ({ children }) => {
  
  // ==========================================================================
  // STATE MANAGEMENT
  // ==========================================================================
  
  // MOCK MODE: Auto-login as Dr. Ibrahim for frontend testing
  // PRODUCTION MODE: Set these to null and uncomment the useEffect below
  const [user, setUser] = useState({ 
    first_name: 'Ibrahim', 
    specialty: 'General Physician' 
  })
  const [token, setToken] = useState('mock-token')
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [loading, setLoading] = useState(false)
  
  // PRODUCTION MODE: Use these instead (currently commented out)
  // const [user, setUser] = useState(null)
  // const [token, setToken] = useState(localStorage.getItem('tecnot_token'))
  // const [isAuthenticated, setIsAuthenticated] = useState(false)
  // const [loading, setLoading] = useState(true)
  
  // Theme state (light/dark mode)
  const [theme, setTheme] = useState(() => {
    // Load theme from localStorage or default to 'light'
    return localStorage.getItem('tecnot_theme') || 'light'
  })

  // ==========================================================================
  // THEME EFFECT
  // ==========================================================================
  // Applies theme to document when theme changes
  useEffect(() => {
    // Save theme preference to localStorage
    localStorage.setItem('tecnot_theme', theme)
    const root = document.documentElement
    
    if (theme === 'dark') {
      root.classList.add('dark')
    } else if (theme === 'light') {
      root.classList.remove('dark')
    } else if (theme === 'system') {
      // Follow system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (systemPrefersDark) {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }
  }, [theme])

  // ==========================================================================
  // AUTO-LOGIN ON APP LOAD (PRODUCTION MODE)
  // ==========================================================================
  // CURRENTLY COMMENTED OUT - Uncomment when backend is ready
  //
  // HOW IT WORKS:
  // 1. Check if token exists in localStorage
  // 2. If yes, verify token with backend (GET /api/auth/me)
  // 3. If valid, set user as authenticated
  // 4. If invalid, clear token and show login page
  //
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const storedToken = localStorage.getItem('tecnot_token')
  //     
  //     if (storedToken) {
  //       try {
  //         // Verify token with backend
  //         const userData = await authService.getCurrentUser()
  //         setUser(userData)
  //         setToken(storedToken)
  //         setIsAuthenticated(true)
  //       } catch (error) {
  //         console.error('Auth check failed:', error)
  //         // Token is invalid, clear it
  //         localStorage.removeItem('tecnot_token')
  //         setToken(null)
  //         setUser(null)
  //         setIsAuthenticated(false)
  //       }
  //     }
  //     
  //     setLoading(false)
  //   }
  //
  //   checkAuth()
  // }, [])

  // ==========================================================================
  // LOGIN FUNCTION
  // ==========================================================================
  /**
   * Authenticates user with email and password
   * 
   * @param {Object} credentials - { email: string, password: string }
   * @returns {Promise} - Resolves with user data
   * 
   * BACKEND INTEGRATION:
   * - Calls: POST /api/auth/login
   * - Expects: { access_token: string, user: object }
   * - Stores token in localStorage
   * - Sets user state and isAuthenticated to true
   * 
   * EXAMPLE USAGE:
   * try {
   *   await login({ email: 'doctor@example.com', password: 'password123' })
   *   navigate('/') // Redirect to home
   * } catch (error) {
   *   console.error('Login failed:', error)
   * }
   */
  const login = async (credentials) => {
    try {
      // Call backend login endpoint
      const response = await authService.login(credentials)
      
      // Store token in localStorage for persistence
      localStorage.setItem('tecnot_token', response.access_token)
      
      // Update state
      setToken(response.access_token)
      setUser(response.user)
      setIsAuthenticated(true)
      
      return response
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  // ==========================================================================
  // REGISTER FUNCTION
  // ==========================================================================
  /**
   * Creates new user account
   * 
   * @param {Object} userData - User registration data
   * @returns {Promise} - Resolves with user data
   * 
   * BACKEND INTEGRATION:
   * - Calls: POST /api/auth/register
   * - Expects: { access_token: string, user: object }
   * - Automatically logs user in after successful registration
   * 
   * EXAMPLE USAGE:
   * const userData = {
   *   email: 'newdoctor@example.com',
   *   password: 'password123',
   *   first_name: 'John',
   *   last_name: 'Doe',
   *   specialty: 'General Physician'
   * }
   * await register(userData)
   */
  const register = async (userData) => {
    try {
      // Call backend register endpoint
      const response = await authService.register(userData)
      
      // Store token (auto-login after registration)
      localStorage.setItem('tecnot_token', response.access_token)
      
      // Update state
      setToken(response.access_token)
      setUser(response.user)
      setIsAuthenticated(true)
      
      return response
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  }

  // ==========================================================================
  // GOOGLE LOGIN FUNCTION
  // ==========================================================================
  /**
   * Authenticates user with Google OAuth
   * 
   * @param {string} googleToken - Token from Google OAuth
   * @returns {Promise} - Resolves with user data
   * 
   * BACKEND INTEGRATION:
   * - Calls: POST /api/auth/google
   * - Sends: { google_token: string }
   * - Expects: { access_token: string, user: object }
   * 
   * HOW IT WORKS:
   * 1. User clicks "Sign in with Google"
   * 2. Google popup opens, user authenticates
   * 3. Google returns a token
   * 4. We send that token to our backend
   * 5. Backend verifies with Google and creates/logs in user
   * 6. Backend returns our own JWT token
   */
  const googleLogin = async (googleToken) => {
    try {
      // Send Google token to our backend
      const response = await authService.googleLogin(googleToken)
      
      // Store our JWT token
      localStorage.setItem('tecnot_token', response.access_token)
      
      // Update state
      setToken(response.access_token)
      setUser(response.user)
      setIsAuthenticated(true)
      
      return response
    } catch (error) {
      console.error('Google login error:', error)
      throw error
    }
  }

  // ==========================================================================
  // LOGOUT FUNCTION
  // ==========================================================================
  /**
   * Logs out current user
   * 
   * HOW IT WORKS:
   * - Clears token from localStorage
   * - Resets all auth state
   * - User is redirected to login page (handled in component)
   * 
   * EXAMPLE USAGE:
   * const handleLogout = () => {
   *   logout()
   *   navigate('/login')
   * }
   */
  const logout = () => {
    // Clear token from storage
    localStorage.removeItem('tecnot_token')
    
    // Reset state
    setToken(null)
    setUser(null)
    setIsAuthenticated(false)
  }

  // ==========================================================================
  // CONTEXT VALUE
  // ==========================================================================
  // All values and functions that will be available to components
  const value = {
    user,              // Current user object
    token,             // JWT token
    isAuthenticated,   // Boolean: is user logged in?
    loading,           // Boolean: is auth check in progress?
    login,             // Function: log in user
    register,          // Function: register new user
    googleLogin,       // Function: Google OAuth login
    logout,            // Function: log out user
    theme,             // Current theme (light/dark)
    setTheme,          // Function: change theme
  }

  // ==========================================================================
  // RENDER
  // ==========================================================================
  // Wrap children with context provider
  // Now any child component can access auth state with useAuth()
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}