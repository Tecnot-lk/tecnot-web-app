import React, { useMemo, useState, useCallback, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../services/supabaseClient'
import {
  User,
  Mail,
  Building2,
  BadgeCheck,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  Stethoscope,
} from 'lucide-react'
import logo from '../assets/logos.png'

// ✅ Flags + all countries phone input
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

// ✅ MOVE INPUT OUTSIDE (prevents re-mount focus bug)
function TextInput({ label, icon: Icon, className = '', ...props }) {
  return (
    <div>
      <label className="block text-xs xs:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
          <Icon className="w-5 h-5" />
        </div>
        <input
          {...props}
          className={
            `w-full pl-11 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg
             bg-white dark:bg-gray-800 text-gray-900 dark:text-white
             outline-none focus:border-tecnot-primary dark:focus:border-tecnot-light
             focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
             transition-smooth text-sm xs:text-base ${className}`
          }
        />
      </div>
    </div>
  )
}

function Signup() {
  const navigate = useNavigate()
  const { signup } = useAuth()

  const [step, setStep] = useState('signup') // 'signup' | 'verify'
  const [loading, setLoading] = useState(false)
  const [verifyLoading, setVerifyLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)

  const [error, setError] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

//the specialtyOptions table connection to SuperBase
const [specialtyOptions, setSpecialtyOptions] = useState([])

useEffect(() => {
  const fetchSpecialties = async () => {
    const { data, error } = await supabase
      .from('specialtyOptions')
      .select('*')

    if (error) {
      console.error('Error fetching specialties:', error)
      return
    }

    setSpecialtyOptions(data)
  }

  fetchSpecialties()
}, [])

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '', // ✅ E.164 phone from PhoneInput
    specialty: '',
    license_number: '',
    clinic_name: '',
    password: '',
    confirm_password: '',
  })

  const [verificationCode, setVerificationCode] = useState('')

  // ✅ stable handler (also helps)
  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (form.password !== form.confirm_password) {
      setError('Passwords do not match.')
      return
    }
    if (!form.phone) {
      setError('Please enter a valid phone number.')
      return
    }

    setLoading(true)
    try {
      await signup({
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        phone: form.phone, // ✅ already includes country code
        specialty: form.specialty,
        license_number: form.license_number,
        clinic_name: form.clinic_name,
        password: form.password,
      })

      setStep('verify')
    } catch (err) {
      setError(err?.message || 'Signup failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async (e) => {
    e.preventDefault()
    setError('')

    if (!verificationCode.trim() || verificationCode.trim().length < 4) {
      setError('Please enter the verification code sent to your email.')
      return
    }

    setVerifyLoading(true)
    try {
      // TODO: call backend verify endpoint
      navigate('/login', { replace: true })
    } catch (err) {
      setError(err?.message || 'Invalid code. Please try again.')
    } finally {
      setVerifyLoading(false)
    }
  }

  const handleResend = async () => {
    setError('')
    setResendLoading(true)
    try {
      // TODO: call backend resend endpoint
    } catch (err) {
      setError(err?.message || 'Failed to resend code.')
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-10 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="w-full max-w-3xl">
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm p-5 sm:p-8">
          {/* Logo */}
          <div className="flex flex-col items-center text-center mb-6">
            <img src={logo} alt="Tecnot Logo" className="h-28 sm:h-32 w-auto object-contain mb-4" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {step === 'signup' ? 'Create your account' : 'Verify your email'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              {step === 'signup'
                ? 'Join Tecnot and start documenting smarter'
                : `We sent a verification code to ${form.email}`}
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3 rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-200 text-sm">
              {error}
            </div>
          )}

          {step === 'signup' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-4">
                  Personal Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <TextInput
                    label="First Name"
                    icon={User}
                    name="first_name"
                    value={form.first_name}
                    onChange={handleChange}
                    placeholder="Ibrahim"
                    required
                  />
                  <TextInput
                    label="Last Name"
                    icon={User}
                    name="last_name"
                    value={form.last_name}
                    onChange={handleChange}
                    placeholder="Malik"
                    required
                  />
                </div>

                <div className="mt-4">
                  <TextInput
                    label="Email Address"
                    icon={Mail}
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="dr.ibrahim@clinic.lk"
                    required
                  />
                </div>

                {/* ✅ Phone with flags */}
                <div className="mt-4">
                  <label className="block text-xs xs:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>

                  <div className="rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2
                                  focus-within:border-tecnot-primary dark:focus-within:border-tecnot-light
                                  focus-within:ring-4 focus-within:ring-tecnot-primary/20 dark:focus-within:ring-tecnot-light/20 transition-smooth">
                    <PhoneInput
                      international
                      defaultCountry="LK"
                      value={form.phone}
                      onChange={(val) => setForm((prev) => ({ ...prev, phone: val || '' }))}
                      className="tecnot-phone"
                    />
                  </div>

                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                    Example: +94 77 123 4567
                  </p>
                </div>

                {/* Specialty dropdown */}
                <div className="mt-4">
                  <label className="block text-xs xs:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Specialty
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                      <Stethoscope className="w-5 h-5" />
                    </div>
                    <select
                      name="specialty"
                      value={form.specialty}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg
                                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                 outline-none focus:border-tecnot-primary dark:focus:border-tecnot-light
                                 transition-smooth text-sm xs:text-base"
                      required
                    >
                      <option value="" disabled>Select a specialty</option>
                      {specialtyOptions.map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <TextInput
                    label="License Number"
                    icon={BadgeCheck}
                    name="license_number"
                    value={form.license_number}
                    onChange={handleChange}
                    placeholder="SL12345"
                    required
                  />
                  <TextInput
                    label="Clinic Name"
                    icon={Building2}
                    name="clinic_name"
                    value={form.clinic_name}
                    onChange={handleChange}
                    placeholder="Ibrahim Medical Center"
                    required
                  />
                </div>
              </div>

              <div>
                <h2 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-4">Security</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Password */}
                  <div>
                    <label className="block text-xs xs:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                        <Lock className="w-5 h-5" />
                      </div>
                      <input
                        name="password"
                        type={showPass ? 'text' : 'password'}
                        value={form.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                        className="w-full pl-11 pr-11 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg
                                   bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                   outline-none focus:border-tecnot-primary dark:focus:border-tecnot-light transition-smooth"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass((s) => !s)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                      >
                        {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm */}
                  <div>
                    <label className="block text-xs xs:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                        <Lock className="w-5 h-5" />
                      </div>
                      <input
                        name="confirm_password"
                        type={showConfirm ? 'text' : 'password'}
                        value={form.confirm_password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                        className="w-full pl-11 pr-11 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg
                                   bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                   outline-none focus:border-tecnot-primary dark:focus:border-tecnot-light transition-smooth"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((s) => !s)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                      >
                        {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg font-semibold bg-tecnot-primary dark:bg-tecnot-light
                           text-white dark:text-gray-900 hover:bg-tecnot-dark dark:hover:bg-tecnot-primary
                           transition-smooth shadow-lg btn-glow flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                {loading ? 'Creating account...' : 'Create account'}
              </button>

              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="text-tecnot-primary dark:text-tecnot-light font-semibold hover:underline">
                  Sign in
                </Link>
              </p>
            </form>
          )}

          {step === 'verify' && (
            <form onSubmit={handleVerify} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Verification Code
                </label>
                <input
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter code (ex: 123456)"
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none
                             focus:border-tecnot-primary dark:focus:border-tecnot-light transition-smooth"
                />
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                  Check your Gmail inbox (and spam) for the code.
                </p>
              </div>

              <button
                type="submit"
                disabled={verifyLoading}
                className="w-full py-3 rounded-lg font-semibold bg-tecnot-primary dark:bg-tecnot-light
                           text-white dark:text-gray-900 hover:bg-tecnot-dark dark:hover:bg-tecnot-primary
                           transition-smooth shadow-lg btn-glow flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {verifyLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                {verifyLoading ? 'Verifying...' : 'Verify & continue'}
              </button>

              <div className="flex items-center justify-between text-sm">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendLoading}
                  className="text-tecnot-primary dark:text-tecnot-light font-semibold hover:underline disabled:opacity-60"
                >
                  {resendLoading ? 'Resending...' : 'Resend code'}
                </button>

                <button
                  type="button"
                  onClick={() => setStep('signup')}
                  className="text-gray-600 dark:text-gray-300 hover:underline"
                >
                  Back
                </button>
              </div>
            </form>
          )}
        </div>

        <p className="text-center text-xs text-gray-500 dark:text-gray-500 mt-6">
          © {new Date().getFullYear()} Tecnot • AI Clinical Scribe
        </p>
      </div>
    </div>
  )
}

export default Signup