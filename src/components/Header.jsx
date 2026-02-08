import React from 'react'
import { Link } from 'react-router-dom'
import { Bell } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

function Header({ title, subtitle }) {
  const { user } = useAuth()

  // Get user initials
  const getInitials = () => {
    if (!user) return 'U'
    const firstName = user.first_name || user.email?.charAt(0) || 'U'
    return firstName.charAt(0).toUpperCase()
  }

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 shadow-sm transition-colors">
      <div className="flex items-center justify-between px-3 xs:px-4 sm:px-6 lg:px-8 py-3 xs:py-4">
        
        {/* Left: Title Section */}
        <div className="flex-1 min-w-0 ml-11 xs:ml-12 lg:ml-0">
          <h1 className="text-base xs:text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 truncate mt-0.5 sm:mt-1">
              {subtitle}
            </p>
          )}
        </div>
        
        {/* Right: Notification Icon + User Info */}
        <div className="flex items-center gap-2 xs:gap-3 sm:gap-4">
          
          {/* Notification Icon */}
          <Link 
            to="/notifications" 
            className="p-1.5 xs:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-smooth relative"
          >
            <Bell className="w-5 h-5 xs:w-6 xs:h-6 text-gray-600 dark:text-gray-300" />
            {/* Notification badge */}
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Link>
          
          {/* User Avatar - Links to Profile */}
          <Link 
            to="/profile" 
            className="flex items-center gap-2 xs:gap-3 hover:opacity-80 transition-smooth"
          >
            <div className="hidden md:block text-right">
              <p className="text-xs xs:text-sm font-semibold text-gray-900 dark:text-white">
                {user?.first_name ? `Dr. ${user.first_name}` : 'Doctor'}
              </p>
              <p className="text-[10px] xs:text-xs text-gray-500 dark:text-gray-400">
                {user?.specialty || 'General Physician'}
              </p>
            </div>
            <div className="w-8 h-8 xs:w-10 xs:h-10 bg-tecnot-primary dark:bg-tecnot-light rounded-full flex items-center justify-center text-white dark:text-gray-900 font-bold text-sm xs:text-base">
              {getInitials()}
            </div>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header