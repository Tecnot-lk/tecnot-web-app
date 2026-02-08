import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, FileText, Phone, Mail } from 'lucide-react'
import Header from '../components/Header'
import PatientBanner from '../components/PatientBanner'

function PatientDetail() {
  const { code } = useParams()

  // Dummy patient data (replace with API call)
  const patient = {
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
  }

  const sessions = [
    { id: '1', date: '2026-02-05 14:30', chief_complaint: 'Severe headache', status: 'completed' },
    { id: '2', date: '2026-01-15 10:20', chief_complaint: 'Follow-up diabetes', status: 'completed' },
    { id: '3', date: '2025-12-20 16:45', chief_complaint: 'Leg pain', status: 'completed' },
  ]

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
                        className="flex-1 flex items-center justify-center gap-2 
                                 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300
                                 px-3 xs:px-4 py-2 xs:py-2.5 rounded-lg font-medium 
                                 hover:bg-gray-50 dark:hover:bg-gray-600 transition-smooth text-xs xs:text-sm"
                      >
                        Continue Session
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientDetail