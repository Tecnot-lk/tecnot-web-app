import React from 'react'
import { Link } from 'react-router-dom'
import { Bell } from 'lucide-react'
import { Link } from 'react-router-dom'

function Header({ title, subtitle }) {
  const { user } = useAuth()

  // Get user initials
  const getInitials = () => {
    if (!user) return 'U'
    const firstName = user.first_name || user.email?.charAt(0) || 'U'
    return firstName.charAt(0).toUpperCase()
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center justify-between px-3 xs:px-4 sm:px-6 lg:px-8 py-3 xs:py-4">
        
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