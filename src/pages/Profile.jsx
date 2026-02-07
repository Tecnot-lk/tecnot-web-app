import React, { useState } from 'react'
import { User, Mail, Phone, Stethoscope, Save } from 'lucide-react'
import Header from '../components/Header'

function Profile() {
  const [profileData, setProfileData] = useState({
    first_name: 'Ibrahim',
    last_name: 'Malik',
    email: 'dr.ibrahim@clinic.lk',
    phone: '+94 77 999 8888',
    specialty: 'General Physician',
    license_number: 'SL12345',
    clinic_name: 'Ibrahim Medical Center'
  })

  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  })

  const [activeTab, setActiveTab] = useState('info')

  const handleSaveProfile = () => {
    console.log('Saving profile:', profileData)
    alert('Profile updated successfully!')
  }

  const handleChangePassword = () => {
    if (passwordData.new_password !== passwordData.confirm_password) {
      alert('Passwords do not match!')
      return
    }
    console.log('Changing password')
    alert('Password changed successfully!')
    setPasswordData({ current_password: '', new_password: '', confirm_password: '' })
  }

  return (
    <div className="animate-fadeIn w-full">
      <Header title="My Profile" subtitle="Manage your account settings" />
      
      <div className="w-full px-3 xs:px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-4xl mx-auto">
        
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-tecnot-primary to-tecnot-dark rounded-lg sm:rounded-xl 
                     p-6 xs:p-8 sm:p-10 mb-6 text-white">
          <div className="flex flex-col sm:flex-row items-center gap-4 xs:gap-6">
            <div className="w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 bg-white rounded-full 
                         flex items-center justify-center text-tecnot-primary font-bold 
                         text-3xl xs:text-4xl sm:text-5xl flex-shrink-0">
              I
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold mb-1 xs:mb-2">
                Dr. {profileData.first_name} {profileData.last_name}
              </h1>
              <p className="text-sm xs:text-base text-tecnot-light">{profileData.specialty}</p>
              <p className="text-xs xs:text-sm text-tecnot-light mt-1">{profileData.clinic_name}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('info')}
                className={`flex-1 px-4 xs:px-6 py-3 xs:py-4 font-medium transition-smooth text-sm xs:text-base
                          ${activeTab === 'info' 
                            ? 'text-tecnot-primary border-b-2 border-tecnot-primary' 
                            : 'text-gray-600 hover:text-gray-900'
                          }`}
              >
                My Info
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`flex-1 px-4 xs:px-6 py-3 xs:py-4 font-medium transition-smooth text-sm xs:text-base
                          ${activeTab === 'security' 
                            ? 'text-tecnot-primary border-b-2 border-tecnot-primary' 
                            : 'text-gray-600 hover:text-gray-900'
                          }`}
              >
                Security
              </button>
            </div>
          </div>

          <div className="p-4 xs:p-6 sm:p-8">
            
            {/* My Info Tab */}
            {activeTab === 'info' && (
              <div className="space-y-4 xs:space-y-5">
                <h2 className="text-lg xs:text-xl font-bold text-gray-900 mb-4 xs:mb-6">
                  Personal Information
                </h2>

                {/* Name Fields */}
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={profileData.first_name}
                        onChange={(e) => setProfileData({...profileData, first_name: e.target.value})}
                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg 
                                 outline-none focus:border-tecnot-primary focus:ring-4 
                                 focus:ring-tecnot-primary/20 transition-all text-sm xs:text-base"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={profileData.last_name}
                        onChange={(e) => setProfileData({...profileData, last_name: e.target.value})}
                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg 
                                 outline-none focus:border-tecnot-primary focus:ring-4 
                                 focus:ring-tecnot-primary/20 transition-all text-sm xs:text-base"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Fields */}
                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg 
                               outline-none focus:border-tecnot-primary focus:ring-4 
                               focus:ring-tecnot-primary/20 transition-all text-sm xs:text-base"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg 
                               outline-none focus:border-tecnot-primary focus:ring-4 
                               focus:ring-tecnot-primary/20 transition-all text-sm xs:text-base"
                    />
                  </div>
                </div>

                {/* Professional Fields */}
                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-2">
                    Specialty
                  </label>
                  <div className="relative">
                    <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={profileData.specialty}
                      onChange={(e) => setProfileData({...profileData, specialty: e.target.value})}
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg 
                               outline-none focus:border-tecnot-primary focus:ring-4 
                               focus:ring-tecnot-primary/20 transition-all text-sm xs:text-base"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-2">
                      License Number
                    </label>
                    <input
                      type="text"
                      value={profileData.license_number}
                      onChange={(e) => setProfileData({...profileData, license_number: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
                               outline-none focus:border-tecnot-primary focus:ring-4 
                               focus:ring-tecnot-primary/20 transition-all text-sm xs:text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-2">
                      Clinic Name
                    </label>
                    <input
                      type="text"
                      value={profileData.clinic_name}
                      onChange={(e) => setProfileData({...profileData, clinic_name: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
                               outline-none focus:border-tecnot-primary focus:ring-4 
                               focus:ring-tecnot-primary/20 transition-all text-sm xs:text-base"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSaveProfile}
                  className="w-full xs:w-auto px-6 xs:px-8 py-3 xs:py-4 bg-tecnot-primary text-white 
                           rounded-lg font-semibold hover:bg-tecnot-dark transition-smooth 
                           shadow-lg flex items-center justify-center gap-2 text-sm xs:text-base"
                >
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-4 xs:space-y-5">
                <h2 className="text-lg xs:text-xl font-bold text-gray-900 mb-4 xs:mb-6">
                  Change Password
                </h2>

                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.current_password}
                    onChange={(e) => setPasswordData({...passwordData, current_password: e.target.value})}
                    placeholder="Enter current password"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
                             outline-none focus:border-tecnot-primary focus:ring-4 
                             focus:ring-tecnot-primary/20 transition-all text-sm xs:text-base"
                  />
                </div>

                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.new_password}
                    onChange={(e) => setPasswordData({...passwordData, new_password: e.target.value})}
                    placeholder="Enter new password"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
                             outline-none focus:border-tecnot-primary focus:ring-4 
                             focus:ring-tecnot-primary/20 transition-all text-sm xs:text-base"
                  />
                </div>

                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirm_password}
                    onChange={(e) => setPasswordData({...passwordData, confirm_password: e.target.value})}
                    placeholder="Confirm new password"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
                             outline-none focus:border-tecnot-primary focus:ring-4 
                             focus:ring-tecnot-primary/20 transition-all text-sm xs:text-base"
                  />
                </div>

                <button
                  onClick={handleChangePassword}
                  className="w-full xs:w-auto px-6 xs:px-8 py-3 xs:py-4 bg-tecnot-primary text-white 
                           rounded-lg font-semibold hover:bg-tecnot-dark transition-smooth 
                           shadow-lg text-sm xs:text-base"
                >
                  Change Password
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile