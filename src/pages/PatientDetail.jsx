// =============================================================================
// PATIENT DETAIL PAGE
// =============================================================================
//
// PURPOSE:
// - Display detailed patient information
// - Show consultation history
// - Quick access to start new session
// - View past SOAP notes
//
// BACKEND INTEGRATION:
// - Line 45: fetchPatientData() - GET /api/patients/:mrn
// - Line 70: fetchPatientSessions() - GET /api/sessions?patient_id=X
//
// =============================================================================

import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Calendar, FileText, User, Phone, Mail, MapPin, Loader2, Plus } from 'lucide-react'
import Header from '../components/Header'

function PatientDetail() {
  const { mrn } = useParams() // Get MRN from URL
  const navigate = useNavigate()

  // ==========================================================================
  // STATE MANAGEMENT
  // ==========================================================================
  
  const [patient, setPatient] = useState(null)
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)

  // ==========================================================================
  // EFFECT: FETCH PATIENT DATA ON MOUNT
  // ==========================================================================
  useEffect(() => {
    fetchPatientData()
    fetchPatientSessions()
  }, [mrn])

  // ==========================================================================
  // FUNCTION: FETCH PATIENT DATA
  // ==========================================================================
  /**
   * Fetches patient details by MRN
   * 
   * BACKEND INTEGRATION:
   * - Endpoint: GET /api/patients/:mrn
   * - Expected response: Patient object with all details
   */
  const fetchPatientData = async () => {
    try {
      setLoading(true)

      // TODO BACKEND: Replace with actual API call
      // const response = await fetch(`/api/patients/${mrn}`)
      // const data = await response.json()
      // setPatient(data)

      // DUMMY DATA for now
      setPatient({
        id: '1',
        mrn: mrn,
        first_name: 'Malik',
        last_name: 'Fernando',
        age: 38,
        gender: 'Male',
        date_of_birth: '1985-03-15',
        nationality: 'Sri Lankan',
        national_id: '851234567V',
        mobile_number: '+94771234567',
        email: 'malik@example.com',
        preferred_language: 'Sinhala',
        blood_type: 'O+',
        chronics: 'Diabetes Type 2',
        allergies: 'Penicillin',
        drug_precautions: 'Avoid NSAIDs'
      })

    } catch (error) {
      console.error('Error fetching patient:', error)
      alert('Failed to load patient details.')
    } finally {
      setLoading(false)
    }
  }

  // ==========================================================================
  // FUNCTION: FETCH PATIENT SESSIONS
  // ==========================================================================
  /**
   * Fetches consultation history for this patient
   * 
   * BACKEND INTEGRATION:
   * - Endpoint: GET /api/sessions?patient_id={patient.id}
   * - Expected response: Array of session objects sorted by date
   */
  const fetchPatientSessions = async () => {
    try {
      // TODO BACKEND: Replace with actual API call
      // const response = await fetch(`/api/sessions?patient_id=${patient.id}`)
      // const data = await response.json()
      // setSessions(data.results)

      // DUMMY DATA
      setSessions([
        {
          id: '1',
          date: '2026-02-10T10:30:00',
          complaint: 'General checkup',
          diagnosis: 'Routine examination - All normal'
        },
        {
          id: '2',
          date: '2026-01-15T14:00:00',
          complaint: 'Follow-up for diabetes',
          diagnosis: 'Blood sugar levels stable'
        },
        {
          id: '3',
          date: '2025-12-05T09:15:00',
          complaint: 'Cold and flu symptoms',
          diagnosis: 'Viral upper respiratory infection'
        }
      ])

    } catch (error) {
      console.error('Error fetching sessions:', error)
    }
  }

  // ==========================================================================
  // RENDER
  // ==========================================================================

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <Loader2 className="w-8 h-8 animate-spin text-tecnot-primary dark:text-tecnot-light" />
      </div>
    )
  }

  if (!patient) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">Patient not found</p>
          <button
            onClick={() => navigate('/patients')}
            className="text-tecnot-primary dark:text-tecnot-light hover:underline font-semibold"
          >
            Back to Patients
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fadeIn w-full min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header 
        title={`${patient.first_name} ${patient.last_name}`} 
        subtitle={`MRN: ${patient.mrn}`} 
      />

      <div className="w-full px-3 xs:px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          
          {/* ====================================================================
              LEFT COLUMN - PATIENT INFORMATION
              ==================================================================== */}
          <div className="lg:col-span-1 space-y-4">
            
            {/* Patient Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 xs:p-5 sm:p-6 transition-colors">
              
              {/* Avatar */}
              <div className="flex justify-center mb-4">
                <div className={`w-20 h-20 xs:w-24 xs:h-24 rounded-full flex items-center justify-center text-white font-bold text-3xl xs:text-4xl
                              ${patient.gender === 'Male' ? 'bg-blue-500' : patient.gender === 'Female' ? 'bg-pink-500' : 'bg-gray-500'}`}>
                  {patient.first_name?.charAt(0)}
                </div>
              </div>

              {/* Name */}
              <h2 className="text-xl xs:text-2xl font-bold text-gray-900 dark:text-white text-center mb-1">
                {patient.first_name} {patient.last_name}
              </h2>
              <p className="text-sm xs:text-base text-gray-600 dark:text-gray-400 text-center mb-4">
                {patient.age}Y • {patient.gender}
              </p>

              {/* Quick Info */}
              <div className="space-y-3 text-sm xs:text-base">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 xs:w-5 xs:h-5 text-tecnot-primary dark:text-tecnot-light flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{patient.mobile_number}</span>
                </div>
                {patient.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 xs:w-5 xs:h-5 text-tecnot-primary dark:text-tecnot-light flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 truncate">{patient.email}</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 xs:w-5 xs:h-5 text-tecnot-primary dark:text-tecnot-light flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{patient.nationality}</span>
                </div>
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 xs:w-5 xs:h-5 text-tecnot-primary dark:text-tecnot-light flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{patient.national_id}</span>
                </div>
              </div>

              {/* Start Session Button */}
              <Link
                to="/new-session"
                state={{ selectedPatient: patient }}
                className="mt-6 w-full flex items-center justify-center gap-2 bg-tecnot-primary dark:bg-tecnot-light text-white dark:text-gray-900 
                         px-4 py-3 rounded-lg font-medium hover:bg-tecnot-dark dark:hover:bg-tecnot-primary transition-smooth shadow-lg text-sm xs:text-base"
              >
                <Plus className="w-4 h-4 xs:w-5 xs:h-5" />
                Start New Session
              </Link>
            </div>

            {/* Medical Info Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 xs:p-5 sm:p-6 transition-colors">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-sm xs:text-base">
                Medical Information
              </h3>
              
              <div className="space-y-3 text-xs xs:text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Blood Type</p>
                  <p className="font-semibold text-red-600 dark:text-red-400">{patient.blood_type || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Chronic Conditions</p>
                  <p className="font-semibold text-orange-600 dark:text-orange-400">{patient.chronics || 'None'}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Allergies</p>
                  <p className="font-semibold text-red-600 dark:text-red-400">{patient.allergies || 'None'}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Drug Precautions</p>
                  <p className="font-semibold text-purple-600 dark:text-purple-400">{patient.drug_precautions || 'None'}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Preferred Language</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{patient.preferred_language}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ====================================================================
              RIGHT COLUMN - CONSULTATION HISTORY
              ==================================================================== */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 xs:p-5 sm:p-6 transition-colors">
              <h3 className="text-base xs:text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 xs:w-6 xs:h-6 text-tecnot-primary dark:text-tecnot-light" />
                Consultation History
              </h3>

              {sessions.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 xs:w-16 xs:h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 text-sm xs:text-base">
                    No consultation records found.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 xs:space-y-4">
                  {sessions.map((session) => (
                    <div
                      key={session.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 xs:p-4 
                               hover:bg-gray-50 dark:hover:bg-gray-700 transition-smooth cursor-pointer"
                      onClick={() => navigate(`/soap-note/${session.id}`)}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 dark:text-white text-sm xs:text-base truncate">
                            {session.complaint}
                          </p>
                          <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400">
                            {new Date(session.date).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            })}
                            {' at '}
                            {new Date(session.date).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <FileText className="w-5 h-5 text-tecnot-primary dark:text-tecnot-light flex-shrink-0" />
                      </div>
                      <p className="text-xs xs:text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                        <span className="font-medium">Diagnosis:</span> {session.diagnosis}
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

export default PatientDetail