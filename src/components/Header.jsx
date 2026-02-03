// ====================
// HEADER COMPONENT - FULLY RESPONSIVE
// Top bar showing page title and user info
// ====================

import React from 'react'
import { Bell } from 'lucide-react'

function Header({ title, subtitle }) {
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
        
        {/* User Avatar - Hidden on very small screens */}
        <div className="hidden xs:flex items-center gap-2 sm:gap-3 
                       pl-2 sm:pl-4 
                       border-l border-gray-200">
          
          {/* User Info - Hidden on small screens */}
          <div className="text-right hidden md:block">
            <p className="text-xs sm:text-sm font-semibold text-gray-900 
                         truncate max-w-[120px] lg:max-w-none">
              Dr. Ibrahim
            </p>
            <p className="text-[10px] sm:text-xs text-gray-500 truncate">
              General Physician
            </p>
          </div>
          
          {/* Avatar - Responsive size */}
          <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 
                         rounded-full bg-tecnot-primary 
                         flex items-center justify-center 
                         text-white font-semibold 
                         text-xs xs:text-sm sm:text-base
                         flex-shrink-0">
            IS
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header