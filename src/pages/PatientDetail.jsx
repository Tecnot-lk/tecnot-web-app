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
    mrn: code,
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
    drug_precautions: 'Avoid NSAIDs',
    is_active: true
  }

  const sessions = [
    { id: '1', date: '2026-02-05', time: '14:30', complaint: 'Severe headache', status: 'Completed' },
    { id: '2', date: '2026-01-25', time: '10:15', complaint: 'Fever', status: 'Completed' },
    { id: '3', date: '2026-01-10', time: '16:45', complaint: 'Stomach pain', status: 'Completed' },
  ]

  return (
    <div className="animate-fadeIn w-full">
      <Header title="Patient Details" subtitle={`MRN: ${code}`} />
      
      {/* Patient Banner */}
      <PatientBanner patient={patient} />
      
      <div className="w-full px-3 xs:px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-[1600px] mx-auto">
        
        {/* Back Button */}
        <Link 
          to="/patients"
          className="inline-flex items-center gap-2 text-tecnot-primary hover:text-tecnot-dark 
                   transition-smooth mb-4 sm:mb-6 text-sm xs:text-base"
        >
          <ArrowLeft className="w-4 h-4 xs:w-5 xs:h-5" />
          Back to Patients
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Left: Patient Info Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 
                         p-4 xs:p-5 sm:p-6 space-y-4">
              <h2 className="text-lg xs:text-xl font-bold text-gray-900 mb-4">Patient Information</h2>
              
              <div className="space-y-3 text-xs xs:text-sm">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 xs:w-5 xs:h-5 text-gray-400" />
                  <div>
                    <p className="text-gray-600">Mobile</p>
                    <p className="font-medium text-gray-900">{patient.mobile_number}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 xs:w-5 xs:h-5 text-gray-400" />
                  <div>
                    <p className="text-gray-600">Email</p>
                    <p className="font-medium text-gray-900 break-all">{patient.email}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-gray-600">Date of Birth</p>
                      <p className="font-medium text-gray-900">{patient.date_of_birth}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Nationality</p>
                      <p className="font-medium text-gray-900">{patient.nationality}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <p className="text-gray-600 mb-1">National ID</p>
                  <p className="font-medium text-gray-900">{patient.national_id}</p>
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <p className="text-gray-600 mb-1">Preferred Language</p>
                  <p className="font-medium text-gray-900">{patient.preferred_language}</p>
                </div>
              </div>

              <Link
                to="/new-session"
                state={{ patient }}
                className="w-full flex items-center justify-center gap-2 bg-tecnot-primary 
                         text-white px-4 py-3 rounded-lg font-medium hover:bg-tecnot-dark 
                         transition-smooth shadow-lg mt-6 text-sm xs:text-base"
              >
                <Calendar className="w-5 h-5" />
                Start New Session
              </Link>
            </div>
          </div>

          {/* Right: Consultation History */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 
                         p-4 xs:p-5 sm:p-6">
              <h2 className="text-lg xs:text-xl font-bold text-gray-900 mb-4">
                Consultation History ({sessions.length})
              </h2>

              <div className="space-y-3 sm:space-y-4">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className="border border-gray-200 rounded-lg p-3 xs:p-4 
                             hover:border-tecnot-primary transition-smooth"
                  >
                    <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2 mb-2">
                          <FileText className="w-4 h-4 xs:w-5 xs:h-5 text-tecnot-primary mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <h3 className="font-bold text-gray-900 text-sm xs:text-base truncate">
                              {session.complaint}
                            </h3>
                            <p className="text-xs xs:text-sm text-gray-600">
                              {new Date(session.date).toLocaleDateString('en-GB', { 
                                day: '2-digit', 
                                month: 'short', 
                                year: 'numeric' 
                              })} • {session.time}
                            </p>
                          </div>
                        </div>
                        <span className="inline-block px-2 py-1 bg-green-100 text-green-700 
                                      rounded text-xs font-medium">
                          {session.status}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <Link
                          to={`/soap-note/${session.id}`}
                          className="flex-1 xs:flex-initial px-3 xs:px-4 py-2 bg-tecnot-primary 
                                   text-white rounded-lg text-xs xs:text-sm font-medium 
                                   hover:bg-tecnot-dark transition-smooth text-center"
                        >
                          View SOAP
                        </Link>
                        <button
                          className="flex-1 xs:flex-initial px-3 xs:px-4 py-2 border-2 border-tecnot-primary 
                                   text-tecnot-primary rounded-lg text-xs xs:text-sm font-medium 
                                   hover:bg-tecnot-light transition-smooth"
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {sessions.length === 0 && (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 xs:w-16 xs:h-16 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm xs:text-base">No consultations yet</p>
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