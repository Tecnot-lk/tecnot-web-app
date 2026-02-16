import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, FileText, Phone, Mail, Loader2, Download } from 'lucide-react'
import Header from '../components/Header'
import PatientBanner from '../components/PatientBanner'
import * as patientService from '../services/patientService'

function PatientDetail() {
  const { code } = useParams() // This is the MRN from the URL
  const [patient, setPatient] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sessions, setSessions] = useState([])

  useEffect(() => {
    fetchPatientData()
  }, [code])

  const fetchPatientData = async () => {
    try {
      setLoading(true)
      // Try to fetch patient from API using the MRN
      const data = await patientService.getPatientByMRN(code)
      setPatient(data)
      
      // Fetch sessions for this patient
      // const sessionsData = await patientService.getPatientSessions(code)
      // setSessions(sessionsData)
      
    } catch (error) {
      console.error('Error fetching patient:', error)
      
      // Patient-specific dummy sessions - CORRECTED MAPPING
      const dummySessions = {
        'MRN001234': [ // Malik Fernando
          { id: 'malik-1', date: '2026-02-05 14:30', chief_complaint: 'Severe headache', status: 'completed' },
          { id: 'malik-2', date: '2026-01-15 10:20', chief_complaint: 'Follow-up diabetes', status: 'completed' },
          { id: 'malik-3', date: '2025-12-20 16:45', chief_complaint: 'Leg pain', status: 'completed' },
        ],
        'MRN005678': [ // Shiman Perera
          { id: 'shiman-1', date: '2026-02-03 09:15', chief_complaint: 'Annual health checkup', status: 'completed' },
          { id: 'shiman-2', date: '2026-01-20 14:00', chief_complaint: 'Flu symptoms', status: 'completed' },
          { id: 'shiman-3', date: '2025-12-15 11:30', chief_complaint: 'Vaccination', status: 'completed' },
        ],
        'MRN009012': [ // Shimani Khan
          { id: 'shimani-1', date: '2026-02-01 16:00', chief_complaint: 'High blood pressure follow-up', status: 'completed' },
          { id: 'shimani-2', date: '2026-01-10 10:45', chief_complaint: 'Chest pain', status: 'completed' },
          { id: 'shimani-3', date: '2025-12-05 13:20', chief_complaint: 'Medication adjustment', status: 'completed' },
        ]
      }
      
      // Set sessions based on current patient's MRN
      setSessions(dummySessions[code] || [])
      
      // Using dummy data based on MRN
      const dummyPatients = {
        'MRN001234': {
          id: '1',
          mrn: 'MRN001234',
          first_name: 'Malik',
          last_name: 'Fernando',
          age: 38,
          gender: 'Male',
          blood_type: 'O+',
          chronics: 'Diabetes Type 2',
          allergies: 'Penicillin',
          drug_precautions: 'Avoid NSAIDs',
          national_id: '851234567V',
          mobile_number: '+94 77 123 4567',
          email: 'malik@example.com',
          nationality: 'Sri Lankan',
          preferred_language: 'Sinhala'
        },
        'MRN005678': {
          id: '2',
          mrn: 'MRN005678',
          first_name: 'Shiman',
          last_name: 'Perera',
          age: 35,
          gender: 'Male',
          blood_type: 'A+',
          chronics: 'None',
          allergies: 'None',
          drug_precautions: 'None',
          national_id: '901234567V',
          mobile_number: '+94 71 234 5678',
          email: 'shiman@example.com',
          nationality: 'Sri Lankan',
          preferred_language: 'English'
        },
        'MRN009012': {
          id: '3',
          mrn: 'MRN009012',
          first_name: 'Shimani',
          last_name: 'Khan',
          age: 42,
          gender: 'Female',
          blood_type: 'B+',
          chronics: 'Hypertension',
          allergies: 'Sulfa drugs',
          drug_precautions: 'Monitor blood pressure',
          national_id: '821234567V',
          mobile_number: '+94 76 345 6789',
          email: 'shimanikhan@example.com',
          nationality: 'Sri Lankan',
          preferred_language: 'Tamil'
        }
      }
      
      setPatient(dummyPatients[code] || dummyPatients['MRN001234'])
    } finally {
      setLoading(false)
    }
  }

  const handleShareAsPDF = (sessionId, chiefComplaint) => {
    console.log('Generating PDF for session:', sessionId)
    alert(`Generating PDF for: ${chiefComplaint}\n\nThis will create and download the SOAP note as a PDF file.`)
    // TODO: Implement actual PDF generation
    // You can use libraries like jsPDF or html2pdf.js
  }

  if (loading) {
    return (
      <div className="animate-fadeIn w-full min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header title="Patient Details" subtitle="Loading..." />
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-tecnot-primary dark:text-tecnot-light" />
        </div>
      </div>
    )
  }

  if (!patient) {
    return (
      <div className="animate-fadeIn w-full min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header title="Patient Details" subtitle="Not Found" />
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4">Patient not found</p>
          <Link
            to="/patients"
            className="inline-flex items-center gap-2 text-tecnot-primary dark:text-tecnot-light hover:text-tecnot-dark dark:hover:text-tecnot-primary"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Patients
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fadeIn w-full min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header title="Patient Details" subtitle={`${patient.first_name} ${patient.last_name}`} />
      
      {/* Patient Banner */}
      <PatientBanner patient={patient} />

      <div className="w-full px-3 xs:px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-[1600px] mx-auto">
        
        {/* Back Button */}
        <Link
          to="/patients"
          className="inline-flex items-center gap-2 text-tecnot-primary dark:text-tecnot-light hover:text-tecnot-dark dark:hover:text-tecnot-primary
                   transition-smooth mb-4 sm:mb-6 text-sm xs:text-base"
        >
          <ArrowLeft className="w-4 h-4 xs:w-5 xs:h-5" />
          Back to Patients
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          
          {/* LEFT: Patient Info + Actions */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            
            {/* Patient Info Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 xs:p-5 sm:p-6 transition-colors">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-base xs:text-lg">Patient Information</h3>
              
              <div className="space-y-3 text-xs xs:text-sm">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-600 dark:text-gray-400">Mobile</p>
                    <p className="font-medium text-gray-900 dark:text-white truncate">{patient.mobile_number}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-600 dark:text-gray-400">Email</p>
                    <p className="font-medium text-gray-900 dark:text-white truncate">{patient.email}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Nationality</p>
                  <p className="font-medium text-gray-900 dark:text-white">{patient.nationality}</p>
                </div>

                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Preferred Language</p>
                  <p className="font-medium text-gray-900 dark:text-white">{patient.preferred_language}</p>
                </div>

                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">National ID</p>
                  <p className="font-medium text-gray-900 dark:text-white">{patient.national_id}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Link
                to="/new-session"
                className="w-full flex items-center justify-center gap-2 bg-tecnot-primary dark:bg-tecnot-light
                         text-white dark:text-gray-900 px-4 xs:px-6 py-3 xs:py-4 rounded-lg font-medium 
                         hover:bg-tecnot-dark dark:hover:bg-tecnot-primary transition-smooth shadow-lg text-sm xs:text-base"
              >
                <Calendar className="w-5 h-5" />
                Start New Session
              </Link>

              <button
                className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-800
                         border-2 border-tecnot-primary dark:border-tecnot-light text-tecnot-primary dark:text-tecnot-light
                         px-4 xs:px-6 py-3 xs:py-4 rounded-lg font-medium 
                         hover:bg-tecnot-light dark:hover:bg-gray-700 transition-smooth text-sm xs:text-base"
              >
                Edit Patient Info
              </button>
            </div>
          </div>

          {/* RIGHT: Consultation History */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 xs:p-5 sm:p-6 transition-colors">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-base xs:text-lg sm:text-xl">
                Consultation History ({sessions.length} sessions)
              </h3>

              {sessions.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-500 dark:text-gray-400 text-sm">No consultation history yet</p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {sessions.map((session) => (
                    <div
                      key={session.id}
                      className="border border-gray-200 dark:border-gray-600 rounded-lg p-3 xs:p-4 sm:p-5 
                               hover:border-tecnot-primary dark:hover:border-tecnot-light transition-all duration-200
                               hover:shadow-md"
                    >
                      <div className="flex flex-col xs:flex-row xs:items-start xs:justify-between gap-3 mb-3">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm xs:text-base truncate">
                            {session.chief_complaint}
                          </h4>
                          <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400">
                            {new Date(session.date).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <span className="inline-flex items-center px-2.5 xs:px-3 py-1 rounded-full 
                                       text-[10px] xs:text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400
                                       self-start xs:self-auto">
                          {session.status}
                        </span>
                      </div>

                      <div className="flex flex-col xs:flex-row gap-2 xs:gap-3">
                        <Link
                          to={`/soap-note/${session.id}`}
                          className="flex-1 flex items-center justify-center gap-2 
                                   bg-tecnot-primary dark:bg-tecnot-light text-white dark:text-gray-900 px-3 xs:px-4 py-2 xs:py-2.5 
                                   rounded-lg font-medium hover:bg-tecnot-dark dark:hover:bg-tecnot-primary
                                   transition-smooth text-xs xs:text-sm"
                        >
                          <FileText className="w-4 h-4" />
                          View SOAP Note
                        </Link>
                        <button
                          onClick={() => handleShareAsPDF(session.id, session.chief_complaint)}
                          className="flex-1 flex items-center justify-center gap-2 
                                   bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300
                                   px-3 xs:px-4 py-2 xs:py-2.5 rounded-lg font-medium 
                                   hover:bg-gray-50 dark:hover:bg-gray-600 transition-smooth text-xs xs:text-sm"
                        >
                          <Download className="w-4 h-4" />
                          Share as PDF
                        </button>
                      </div>
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