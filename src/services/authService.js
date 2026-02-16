// =============================================================================
// AUTHENTICATION SERVICE
// =============================================================================
//
// PURPOSE:
// - Handle all authentication-related API calls
// - Centralize axios configuration
// - Add token to all requests automatically
// - Handle token expiry (401 errors)
//
// BACKEND ENDPOINTS REQUIRED:
// - POST /api/auth/login
// - POST /api/auth/register
// - POST /api/auth/google
// - GET /api/auth/me
// - PUT /api/auth/change-password
//
// =============================================================================

import axios from 'axios'

// =============================================================================
// AXIOS CONFIGURATION
// =============================================================================

// Get API base URL from environment variable
// Development: http://localhost:8000/api/v1
// Production: https://api.tecnot.lk/api/v1
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// =============================================================================
// REQUEST INTERCEPTOR
// =============================================================================
/**
 * Automatically adds JWT token to every request
 * 
 * HOW IT WORKS:
 * 1. Before each request, this function runs
 * 2. Gets token from localStorage
 * 3. If token exists, adds it to Authorization header
 * 4. Request proceeds to backend with token
 * 
 * BACKEND RECEIVES:
 * Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 */
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('tecnot_token')
    
    // If token exists, add to header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// =============================================================================
// RESPONSE INTERCEPTOR
// =============================================================================
/**
 * Handles token expiry automatically
 * 
 * HOW IT WORKS:
 * 1. After each response, this function runs
 * 2. If status is 401 (Unauthorized), token has expired
 * 3. Clear token from storage
 * 4. Redirect user to login page
 * 
 * WHY THIS IS IMPORTANT:
 * - Prevents user from using app with expired token
 * - Improves security
 * - Better user experience (auto-redirect vs error message)
 */
api.interceptors.response.use(
  (response) => response, // If successful, just return response
  (error) => {
    // Check if error is 401 (Unauthorized)
    if (error.response?.status === 401) {
      // Token is invalid/expired
      localStorage.removeItem('tecnot_token')
      
      // Redirect to login
      window.location.href = '/login'
    }
    
    return Promise.reject(error)
  }
)

// =============================================================================
// API FUNCTIONS
// =============================================================================

/**
 * LOGIN - Authenticate user with email and password
 * 
 * @param {Object} credentials - { email: string, password: string }
 * @returns {Promise<Object>} - { access_token: string, user: object }
 * 
 * BACKEND ENDPOINT: POST /api/auth/login
 * 
 * REQUEST BODY:
 * {
 *   "email": "doctor@example.com",
 *   "password": "password123"
 * }
 * 
 * EXPECTED RESPONSE:
 * {
 *   "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
 *   "token_type": "bearer",
 *   "user": {
 *     "id": "123",
 *     "email": "doctor@example.com",
 *     "first_name": "John",
 *     "last_name": "Doe",
 *     "specialty": "General Physician"
 *   }
 * }
 */
export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials)
  return response.data
}

/**
 * REGISTER - Create new user account
 * 
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} - { access_token: string, user: object }
 * 
 * BACKEND ENDPOINT: POST /api/auth/register
 * 
 * REQUEST BODY:
 * {
 *   "email": "newdoctor@example.com",
 *   "password": "password123",
 *   "first_name": "John",
 *   "last_name": "Doe",
 *   "specialty": "General Physician",
 *   "license_number": "SL12345",
 *   "clinic_name": "City Medical Center"
 * }
 * 
 * EXPECTED RESPONSE: Same as login
 */
export const register = async (userData) => {
  const response = await api.post('/auth/register', userData)
  return response.data
}

/**
 * GOOGLE LOGIN - Authenticate with Google OAuth
 * 
 * @param {string} googleToken - Token from Google OAuth
 * @returns {Promise<Object>} - { access_token: string, user: object }
 * 
 * BACKEND ENDPOINT: POST /api/auth/google
 * 
 * REQUEST BODY:
 * {
 *   "google_token": "ya29.a0AfH6SMBx..."
 * }
 * 
 * HOW IT WORKS:
 * 1. Frontend gets token from Google
 * 2. Sends to our backend
 * 3. Backend verifies with Google
 * 4. Backend creates/finds user in our database
 * 5. Backend returns our JWT token
 */
export const googleLogin = async (googleToken) => {
  const response = await api.post('/auth/google', { google_token: googleToken })
  return response.data
}

/**
 * GET CURRENT USER - Verify token and get user data
 * 
 * @returns {Promise<Object>} - User object
 * 
 * BACKEND ENDPOINT: GET /api/auth/me
 * 
 * HOW IT WORKS:
 * - Token is automatically added by request interceptor
 * - Backend verifies token and returns user data
 * 
 * EXPECTED RESPONSE:
 * {
 *   "id": "123",
 *   "email": "doctor@example.com",
 *   "first_name": "John",
 *   "last_name": "Doe",
 *   "specialty": "General Physician"
 * }
 */
export const getCurrentUser = async () => {
  const response = await api.get('/auth/me')
  return response.data
}

/**
 * CHANGE PASSWORD - Update user password
 * 
 * @param {Object} passwordData - Password change data
 * @returns {Promise<Object>} - Success message
 * 
 * BACKEND ENDPOINT: PUT /api/auth/change-password
 * 
 * REQUEST BODY:
 * {
 *   "current_password": "oldpassword123",
 *   "new_password": "newpassword456"
 * }
 * 
 * EXPECTED RESPONSE:
 * {
 *   "message": "Password updated successfully"
 * }
 */
export const changePassword = async (passwordData) => {
  const response = await api.put('/auth/change-password', passwordData)
  return response.data
}

// Export axios instance for use in other services
export default api