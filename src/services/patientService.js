// ✅ FULLY INTEGRATED WITH SUPABASE
import { supabase } from './supabaseClient'

// ── CREATE ──────────────────────────────────────────────────────────────────
export const createPatient = async (patientData) => {
  // Get current logged-in doctor's user id to scope patients
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  // Auto-generate MRN if not provided
  const mrn = patientData.mrn || `MRN${Date.now().toString().slice(-6)}`

  const { data, error } = await supabase
    .from('patients')
    .insert([{ ...patientData, mrn, doctor_id: user.id }])
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

// ── GET ALL (for current doctor) ─────────────────────────────────────────────
export const getPatients = async (searchQuery = '') => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  let query = supabase
    .from('patients')
    .select('*')
    .eq('doctor_id', user.id)
    .order('created_at', { ascending: false })

  if (searchQuery) {
    query = query.or(
      `first_name.ilike.%${searchQuery}%,last_name.ilike.%${searchQuery}%,mrn.ilike.%${searchQuery}%`
    )
  }

  const { data, error } = await query
  if (error) throw new Error(error.message)
  return { results: data || [], total: data?.length || 0 }
}

// ── GET BY ID ────────────────────────────────────────────────────────────────
export const getPatientById = async (id) => {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw new Error(error.message)
  return data
}

// ── GET BY MRN ───────────────────────────────────────────────────────────────
export const getPatientByMRN = async (mrn) => {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .eq('mrn', mrn)
    .single()

  if (error) throw new Error(error.message)
  return data
}

// ── UPDATE ───────────────────────────────────────────────────────────────────
export const updatePatient = async (id, updates) => {
  const { data, error } = await supabase
    .from('patients')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

// ── DELETE ───────────────────────────────────────────────────────────────────
export const deletePatient = async (id) => {
  const { error } = await supabase
    .from('patients')
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)
  return true
}

// ── SEARCH ───────────────────────────────────────────────────────────────────
export const searchPatients = async (query) => {
  const result = await getPatients(query)
  return result.results
}
