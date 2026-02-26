import api from './authService'

export const createPatient = async (patientData) => {
  const response = await api.post('/patients', patientData)
  return response.data
}

export const getPatients = async (params = {}) => {
  const response = await api.get('/patients', { params })
  return response.data
}

export const getPatientById = async (id) => {
  const response = await api.get(`/patients/${id}`)
  return response.data
}

export const updatePatient = async (id, patientData) => {
  const response = await api.put(`/patients/${id}`, patientData)
  return response.data
}

export const deletePatient = async (id) => {
  const response = await api.delete(`/patients/${id}`)
  return response.data
}

export const searchPatients = async (query) => {
  const response = await api.get('/patients/search', { params: { q: query } })
  return response.data
}

export const searchByComplaint = async (complaint) => {
  const response = await api.get('/patients/search/complaint', { params: { q: complaint } })
  return response.data
}