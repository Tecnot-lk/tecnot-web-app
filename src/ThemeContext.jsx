// ====================
// THEME CONTEXT
// Global theme management for the entire app
// ====================

import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Get saved theme from localStorage or default to 'light'
    const savedTheme = localStorage.getItem('tecnot-theme')
    return savedTheme || 'light'
  })

  const [actualTheme, setActualTheme] = useState('light')

  useEffect(() => {
    // Save theme to localStorage whenever it changes
    localStorage.setItem('tecnot-theme', theme)

    // Determine the actual theme to apply
    let themeToApply = theme

    if (theme === 'system') {
      // Check system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      themeToApply = systemPrefersDark ? 'dark' : 'light'
    }

    setActualTheme(themeToApply)

    // Apply theme to document
    if (themeToApply === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  // Listen for system theme changes when in system mode
  useEffect(() => {
    if (theme !== 'system') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e) => {
      const newTheme = e.matches ? 'dark' : 'light'
      setActualTheme(newTheme)
      
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, actualTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
