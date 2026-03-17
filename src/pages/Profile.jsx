// PROFILE PAGE - FULLY SUPABASE INTEGRATED
import React, { useState, useEffect } from 'react'
import { User, Mail, Phone, Stethoscope, Save, Camera, Loader2, Lock } from 'lucide-react'
import Header from '../components/Header'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../services/supabaseClient'

function Profile() {
  const { user, profile, updateProfile, changePassword } = useAuth()

  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [changingPassword, setChangingPassword] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [activeTab, setActiveTab] = useState('info')
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    specialty: '',
    license_number: '',
    clinic_name: '',
  })

  const [passwordData, setPasswordData] = useState({
    new_password: '',
    confirm_password: '',
  })

  // Populate form from Supabase profile
  useEffect(() => {
    if (profile) {
      setProfileData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        email: user?.email || '',
        phone: profile.phone || '',
        specialty: profile.specialty || '',
        license_number: profile.license_number || '',
        clinic_name: profile.clinic_name || '',
      })
      if (profile.avatar_url) setPreviewUrl(profile.avatar_url)
    }
  }, [profile, user])

  // Upload profile picture to Supabase Storage
  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (!file || !user) return

    setUploading(true)
    const filePath = `avatars/${user.id}/${Date.now()}_${file.name}`

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true })

    if (uploadError) {
      setErrorMsg('Failed to upload image.')
      setUploading(false)
      return
    }

    const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath)

    // Save URL to profile
    await updateProfile({ avatar_url: publicUrl })
    setPreviewUrl(publicUrl)
    window.dispatchEvent(new Event('profilePicUpdated'))
    setUploading(false)
  }

  // Save profile changes to Supabase
  const handleSaveProfile = async () => {
    setSaving(true)
    setSuccessMsg('')
    setErrorMsg('')
    try {
      await updateProfile({
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        phone: profileData.phone,
        specialty: profileData.specialty,
        license_number: profileData.license_number,
        clinic_name: profileData.clinic_name,
      })
      setSuccessMsg('Profile updated successfully!')
    } catch (err) {
      setErrorMsg(err.message || 'Failed to update profile.')
    } finally {
      setSaving(false)
    }
  }

  // Change password via Supabase Auth
  const handleChangePassword = async () => {
    setSuccessMsg('')
    setErrorMsg('')
    if (passwordData.new_password !== passwordData.confirm_password) {
      setErrorMsg('Passwords do not match.')
      return
    }
    if (passwordData.new_password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.')
      return
    }
    setChangingPassword(true)
    try {
      await changePassword(passwordData.new_password)
      setSuccessMsg('Password changed successfully!')
      setPasswordData({ new_password: '', confirm_password: '' })
    } catch (err) {
      setErrorMsg(err.message || 'Failed to change password.')
    } finally {
      setChangingPassword(false)
    }
  }

  const initials = `${profileData.first_name?.charAt(0) || ''}${profileData.last_name?.charAt(0) || ''}`.toUpperCase()

  return (
    <div className="animate-fadeIn w-full min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header title="My Profile" subtitle="Manage your account settings" />

      <div className="w-full px-3 xs:px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-4xl mx-auto">

        {/* Profile Header Banner */}
        <div className="bg-gradient-to-r from-tecnot-primary to-tecnot-dark dark:from-tecnot-light dark:to-tecnot-primary rounded-xl p-8 mb-6 text-white dark:text-gray-900">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative group">
              <div className="w-28 h-28 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-tecnot-primary dark:text-tecnot-light font-bold text-4xl flex-shrink-0 overflow-hidden border-4 border-white/20">
                {previewUrl ? (
                  <img src={previewUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  initials || <User className="w-12 h-12" />
                )}
              </div>
              <label className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center">
                {uploading ? <Loader2 className="w-6 h-6 text-white animate-spin" /> : <Camera className="w-6 h-6 text-white" />}
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>
            
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold">Dr. {profileData.first_name} {profileData.last_name}</h2>
              <p className="opacity-80 mt-1">{profileData.specialty || 'Doctor'}</p>
              <p className="opacity-70 text-sm mt-1">{profileData.clinic_name}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-white dark:bg-gray-800 rounded-xl p-1 border border-gray-100 dark:border-gray-700">
          {['info', 'security'].map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setSuccessMsg(''); setErrorMsg('') }}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold text-sm transition-all capitalize
                ${activeTab === tab
                  ? 'bg-tecnot-primary text-white shadow'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
            >
              {tab === 'info' ? 'Personal Info' : 'Security'}
            </button>
          ))}
        </div>

        {/* Feedback Messages */}
        {successMsg && (
          <div className="mb-4 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 text-sm">
            {successMsg}
          </div>
        )}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm">
            {errorMsg}
          </div>
        )}

        {/* Personal Info Tab */}
        {activeTab === 'info' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'First Name', key: 'first_name', icon: User },
                { label: 'Last Name', key: 'last_name', icon: User },
                { label: 'Email', key: 'email', icon: Mail, disabled: true },
                { label: 'Phone', key: 'phone', icon: Phone },
                { label: 'Specialty', key: 'specialty', icon: Stethoscope },
                { label: 'License Number', key: 'license_number', icon: User },
                { label: 'Clinic Name', key: 'clinic_name', icon: User },
              ].map(({ label, key, icon: Icon, disabled }) => (
                <div key={key}>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{label}</label>
                  <div className="relative">
                    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={profileData[key]}
                      onChange={(e) => setProfileData(prev => ({ ...prev, [key]: e.target.value }))}
                      disabled={disabled}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600
                                 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none
                                 focus:border-tecnot-primary dark:focus:border-tecnot-light transition-all
                                 ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleSaveProfile}
              disabled={saving}
              className="mt-6 px-6 py-3 rounded-lg bg-tecnot-primary text-white font-semibold hover:bg-tecnot-dark transition-all flex items-center gap-2 disabled:opacity-60"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Change Password</h3>
            <div className="space-y-4 max-w-md">
              {[
                { label: 'New Password', key: 'new_password' },
                { label: 'Confirm New Password', key: 'confirm_password' },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{label}</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      value={passwordData[key]}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, [key]: e.target.value }))}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600
                                 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none
                                 focus:border-tecnot-primary dark:focus:border-tecnot-light transition-all"
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={handleChangePassword}
                disabled={changingPassword}
                className="px-6 py-3 rounded-lg bg-tecnot-primary text-white font-semibold hover:bg-tecnot-dark transition-all flex items-center gap-2 disabled:opacity-60"
              >
                {changingPassword ? <Loader2 className="w-5 h-5 animate-spin" /> : <Lock className="w-5 h-5" />}
                {changingPassword ? 'Updating...' : 'Change Password'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
