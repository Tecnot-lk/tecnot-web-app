// =============================================================================
// SETTINGS PAGE
// =============================================================================
//
// PURPOSE:
// - Theme settings (Light/Dark mode)
// - Notification preferences
// - Account settings
// - Logout functionality
//
// =============================================================================

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Moon, Sun, Monitor, Bell, LogOut, Trash2 } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import Header from '../components/Header'

function Settings() {
  const { theme, setTheme, logout } = useAuth()
  const navigate = useNavigate()

  // ==========================================================================
  // FUNCTION: HANDLE LOGOUT
  // ==========================================================================
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout()
      navigate('/login')
    }
  }

  // ==========================================================================
  // FUNCTION: HANDLE DELETE ACCOUNT
  // ==========================================================================
  /**
   * TODO BACKEND: Implement account deletion
   * - Endpoint: DELETE /api/auth/account
   * - Should soft-delete or permanently remove user data
   * - GDPR compliance: Remove all personal data
   */
  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      'Are you ABSOLUTELY sure you want to delete your account? This action cannot be undone and all your data will be permanently deleted.'
    )
    
    if (confirmed) {
      const doubleConfirm = window.prompt(
        'Type "DELETE" to confirm account deletion:'
      )
      
      if (doubleConfirm === 'DELETE') {
        alert('Account deletion will be implemented when backend is ready.')
        // TODO BACKEND: Call delete account API
      }
    }
  }

  // ==========================================================================
  // RENDER
  // ==========================================================================
  return (
    <div className="animate-fadeIn w-full min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header title="Settings" subtitle="Manage your preferences" />
      
      <div className="w-full px-3 xs:px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-3xl mx-auto">
        <div className="space-y-4 sm:space-y-6">
          
          {/* ====================================================================
              APPEARANCE SETTINGS
              ==================================================================== */}
          <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 xs:p-5 sm:p-6 transition-colors">
            <h2 className="text-base xs:text-lg font-bold text-gray-900 dark:text-white mb-4">
              Appearance
            </h2>
            
            <div className="space-y-3">
              {/* Light Mode */}
              <button
                onClick={() => setTheme('light')}
                className={`w-full flex items-center gap-3 p-3 xs:p-4 rounded-lg border-2 transition-smooth ${
                  theme === 'light'
                    ? 'border-tecnot-primary dark:border-tecnot-light bg-tecnot-light/20 dark:bg-tecnot-light/10'
                    : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <Sun className="w-5 h-5 xs:w-6 xs:h-6 text-yellow-500" />
                <div className="flex-1 text-left">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm xs:text-base">Light Mode</p>
                  <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400">Bright and clear interface</p>
                </div>
                {theme === 'light' && (
                  <div className="w-5 h-5 bg-tecnot-primary dark:bg-tecnot-light rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white dark:bg-gray-900 rounded-full"></div>
                  </div>
                )}
              </button>

              {/* Dark Mode */}
              <button
                onClick={() => setTheme('dark')}
                className={`w-full flex items-center gap-3 p-3 xs:p-4 rounded-lg border-2 transition-smooth ${
                  theme === 'dark'
                    ? 'border-tecnot-primary dark:border-tecnot-light bg-tecnot-light/20 dark:bg-tecnot-light/10'
                    : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <Moon className="w-5 h-5 xs:w-6 xs:h-6 text-blue-500" />
                <div className="flex-1 text-left">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm xs:text-base">Dark Mode</p>
                  <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400">Easy on the eyes</p>
                </div>
                {theme === 'dark' && (
                  <div className="w-5 h-5 bg-tecnot-primary dark:bg-tecnot-light rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white dark:bg-gray-900 rounded-full"></div>
                  </div>
                )}
              </button>

              {/* System Mode */}
              <button
                onClick={() => setTheme('system')}
                className={`w-full flex items-center gap-3 p-3 xs:p-4 rounded-lg border-2 transition-smooth ${
                  theme === 'system'
                    ? 'border-tecnot-primary dark:border-tecnot-light bg-tecnot-light/20 dark:bg-tecnot-light/10'
                    : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <Monitor className="w-5 h-5 xs:w-6 xs:h-6 text-gray-500 dark:text-gray-400" />
                <div className="flex-1 text-left">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm xs:text-base">System</p>
                  <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400">Follow system preferences</p>
                </div>
                {theme === 'system' && (
                  <div className="w-5 h-5 bg-tecnot-primary dark:bg-tecnot-light rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white dark:bg-gray-900 rounded-full"></div>
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* ====================================================================
              NOTIFICATION SETTINGS
              ==================================================================== */}
          <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 xs:p-5 sm:p-6 transition-colors">
            <h2 className="text-base xs:text-lg font-bold text-gray-900 dark:text-white mb-4">
              Notifications
            </h2>
            
            <div className="space-y-3">
              {/* Email Notifications */}
              <div className="flex items-center justify-between p-3 xs:p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 xs:w-6 xs:h-6 text-tecnot-primary dark:text-tecnot-light" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm xs:text-base">Email Notifications</p>
                    <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400">Receive updates via email</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-tecnot-primary/20 dark:peer-focus:ring-tecnot-light/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tecnot-primary dark:peer-checked:bg-tecnot-light"></div>
                </label>
              </div>

              {/* Push Notifications */}
              <div className="flex items-center justify-between p-3 xs:p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 xs:w-6 xs:h-6 text-tecnot-primary dark:text-tecnot-light" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm xs:text-base">Push Notifications</p>
                    <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400">Browser notifications</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-tecnot-primary/20 dark:peer-focus:ring-tecnot-light/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tecnot-primary dark:peer-checked:bg-tecnot-light"></div>
                </label>
              </div>
            </div>
          </div>

          {/* ====================================================================
              ACCOUNT ACTIONS
              ==================================================================== */}
          <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 xs:p-5 sm:p-6 transition-colors">
            <h2 className="text-base xs:text-lg font-bold text-gray-900 dark:text-white mb-4">
              Account Actions
            </h2>
            
            <div className="space-y-3">
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-3 xs:p-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-smooth text-sm xs:text-base"
              >
                <LogOut className="w-5 h-5 xs:w-6 xs:h-6 text-gray-700 dark:text-gray-300" />
                <span className="font-semibold text-gray-900 dark:text-white">Logout</span>
              </button>

              {/* Delete Account Button */}
              <button
                onClick={handleDeleteAccount}
                className="w-full flex items-center gap-3 p-3 xs:p-4 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg transition-smooth text-sm xs:text-base"
              >
                <Trash2 className="w-5 h-5 xs:w-6 xs:h-6 text-red-600 dark:text-red-400" />
                <span className="font-semibold text-red-600 dark:text-red-400">Delete Account</span>
              </button>
            </div>
          </div>

          {/* ====================================================================
              APP INFO
              ==================================================================== */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 xs:p-5 sm:p-6 border border-gray-200 dark:border-gray-700 transition-colors">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm xs:text-base">About TECNOT</h3>
            <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 mb-2">
              AI Clinical Scribe for Sri Lankan Doctors
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Version 1.0.0 • Built with React + FastAPI
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings