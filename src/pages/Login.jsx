import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Loader2, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import logo from '../assets/logos.png' // ✅ your big logo

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
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
      setError(err?.response?.data?.message || err?.message || 'Login failed.')
    } finally {
      setLoading(false)
    }
  }

  // ✅ Google Login Placeholder
  const handleGoogleLogin = async () => {
    setGoogleLoading(true)
    try {
      console.log("Google login clicked")
      // TODO: Connect Firebase or backend OAuth here
    } catch (err) {
      setError("Google login failed")
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="min-h-screen flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">

          {/* Card */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm p-6 sm:p-7">

            {/* ✅ BIG LOGO INSIDE CARD */}
            <div className="flex flex-col items-center text-center mb-6">
              <img
                src={logo}
                alt="Tecnot Logo"
                className="h-24 w-auto object-contain mb-4"   // 🔥 Bigger logo
              />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome back
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Sign in to continue to Tecnot
              </p>
            </div>

            {error && (
              <div className="mb-4 rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-900/20 px-4 py-3">
                <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
              </div>
            )}

            {/* ✅ CONTINUE WITH GOOGLE BUTTON */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="w-full mb-4 py-3 rounded-xl font-semibold bg-white
                         border-2 border-gray-200 hover:border-gray-300
                         flex items-center justify-center gap-3 transition-smooth
                         disabled:opacity-60"
            >
              {googleLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.15 0 5.97 1.09 8.2 2.88l6.1-6.1C34.55 2.86 29.63 1 24 1 14.63 1 6.51 6.37 2.56 14.2l7.1 5.52C11.48 13.34 17.23 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.5 24.5c0-1.6-.14-2.77-.45-4H24v7.6h12.72c-.26 2-1.67 5.01-4.8 7.03l7.37 5.7c4.3-4 7.21-9.88 7.21-16.33z"/>
                    <path fill="#FBBC05" d="M9.66 28.31c-.45-1.34-.7-2.77-.7-4.31s.25-2.97.68-4.31l-7.1-5.52C1.55 16.12 1 18.2 1 24c0 5.8.55 7.88 1.54 9.83l7.12-5.52z"/>
                    <path fill="#34A853" d="M24 47c5.63 0 10.55-1.86 14.3-5.06l-7.37-5.7c-2 1.4-4.7 2.36-6.93 2.36-6.77 0-12.52-3.84-14.36-9.22l-7.12 5.52C6.51 41.63 14.63 47 24 47z"/>
                  </svg>
                  Continue with Google
                </>
              )}
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="h-px bg-gray-300 flex-1" />
              <span className="text-xs text-gray-500">OR</span>
              <div className="h-px bg-gray-300 flex-1" />
            </div>

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
                               outline-none focus:border-tecnot-primary transition-smooth"
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
                               outline-none focus:border-tecnot-primary transition-smooth"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-semibold
                           bg-tecnot-primary text-white
                           hover:bg-tecnot-dark transition-smooth
                           shadow-lg flex items-center justify-center gap-2
                           disabled:opacity-60"
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
                <Link to="/signup" className="font-semibold text-tecnot-primary hover:underline">
                  Create one
                </Link>
              </p>
            </form>
          </div>

          <p className="text-center text-xs text-gray-500 mt-6">
            © {new Date().getFullYear()} Tecnot • AI Clinical Scribe
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login