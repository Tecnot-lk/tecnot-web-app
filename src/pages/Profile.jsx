// =============================================================================
// PROFILE PAGE
// =============================================================================
//
// PURPOSE:
// - View and edit user profile information
// - Change password
// - Two-tab interface: Personal Info + Security
//
// BACKEND INTEGRATION:
// - Line 85: handleSaveProfile() - PUT /api/auth/profile
// - Line 110: handleChangePassword() - PUT /api/auth/change-password
//
// =============================================================================

import React, { useState } from 'react'
import { User, Lock, Save } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import Header from '../components/Header'

function Profile() {
  const { user } = useAuth()

  // ==========================================================================
  // STATE MANAGEMENT
  // ==========================================================================
  
  // Active tab (personal or security)
  const [activeTab, setActiveTab] = useState('personal')
  
  // Profile form data
  const [profileData, setProfileData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    specialty: user?.specialty || '',
    license_number: user?.license_number || '',
    clinic_name: user?.clinic_name || ''
  })

  // Password change form data
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  })

  // Loading states
  const [savingProfile, setSavingProfile] = useState(false)
  const [changingPassword, setChangingPassword] = useState(false)

  // ==========================================================================
  // FUNCTION: HANDLE PROFILE SAVE
  // ==========================================================================
  /**
   * Saves updated profile information
   * 
   * BACKEND INTEGRATION:
   * - Endpoint: PUT /api/auth/profile
   * - Sends: Updated user data
   * - Receives: Updated user object
   */
  const handleSaveProfile = async () => {
    try {
      setSavingProfile(true)

      // TODO BACKEND: Replace with actual API call
      // const response = await fetch('/api/auth/profile', {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify(profileData)
      // })
      // const data = await response.json()

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      alert('Profile updated successfully!')
      
    } catch (error) {
      console.error('Error saving profile:', error)
      alert('Failed to save profile. Please try again.')
    } finally {
      setSavingProfile(false)
    }
  }

  // ==========================================================================
  // FUNCTION: HANDLE PASSWORD CHANGE
  // ==========================================================================
  /**
   * Changes user password
   * 
   * BACKEND INTEGRATION:
   * - Endpoint: PUT /api/auth/change-password
   * - Sends: { current_password, new_password }
   * - Receives: { success: true }
   * 
   * VALIDATION:
   * - Current password required
   * - New password minimum 8 characters
   * - New password must match confirmation
   */
  const handleChangePassword = async () => {
    // Validation
    if (!passwordData.current_password || !passwordData.new_password || !passwordData.confirm_password) {
      alert('Please fill in all password fields')
      return
    }

    if (passwordData.new_password !== passwordData.confirm_password) {
      alert('New passwords do not match')
      return
    }

    if (passwordData.new_password.length < 8) {
      alert('New password must be at least 8 characters')
      return
    }

    try {
      setChangingPassword(true)

      // TODO BACKEND: Replace with actual API call
      // const response = await fetch('/api/auth/change-password', {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify({
      //     current_password: passwordData.current_password,
      //     new_password: passwordData.new_password
      //   })
      // })
      // const data = await response.json()

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      alert('Password changed successfully!')
      
      // Clear password fields
      setPasswordData({
        current_password: '',
        new_password: '',
        confirm_password: ''
      })
      
    } catch (error) {
      console.error('Error changing password:', error)
      alert('Failed to change password. Please check your current password and try again.')
    } finally {
      setChangingPassword(false)
    }
  }

  // ==========================================================================
  // RENDER
  // ==========================================================================
  return (
    <div className="animate-fadeIn w-full min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header title="My Profile" subtitle="Manage your account information" />
      
      <div className="w-full px-3 xs:px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-3xl mx-auto">
        
        {/* ====================================================================
            TAB NAVIGATION
            ==================================================================== */}
        <div className="flex gap-2 mb-4 sm:mb-6">
          <button
            onClick={() => setActiveTab('personal')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-smooth text-sm xs:text-base ${
              activeTab === 'personal'
                ? 'bg-tecnot-primary dark:bg-tecnot-light text-white dark:text-gray-900 shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <User className="w-4 h-4 xs:w-5 xs:h-5" />
            Personal Info
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-smooth text-sm xs:text-base ${
              activeTab === 'security'
                ? 'bg-tecnot-primary dark:bg-tecnot-light text-white dark:text-gray-900 shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <Lock className="w-4 h-4 xs:w-5 xs:h-5" />
            Security
          </button>
        </div>

        {/* ====================================================================
            TAB CONTENT
            ==================================================================== */}
        {activeTab === 'personal' ? (
          /* ================================================================
              PERSONAL INFO TAB
              ================================================================ */
          <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 xs:p-5 sm:p-6 transition-colors">
            <h2 className="text-base xs:text-lg font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              Personal Information
            </h2>

            <div className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={profileData.first_name}
                    onChange={(e) => setProfileData({ ...profileData, first_name: e.target.value })}
                    className="w-full px-3 xs:px-4 py-2 xs:py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg 
                             outline-none focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                             transition-all text-sm xs:text-base
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={profileData.last_name}
                    onChange={(e) => setProfileData({ ...profileData, last_name: e.target.value })}
                    className="w-full px-3 xs:px-4 py-2 xs:py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg 
                             outline-none focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                             transition-all text-sm xs:text-base
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="w-full px-3 xs:px-4 py-2 xs:py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg 
                           outline-none focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                           transition-all text-sm xs:text-base
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              {/* Specialty */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Specialty
                </label>
                <input
                  type="text"
                  value={profileData.specialty}
                  onChange={(e) => setProfileData({ ...profileData, specialty: e.target.value })}
                  className="w-full px-3 xs:px-4 py-2 xs:py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg 
                           outline-none focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                           transition-all text-sm xs:text-base
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="e.g., General Physician"
                />
              </div>

              {/* License & Clinic */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    License Number
                  </label>
                  <input
                    type="text"
                    value={profileData.license_number}
                    onChange={(e) => setProfileData({ ...profileData, license_number: e.target.value })}
                    className="w-full px-3 xs:px-4 py-2 xs:py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg 
                             outline-none focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                             transition-all text-sm xs:text-base
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="SL12345"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Clinic Name
                  </label>
                  <input
                    type="text"
                    value={profileData.clinic_name}
                    onChange={(e) => setProfileData({ ...profileData, clinic_name: e.target.value })}
                    className="w-full px-3 xs:px-4 py-2 xs:py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg 
                             outline-none focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                             transition-all text-sm xs:text-base
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="City Medical Center"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end pt-4">
                <button
                  onClick={handleSaveProfile}
                  disabled={savingProfile}
                  className="px-4 xs:px-6 py-2 xs:py-3 bg-tecnot-primary dark:bg-tecnot-light text-white dark:text-gray-900 rounded-lg font-medium 
                           hover:bg-tecnot-dark dark:hover:bg-tecnot-primary transition-smooth shadow-lg 
                           disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm xs:text-base"
                >
                  <Save className="w-4 h-4 xs:w-5 xs:h-5" />
                  {savingProfile ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ================================================================
              SECURITY TAB
              ================================================================ */
          <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 xs:p-5 sm:p-6 transition-colors">
            <h2 className="text-base xs:text-lg font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              Change Password
            </h2>

            <div className="space-y-4">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordData.current_password}
                  onChange={(e) => setPasswordData({ ...passwordData, current_password: e.target.value })}
                  className="w-full px-3 xs:px-4 py-2 xs:py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg 
                           outline-none focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                           transition-all text-sm xs:text-base
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="••••••••"
                />
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordData.new_password}
                  onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
                  className="w-full px-3 xs:px-4 py-2 xs:py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg 
                           outline-none focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                           transition-all text-sm xs:text-base
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="••••••••"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Must be at least 8 characters
                </p>
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwordData.confirm_password}
                  onChange={(e) => setPasswordData({ ...passwordData, confirm_password: e.target.value })}
                  className="w-full px-3 xs:px-4 py-2 xs:py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg 
                           outline-none focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                           transition-all text-sm xs:text-base
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="••••••••"
                />
              </div>

              {/* Change Password Button */}
              <div className="flex justify-end pt-4">
                <button
                  onClick={handleChangePassword}
                  disabled={changingPassword}
                  className="px-4 xs:px-6 py-2 xs:py-3 bg-tecnot-primary dark:bg-tecnot-light text-white dark:text-gray-900 rounded-lg font-medium 
                           hover:bg-tecnot-dark dark:hover:bg-tecnot-primary transition-smooth shadow-lg 
                           disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm xs:text-base"
                >
                  <Lock className="w-4 h-4 xs:w-5 xs:h-5" />
                  {changingPassword ? 'Changing...' : 'Change Password'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile