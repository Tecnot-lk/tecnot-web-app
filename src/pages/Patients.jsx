// =============================================================================
// PATIENTS PAGE - PATIENT LIST & SEARCH
// =============================================================================

import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, User, Plus, Loader2, CheckCircle2, X } from 'lucide-react'
import Header from '../components/Header'
import AddPatientModal from '../components/AddPatientModal'
import 'react-datepicker/dist/react-datepicker.css'
import * as patientService from '../services/patientService'

// =============================================================================
// TOAST COMPONENT — bottom banner, auto-dismisses after 5s, clickable
// =============================================================================
function PatientToast({ patient, onClose, onNavigate }) {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(100)
  const timerRef = useRef(null)
  const intervalRef = useRef(null)

  useEffect(() => {
    // Shrink progress bar over 5 seconds
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p <= 0) return 0
        return p - 1
      })
    }, 50) // 50ms × 100 steps = 5000ms

    // Auto-dismiss after 5s
    timerRef.current = setTimeout(() => {
      setVisible(false)
      setTimeout(onClose, 300) // wait for fade-out
    }, 5000)

    return () => {
      clearInterval(intervalRef.current)
      clearTimeout(timerRef.current)
    }
  }, [onClose])

  const handleClick = () => {
    clearInterval(intervalRef.current)
    clearTimeout(timerRef.current)
    setVisible(false)
    setTimeout(() => {
      onClose()
      onNavigate()
    }, 200)
  }

  const handleDismiss = (e) => {
    e.stopPropagation()
    clearInterval(intervalRef.current)
    clearTimeout(timerRef.current)
    setVisible(false)
    setTimeout(onClose, 300)
  }

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90vw] max-w-md
                  transition-all duration-300
                  ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <div
        onClick={handleClick}
        className="relative overflow-hidden cursor-pointer
                   bg-white dark:bg-gray-800
                   border border-gray-200 dark:border-gray-600
                   rounded-2xl shadow-2xl shadow-black/10"
      >
        {/* Main content */}
        <div className="flex items-center gap-3 px-4 py-3.5">
          {/* Green check icon */}
          <div className="flex-shrink-0 w-9 h-9 rounded-full bg-green-100 dark:bg-green-900/30
                          flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">
              Patient added successfully
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
              <span className="font-medium text-tecnot-primary dark:text-tecnot-light">
                {patient.first_name} {patient.last_name}
              </span>
              {' '}· MRN: {patient.mrn} · Tap to view
            </p>
          </div>

          {/* Dismiss */}
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-1 rounded-md text-gray-400
                       hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress bar — shrinks left to right over 5s */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-100 dark:bg-gray-700">
          <div
            className="h-full bg-tecnot-primary dark:bg-tecnot-light transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}

// =============================================================================
// PATIENTS PAGE
// =============================================================================
function Patients() {
  const navigate = useNavigate()

  const [patients, setPatients]       = useState([])
  const [loading, setLoading]         = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  // Toast state — holds the newly created patient object or null
  const [toastPatient, setToastPatient] = useState(null)

  useEffect(() => {
    fetchPatients()
  }, [])

  const fetchPatients = async () => {
    try {
      setLoading(true)
      const data = await patientService.getPatients()
      setPatients(data.results || [])
    } catch (error) {
      console.error('Error fetching patients:', error)
      setPatients([])
    } finally {
      setLoading(false)
    }
  }

  // Called by AddPatientModal onSuccess — receives the full created patient object
  const handlePatientAdded = (createdPatient) => {
    fetchPatients()           // refresh the list
    setShowAddModal(false)    // close modal
    setToastPatient(createdPatient) // show toast
  }

  const filteredPatients = patients.filter((patient) => {
    const query = searchQuery.toLowerCase()
    return (
      patient.first_name?.toLowerCase().includes(query) ||
      patient.last_name?.toLowerCase().includes(query) ||
      patient.mrn?.toLowerCase().includes(query) ||
      patient.mobile_number?.includes(query) ||
      patient.national_id?.toLowerCase().includes(query)
    )
  })

  return (
    <div className="animate-fadeIn w-full min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header title="Patient Records" subtitle="Manage your patients" />

      <div className="w-full px-3 xs:px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-[1600px] mx-auto">

        {/* Search Bar + Add Button */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search patients by name, MRN, or mobile number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none
                         focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                         transition-all text-sm xs:text-base
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                         placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 bg-tecnot-primary dark:bg-tecnot-light text-white dark:text-gray-900
                       px-4 xs:px-6 py-3 rounded-lg font-medium hover:bg-tecnot-dark dark:hover:bg-tecnot-primary
                       transition-smooth shadow-lg text-sm xs:text-base whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            Add Patient
          </button>
        </div>

        {/* Patient Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-tecnot-primary dark:text-tecnot-light" />
          </div>
        ) : filteredPatients.length === 0 ? (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-sm xs:text-base">
              {searchQuery
                ? 'No patients found matching your search.'
                : 'No patients yet. Add your first patient to get started.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {filteredPatients.map((patient) => (
              <Link
                key={patient.id}
                to={`/patient/${patient.mrn}`}
                className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 xs:p-5 sm:p-6 shadow-sm
                           border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200
                           card-hover"
              >
                <div className="flex items-start gap-3 xs:gap-4 mb-3">
                  <div className={`w-12 h-12 xs:w-14 xs:h-14 rounded-full flex items-center justify-center
                                   text-white font-bold text-lg xs:text-xl flex-shrink-0
                                   ${patient.gender === 'Female' ? 'bg-pink-500' : patient.gender === 'Male' ? 'bg-blue-500' : 'bg-gray-500'}`}>
                    {patient.first_name?.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 dark:text-white text-base xs:text-lg truncate">
                      {patient.first_name} {patient.last_name}
                    </h3>
                    <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400">
                      MRN: {patient.mrn}
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs xs:text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex justify-between">
                    <span>Age:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{patient.age} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gender:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{patient.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Contact:</span>
                    <span className="font-medium text-gray-900 dark:text-white truncate ml-2">{patient.mobile_number}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-xs xs:text-sm text-tecnot-primary dark:text-tecnot-light font-medium">
                    View Details →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Add Patient Modal */}
      {showAddModal && (
        <AddPatientModal
          onClose={() => setShowAddModal(false)}
          onSuccess={handlePatientAdded}
        />
      )}

      {/* Toast Banner */}
      {toastPatient && (
        <PatientToast
          patient={toastPatient}
          onClose={() => setToastPatient(null)}
          onNavigate={() => navigate(`/patient/${toastPatient.mrn}`)}
        />
      )}
    </div>
  )
}

export default Patients