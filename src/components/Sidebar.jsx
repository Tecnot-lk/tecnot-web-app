// ====================
// SIDEBAR NAVIGATION - FULLY RESPONSIVE
// Mobile: Hamburger menu | Desktop: Fixed sidebar
// ====================

import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Users, Calendar, Bell, User, Settings, LogOut, Menu, X } from 'lucide-react'
import tecnotLogo from '../assets/logos.png'

function Sidebar() {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Patients', path: '/patients', icon: Users },
    { name: 'New Session', path: '/new-session', icon: Calendar },
    { name: 'Notifications', path: '/notifications', icon: Bell },
    { name: 'My Profile', path: '/profile', icon: User },
  ]
  
  return (
    <>
      {/* Mobile Menu Button - Only on mobile/tablet */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-3 left-3 z-50 
                   bg-tecnot-primary text-white 
                   p-2.5 xs:p-3 
                   rounded-lg shadow-lg 
                   hover:bg-tecnot-dark transition-all
                   active:scale-95"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X className="w-5 h-5 xs:w-6 xs:h-6" /> : <Menu className="w-5 h-5 xs:w-6 xs:h-6" />}
      </button>

      {/* Sidebar - Responsive width */}
      <div className={`
        w-64 sm:w-72 lg:w-64 xl:w-72
        h-screen 
        bg-tecnot-light 
        border-r border-tecnot-primary/20 
        flex flex-col 
        fixed left-0 top-0 z-40 
        transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
        overflow-y-auto
      `}>
        
        {/* Logo Section - Responsive padding */}
        <div className="p-4 xs:p-5 sm:p-6 border-b border-tecnot-primary/20 bg-white flex flex-col items-center flex-shrink-0">
          <img 
            src={tecnotLogo}
            alt="Tecnot Logo" 
            className="h-12 xs:h-14 sm:h-16 w-auto object-contain"
          />
          <p className="text-[10px] xs:text-xs text-gray-600 mt-2 sm:mt-3 text-center tracking-wider">
            AI CLINICAL SCRIBE
          </p>
        </div>
        
        {/* Navigation Links - Responsive spacing */}
        <nav className="flex-1 p-3 xs:p-4 space-y-1.5 xs:space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            const Icon = item.icon
            
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  flex items-center gap-2.5 xs:gap-3 
                  px-3 xs:px-4 
                  py-2.5 xs:py-3 
                  rounded-lg 
                  transition-all duration-200
                  text-sm xs:text-base
                  ${isActive 
                    ? 'bg-tecnot-primary text-white shadow-lg scale-[1.02]' 
                    : 'text-gray-700 hover:bg-white hover:shadow-md hover:scale-[1.01]'
                  }
                `}
              >
                <Icon className="w-4 h-4 xs:w-5 xs:h-5 flex-shrink-0" />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}
        </nav>
        
        {/* Bottom Actions - Responsive spacing */}
        <div className="p-3 xs:p-4 space-y-1.5 xs:space-y-2 border-t border-tecnot-primary/20 flex-shrink-0">
          <Link
            to="/settings"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2.5 xs:gap-3 
                       px-3 xs:px-4 
                       py-2.5 xs:py-3 
                       rounded-lg 
                       text-gray-700 
                       hover:bg-white hover:shadow-md 
                       transition-all duration-200
                       text-sm xs:text-base"
          >
            <Settings className="w-4 h-4 xs:w-5 xs:h-5 flex-shrink-0" />
            <span className="font-medium">Settings</span>
          </Link>
          
          <button
            onClick={() => {
              setIsMobileMenuOpen(false)
              if (confirm('Are you sure you want to logout?')) {
                alert('Logout functionality coming soon!')
              }
            }}
            className="w-full flex items-center gap-2.5 xs:gap-3 
                       px-3 xs:px-4 
                       py-2.5 xs:py-3 
                       rounded-lg 
                       text-red-600 
                       hover:bg-red-50 
                       transition-all duration-200
                       text-sm xs:text-base"
          >
            <LogOut className="w-4 h-4 xs:w-5 xs:h-5 flex-shrink-0" />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </div>

      {/* Overlay - Only on mobile/tablet when menu is open */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
        />
      )}
    </>
  )
}

export default Sidebar