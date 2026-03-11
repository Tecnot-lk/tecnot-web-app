// =============================================================================
// PATIENT SERVICE - API CALLS
// =============================================================================
//
// This service handles all patient-related API calls
// Uses the centralized API instance from authService for authentication
//
// =============================================================================

import api from './authService'

// =============================================================================
// CREATE PATIENT
// =============================================================================
export const createPatient = async (patientData) => {
  const response = await api.post('/patients', patientData)
  return response.data
}

// =============================================================================
// GET ALL PATIENTS
// =============================================================================
export const getPatients = async (params = {}) => {
  const response = await api.get('/patients', { params })
  return response.data
}

// =============================================================================
// GET PATIENT BY ID
// =============================================================================
export const getPatientById = async (id) => {
  const response = await api.get(`/patients/${id}`)
  return response.data
}

// =============================================================================
// GET PATIENT BY MRN (Medical Record Number)
// =============================================================================
/**
 * Fetches a patient by their Medical Record Number (MRN)
 * This is used in PatientDetail.jsx when viewing patient details
 * 
 * @param {string} mrn - Patient's Medical Record Number (e.g., 'MRN001234')
 * @returns {Promise<Object>} Patient object
 */
export const getPatientByMRN = async (mrn) => {
  // Option 1: If your backend has a specific MRN endpoint
  const response = await api.get(`/patients/mrn/${mrn}`)
  return response.data
  
  // Option 2: If you need to use the regular ID endpoint, uncomment below:
  // const response = await api.get(`/patients/${mrn}`)
  // return response.data
}

// =============================================================================
// UPDATE PATIENT
// =============================================================================
/**
 * Updates patient information
 * Modified to accept either ID or MRN as the identifier
 * 
 * @param {string} identifier - Patient ID or MRN
 * @param {Object} patientData - Updated patient information
 * @returns {Promise<Object>} Updated patient object
 */
export const updatePatient = async (identifier, patientData) => {
  // If identifier looks like an MRN (starts with 'MRN'), use MRN endpoint
  if (identifier && identifier.toString().startsWith('MRN')) {
    const response = await api.put(`/patients/mrn/${identifier}`, patientData)
    return response.data
  }
  
  // Otherwise use the ID endpoint
  const response = await api.put(`/patients/${identifier}`, patientData)
  return response.data
}

// =============================================================================
// DELETE PATIENT
// =============================================================================
export const deletePatient = async (id) => {
  const response = await api.delete(`/patients/${id}`)
  return response.data
}

// =============================================================================
// SEARCH PATIENTS
// =============================================================================
export const searchPatients = async (query) => {
  const response = await api.get('/patients/search', { params: { q: query } })
  return response.data
}

// =============================================================================
// SEARCH BY COMPLAINT
// =============================================================================
export const searchByComplaint = async (complaint) => {
  const response = await api.get('/patients/search/complaint', { params: { q: complaint } })
  return response.data
}

// =============================================================================
// GET PATIENT SESSIONS (for consultation history)
// =============================================================================
/**
 * Fetches all consultation sessions for a patient
 * Used in PatientDetail.jsx to show consultation history
 * 
 * @param {string} mrn - Patient's Medical Record Number
 * @returns {Promise<Array>} Array of session objects
 */
export const getPatientSessions = async (mrn) => {
  // If your backend has a sessions endpoint for patients by MRN
  const response = await api.get(`/patients/mrn/${mrn}/sessions`)
  return response.data
  
  // Alternative if using ID:
  // const response = await api.get(`/patients/${mrn}/sessions`)
  // return response.data
}