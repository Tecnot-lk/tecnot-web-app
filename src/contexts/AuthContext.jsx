// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react'
import * as authService from '../services/authService'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  // ✅ On app start: load auth from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('tecnot_token')
    const storedUser = localStorage.getItem('tecnot_user')

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    } else {
      setToken(null)
      setUser(null)
      setIsAuthenticated(false)
    }

    setLoading(false)
  }, [])

  // ✅ MOCK LOGIN (works without backend)
  const login = async ({ email, password }) => {
    // basic validation
    if (!email || !password) {
      throw new Error('Email and password are required.')
    }

    // If user already signed up before, allow login using that email
    const storedUser = localStorage.getItem('tecnot_user')
    if (storedUser) {
      const parsed = JSON.parse(storedUser)
      if (parsed.email?.toLowerCase() !== email.toLowerCase()) {
        throw new Error('No account found with this email. Please sign up.')
      }
    }

    const mockToken = 'mock-token'
    localStorage.setItem('tecnot_token', mockToken)

    // If no user exists yet, create a default one
    if (!storedUser) {
      const defaultUser = {
        first_name: 'Ibrahim',
        last_name: 'Malik',
        email,
        phone: '+94 77 999 8888',
        specialty: 'General Physician',
        license_number: 'SL12345',
        clinic_name: 'Ibrahim Medical Center',
      }
      localStorage.setItem('tecnot_user', JSON.stringify(defaultUser))
      setUser(defaultUser)
    } else {
      setUser(JSON.parse(storedUser))
    }

    setToken(mockToken)
    setIsAuthenticated(true)
  }

  // ✅ MOCK SIGNUP (stores extra fields)
  const signup = async ({
    first_name,
    last_name,
    email,
    phone,
    specialty,
    license_number,
    clinic_name,
    password,
  }) => {
    if (!first_name || !last_name || !email || !phone || !specialty || !license_number || !clinic_name || !password) {
      throw new Error('Please fill all required fields.')
    }

    const mockUser = {
      first_name,
      last_name,
      email,
      phone,
      specialty,
      license_number,
      clinic_name,
    }

    const mockToken = 'mock-token'

    localStorage.setItem('tecnot_token', mockToken)
    localStorage.setItem('tecnot_user', JSON.stringify(mockUser))

    setToken(mockToken)
    setUser(mockUser)
    setIsAuthenticated(true)
  }

  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem('tecnot_token')
    localStorage.removeItem('tecnot_user')
    setToken(null)
    setUser(null)
    setIsAuthenticated(false)
  }

  // ✅ OPTIONAL: call backend current user later
  // (keep for when you add real backend)
  const getCurrentUser = async () => {
    return authService.getCurrentUser()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        login,
        signup,
        logout,
        getCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
