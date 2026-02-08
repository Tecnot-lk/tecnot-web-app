import React, { useState } from 'react'
import { Moon, Sun, Monitor, Bell, LogOut } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'

function Settings() {
  const { logout, theme, setTheme } = useAuth()
  const navigate = useNavigate()

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    sessionReminders: true
  })

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout()
      navigate('/login')
    }
  }

  return (
    <div className="animate-fadeIn w-full min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header title="Settings" subtitle="Manage your preferences" />
      
      <div className="w-full px-3 xs:px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-4xl mx-auto">
        
        {/* Appearance Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 xs:p-6 sm:p-8 mb-4 sm:mb-6 transition-colors">
          <h2 className="text-lg xs:text-xl font-bold text-gray-900 dark:text-white mb-4 xs:mb-6">
            Appearance
          </h2>

          <div className="space-y-3">
            <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-300 mb-3 xs:mb-4">
              Choose how TECNOT looks to you. Select a theme or sync with your system settings.
            </p>

            <div className="grid grid-cols-1 xs:grid-cols-3 gap-3">
              {/* Light Theme */}
              <button
                onClick={() => setTheme('light')}
                className={`p-4 rounded-lg border-2 transition-all text-left
                          ${theme === 'light' 
                            ? 'border-tecnot-primary bg-tecnot-light dark:bg-blue-900/30' 
                            : 'border-gray-200 dark:border-gray-600 hover:border-tecnot-primary dark:hover:border-tecnot-light'
                          }`}
              >
                <Sun className="w-6 h-6 xs:w-8 xs:h-8 text-yellow-500 mb-2" />
                <p className="font-semibold text-gray-900 dark:text-white text-sm xs:text-base">Light</p>
                <p className="text-[10px] xs:text-xs text-gray-600 dark:text-gray-300">Day theme</p>
              </button>

              {/* Dark Theme */}
              <button
                onClick={() => setTheme('dark')}
                className={`p-4 rounded-lg border-2 transition-all text-left
                          ${theme === 'dark' 
                            ? 'border-purple-500 bg-purple-100 dark:bg-purple-900/30' 
                            : 'border-gray-200 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-400'
                          }`}
              >
                <Moon className="w-6 h-6 xs:w-8 xs:h-8 text-purple-500 mb-2" />
                <p className="font-semibold text-gray-900 dark:text-white text-sm xs:text-base">Dark</p>
                <p className="text-[10px] xs:text-xs text-gray-600 dark:text-gray-300">Night theme</p>
              </button>

               
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 xs:p-6 sm:p-8 mb-4 sm:mb-6 transition-colors">
          <h2 className="text-lg xs:text-xl font-bold text-gray-900 dark:text-white mb-4 xs:mb-6">
            Notifications
          </h2>

          <div className="space-y-4">
            
            {/* Email Notifications */}
            <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
              <div className="flex-1 min-w-0 mr-4">
                <div className="flex items-center gap-2 mb-1">
                  <Bell className="w-4 h-4 xs:w-5 xs:h-5 text-tecnot-primary dark:text-tecnot-light flex-shrink-0" />
                  <p className="font-semibold text-gray-900 dark:text-white text-sm xs:text-base">
                    Email Notifications
                  </p>
                </div>
                <p className="text-[10px] xs:text-xs text-gray-600 dark:text-gray-400">
                  Receive email updates about your patients and sessions
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 
                             peer-focus:ring-tecnot-primary/20 dark:peer-focus:ring-tecnot-light/20 rounded-full peer 
                             peer-checked:after:translate-x-full peer-checked:after:border-white 
                             after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                             after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full 
                             after:h-5 after:w-5 after:transition-all peer-checked:bg-tecnot-primary dark:peer-checked:bg-tecnot-light">
                </div>
              </label>
            </div>

            {/* Push Notifications */}
            <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
              <div className="flex-1 min-w-0 mr-4">
                <div className="flex items-center gap-2 mb-1">
                  <Bell className="w-4 h-4 xs:w-5 xs:h-5 text-tecnot-primary dark:text-tecnot-light flex-shrink-0" />
                  <p className="font-semibold text-gray-900 dark:text-white text-sm xs:text-base">
                    Push Notifications
                  </p>
                </div>
                <p className="text-[10px] xs:text-xs text-gray-600 dark:text-gray-400">
                  Get push notifications on your device
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                <input
                  type="checkbox"
                  checked={settings.pushNotifications}
                  onChange={(e) => setSettings({...settings, pushNotifications: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 
                             peer-focus:ring-tecnot-primary/20 dark:peer-focus:ring-tecnot-light/20 rounded-full peer 
                             peer-checked:after:translate-x-full peer-checked:after:border-white 
                             after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                             after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full 
                             after:h-5 after:w-5 after:transition-all peer-checked:bg-tecnot-primary dark:peer-checked:bg-tecnot-light">
                </div>
              </label>
            </div>

            {/* Session Reminders */}
            <div className="flex items-center justify-between py-3">
              <div className="flex-1 min-w-0 mr-4">
                <div className="flex items-center gap-2 mb-1">
                  <Bell className="w-4 h-4 xs:w-5 xs:h-5 text-tecnot-primary dark:text-tecnot-light flex-shrink-0" />
                  <p className="font-semibold text-gray-900 dark:text-white text-sm xs:text-base">
                    Session Reminders
                  </p>
                </div>
                <p className="text-[10px] xs:text-xs text-gray-600 dark:text-gray-400">
                  Get reminded about upcoming patient sessions
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                <input
                  type="checkbox"
                  checked={settings.sessionReminders}
                  onChange={(e) => setSettings({...settings, sessionReminders: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 
                             peer-focus:ring-tecnot-primary/20 dark:peer-focus:ring-tecnot-light/20 rounded-full peer 
                             peer-checked:after:translate-x-full peer-checked:after:border-white 
                             after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                             after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full 
                             after:h-5 after:w-5 after:transition-all peer-checked:bg-tecnot-primary dark:peer-checked:bg-tecnot-light">
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg sm:rounded-xl p-4 xs:p-6 sm:p-8 transition-colors">
          <h2 className="text-lg xs:text-xl font-bold text-red-900 dark:text-red-400 mb-2 xs:mb-3">
            Danger Zone
          </h2>
          <p className="text-xs xs:text-sm text-red-700 dark:text-red-300 mb-4 xs:mb-6">
            Once you logout, you'll need to login again to access your account.
          </p>
          
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-6 xs:px-8 py-3 xs:py-4 
                     bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700
                     text-white rounded-lg font-semibold 
                     transition-smooth shadow-lg w-full xs:w-auto text-sm xs:text-base"
          >
            <LogOut className="w-5 h-5" />
            Log Out
          </button>
        </div>

        {/* App Info */}
        <div className="mt-6 text-center text-xs xs:text-sm text-gray-500 dark:text-gray-400">
          <p>TECNOT v1.0.0</p>
          <p className="mt-1">© 2026 TECNOT. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default Settings