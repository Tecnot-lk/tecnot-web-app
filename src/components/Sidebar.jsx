// ====================
// SIDEBAR NAVIGATION - FULLY RESPONSIVE
// Mobile: Hamburger menu | Desktop: Fixed sidebar
// ====================

import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Users, Calendar, Bell, User, Settings, LogOut, Menu, X } from 'lucide-react'
import tecnotLogo from '../assets/logos.png'

function Sidebar() {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])
  
  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])
  
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Patients', path: '/patients', icon: Users },
    { name: 'New Session', path: '/new-session', icon: Calendar },
    { name: 'Notifications', path: '/notifications', icon: Bell },
    { name: 'My Profile', path: '/profile', icon: User },
  ]
  
  return (
    <>
      {/* Mobile Menu Button - Only visible on mobile/tablet */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 
                   bg-tecnot-primary text-white 
                   p-3 
                   rounded-lg shadow-lg 
                   hover:bg-tecnot-dark 
                   transition-all duration-200
                   active:scale-95
                   focus:outline-none focus:ring-2 focus:ring-tecnot-primary focus:ring-offset-2"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar Container */}
      <aside className={`
        w-64
        h-screen 
        bg-tecnot-light 
        border-r border-tecnot-primary/20 
        flex flex-col 
        fixed left-0 top-0 z-40 
        transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
        overflow-hidden
      `}>
        
        {/* Logo Section */}
        <div className="p-6 border-b border-tecnot-primary/20 bg-white flex flex-col items-center flex-shrink-0">
          <img 
            src={tecnotLogo}
            alt="Tecnot Logo" 
            className="h-16 w-auto object-contain"
          />
          <p className="text-xs text-gray-600 mt-3 text-center tracking-wider font-medium">
            AI CLINICAL SCRIBE
          </p>
        </div>
        
        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            const Icon = item.icon
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`
                  flex items-center gap-3 
                  px-4 
                  py-3 
                  rounded-lg 
                  transition-all duration-200
                  text-base
                  font-medium
                  ${isActive 
                    ? 'bg-tecnot-primary text-white shadow-md' 
                    : 'text-gray-700 hover:bg-white hover:shadow-sm'
                  }
                `}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
        
        {/* Bottom Actions */}
        <div className="p-4 space-y-2 border-t border-tecnot-primary/20 flex-shrink-0">
          <Link
            to="/settings"
            className={`flex items-center gap-3 
                       px-4 
                       py-3 
                       rounded-lg 
                       transition-all duration-200
                       text-base
                       font-medium
                       ${location.pathname === '/settings'
                         ? 'bg-tecnot-primary text-white shadow-md'
                         : 'text-gray-700 hover:bg-white hover:shadow-sm'
                       }`}
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            <span>Settings</span>
          </Link>
          
          <button
            onClick={() => {
              if (confirm('Are you sure you want to logout?')) {
                alert('Logout functionality coming soon!')
              }
            }}
            className="w-full flex items-center gap-3 
                       px-4 
                       py-3 
                       rounded-lg 
                       text-red-600 
                       hover:bg-red-50 
                       transition-all duration-200
                       text-base
                       font-medium"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Overlay - Only on mobile/tablet when menu is open */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-30 backdrop-blur-sm animate-fadeIn"
        />
      )}
    </>
  )
}

export default Sidebar