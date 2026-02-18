import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, FileText, Loader2, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPw, setShowPw] = useState(false)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(formData)
      navigate('/', { replace: true })
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="min-h-screen flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          {/* Brand */}
          <div className="text-center mb-6">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-tecnot-primary/10 dark:bg-tecnot-light/10 flex items-center justify-center">
              <FileText className="w-7 h-7 text-tecnot-primary dark:text-tecnot-light" />
            </div>
            <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Welcome back</h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Sign in to continue to Tecnot
            </p>
          </div>

          {/* Card */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm p-6 sm:p-7">
            {error && (
              <div className="mb-4 rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-900/20 px-4 py-3">
                <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="doctor@hospital.lk"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600
                               bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                               outline-none focus:border-tecnot-primary dark:focus:border-tecnot-light
                               focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20 transition-smooth"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPw ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600
                               bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                               outline-none focus:border-tecnot-primary dark:focus:border-tecnot-light
                               focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20 transition-smooth"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-200"
                    aria-label={showPw ? 'Hide password' : 'Show password'}
                  >
                    {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Actions */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-semibold
                           bg-tecnot-primary dark:bg-tecnot-light
                           text-white dark:text-gray-900
                           hover:bg-tecnot-dark dark:hover:bg-tecnot-primary
                           transition-smooth shadow-lg flex items-center justify-center gap-2
                           disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </button>

              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Don’t have an account?{' '}
                <Link
                  to="/signup"
                  className="font-semibold text-tecnot-primary dark:text-tecnot-light hover:underline"
                >
                  Create one
                </Link>
              </p>
            </form>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-500 dark:text-gray-500 mt-6">
            © {new Date().getFullYear()} Tecnot • AI Clinical Scribe
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
