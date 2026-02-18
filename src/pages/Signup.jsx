import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { User, Mail, Phone, Stethoscope, Building2, BadgeCheck, Lock, Eye, EyeOff, Loader2 } from 'lucide-react'

function Signup() {
  const navigate = useNavigate()
  const { signup } = useAuth()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    specialty: '',
    license_number: '',
    clinic_name: '',
    password: '',
    confirm_password: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

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
      navigate('/')
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const Input = ({ label, icon: Icon, ...props }) => (
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
          className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     outline-none focus:border-tecnot-primary dark:focus:border-tecnot-light
                     focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                     transition-smooth text-sm xs:text-base"
        />
      </div>
    </div>
  )

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-10 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-tecnot-light dark:bg-tecnot-primary/20 flex items-center justify-center mb-3">
            <BadgeCheck className="w-6 h-6 text-tecnot-primary dark:text-tecnot-light" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Create your account</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Join Tecnot and start documenting smarter</p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm p-5 sm:p-8">
          {error && (
            <div className="mb-5 p-3 rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-200 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-4">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  icon={User}
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                  placeholder="Ibrahim"
                  required
                />
                <Input
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
                <Input
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

              <div className="mt-4">
                <Input
                  label="Phone Number"
                  icon={Phone}
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+94 77 999 8888"
                  required
                />
              </div>

              <div className="mt-4">
                <Input
                  label="Specialty"
                  icon={Stethoscope}
                  name="specialty"
                  value={form.specialty}
                  onChange={handleChange}
                  placeholder="General Physician"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <Input
                  label="License Number"
                  icon={BadgeCheck}
                  name="license_number"
                  value={form.license_number}
                  onChange={handleChange}
                  placeholder="SL12345"
                  required
                />
                <Input
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

            {/* Security */}
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
                                 outline-none focus:border-tecnot-primary dark:focus:border-tecnot-light
                                 focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                                 transition-smooth text-sm xs:text-base"
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

                {/* Confirm Password */}
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
                                 outline-none focus:border-tecnot-primary dark:focus:border-tecnot-light
                                 focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                                 transition-smooth text-sm xs:text-base"
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

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold
                         bg-tecnot-primary dark:bg-tecnot-light
                         text-white dark:text-gray-900
                         hover:bg-tecnot-dark dark:hover:bg-tecnot-primary
                         transition-smooth shadow-lg btn-glow
                         flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
              {loading ? 'Creating account...' : 'Create account'}
            </button>

            {/* Footer */}
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-tecnot-primary dark:text-tecnot-light font-semibold hover:underline">
                Sign in
              </Link>
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
