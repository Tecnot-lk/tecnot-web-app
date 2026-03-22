// FULLY INTEGRATED WITH SUPABASE
import { supabase } from './supabaseClient'

// ── CREATE SESSION ───────────────────────────────────────────────────────────
export const createSession = async (sessionData) => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('sessions')
    .insert([{ ...sessionData, doctor_id: user.id }])
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

// ── GET SESSIONS BY PATIENT ──────────────────────────────────────────────────
export const getSessionsByPatient = async (patientId) => {
  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .eq('patient_id', patientId)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data || []
}

// ── GET SESSION BY ID ────────────────────────────────────────────────────────
export const getSessionById = async (sessionId) => {
  const { data, error } = await supabase
    .from('sessions')
    .select('*, patients(*)')
    .eq('id', sessionId)
    .single()

  if (error) throw new Error(error.message)
  return data
}

// ── GET ALL SESSIONS FOR CURRENT DOCTOR ─────────────────────────────────────
export const getRecentSessions = async (limit = 10) => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('sessions')
    .select('*, patients(first_name, last_name, mrn)')
    .eq('doctor_id', user.id)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw new Error(error.message)
  return data || []
}

// ── UPDATE SESSION (e.g. save SOAP note) ────────────────────────────────────
export const updateSession = async (sessionId, updates) => {
  const { data, error } = await supabase
    .from('sessions')
    .update(updates)
    .eq('id', sessionId)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

// ── DELETE SESSION ───────────────────────────────────────────────────────────
export const deleteSession = async (sessionId) => {
  const { error } = await supabase
    .from('sessions')
    .delete()
    .eq('id', sessionId)

  if (error) throw new Error(error.message)
  return true
}

// ADD THIS NEW FUNCTION to sessionService.js

/**
 * Generate SOAP note from audio recording
 * Calls backend AI endpoint (Gemini + GPT-4o)
 */

    
  export const generateSOAPFromAudio = async (audioBlob, patientId, vitals) => {
  try {
    // Get API URL from environment variable
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'
    
    // Create FormData for file upload
    const formData = new FormData()
    formData.append('audio', audioBlob, 'recording.webm')
    formData.append('patient_id', patientId)
    formData.append('vitals', JSON.stringify(vitals))
    
    // Call backend API
    const response = await fetch(`${API_URL}/sessions/generate-soap`, {
      method: 'POST',
      body: formData
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to generate SOAP note')
    }
    
    const data = await response.json()
    return data
    
  } catch (error) {
    console.error('Error generating SOAP:', error)
    throw error
  }
}