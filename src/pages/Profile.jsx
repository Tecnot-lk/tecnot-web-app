import React, { useState } from 'react'
import { User, Mail, Phone, Stethoscope, Save } from 'lucide-react'
import Header from '../components/Header'
 
function Profile() {
  const [profileData, setProfileData] = useState({
    firstName: 'Malik',
    lastName: 'Abdul',
    phone: '+94 77 999 9999',
    email: 'malik@gmail.com',
    specialty: 'General Physician',
    license_number: 'SL12345',
    clinic_name: 'Ibrahim Medical Center'
  })
  
  const [securityData, setSecurityData] = useState({
    email: 'malik@gmail.com',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

   
  const [photoPreview, setPhotoPreview] = useState(null)

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
  // --------------------------------
  
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
              <div className="relative">
                <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2">
                  Speciality
                </label>
                <div className="relative">
                  <select
                    value={profileData.specialty}
                    onChange={(e) => setProfileData({...profileData, specialty: e.target.value})}
                    style={{
                      colorScheme: 'light'
                    }}
                    className="w-full px-3 xs:px-4 py-2.5 xs:py-3 
                              text-sm xs:text-base
                              border-2 border-gray-200 rounded-lg 
                              outline-none focus:border-tecnot-primary 
                              focus:ring-2 focus:ring-tecnot-primary/20
                              transition-all duration-300 ease-in-out
                              bg-white cursor- dot-pointer
                              hover:border-tecnot-primary hover:shadow-md
                              appearance-none pr-10
                              [&>option:checked]:bg-tecnot-primary
                              [&>option:checked]:text-white"
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