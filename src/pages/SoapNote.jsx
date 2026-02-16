// =============================================================================
// SOAP NOTE PAGE - AI-GENERATED CLINICAL NOTE EDITOR
// =============================================================================
//
// PURPOSE:
// - Display AI-generated SOAP note from LLaMA
// - Allow doctor to edit all sections
// - Show historical SOAP notes for this patient
// - Save finalized SOAP note to backend
//
// SECTIONS:
// - S: Subjective (patient's complaint)
// - O: Objective (examination findings, vitals)
// - A: Assessment (diagnosis)
// - P: Plan (treatment plan, medications, orders)
//
// BACKEND INTEGRATION:
// - Line 85: Receive SOAP data from NewSession via navigation state
// - Line 120: handleSave() - PUT /api/sessions/:id/soap
// - Line 145: fetchHistoricalNotes() - GET /api/sessions?patient_id=X
//
// =============================================================================

import React, { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { Save, FileText, Clock, User } from 'lucide-react'
import Header from '../components/Header'
import PatientBanner from '../components/PatientBanner'

function SoapNote() {
  const { id } = useParams() // Session ID from URL
  const location = useLocation()
  const navigate = useNavigate()

  // Get data passed from NewSession page
  const { patient, vitals, transcript } = location.state || {}

  // ==========================================================================
  // STATE MANAGEMENT
  // ==========================================================================
  
  // SOAP note sections (editable)
  const [soap, setSoap] = useState({
    subjective: '',
    objective: '',
    assessment: '',
    plan: ''
  })

  // Historical SOAP notes for this patient
  const [historicalNotes, setHistoricalNotes] = useState([])
  
  // Loading/saving states
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  // ==========================================================================
  // EFFECT: INITIALIZE SOAP NOTE
  // ==========================================================================
  /**
   * On component mount, initialize SOAP note with AI-generated content
   * 
   * TODO BACKEND: 
   * - Replace dummy data with actual LLaMA-generated SOAP
   * - This should come from navigation state after AI processing
   */
  useEffect(() => {
    if (!patient) {
      // No patient data, redirect back
      navigate('/new-session')
      return
    }

    // TODO BACKEND: Get AI-generated SOAP from state
    // For now, using dummy data
    setSoap({
      subjective: `Chief Complaint: Patient ${patient.first_name} presents with general discomfort.\n\nHistory of Present Illness: Patient reports feeling unwell for the past 2 days. Denies fever, but notes mild fatigue and body aches.\n\nPast Medical History: ${patient.chronics || 'None reported'}\n\nAllergies: ${patient.allergies || 'NKDA'}`,
      
      objective: `Vitals:\n- Height: ${vitals?.height || 'N/A'} cm\n- Weight: ${vitals?.weight || 'N/A'} kg\n- Temperature: ${vitals?.temperature || 'N/A'}°C\n- Blood Pressure: ${vitals?.blood_pressure || 'N/A'}\n- Heart Rate: ${vitals?.heart_rate || 'N/A'} bpm\n- SpO2: ${vitals?.spo2 || 'N/A'}%\n\nPhysical Examination:\n- General: Alert and oriented x3, in no acute distress\n- HEENT: Normocephalic, atraumatic\n- Cardiovascular: Regular rate and rhythm, no murmurs\n- Respiratory: Clear to auscultation bilaterally\n- Abdomen: Soft, non-tender, non-distended`,
      
      assessment: `Primary Diagnosis: Viral illness, likely upper respiratory tract infection\n\nDifferential Diagnoses:\n1. Common cold\n2. Early influenza\n3. General fatigue syndrome\n\nRisk Factors:\n- Chronic conditions: ${patient.chronics || 'None'}\n- Current medications: Review needed`,
      
      plan: `Treatment Plan:\n1. Supportive care - rest and hydration\n2. Acetaminophen 500mg PO q6h PRN for body aches\n3. Adequate fluid intake\n4. Monitor temperature\n\nFollow-up:\n- Return if symptoms worsen or fever develops\n- Call if no improvement in 3-5 days\n\nPatient Education:\n- Discussed symptoms of concern\n- Advised on when to seek emergency care\n- Medication instructions reviewed\n\nOrders:\n- None at this time\n\nNext Appointment: PRN or 1 week if not improved`
    })

    // Fetch historical notes
    fetchHistoricalNotes()
  }, [patient, vitals, navigate])

  // ==========================================================================
  // FUNCTION: FETCH HISTORICAL SOAP NOTES
  // ==========================================================================
  /**
   * Fetches past SOAP notes for this patient
   * 
   * BACKEND INTEGRATION:
   * - Endpoint: GET /api/sessions?patient_id={patient.id}
   * - Expected response: Array of session objects with SOAP notes
   * - Sort by date descending (newest first)
   */
  const fetchHistoricalNotes = async () => {
    try {
      setLoading(true)
      
      // TODO BACKEND: Replace with actual API call
      // const response = await fetch(`/api/sessions?patient_id=${patient.id}`)
      // const data = await response.json()
      // setHistoricalNotes(data.results)
      
      // DUMMY DATA for now
      setHistoricalNotes([
        {
          id: '1',
          date: '2026-01-15',
          complaint: 'Follow-up consultation',
          diagnosis: 'Controlled hypertension'
        },
        {
          id: '2',
          date: '2025-12-10',
          complaint: 'Annual checkup',
          diagnosis: 'General health assessment'
        }
      ])
      
    } catch (error) {
      console.error('Error fetching historical notes:', error)
    } finally {
      setLoading(false)
    }
  }

  // ==========================================================================
  // FUNCTION: HANDLE SOAP SAVE
  // ==========================================================================
  /**
   * Saves the finalized SOAP note to backend
   * 
   * BACKEND INTEGRATION:
   * - Endpoint: PUT /api/sessions/{id}/soap
   * - Request body: { soap: object, finalized: true }
   * - Expected response: { success: true, session_id: string }
   * 
   * SUCCESS:
   * - Show success message
   * - Navigate back to patient detail page
   */
  const handleSave = async () => {
    if (!soap.subjective || !soap.objective || !soap.assessment || !soap.plan) {
      alert('Please fill in all SOAP sections before saving.')
      return
    }

    try {
      setSaving(true)

      // TODO BACKEND: Replace with actual API call
      // const response = await fetch(`/api/sessions/${id}/soap`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify({
      //     soap,
      //     finalized: true,
      //     patient_id: patient.id
      //   })
      // })
      // const data = await response.json()

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      alert('SOAP note saved successfully!')
      navigate(`/patient/${patient.mrn}`)
      
    } catch (error) {
      console.error('Error saving SOAP note:', error)
      alert('Failed to save SOAP note. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  // ==========================================================================
  // FUNCTION: UPDATE SOAP SECTION
  // ==========================================================================
  /**
   * Updates a specific section of the SOAP note
   * 
   * @param {string} section - Section name (subjective/objective/assessment/plan)
   * @param {string} value - New content for the section
   */
  const updateSection = (section, value) => {
    setSoap(prev => ({ ...prev, [section]: value }))
  }

  // ==========================================================================
  // RENDER
  // ==========================================================================
  
  // Redirect if no patient data
  if (!patient) {
    return null
  }

  return (
    <div className="animate-fadeIn w-full min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header title="SOAP Note" subtitle={`Session ID: ${id}`} />
      
      {/* Patient Banner */}
      <PatientBanner patient={patient} session={{ vitals }} />

      <div className="w-full px-3 xs:px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 max-w-[1600px] mx-auto">
          
          {/* ====================================================================
              MAIN CONTENT - SOAP NOTE EDITOR (LEFT SIDE)
              ==================================================================== */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            
            {/* Transcript Preview */}
            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 xs:p-5 sm:p-6 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-tecnot-primary dark:text-tecnot-light" />
                <h3 className="font-bold text-gray-900 dark:text-white text-sm xs:text-base">
                  Consultation Transcript
                </h3>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 xs:p-4 max-h-48 overflow-y-auto border border-gray-200 dark:border-gray-700 transition-colors">
                <pre className="whitespace-pre-wrap text-xs xs:text-sm text-gray-700 dark:text-gray-300 font-sans leading-relaxed">
                  {transcript || 'No transcript available.'}
                </pre>
              </div>
            </div>

            {/* SUBJECTIVE Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 xs:p-5 sm:p-6 transition-colors">
              <h3 className="text-base xs:text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-bold">
                  S
                </span>
                Subjective
              </h3>
              <textarea
                value={soap.subjective}
                onChange={(e) => updateSection('subjective', e.target.value)}
                rows={8}
                className="w-full px-3 xs:px-4 py-2 xs:py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg 
                         outline-none focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                         transition-all text-sm xs:text-base resize-y
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Patient's chief complaint and history..."
              />
            </div>

            {/* OBJECTIVE Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 xs:p-5 sm:p-6 transition-colors">
              <h3 className="text-base xs:text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="w-8 h-8 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center text-sm font-bold">
                  O
                </span>
                Objective
              </h3>
              <textarea
                value={soap.objective}
                onChange={(e) => updateSection('objective', e.target.value)}
                rows={10}
                className="w-full px-3 xs:px-4 py-2 xs:py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg 
                         outline-none focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                         transition-all text-sm xs:text-base resize-y
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Vitals, physical examination findings..."
              />
            </div>

            {/* ASSESSMENT Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 xs:p-5 sm:p-6 transition-colors">
              <h3 className="text-base xs:text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center text-sm font-bold">
                  A
                </span>
                Assessment
              </h3>
              <textarea
                value={soap.assessment}
                onChange={(e) => updateSection('assessment', e.target.value)}
                rows={6}
                className="w-full px-3 xs:px-4 py-2 xs:py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg 
                         outline-none focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                         transition-all text-sm xs:text-base resize-y
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Diagnosis and clinical impression..."
              />
            </div>

            {/* PLAN Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 xs:p-5 sm:p-6 transition-colors">
              <h3 className="text-base xs:text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="w-8 h-8 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center text-sm font-bold">
                  P
                </span>
                Plan
              </h3>
              <textarea
                value={soap.plan}
                onChange={(e) => updateSection('plan', e.target.value)}
                rows={10}
                className="w-full px-3 xs:px-4 py-2 xs:py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg 
                         outline-none focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                         transition-all text-sm xs:text-base resize-y
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Treatment plan, medications, follow-up..."
              />
            </div>

            {/* Save Button */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => navigate(-1)}
                className="px-4 xs:px-6 py-2 xs:py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-medium 
                         text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-smooth text-sm xs:text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 xs:px-6 py-2 xs:py-3 bg-tecnot-primary dark:bg-tecnot-light text-white dark:text-gray-900 rounded-lg font-medium 
                         hover:bg-tecnot-dark dark:hover:bg-tecnot-primary transition-smooth shadow-lg 
                         disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm xs:text-base"
              >
                <Save className="w-4 h-4 xs:w-5 xs:h-5" />
                {saving ? 'Saving...' : 'Save SOAP Note'}
              </button>
            </div>
          </div>

          {/* ====================================================================
              SIDEBAR - HISTORICAL SOAP NOTES (RIGHT SIDE)
              ==================================================================== */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 xs:p-5 sm:p-6 sticky top-4 transition-colors">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2 text-sm xs:text-base">
                <Clock className="w-5 h-5 text-tecnot-primary dark:text-tecnot-light" />
                Previous Consultations
              </h3>

              {loading ? (
                <div className="text-center py-8">
                  <div className="w-8 h-8 border-4 border-tecnot-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                </div>
              ) : historicalNotes.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
                  No previous consultations found.
                </p>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {historicalNotes.map((note) => (
                    <div
                      key={note.id}
                      className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 
                               transition-smooth cursor-pointer"
                    >
                      <div className="flex items-start gap-2 mb-2">
                        <User className="w-4 h-4 text-tecnot-primary dark:text-tecnot-light flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-900 dark:text-white">
                            {new Date(note.date).toLocaleDateString('en-GB')}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                            {note.complaint}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-500 line-clamp-2">
                        {note.diagnosis}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SoapNote