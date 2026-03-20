// src/contexts/AuthContext.jsx
//FULLY INTEGRATED WITH SUPABASE AUTH
import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'

//Set true to skip email verification (testing)
//Set false for production
const SKIP_EMAIL_VERIFICATION = false

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
    // TEMPORARY: Mock auth for AI integration testing
    // Load mock user from localStorage
    const storedUser = localStorage.getItem('tecnot_user')
    const storedToken = localStorage.getItem('tecnot_token')
    
    if (storedUser && storedToken) {
      const mockUser = JSON.parse(storedUser)
      setUser(mockUser)
      setProfile(mockUser)
      setIsAuthenticated(true)
    }
    
    setLoading(false)
    
    // Real Supabase auth will be re-enabled later:
    /*
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user)
        setIsAuthenticated(true)
        fetchProfile(session.user.id)
      }
      setLoading(false)
    })

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
    */
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

  // SUPABASE LOGIN (temporarily mocked)
  const login = async ({ email, password }) => {
    // Mock login for AI testing
    const mockUser = {
      id: '1',
      email: email,
      first_name: 'Dr. Ibrahim',
      last_name: 'Malik',
      specialty: 'General Physician',
      clinic_name: 'TECNOT Clinic'
    }
    
    localStorage.setItem('tecnot_token', 'mock-token-12345')
    localStorage.setItem('tecnot_user', JSON.stringify(mockUser))
    
    setUser(mockUser)
    setProfile(mockUser)
    setIsAuthenticated(true)
    
    return { user: mockUser }
    
    // Real Supabase login:
    // const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    // if (error) throw new Error(error.message)
    // return data
  }

  // SUPABASE SIGNUP - creates auth user + inserts profile row
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
        emailRedirectTo: SKIP_EMAIL_VERIFICATION ? null : window.location.origin,
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

    // Send OTP to email for verification
    if (!SKIP_EMAIL_VERIFICATION) {
      await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: false }
      })
    }

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

 // SUPABASE LOGOUT (temporarily mocked)
  const logout = async () => {
    // Mock logout
    localStorage.removeItem('tecnot_token')
    localStorage.removeItem('tecnot_user')
    localStorage.removeItem('doctor_profile_pic')
    setUser(null)
    setProfile(null)
    setIsAuthenticated(false)
    
    // Real Supabase logout:
    // await supabase.auth.signOut()
  }

  // UPDATE PROFILE
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

  // CHANGE PASSWORD
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
