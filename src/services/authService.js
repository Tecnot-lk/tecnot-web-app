import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('tecnot_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('tecnot_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials)
  return response.data
}

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData)
  return response.data
}

export const googleLogin = async (googleToken) => {
  const response = await api.post('/auth/google', { google_token: googleToken })
  return response.data
}

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me')
  return response.data
}

export const changePassword = async (passwordData) => {
  const response = await api.put('/auth/change-password', passwordData)
  return response.data
}

export default api