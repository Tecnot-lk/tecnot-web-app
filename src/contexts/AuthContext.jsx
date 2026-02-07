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
  const [user, setUser] = useState({ first_name: 'Ibrahim', specialty: 'General Physician' })
  const [token, setToken] = useState('mock-token')
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [loading, setLoading] = useState(false)  // ← THIS LINE WAS MISSING!

  // Comment out the useEffect for now (we're using mock auth)
   useEffect(() => {
     const checkAuth = async () => {
       const storedToken = localStorage.getItem('tecnot_token')
      
      if (storedToken) {
        try {
          const userData = await authService.getCurrentUser()
          setUser(userData)
           setToken(storedToken)
           setIsAuthenticated(true)
         } catch (error) {
           console.error('Auth check failed:', error)
           localStorage.removeItem('tecnot_token')
           setToken(null)
           setUser(null)
           setIsAuthenticated(false)
         }
       }
      
       setLoading(false)
     }

     checkAuth()
   }, [])
//
  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials)
      
      localStorage.setItem('tecnot_token', response.access_token)
      setToken(response.access_token)
      setUser(response.user)
      setIsAuthenticated(true)
      
      return response
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const register = async (userData) => {
    try {
      const response = await authService.register(userData)
      
      localStorage.setItem('tecnot_token', response.access_token)
      setToken(response.access_token)
      setUser(response.user)
      setIsAuthenticated(true)
      
      return response
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  }

  const googleLogin = async (googleToken) => {
    try {
      const response = await authService.googleLogin(googleToken)
      
      localStorage.setItem('tecnot_token', response.access_token)
      setToken(response.access_token)
      setUser(response.user)
      setIsAuthenticated(true)
      
      return response
    } catch (error) {
      console.error('Google login error:', error)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('tecnot_token')
    setToken(null)
    setUser(null)
    setIsAuthenticated(false)
  }

  const value = {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    register,
    googleLogin,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}