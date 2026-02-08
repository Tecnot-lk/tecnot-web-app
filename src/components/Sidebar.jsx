import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, Users, Plus, Bell, User, Settings, Stethoscope } from 'lucide-react'

function Sidebar() {
  const navLinks = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/patients', icon: Users, label: 'Patients' },
    { path: '/new-session', icon: Plus, label: 'New Session' },
    { path: '/notifications', icon: Bell, label: 'Notifications' },
    { path: '/profile', icon: User, label: 'My Profile' },
  ]
  
  return (
    // ✅ LOCATION 1: Add dark:bg-gray-800 and dark:border-gray-700
    <div className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-smooth">
      
      {/* ✅ LOCATION 2: Add dark:border-gray-700 */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-tecnot-primary flex items-center justify-center">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <div>
            {/* ✅ LOCATION 3: Add dark:text-white */}
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">TECNOT</h1>
            {/* ✅ LOCATION 4: Add dark:text-gray-400 */}
            <p className="text-xs text-gray-500 dark:text-gray-400">AI Clinical Scribe</p>
          </div>
        </div>
      </div>
      
      {/* No changes needed here */}
      <nav className="flex-1 p-4 space-y-2">
        {navLinks.map((link) => {
          const Icon = link.icon
          return (
            <NavLink
              key={link.path}
              to={link.path}
              // ✅ LOCATION 6: Add dark:text-gray-300 and dark:hover:bg-gray-700
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-smooth ${
                  isActive
                    ? 'bg-tecnot-primary text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-tecnot-light dark:hover:bg-gray-700'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{link.label}</span>
            </NavLink>
          )
        })}
      </nav>
      
      {/* ✅ LOCATION 7: Add dark:border-gray-700 */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <NavLink
          to="/settings"
          // ✅ Same changes as LOCATION 6
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-smooth ${
              isActive
                ? 'bg-tecnot-primary text-white shadow-lg'
                : 'text-gray-700 dark:text-gray-300 hover:bg-tecnot-light dark:hover:bg-gray-700'
            }`
          }
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar