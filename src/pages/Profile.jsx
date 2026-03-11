import React, { useState, useEffect } from 'react'
import { User, Mail, Phone, Stethoscope, Save, Camera, Loader2 } from 'lucide-react'
import Header from '../components/Header'

function Profile() {
  const [uploading, setUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(null)

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setPreviewUrl(base64String);
      localStorage.setItem('doctor_profile_pic', base64String);
      
      // Trigger a custom event to notify the Header immediately
      window.dispatchEvent(new Event('profilePicUpdated'));
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    // ✅ Check if an image was saved previously
    const savedPic = localStorage.getItem('doctor_profile_pic');
    if (savedPic) {
      setPreviewUrl(savedPic);
    }
  }, []);

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
  
  // Profile photo state
  const [photoPreview, setPhotoPreview] = useState(null)
  
  // Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Handle photo upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

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
    <div className="animate-fadeIn w-full min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header title="My Profile" subtitle="Manage your account settings" />
      
      <div className="w-full px-3 xs:px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-4xl mx-auto">
        
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-tecnot-primary to-tecnot-dark dark:from-gray-800 dark:to-gray-900 rounded-lg sm:rounded-xl 
                     p-6 xs:p-8 sm:p-10 mb-6 text-white transition-colors">
          <div className="flex flex-col sm:flex-row items-center gap-4 xs:gap-6">
            <div className="relative group">
              <div className="w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 bg-white dark:bg-gray-800 rounded-full 
                          flex items-center justify-center text-tecnot-primary dark:text-tecnot-light font-bold 
                          text-3xl xs:text-4xl sm:text-5xl flex-shrink-0 transition-colors overflow-hidden border-4 border-white/20">
                {previewUrl ? (
                  <img src={previewUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  profileData.first_name.charAt(0)
                )}
                
                {/* Upload Overlay - visible on hover */}
                <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                  {uploading ? (
                    <Loader2 className="w-8 h-8 animate-spin text-white" />
                  ) : (
                    <Camera className="w-8 h-8 text-white" />
                  )}
                </label>
              </div>
            </div>
            
            <div className="text-center sm:text-left">
              <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold mb-1 xs:mb-2">
                Dr. {profileData.first_name} {profileData.last_name}
              </h1>
              <p className="text-sm xs:text-base text-tecnot-light dark:text-gray-300">{profileData.specialty}</p>
              <p className="text-xs xs:text-sm text-tecnot-light dark:text-gray-400 mt-1">{profileData.clinic_name}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex">
              <button
                onClick={() => setActiveTab('info')}
                className={`flex-1 px-4 xs:px-6 py-3 xs:py-4 font-medium transition-smooth text-sm xs:text-base
                          ${activeTab === 'info' 
                            ? 'text-tecnot-primary dark:text-tecnot-light border-b-2 border-tecnot-primary dark:border-tecnot-light' 
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                          }`}
              >
                My Info
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`flex-1 px-4 xs:px-6 py-3 xs:py-4 font-medium transition-smooth text-sm xs:text-base
                          ${activeTab === 'security' 
                            ? 'text-tecnot-primary dark:text-tecnot-light border-b-2 border-tecnot-primary dark:border-tecnot-light' 
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
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
                <h2 className="text-lg xs:text-xl font-bold text-gray-900 dark:text-white mb-4 xs:mb-6">
                  Personal Information
                </h2>

                {/* Name Fields */}
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs xs:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                      <input
                        type="text"
                        value={profileData.first_name}
                        onChange={(e) => setProfileData({...profileData, first_name: e.target.value})}
                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg 
                                 outline-none focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 
                                 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20 transition-all text-sm xs:text-base
                                 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs xs:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                      <input
                        type="text"
                        value={profileData.last_name}
                        onChange={(e) => setProfileData({...profileData, last_name: e.target.value})}
                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg 
                                 outline-none focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 
                                 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20 transition-all text-sm xs:text-base
                                 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Fields */}
                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg 
                               outline-none focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 
                               focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20 transition-all text-sm xs:text-base
                               bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg 
                               outline-none focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 
                               focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20 transition-all text-sm xs:text-base
                               bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Specialty Dropdown */}
                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Specialty
                  </label>
                  <div className="relative">
                    <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                    <select
                      value={profileData.specialty}
                      onChange={(e) => setProfileData({...profileData, specialty: e.target.value})}
                      style={{ colorScheme: 'light' }}
                      className="w-full pl-11 pr-10 py-3 border-2 border-gray-200 rounded-lg 
                               outline-none focus:border-tecnot-primary focus:ring-4 
                               focus:ring-tecnot-primary/20 transition-all text-sm xs:text-base
                               bg-white cursor-pointer appearance-none
                               hover:border-tecnot-primary"
                    >
                      <option value="">Select a specialty</option>
                      <option value="General Physician">General Physician</option>
                      <option value="Cardiologist">Cardiologist</option>
                      <option value="Dermatologist">Dermatologist</option>
                      <option value="Pediatrician">Pediatrician</option>
                      <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
                      <option value="Neurologist">Neurologist</option>
                      <option value="Psychiatrist">Psychiatrist</option>
                      <option value="Gynecologist">Gynecologist</option>
                      <option value="ENT Specialist">ENT Specialist</option>
                      <option value="Ophthalmologist">Ophthalmologist</option>
                      <option value="Dentist">Dentist</option>
                      <option value="Radiologist">Radiologist</option>
                      <option value="Anesthesiologist">Anesthesiologist</option>
                      <option value="Surgeon">Surgeon</option>
                      <option value="Urologist">Urologist</option>
                      <option value="Endocrinologist">Endocrinologist</option>
                      <option value="Oncologist">Oncologist</option>
                      <option value="Gastroenterologist">Gastroenterologist</option>
                    </select>
                    {/* Custom Arrow Icon */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-tecnot-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs xs:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      License Number
                    </label>
                    <input
                      type="text"
                      value={profileData.license_number}
                      onChange={(e) => setProfileData({...profileData, license_number: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg 
                               outline-none focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 
                               focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20 transition-all text-sm xs:text-base
                               bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs xs:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Clinic Name
                    </label>
                    <input
                      type="text"
                      value={profileData.clinic_name}
                      onChange={(e) => setProfileData({...profileData, clinic_name: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg 
                               outline-none focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 
                               focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20 transition-all text-sm xs:text-base
                               bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSaveProfile}
                  className="w-full xs:w-auto px-6 xs:px-8 py-3 xs:py-4 bg-tecnot-primary dark:bg-tecnot-light text-white dark:text-gray-900
                           rounded-lg font-semibold hover:bg-tecnot-dark dark:hover:bg-tecnot-primary transition-smooth 
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
                <h2 className="text-lg xs:text-xl font-bold text-gray-900 dark:text-white mb-4 xs:mb-6">
                  Change Password
                </h2>

                {/* Current Password */}
                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwordData.current_password}
                      onChange={(e) => setPasswordData({...passwordData, current_password: e.target.value})}
                      placeholder="Enter current password"
                      className="w-full px-4 pr-12 py-3 border-2 border-gray-200 rounded-lg 
                               outline-none focus:border-tecnot-primary focus:ring-4 
                               focus:ring-tecnot-primary/20 transition-all text-sm xs:text-base"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2
                                text-gray-500 hover:text-tecnot-primary
                                transition-colors duration-200
                                focus:outline-none"
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={passwordData.new_password}
                      onChange={(e) => setPasswordData({...passwordData, new_password: e.target.value})}
                      placeholder="Enter new password"
                      className="w-full px-4 pr-12 py-3 border-2 border-gray-200 rounded-lg 
                               outline-none focus:border-tecnot-primary focus:ring-4 
                               focus:ring-tecnot-primary/20 transition-all text-sm xs:text-base"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2
                                text-gray-500 hover:text-tecnot-primary
                                transition-colors duration-200
                                focus:outline-none"
                    >
                      {showNewPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm New Password */}
                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={passwordData.confirm_password}
                      onChange={(e) => setPasswordData({...passwordData, confirm_password: e.target.value})}
                      placeholder="Confirm new password"
                      className="w-full px-4 pr-12 py-3 border-2 border-gray-200 rounded-lg 
                               outline-none focus:border-tecnot-primary focus:ring-4 
                               focus:ring-tecnot-primary/20 transition-all text-sm xs:text-base"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2
                                text-gray-500 hover:text-tecnot-primary
                                transition-colors duration-200
                                focus:outline-none"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleChangePassword}
                  className="w-full xs:w-auto px-6 xs:px-8 py-3 xs:py-4 bg-tecnot-primary dark:bg-tecnot-light text-white dark:text-gray-900
                           rounded-lg font-semibold hover:bg-tecnot-dark dark:hover:bg-tecnot-primary transition-smooth 
                           shadow-lg text-sm xs:text-base"
                >
                  Change Password
                </button>

                {/* Security Tips */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2 text-sm xs:text-base">
                    Password Tips:
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
      </div>
    </div>
  )
}

export default Profile