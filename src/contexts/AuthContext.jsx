// src/contexts/AuthContext.jsx
// ✅ FULLY INTEGRATED WITH SUPABASE AUTH
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
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user)
        setIsAuthenticated(true)
        fetchProfile(session.user.id)
      }
      setLoading(false)
    })

    // Subscribe to future auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user)
        setIsAuthenticated(true)
        fetchProfile(session.user.id)
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
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (!error && data) {
      setProfile(data)
    }
  }

  // ✅ SUPABASE LOGIN
  const login = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw new Error(error.message)
    return data
  }

  // ✅ SUPABASE SIGNUP — creates auth user + inserts profile row
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
        data: { first_name, last_name }, // stored in auth.users metadata
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

  // ✅ SUPABASE LOGOUT
  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
    setIsAuthenticated(false)
  }

  // ✅ UPDATE PROFILE
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

  // ✅ CHANGE PASSWORD
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
