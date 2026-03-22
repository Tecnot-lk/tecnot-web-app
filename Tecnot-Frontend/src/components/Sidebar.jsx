import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Home, Users, Calendar, Bell, User,
  Settings, LogOut, Menu, X, AlertTriangle
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import logo from '../assets/logos.png'

// ── Custom logout confirm dialog ──────────────────────────────────────────────
function LogoutDialog({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl
                      border border-gray-100 dark:border-gray-700
                      w-full max-w-sm p-6 animate-fadeIn">

        {/* Icon */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full
                        bg-red-100 dark:bg-red-900/30 mx-auto mb-4">
          <LogOut className="w-6 h-6 text-red-500 dark:text-red-400" />
        </div>

        {/* Text */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white text-center mb-2">
          Log out?
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
          You'll be signed out of your Tecnot account and redirected to the login page.
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-600
                       text-gray-700 dark:text-gray-300 font-semibold text-sm
                       hover:bg-gray-50 dark:hover:bg-gray-700 transition-smooth"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600
                       dark:bg-red-600 dark:hover:bg-red-700
                       text-white font-semibold text-sm transition-smooth shadow-sm"
          >
            Yes, log out
          </button>
        </div>
      </div>
    </div>
  )
}

function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showLogoutDialog, setShowLogoutDialog]   = useState(false)

  const navItems = [
    { name: 'Home',          path: '/',             icon: Home },
    { name: 'Patients',      path: '/patients',     icon: Users },
    { name: 'New Session',   path: '/new-session',  icon: Calendar },
    { name: 'Notifications', path: '/notifications', icon: Bell },
    { name: 'My Profile',    path: '/profile',      icon: User },
  ]

  const handleLogoutConfirmed = async () => {
    setShowLogoutDialog(false)
    setIsMobileMenuOpen(false)
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-3 left-3 z-50 p-2 bg-tecnot-primary text-white rounded-lg shadow-lg active:scale-95 transition-smooth"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
        />
      )}

      {/* Sidebar */}
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
        {/* Logo */}
        <div className="p-6 border-b border-white/20 dark:border-white/10">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-center"
          >
            <div className="bg-white/90 backdrop-blur-md rounded-xl px-6 py-4 shadow-lg">
              <img
                src={logo}
                alt="Tecnot Logo"
                className="h-16 sm:h-20 w-auto object-contain"
              />
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 flex flex-col gap-2 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  group relative flex items-center gap-3 px-4 py-3
                  rounded-lg transition-all duration-200 active:scale-95
                  ${isActive
                    ? 'bg-white/20 font-semibold shadow-lg'
                    : 'hover:bg-white/15 hover:shadow-md hover:translate-x-1'
                  }
                `}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 transition-transform duration-200
                                  ${!isActive ? 'group-hover:scale-110' : ''}`} />
                <span className="text-sm">{item.name}</span>
                {/* Active indicator bar */}
                {isActive && (
                  <span className="absolute right-2 top-1/2 -translate-y-1/2
                                   w-1 h-5 bg-white rounded-full opacity-80" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-white/20 space-y-2">
          <Link
            to="/settings"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`
              group flex items-center gap-3 px-4 py-3
              rounded-lg transition-all duration-200 active:scale-95
              ${location.pathname === '/settings'
                ? 'bg-white/20 font-semibold shadow-lg'
                : 'hover:bg-white/15 hover:shadow-md hover:translate-x-1'
              }
            `}
          >
            <Settings className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="text-sm">Settings</span>
          </Link>

          <button
            onClick={() => setShowLogoutDialog(true)}
            className="group w-full flex items-center gap-3 px-4 py-3
                       text-red-300 hover:bg-red-500/20 hover:text-red-200
                       hover:shadow-md hover:translate-x-1
                       rounded-lg transition-all duration-200 active:scale-95"
          >
            <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="text-sm">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Logout confirm dialog — rendered outside sidebar so it overlays everything */}
      {showLogoutDialog && (
        <LogoutDialog
          onConfirm={handleLogoutConfirmed}
          onCancel={() => setShowLogoutDialog(false)}
        />
      )}
    </>
  )
}

export default Sidebar