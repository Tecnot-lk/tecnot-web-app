// ====================
// PROFILE PAGE - FULLY RESPONSIVE
// Doctor's profile with personal info and security settings
// ====================

import React, { useState } from 'react'
import { User, Lock, Save } from 'lucide-react'
import Header from '../components/Header'
 
function Profile() {
  const [activeTab, setActiveTab] = useState('info')
  
  const [profileData, setProfileData] = useState({
    firstName: 'Malik',
    lastName: 'Abdul',
    phone: '+94 77 999 9999',
    email: 'malik@gmail.com',
    specialty: 'General Physician',
    hospital: 'Lanka General Hospital'
  })
  
  const [securityData, setSecurityData] = useState({
    email: 'malik@gmail.com',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  
  return (
    <div className="animate-fadeIn">
      <Header 
        title="My Profile" 
        subtitle="Manage your account settings and preferences"
      />
      
      {/* Main Content - Responsive padding */}
      <div className="p-3 xs:p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
        
        {/* Tab Navigation - Responsive */}
        <div className="flex flex-col xs:flex-row gap-2 xs:gap-4 mb-4 xs:mb-6">
          <button
            onClick={() => setActiveTab('info')}
            className={`flex items-center justify-center gap-2 
                       px-4 xs:px-6 py-2.5 xs:py-3 
                       rounded-lg font-medium 
                       transition-smooth
                       text-sm xs:text-base
                       ${activeTab === 'info'
                         ? 'bg-tecnot-primary text-white shadow-lg'
                         : 'bg-white text-gray-700 hover:bg-gray-50'
                       }`}
          >
            <User className="w-4 h-4 xs:w-5 xs:h-5" />
            My Info
          </button>
          
          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center justify-center gap-2 
                       px-4 xs:px-6 py-2.5 xs:py-3 
                       rounded-lg font-medium 
                       transition-smooth
                       text-sm xs:text-base
                       ${activeTab === 'security'
                         ? 'bg-tecnot-primary text-white shadow-lg'
                         : 'bg-white text-gray-700 hover:bg-gray-50'
                       }`}
          >
            <Lock className="w-4 h-4 xs:w-5 xs:h-5" />
            Security
          </button>
        </div>
        
        {/* My Info Tab */}
        {activeTab === 'info' && (
          <div className="bg-white rounded-xl sm:rounded-2xl 
                         p-5 xs:p-6 sm:p-8 
                         shadow-sm border border-gray-100">
            <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-4 xs:mb-6">
              Personal Information
            </h2>
            
            <div className="space-y-3 xs:space-y-4">
              {/* Profile Photo */}
                <div className="mb-6 flex flex-col items-center">
                <div className="relative">
                   <div className="w-24 h-24 xs:w-32 xs:h-32 rounded-full overflow-hidden 
                    bg-gray-200 border-4 border-white shadow-lg">
                    {photoPreview ? (
                    <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                <div className="w-full h-full flex items-center justify-center bg-tecnot-primary">
                <User className="w-12 h-12 xs:w-16 xs:h-16 text-white" />
              </div>
            )}
        </div>
        <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 
                     shadow-lg cursor-pointer hover:bg-gray-50 transition-smooth">
      <input
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
        className="hidden"
      />
      <Save className="w-4 h-4 xs:w-5 xs:h-5 text-tecnot-primary" />
    </label>
    </div>
      <p className="mt-3 text-xs xs:text-sm text-gray-600">
    Click the icon to upload photo
      </p>
    </div>
    
              {/* First Name */}
              <div>
                <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={profileData.firstName}
                  onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                  className="w-full px-3 xs:px-4 py-2.5 xs:py-3 
                           text-sm xs:text-base
                           border-2 border-gray-200 rounded-lg 
                           outline-none focus:border-tecnot-primary transition-smooth"
                />
              </div>
              
              {/* Last Name */}
              <div>
                <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={profileData.lastName}
                  onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                  className="w-full px-3 xs:px-4 py-2.5 xs:py-3 
                           text-sm xs:text-base
                           border-2 border-gray-200 rounded-lg 
                           outline-none focus:border-tecnot-primary transition-smooth"
                />
              </div>
              
              {/* Phone Number */}
              <div>
                <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  className="w-full px-3 xs:px-4 py-2.5 xs:py-3 
                           text-sm xs:text-base
                           border-2 border-gray-200 rounded-lg 
                           outline-none focus:border-tecnot-primary transition-smooth"
                />
              </div>
              
              {/* Email */}
              <div>
                <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  className="w-full px-3 xs:px-4 py-2.5 xs:py-3 
                           text-sm xs:text-base
                           border-2 border-gray-200 rounded-lg 
                           outline-none focus:border-tecnot-primary transition-smooth"
                />
              </div>
              
              {/* Specialty */}
              <div>
                <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2">
                  Speciality
                </label>
                <input
                  type="text"
                  value={profileData.specialty}
                  onChange={(e) => setProfileData({...profileData, specialty: e.target.value})}
                  className="w-full px-3 xs:px-4 py-2.5 xs:py-3 
                           text-sm xs:text-base
                           border-2 border-gray-200 rounded-lg 
                           outline-none focus:border-tecnot-primary transition-smooth"
                />
              </div>
              
              {/* Hospital */}
              <div>
                <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2">
                  Hospital/Clinic
                </label>
                <input
                  type="text"
                  value={profileData.hospital}
                  onChange={(e) => setProfileData({...profileData, hospital: e.target.value})}
                  className="w-full px-3 xs:px-4 py-2.5 xs:py-3 
                           text-sm xs:text-base
                           border-2 border-gray-200 rounded-lg 
                           outline-none focus:border-tecnot-primary transition-smooth"
                />
              </div>
            </div>

            
            
            {/* Save Button */}
            <button
              onClick={() => alert('Profile updated! (Demo only)')}
              className="mt-4 xs:mt-6 flex items-center justify-center gap-2 
                       bg-tecnot-primary text-white 
                       px-6 xs:px-8 py-2.5 xs:py-3 
                       rounded-lg font-medium 
                       hover:bg-tecnot-dark transition-smooth 
                       shadow-lg
                       text-sm xs:text-base
                       w-full xs:w-auto"
            >
              <Save className="w-4 h-4 xs:w-5 xs:h-5" />
              Save Changes
            </button>
          </div>
        )}
        
        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="bg-white rounded-xl sm:rounded-2xl 
                         p-5 xs:p-6 sm:p-8 
                         shadow-sm border border-gray-100">
            <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-4 xs:mb-6">
              Security Settings
            </h2>
            
            <div className="space-y-3 xs:space-y-4">
              {/* Email (read-only) */}
              <div>
                <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={securityData.email}
                  disabled
                  className="w-full px-3 xs:px-4 py-2.5 xs:py-3 
                           text-sm xs:text-base
                           border-2 border-gray-200 rounded-lg 
                           bg-gray-50 text-gray-500"
                />
              </div>
              
              {/* Old Password */}
              <div>
                <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2">
                  Old Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={securityData.oldPassword}
                  onChange={(e) => setSecurityData({...securityData, oldPassword: e.target.value})}
                  className="w-full px-3 xs:px-4 py-2.5 xs:py-3 
                           text-sm xs:text-base
                           border-2 border-gray-200 rounded-lg 
                           outline-none focus:border-tecnot-primary transition-smooth"
                />
              </div>
              
              {/* New Password */}
              <div>
                <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={securityData.newPassword}
                  onChange={(e) => setSecurityData({...securityData, newPassword: e.target.value})}
                  className="w-full px-3 xs:px-4 py-2.5 xs:py-3 
                           text-sm xs:text-base
                           border-2 border-gray-200 rounded-lg 
                           outline-none focus:border-tecnot-primary transition-smooth"
                />
              </div>
              
              {/* Confirm New Password */}
              <div>
                <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={securityData.confirmPassword}
                  onChange={(e) => setSecurityData({...securityData, confirmPassword: e.target.value})}
                  className="w-full px-3 xs:px-4 py-2.5 xs:py-3 
                           text-sm xs:text-base
                           border-2 border-gray-200 rounded-lg 
                           outline-none focus:border-tecnot-primary transition-smooth"
                />
              </div>
            </div>
            
            {/* Change Password Button */}
            <button
              onClick={() => alert('Password changed! (Demo only)')}
              className="mt-4 xs:mt-6 flex items-center justify-center gap-2 
                       bg-tecnot-primary text-white 
                       px-6 xs:px-8 py-2.5 xs:py-3 
                       rounded-lg font-medium 
                       hover:bg-tecnot-dark transition-smooth 
                       shadow-lg
                       text-sm xs:text-base
                       w-full xs:w-auto"
            >
              <Lock className="w-4 h-4 xs:w-5 xs:h-5" />
              Change Password
            </button>
            
            {/* Security Tips */}
            <div className="mt-4 xs:mt-6 
                           bg-blue-50 border border-blue-200 
                           rounded-lg p-3 xs:p-4">
              <h4 className="font-semibold text-blue-900 mb-2 text-sm xs:text-base">
                🔒 Password Tips:
              </h4>
              <ul className="text-xs xs:text-sm text-blue-800 space-y-1">
                <li>• Use at least 8 characters</li>
                <li>• Mix uppercase, lowercase, numbers, and symbols</li>
                <li>• Don't use personal information</li>
                <li>• Change your password regularly</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile