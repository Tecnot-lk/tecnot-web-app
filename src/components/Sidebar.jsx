// =============================================================================
// SIDEBAR COMPONENT
// =============================================================================
//
// PURPOSE:
// - Main navigation menu
// - Mobile responsive (hamburger menu)
// - Logout functionality
// - Active route highlighting
//
// FEATURES:
// - Slides in/out on mobile
// - Always visible on desktop
// - Active page highlighting
// - Logout confirmation
//
// =============================================================================

import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Home, Users, Calendar, Bell, User, Settings, LogOut, Menu, X, FileText } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()
  
  // Mobile menu open/closed state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // ==========================================================================
  // NAVIGATION ITEMS
  // ==========================================================================
  /**
   * Main navigation menu items
   * Each item has: name, path, and icon
   */
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Patients', path: '/patients', icon: Users },
    { name: 'New Session', path: '/new-session', icon: Calendar },
    { name: 'Notifications', path: '/notifications', icon: Bell },
    { name: 'My Profile', path: '/profile', icon: User },
  ]

  // ==========================================================================
  // FUNCTION: HANDLE LOGOUT
  // ==========================================================================
  /**
   * Logs out user with confirmation
   * 
   * FLOW:
   * 1. Show confirmation dialog
   * 2. If confirmed, call logout() from AuthContext
   * 3. Clear token from localStorage
   * 4. Redirect to login page
   * 5. Close mobile menu if open
   */
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout()
      navigate('/login')
      setIsMobileMenuOpen(false)
    }
  }

  // ==========================================================================
  // RENDER
  // ==========================================================================
  return (
    <>
      {/* ====================================================================
          MOBILE HAMBURGER BUTTON (Only visible on mobile/tablet)
          ==================================================================== */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-3 left-3 z-50 p-2 bg-tecnot-primary text-white rounded-lg shadow-lg active:scale-95 transition-smooth"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* ====================================================================
          MOBILE BACKDROP (Only visible when menu is open on mobile)
          ==================================================================== */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 dark:bg-black/70 z-30 backdrop-blur-sm animate-fadeIn"
          aria-hidden="true"
        />
      )}

      {/* ====================================================================
          SIDEBAR MENU
          ==================================================================== */}
      <aside
        className={`
          fixed top-0 left-0 h-screen
          w-64 sm:w-72 lg:w-64 xl:w-72
          bg-gradient-to-b from-tecnot-primary to-tecnot-dark
          dark:from-gray-900 dark:to-gray-950
          text-white shadow-2xl z-40
          transform transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          overflow-y-auto
        `}
      >
        {/* ================================================================
            LOGO & BRAND
            ================================================================ */}
        <div className="p-4 sm:p-6 border-b border-white/20 dark:border-white/10">
          <div className="flex items-center gap-3">
            {/* Logo Icon */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors">
              <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-tecnot-primary dark:text-tecnot-light" />
            </div>
            {/* App Name */}
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">TECNOT</h1>
              <p className="text-xs sm:text-sm text-tecnot-light dark:text-gray-400">
                AI Clinical Scribe
              </p>
            </div>
          </div>
        </div>

        {/* ================================================================
            NAVIGATION ITEMS
            ================================================================ */}
        <nav className="p-3 xs:p-4 flex flex-col gap-2 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  flex items-center gap-3 px-3 xs:px-4 py-2.5 xs:py-3
                  rounded-lg transition-smooth active:scale-95
                  ${isActive
                    ? 'bg-white/20 dark:bg-white/10 font-semibold shadow-lg'
                    : 'hover:bg-white/10 dark:hover:bg-white/5'
                  }
                `}
              >
                <Icon className="w-5 h-5 xs:w-6 xs:h-6 flex-shrink-0" />
                <span className="text-sm xs:text-base truncate">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* ================================================================
            BOTTOM SECTION - Settings & Logout
            ================================================================ */}
        <div className="p-3 xs:p-4 border-t border-white/20 dark:border-white/10 space-y-2">
          
          {/* Settings Link */}
          <Link
            to="/settings"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`
              flex items-center gap-3 px-3 xs:px-4 py-2.5 xs:py-3
              rounded-lg transition-smooth active:scale-95
              ${location.pathname === '/settings'
                ? 'bg-white/20 dark:bg-white/10 font-semibold shadow-lg'
                : 'hover:bg-white/10 dark:hover:bg-white/5'
              }
            `}
          >
            <Settings className="w-5 h-5 xs:w-6 xs:h-6" />
            <span className="text-sm xs:text-base">Settings</span>
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 xs:px-4 py-2.5 xs:py-3
                     text-red-300 dark:text-red-400 hover:bg-red-500/20 dark:hover:bg-red-500/30 rounded-lg
                     transition-smooth active:scale-95"
          >
            <LogOut className="w-5 h-5 xs:w-6 xs:h-6" />
            <span className="text-sm xs:text-base">Log Out</span>
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar