import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Home,
  Users,
  Calendar,
  Bell,
  User,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import logo from '../assets/logos.png' // ✅ Your real logo

function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Patients', path: '/patients', icon: Users },
    { name: 'New Session', path: '/new-session', icon: Calendar },
    { name: 'Notifications', path: '/notifications', icon: Bell },
    { name: 'My Profile', path: '/profile', icon: User },
  ]

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout()
      navigate('/login')
      setIsMobileMenuOpen(false)
    }
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
        {/* ✅ LOGO SECTION (White Glass Box) */}
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
                  flex items-center gap-3 px-4 py-3
                  rounded-lg transition-smooth active:scale-95
                  ${isActive
                    ? 'bg-white/20 font-semibold shadow-lg'
                    : 'hover:bg-white/10'
                  }
                `}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{item.name}</span>
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
              flex items-center gap-3 px-4 py-3
              rounded-lg transition-smooth active:scale-95
              ${location.pathname === '/settings'
                ? 'bg-white/20 font-semibold shadow-lg'
                : 'hover:bg-white/10'
              }
            `}
          >
            <Settings className="w-5 h-5" />
            <span className="text-sm">Settings</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3
                     text-red-300 hover:bg-red-500/20
                     rounded-lg transition-smooth active:scale-95"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm">Log Out</span>
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar