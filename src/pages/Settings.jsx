import React, { useState } from 'react'
import { Moon, Sun, Monitor, Bell, LogOut } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'

function Settings() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const [settings, setSettings] = useState({
    theme: 'system',
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
    <div className="animate-fadeIn w-full">
      <Header title="Settings" subtitle="Manage your preferences" />
      
      <div className="w-full px-3 xs:px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-4xl mx-auto">
        
        {/* Appearance Section */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-4 xs:p-6 sm:p-8 mb-4 sm:mb-6">
          <h2 className="text-lg xs:text-xl font-bold text-gray-900 mb-4 xs:mb-6">
            Appearance
          </h2>

          <div className="space-y-3">
            <p className="text-xs xs:text-sm text-gray-600 mb-3 xs:mb-4">
              Choose how TECNOT looks to you. Select a theme or sync with your system settings.
            </p>

            <div className="grid grid-cols-1 xs:grid-cols-3 gap-3">
              {/* Light Theme */}
              <button
                onClick={() => setSettings({...settings, theme: 'light'})}
                className={`p-4 rounded-lg border-2 transition-all text-left
                          ${settings.theme === 'light' 
                            ? 'border-tecnot-primary bg-tecnot-light' 
                            : 'border-gray-200 hover:border-tecnot-primary'
                          }`}
              >
                <Sun className="w-6 h-6 xs:w-8 xs:h-8 text-yellow-500 mb-2" />
                <p className="font-semibold text-gray-900 text-sm xs:text-base">Light</p>
                <p className="text-[10px] xs:text-xs text-gray-600">Day theme</p>
              </button>

              {/* Dark Theme */}
              <button
                onClick={() => setSettings({...settings, theme: 'dark'})}
                className={`p-4 rounded-lg border-2 transition-all text-left
                          ${settings.theme === 'dark' 
                            ? 'border-tecnot-primary bg-tecnot-light' 
                            : 'border-gray-200 hover:border-tecnot-primary'
                          }`}
              >
                <Moon className="w-6 h-6 xs:w-8 xs:h-8 text-purple-500 mb-2" />
                <p className="font-semibold text-gray-900 text-sm xs:text-base">Dark</p>
                <p className="text-[10px] xs:text-xs text-gray-600">Night theme</p>
              </button>

              {/* System Theme */}
              <button
                onClick={() => setSettings({...settings, theme: 'system'})}
                className={`p-4 rounded-lg border-2 transition-all text-left
                          ${settings.theme === 'system' 
                            ? 'border-tecnot-primary bg-tecnot-light' 
                            : 'border-gray-200 hover:border-tecnot-primary'
                          }`}
              >
                <Monitor className="w-6 h-6 xs:w-8 xs:h-8 text-gray-500 mb-2" />
                <p className="font-semibold text-gray-900 text-sm xs:text-base">System</p>
                <p className="text-[10px] xs:text-xs text-gray-600">Auto sync</p>
              </button>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-4 xs:p-6 sm:p-8 mb-4 sm:mb-6">
          <h2 className="text-lg xs:text-xl font-bold text-gray-900 mb-4 xs:mb-6">
            Notifications
          </h2>

          <div className="space-y-4">
            
            {/* Email Notifications */}
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex-1 min-w-0 mr-4">
                <div className="flex items-center gap-2 mb-1">
                  <Bell className="w-4 h-4 xs:w-5 xs:h-5 text-tecnot-primary flex-shrink-0" />
                  <p className="font-semibold text-gray-900 text-sm xs:text-base">
                    Email Notifications
                  </p>
                </div>
                <p className="text-[10px] xs:text-xs text-gray-600">
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
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                             peer-focus:ring-tecnot-primary/20 rounded-full peer 
                             peer-checked:after:translate-x-full peer-checked:after:border-white 
                             after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                             after:bg-white after:border-gray-300 after:border after:rounded-full 
                             after:h-5 after:w-5 after:transition-all peer-checked:bg-tecnot-primary">
                </div>
              </label>
            </div>

            {/* Push Notifications */}
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex-1 min-w-0 mr-4">
                <div className="flex items-center gap-2 mb-1">
                  <Bell className="w-4 h-4 xs:w-5 xs:h-5 text-tecnot-primary flex-shrink-0" />
                  <p className="font-semibold text-gray-900 text-sm xs:text-base">
                    Push Notifications
                  </p>
                </div>
                <p className="text-[10px] xs:text-xs text-gray-600">
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
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                             peer-focus:ring-tecnot-primary/20 rounded-full peer 
                             peer-checked:after:translate-x-full peer-checked:after:border-white 
                             after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                             after:bg-white after:border-gray-300 after:border after:rounded-full 
                             after:h-5 after:w-5 after:transition-all peer-checked:bg-tecnot-primary">
                </div>
              </label>
            </div>

            {/* Session Reminders */}
            <div className="flex items-center justify-between py-3">
              <div className="flex-1 min-w-0 mr-4">
                <div className="flex items-center gap-2 mb-1">
                  <Bell className="w-4 h-4 xs:w-5 xs:h-5 text-tecnot-primary flex-shrink-0" />
                  <p className="font-semibold text-gray-900 text-sm xs:text-base">
                    Session Reminders
                  </p>
                </div>
                <p className="text-[10px] xs:text-xs text-gray-600">
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
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                             peer-focus:ring-tecnot-primary/20 rounded-full peer 
                             peer-checked:after:translate-x-full peer-checked:after:border-white 
                             after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                             after:bg-white after:border-gray-300 after:border after:rounded-full 
                             after:h-5 after:w-5 after:transition-all peer-checked:bg-tecnot-primary">
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 border-2 border-red-200 rounded-lg sm:rounded-xl p-4 xs:p-6 sm:p-8">
          <h2 className="text-lg xs:text-xl font-bold text-red-900 mb-2 xs:mb-3">
            Danger Zone
          </h2>
          <p className="text-xs xs:text-sm text-red-700 mb-4 xs:mb-6">
            Once you logout, you'll need to login again to access your account.
          </p>
          
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-6 xs:px-8 py-3 xs:py-4 
                     bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 
                     transition-smooth shadow-lg w-full xs:w-auto text-sm xs:text-base"
          >
            <LogOut className="w-5 h-5" />
            Log Out
          </button>
        </div>

        {/* App Info */}
        <div className="mt-6 text-center text-xs xs:text-sm text-gray-500">
          <p>TECNOT v1.0.0</p>
          <p className="mt-1">© 2026 TECNOT. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default Settings