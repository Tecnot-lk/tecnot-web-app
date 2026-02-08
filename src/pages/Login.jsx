import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { FileText, Mail, Lock, Loader2 } from 'lucide-react'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(formData)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-tecnot-primary to-tecnot-dark 
                    dark:from-gray-900 dark:to-gray-950 
                    flex items-center justify-center p-4 transition-colors">
      <div className="w-full max-w-md">
        
        {/* Logo & Brand */}
        <div className="text-center mb-6 xs:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 xs:w-20 xs:h-20 
                       bg-white dark:bg-gray-800 rounded-2xl shadow-lg mb-4 transition-colors">
            <FileText className="w-10 h-10 xs:w-12 xs:h-12 text-tecnot-primary dark:text-tecnot-light" />
          </div>
          <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-white mb-2">TECNOT</h1>
          <p className="text-sm xs:text-base text-tecnot-light dark:text-gray-400">AI Clinical Scribe for Doctors</p>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 xs:p-8 sm:p-10 transition-colors">
          <h2 className="text-xl xs:text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h2>
          <p className="text-sm xs:text-base text-gray-600 dark:text-gray-400 mb-6 xs:mb-8">Login to continue to your account</p>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 
                         text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-4 text-sm transition-colors">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 xs:space-y-5">
            
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="doctor@example.com"
                  required
                  className="w-full pl-11 pr-4 py-3 
                           border-2 border-gray-200 dark:border-gray-600 rounded-lg 
                           outline-none focus:border-tecnot-primary dark:focus:border-tecnot-light 
                           focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                           bg-white dark:bg-gray-700 
                           text-gray-900 dark:text-white
                           placeholder-gray-400 dark:placeholder-gray-500
                           transition-all text-sm xs:text-base"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-4 py-3 
                           border-2 border-gray-200 dark:border-gray-600 rounded-lg 
                           outline-none focus:border-tecnot-primary dark:focus:border-tecnot-light 
                           focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                           bg-white dark:bg-gray-700 
                           text-gray-900 dark:text-white
                           placeholder-gray-400 dark:placeholder-gray-500
                           transition-all text-sm xs:text-base"
                />
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-tecnot-primary dark:text-tecnot-light rounded 
                                                 border-gray-300 dark:border-gray-600 
                                                 bg-white dark:bg-gray-700" />
                <span className="text-gray-600 dark:text-gray-400">Remember me</span>
              </label>
              <Link to="#" className="text-tecnot-primary dark:text-tecnot-light hover:underline font-medium">
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-tecnot-primary dark:bg-tecnot-light 
                       text-white dark:text-gray-900 
                       py-3 xs:py-4 rounded-lg font-semibold 
                       hover:bg-tecnot-dark dark:hover:bg-tecnot-primary 
                       transition-smooth shadow-lg hover:shadow-xl 
                       active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center justify-center gap-2 text-sm xs:text-base"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6 xs:my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with</span>
            </div>
          </div>

          {/* Google Login */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 xs:py-4 
                     border-2 border-gray-200 dark:border-gray-600 rounded-lg font-medium 
                     text-gray-700 dark:text-gray-300 
                     hover:bg-gray-50 dark:hover:bg-gray-700 
                     transition-smooth active:scale-95 text-sm xs:text-base"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in with Google
          </button>

          {/* Signup Link */}
          <p className="text-center text-sm xs:text-base text-gray-600 dark:text-gray-400 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-tecnot-primary dark:text-tecnot-light hover:underline font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login