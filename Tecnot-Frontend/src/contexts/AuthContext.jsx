// src/contexts/AuthContext.jsx
// FULLY INTEGRATED WITH SUPABASE AUTH
import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState(() => localStorage.getItem('tecnot_theme') || 'light')

  // Apply theme
  useEffect(() => {
    const root = document.documentElement
    theme === 'dark' ? root.classList.add('dark') : root.classList.remove('dark')
    localStorage.setItem('tecnot_theme', theme)
  }, [theme])

  // Listen to Supabase auth state changes
  useEffect(() => {
    // Get initial session (handles OAuth callback)
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('📱 Initial session check:', session ? 'Found' : 'None')
      
      if (session?.user) {
        setUser(session.user)
        setIsAuthenticated(true)
        fetchProfile(session.user.id)
        
        // If we just logged in via OAuth and we're on login page, redirect
        if (window.location.pathname === '/login' || window.location.pathname === '/') {
          console.log('🔄 Redirecting to /patients after OAuth login')
          window.location.pathname = '/patients'
        }
      }
      setLoading(false)
    })

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('🔐 Auth event:', event, 'Session:', session ? 'Present' : 'None')
      
      if (session?.user) {
        setUser(session.user)
        setIsAuthenticated(true)
        fetchProfile(session.user.id)
        
        // Redirect after successful OAuth sign-in
        if (event === 'SIGNED_IN' && (window.location.pathname === '/login' || window.location.pathname === '/')) {
          console.log('🔄 Redirecting to /patients after sign-in event')
          setTimeout(() => {
            window.location.href = '/patients'
          }, 100)
        }
      } else {
        setUser(null)
        setProfile(null)
        setIsAuthenticated(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  // Fetch doctor profile from profiles table
  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (!error && data) {
        setProfile(data)
      } else if (error) {
        console.log('ℹ️ No profile found in profiles table (this is OK for new OAuth users)')
        // Create a basic profile from user metadata
        const user = await supabase.auth.getUser()
        if (user.data.user) {
          const metadata = user.data.user.user_metadata
          setProfile({
            id: userId,
            email: user.data.user.email,
            first_name: metadata.full_name?.split(' ')[0] || metadata.name?.split(' ')[0] || 'Doctor',
            last_name: metadata.full_name?.split(' ').slice(1).join(' ') || metadata.name?.split(' ').slice(1).join(' ') || '',
            specialty: 'General Physician',
            clinic_name: 'TECNOT Clinic'
          })
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  // Login with email/password
  const login = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw new Error(error.message)
    return data
  }

  // Signup
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
    // 1. Create auth user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name,
          last_name,
          phone,
          specialty,
          license_number,
          clinic_name,
        }
      },
    })
    if (error) throw new Error(error.message)

    // 2. Insert into profiles table
    if (data.user) {
      const { error: profileError } = await supabase.from('profiles').insert([{
        id: data.user.id,
        first_name,
        last_name,
        email,
        phone,
        specialty,
        license_number,
        clinic_name,
      }])
      if (profileError) console.error('Profile insert error:', profileError.message)
    }

    return data
  }

  // Logout
  const logout = async () => {
    await supabase.auth.signOut()
    localStorage.removeItem('doctor_profile_pic')
    setUser(null)
    setProfile(null)
    setIsAuthenticated(false)
  }

  // Update profile
  const updateProfile = async (updates) => {
    if (!user) throw new Error('Not authenticated')
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single()
    if (error) throw new Error(error.message)
    setProfile(data)
    return data
  }

  // Change password
  const changePassword = async (newPassword) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) throw new Error(error.message)
  }

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      isAuthenticated,
      loading,
      login,
      signup,
      logout,
      updateProfile,
      changePassword,
      theme,
      setTheme,
    }}>
      {children}
    </AuthContext.Provider>
  )
}