// ====================
// SETTINGS PAGE - FULLY RESPONSIVE
// App settings and preferences
// ====================

import React, { useState } from 'react'
import { Moon, Sun, Monitor, LogOut, Bell, X } from 'lucide-react'
import Header from '../components/Header'

function Settings() {
  const [theme, setTheme] = useState('light')
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sessions: true
  })
  
  return (
    <div className="animate-fadeIn">
      <Header 
        title="Settings" 
        subtitle="Customize your TECNOT experience"
      />
      
      {/* Main Content - Responsive padding */}
      <div className="p-3 xs:p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
        
        {/* Theme Settings - Responsive */}
        <div className="bg-white rounded-xl sm:rounded-2xl 
                       p-4 xs:p-5 sm:p-6 
                       shadow-sm border border-gray-100 
                       mb-4 xs:mb-6">
          <h3 className="text-base xs:text-lg font-bold text-gray-900 mb-3 xs:mb-4">
            Display & Theme
          </h3>
          
          <div className="space-y-2 xs:space-y-3">
            {/* Light Mode */}
            <button
              onClick={() => setTheme('light')}
              className={`w-full flex items-center justify-between 
                       p-3 xs:p-4 
                       rounded-lg border-2 
                       transition-smooth
                       ${theme === 'light' 
                         ? 'border-tecnot-primary bg-tecnot-light' 
                         : 'border-gray-200 hover:border-tecnot-primary/50'
                       }`}
            >
              <div className="flex items-center gap-2 xs:gap-3">
                <div className="w-8 h-8 xs:w-10 xs:h-10 
                               bg-white rounded-lg 
                               flex items-center justify-center 
                               border border-gray-200
                               flex-shrink-0">
                  <Sun className="w-4 h-4 xs:w-5 xs:h-5 text-yellow-500" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900 text-sm xs:text-base">Light Mode</p>
                  <p className="text-xs xs:text-sm text-gray-600">Default theme</p>
                </div>
              </div>
              {theme === 'light' && (
                <div className="w-4 h-4 xs:w-5 xs:h-5 
                               bg-tecnot-primary rounded-full 
                               flex items-center justify-center
                               flex-shrink-0">
                  <svg className="w-2.5 h-2.5 xs:w-3 xs:h-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                    <path d="M10.3 2.3L4.5 8.1 1.7 5.3l-.7.7 3.5 3.5 6.5-6.5z"/>
                  </svg>
                </div>
              )}
            </button>
            
            {/* Dark Mode */}
            <button
              onClick={() => setTheme('dark')}
              className={`w-full flex items-center justify-between 
                       p-3 xs:p-4 
                       rounded-lg border-2 
                       transition-smooth
                       ${theme === 'dark' 
                         ? 'border-tecnot-primary bg-tecnot-light' 
                         : 'border-gray-200 hover:border-tecnot-primary/50'
                       }`}
            >
              <div className="flex items-center gap-2 xs:gap-3">
                <div className="w-8 h-8 xs:w-10 xs:h-10 
                               bg-gray-800 rounded-lg 
                               flex items-center justify-center
                               flex-shrink-0">
                  <Moon className="w-4 h-4 xs:w-5 xs:h-5 text-blue-400" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900 text-sm xs:text-base">Dark Mode</p>
                  <p className="text-xs xs:text-sm text-gray-600">Easy on the eyes</p>
                </div>
              </div>
              {theme === 'dark' && (
                <div className="w-4 h-4 xs:w-5 xs:h-5 
                               bg-tecnot-primary rounded-full 
                               flex items-center justify-center
                               flex-shrink-0">
                  <svg className="w-2.5 h-2.5 xs:w-3 xs:h-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                    <path d="M10.3 2.3L4.5 8.1 1.7 5.3l-.7.7 3.5 3.5 6.5-6.5z"/>
                  </svg>
                </div>
              )}
            </button>
            
            {/* System Mode */}
            <button
              onClick={() => setTheme('system')}
              className={`w-full flex items-center justify-between 
                       p-3 xs:p-4 
                       rounded-lg border-2 
                       transition-smooth
                       ${theme === 'system' 
                         ? 'border-tecnot-primary bg-tecnot-light' 
                         : 'border-gray-200 hover:border-tecnot-primary/50'
                       }`}
            >
              <div className="flex items-center gap-2 xs:gap-3">
                <div className="w-8 h-8 xs:w-10 xs:h-10 
                               bg-gradient-to-br from-white to-gray-800 
                               rounded-lg flex items-center justify-center 
                               border border-gray-200
                               flex-shrink-0">
                  <Monitor className="w-4 h-4 xs:w-5 xs:h-5 text-gray-700" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900 text-sm xs:text-base">System Default</p>
                  <p className="text-xs xs:text-sm text-gray-600">Follow device settings</p>
                </div>
              </div>
              {theme === 'system' && (
                <div className="w-4 h-4 xs:w-5 xs:h-5 
                               bg-tecnot-primary rounded-full 
                               flex items-center justify-center
                               flex-shrink-0">
                  <svg className="w-2.5 h-2.5 xs:w-3 xs:h-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                    <path d="M10.3 2.3L4.5 8.1 1.7 5.3l-.7.7 3.5 3.5 6.5-6.5z"/>
                  </svg>
                </div>
              )}
            </button>
          </div>
        </div>
        
        {/* Notification Settings - Responsive */}
        <div className="bg-white rounded-xl sm:rounded-2xl 
                       p-4 xs:p-5 sm:p-6 
                       shadow-sm border border-gray-100 
                       mb-4 xs:mb-6">
          <h3 className="text-base xs:text-lg font-bold text-gray-900 mb-3 xs:mb-4 flex items-center gap-2">
            <Bell className="w-4 h-4 xs:w-5 xs:h-5 text-tecnot-primary" />
            Notifications
          </h3>
          
          <div className="space-y-3 xs:space-y-4">
            {/* Email Notifications */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm xs:text-base">Email Notifications</p>
                <p className="text-xs xs:text-sm text-gray-600">Receive updates via email</p>
              </div>
              <button
                onClick={() => setNotifications({...notifications, email: !notifications.email})}
                className={`relative w-12 h-6 xs:w-14 xs:h-8 
                           rounded-full transition-smooth flex-shrink-0
                           ${notifications.email ? 'bg-tecnot-primary' : 'bg-gray-300'}`}
              >
                <div className={`absolute top-0.5 xs:top-1 
                               w-5 h-5 xs:w-6 xs:h-6 
                               bg-white rounded-full shadow-md 
                               transition-smooth
                               ${notifications.email ? 'right-0.5 xs:right-1' : 'left-0.5 xs:left-1'}`}>
                </div>
              </button>
            </div>
            
            {/* Push Notifications */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm xs:text-base">Push Notifications</p>
                <p className="text-xs xs:text-sm text-gray-600">Browser notifications</p>
              </div>
              <button
                onClick={() => setNotifications({...notifications, push: !notifications.push})}
                className={`relative w-12 h-6 xs:w-14 xs:h-8 
                           rounded-full transition-smooth flex-shrink-0
                           ${notifications.push ? 'bg-tecnot-primary' : 'bg-gray-300'}`}
              >
                <div className={`absolute top-0.5 xs:top-1 
                               w-5 h-5 xs:w-6 xs:h-6 
                               bg-white rounded-full shadow-md 
                               transition-smooth
                               ${notifications.push ? 'right-0.5 xs:right-1' : 'left-0.5 xs:left-1'}`}>
                </div>
              </button>
            </div>
            
            {/* Session Reminders */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm xs:text-base">Session Reminders</p>
                <p className="text-xs xs:text-sm text-gray-600">Notify about upcoming sessions</p>
              </div>
              <button
                onClick={() => setNotifications({...notifications, sessions: !notifications.sessions})}
                className={`relative w-12 h-6 xs:w-14 xs:h-8 
                           rounded-full transition-smooth flex-shrink-0
                           ${notifications.sessions ? 'bg-tecnot-primary' : 'bg-gray-300'}`}
              >
                <div className={`absolute top-0.5 xs:top-1 
                               w-5 h-5 xs:w-6 xs:h-6 
                               bg-white rounded-full shadow-md 
                               transition-smooth
                               ${notifications.sessions ? 'right-0.5 xs:right-1' : 'left-0.5 xs:left-1'}`}>
                </div>
              </button>
            </div>
          </div>
        </div>
        
        {/* Logout Section - Responsive */}
        <div className="bg-red-50 rounded-xl sm:rounded-2xl 
                       p-4 xs:p-5 sm:p-6 
                       border border-red-200">
          <h3 className="text-base xs:text-lg font-bold text-red-900 mb-3 xs:mb-4">
            Danger Zone
          </h3>
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center justify-center gap-2 
                     bg-red-600 text-white 
                     px-4 xs:px-6 py-2.5 xs:py-3 
                     rounded-lg font-medium 
                     hover:bg-red-700 transition-smooth
                     text-sm xs:text-base
                     w-full xs:w-auto"
          >
            <LogOut className="w-4 h-4 xs:w-5 xs:h-5" />
            Log Out
          </button>
        </div>
      </div>
      
      {/* Logout Confirmation Modal - Responsive */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl 
                         p-5 xs:p-6 sm:p-8 
                         max-w-md w-full 
                         shadow-2xl">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl xs:text-2xl font-bold text-gray-900">Log Out</h2>
              <button 
                onClick={() => setShowLogoutModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-smooth"
              >
                <X className="w-5 h-5 xs:w-6 xs:h-6" />
              </button>
            </div>
            
            <p className="text-gray-600 mb-4 xs:mb-6 text-sm xs:text-base">
              Are you sure you want to log out?<br/>
              <span className="text-xs xs:text-sm">Log out of Tecnot as <strong>maliksiddiha@gmail.com</strong></span>
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col xs:flex-row gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 xs:px-6 py-2.5 xs:py-3 
                         border-2 border-gray-300 rounded-lg 
                         font-medium text-gray-700 
                         hover:bg-gray-50 transition-smooth
                         text-sm xs:text-base"
              >
                Cancel
              </button>
              <button
                onClick={() => alert('Logout functionality coming soon!')}
                className="flex-1 px-4 xs:px-6 py-2.5 xs:py-3 
                         bg-red-600 text-white rounded-lg 
                         font-medium hover:bg-red-700 transition-smooth
                         text-sm xs:text-base"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Settings