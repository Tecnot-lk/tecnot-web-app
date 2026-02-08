// ====================
// HEADER COMPONENT - FULLY RESPONSIVE
// Top bar showing page title and user info
// ====================

import React from 'react'
import { Bell } from 'lucide-react'
import { Link } from 'react-router-dom'

function Header({ title, subtitle }) {
  <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
  <h1 className="text-gray-900 dark:text-white">{title}</h1>
  <p className="text-gray-600 dark:text-gray-400">{subtitle}</p>
</div>
  return (
    <header className="bg-white border-b border-gray-200 
                       px-3 xs:px-4 sm:px-6 lg:px-8 
                       py-3 xs:py-4 lg:py-5 
                       flex items-center justify-between 
                       sticky top-0 z-10 shadow-sm">
      
      {/* Page Title - Responsive margins for mobile menu */}
      <div className="flex-1 ml-11 xs:ml-12 lg:ml-0 min-w-0">
        <h1 className="text-base xs:text-lg sm:text-xl lg:text-2xl 
                       font-bold text-gray-900 truncate">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs sm:text-sm lg:text-base 
                        text-gray-600 mt-0.5 sm:mt-1 
                        hidden xs:block truncate">
            {subtitle}
          </p>
        )}
      </div>
      
      {/* Right side - Responsive spacing */}
      <div className="flex items-center gap-2 xs:gap-3 sm:gap-4 flex-shrink-0">
        
        {/* Notification Bell */}
        <button className="relative p-1.5 xs:p-2 
                          hover:bg-gray-100 rounded-lg 
                          transition-smooth
                          active:scale-95"
                aria-label="Notifications">
          <Bell className="w-4 h-4 xs:w-5 xs:h-5 text-gray-700" />
          <span className="absolute top-0.5 right-0.5 xs:top-1 xs:right-1 
                         w-1.5 h-1.5 xs:w-2 xs:h-2 
                         bg-red-500 rounded-full"></span>
        </button>
          <Link to="/profile" className="hidden xs:flex items-center gap-2 xs:gap-3 hover:opacity-80 transition-smooth">
  <div className="hidden md:block text-right">
    <p className="text-xs xs:text-sm font-semibold text-gray-900">Dr. Ibrahim</p>
    <p className="text-[10px] xs:text-xs text-gray-500">General Physician</p>
  </div>
  <div className="w-8 h-8 xs:w-10 xs:h-10 bg-tecnot-primary rounded-full flex items-center justify-center text-white font-bold text-sm xs:text-base">
    IS
  </div>
</Link>

      </div>
    </header>
  )
}

export default Header