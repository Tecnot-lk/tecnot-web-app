// ✅ SIGNUP — SUPABASE INTEGRATED
import React, { useMemo, useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { User, Mail, Building2, BadgeCheck, Lock, Eye, EyeOff, Loader2, Stethoscope } from 'lucide-react'
import logo from '../assets/logos.png'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

function TextInput({ label, icon: Icon, className = '', ...props }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
          <Icon className="w-5 h-5" />
        </div>
        <input
          {...props}
          className={`w-full pl-11 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg
             bg-white dark:bg-gray-800 text-gray-900 dark:text-white
             outline-none focus:border-tecnot-primary dark:focus:border-tecnot-light
             focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
             transition-smooth text-sm ${className}`}
        />
      </div>
    </div>
  )
}

function Signup() {
  const navigate = useNavigate()
  const { signup } = useAuth()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  // After signup, Supabase sends confirmation email — show message
  const [signedUp, setSignedUp] = useState(false)

  const specialtyOptions = useMemo(() => [
    'General Physician', 'Cardiology', 'Dermatology', 'ENT',
    'Gastroenterology', 'Gynecology', 'Neurology', 'Oncology',
    'Orthopedics', 'Pediatrics', 'Psychiatry', 'Radiology', 'Surgery', 'Other',
  ], [])

  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', phone: '',
    specialty: 'General Physician', license_number: '',
    clinic_name: '', password: '', confirm_password: '',
  })

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return }
    if (form.password !== form.confirm_password) { setError('Passwords do not match.'); return }
    if (!form.phone) { setError('Please enter a valid phone number.'); return }

    setLoading(true)
    try {
      await signup({
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        phone: form.phone,
        specialty: form.specialty,
        license_number: form.license_number,
        clinic_name: form.clinic_name,
        password: form.password,
      })
      setSignedUp(true)
    } catch (err) {
      setError(err?.message || 'Signup failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // ✅ Email confirmation success screen
  if (signedUp) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 max-w-md w-full text-center">
          <img src={logo} alt="Tecnot" className="h-20 w-auto object-contain mx-auto mb-6" />
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Check your email</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We sent a confirmation link to <strong>{form.email}</strong>. Click the link to verify your account, then sign in.
          </p>
          <Link to="/login" className="block w-full py-3 rounded-xl font-semibold bg-tecnot-primary text-white hover:bg-tecnot-dark transition-all text-center">
            Go to Sign In
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-10 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="w-full max-w-3xl">
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm p-6 sm:p-8">
          <div className="flex flex-col items-center text-center mb-6">
            <img src={logo} alt="Tecnot Logo" className="h-28 w-auto object-contain mb-4" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Create your account</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Join Tecnot and start documenting smarter</p>
          </div>

          {error && (
            <div className="mb-5 p-3 rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-200 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextInput label="First Name" icon={User} name="first_name" value={form.first_name} onChange={handleChange} placeholder="Ibrahim" required />
                <TextInput label="Last Name" icon={User} name="last_name" value={form.last_name} onChange={handleChange} placeholder="Malik" required />
              </div>
              <div className="mt-4">
                <TextInput label="Email Address" icon={Mail} name="email" type="email" value={form.email} onChange={handleChange} placeholder="dr.ibrahim@clinic.lk" required />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                <div className="rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 focus-within:border-tecnot-primary dark:focus-within:border-tecnot-light transition-smooth">
                  <PhoneInput international defaultCountry="LK" value={form.phone} onChange={(val) => setForm((prev) => ({ ...prev, phone: val || '' }))} className="tecnot-phone" />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Specialty</label>
                <div className="relative">
                  <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select name="specialty" value={form.specialty} onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-tecnot-primary transition-smooth text-sm" required>
                    {specialtyOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <TextInput label="License Number" icon={BadgeCheck} name="license_number" value={form.license_number} onChange={handleChange} placeholder="SL12345" required />
                <TextInput label="Clinic Name" icon={Building2} name="clinic_name" value={form.clinic_name} onChange={handleChange} placeholder="Ibrahim Medical Center" required />
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Security</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Password', key: 'password', show: showPass, toggle: () => setShowPass(s => !s) },
                  { label: 'Confirm Password', key: 'confirm_password', show: showConfirm, toggle: () => setShowConfirm(s => !s) },
                ].map(({ label, key, show, toggle }) => (
                  <div key={key}>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{label}</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input name={key} type={show ? 'text' : 'password'} value={form[key]} onChange={handleChange} placeholder="••••••••" required
                        className="w-full pl-11 pr-11 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-tecnot-primary transition-smooth" />
                      <button type="button" onClick={toggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                        {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-lg font-semibold bg-tecnot-primary text-white hover:bg-tecnot-dark transition-smooth shadow-lg flex items-center justify-center gap-2 disabled:opacity-70">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
              {loading ? 'Creating account...' : 'Create account'}
            </button>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-tecnot-primary dark:text-tecnot-light font-semibold hover:underline">Sign in</Link>
            </p>
          </form>
        </div>
        <p className="text-center text-xs text-gray-500 dark:text-gray-500 mt-6">
          © {new Date().getFullYear()} Tecnot • AI Clinical Scribe
        </p>
      </div>
    </div>
  )
}

export default Signup
