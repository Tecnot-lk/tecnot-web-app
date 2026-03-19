// =============================================================================
// PATIENT DETAIL PAGE - COMPLETE UPDATED VERSION
// =============================================================================
//
// PURPOSE:
// - View detailed patient information
// - Edit patient information
// - View consultation history
// - Start new sessions
// - Download SOAP notes as PDF
//
// FEATURES IMPLEMENTED:
// - Edit Patient Info Modal
// - Pre-populated form fields
// - Date of birth picker with auto-age calculation
// - Full field validation
// - Save changes to backend
// - Loading states
// - Dark mode support
//
// =============================================================================

import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, FileText, Phone, Mail, Loader2, Download, X } from 'lucide-react'
import Header from '../components/Header'
import PatientBanner from '../components/PatientBanner'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import * as patientService from '../services/patientService'
import * as sessionService from '../services/sessionService'

function PatientDetail() {
  const { code } = useParams() // This is the MRN from the URL
  const [patient, setPatient] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sessions, setSessions] = useState([])
  
  // Edit modal state
  const [showEditModal, setShowEditModal] = useState(false)
  const [editedPatient, setEditedPatient] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchPatientData()
  }, [code])

  const fetchPatientData = async () => {
    try {
      setLoading(true)
      // Try to fetch patient from API using the MRN
      const data = await patientService.getPatientByMRN(code)
      setPatient(data)

      const sessionsData = await sessionService.getSessionsByPatient(data.id)
      setSessions(sessionsData)
      
    } catch (error) {
      console.error('Error fetching patient:', error)
      
     
      
    } finally {
      setLoading(false)
    }
  }

  // ======================================================================
  // FUNCTION: OPEN EDIT MODAL
  // ==========================================================================
  const handleEditPatient = () => {
    // Create a copy of the patient data for editing
    setEditedPatient({ ...patient })
    
    // Parse and set the date of birth if available
    if (patient.date_of_birth) {
      setSelectedDate(new Date(patient.date_of_birth))
    } else {
      setSelectedDate(null)
    }
    
    setShowEditModal(true)
  }

  // ==========================================================================
  // FUNCTION: CALCULATE AGE FROM DOB
  // ==========================================================================
  const calculateAge = (dob) => {
    if (!dob) return ''
    
    const birth = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birth.getFullYear()
    const m = today.getMonth() - birth.getMonth()
    
    // Adjust if birthday hasn't occurred this year
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    
    return age < 0 ? '' : String(age)
  }

  // ==========================================================================
  // FUNCTION: HANDLE DOB CHANGE
  // ==========================================================================
  const handleDobChange = (date) => {
    setSelectedDate(date)
    const computedAge = calculateAge(date)
    setEditedPatient(prev => ({ ...prev, age: computedAge }))
  }

  // ==========================================================================
  // FUNCTION: SAVE EDITED PATIENT
  // ==========================================================================
  const handleSavePatient = async () => {
    // Validate required fields
    if (!editedPatient.first_name || !editedPatient.last_name) {
      alert('Please fill in patient name')
      return
    }

    try {
      setSaving(true)
      
      // Prepare patient data
      const patientData = {
        ...editedPatient,
        // Format date for backend (YYYY-MM-DD)
        date_of_birth: selectedDate ? selectedDate.toISOString().split('T')[0] : null
      }
      
      // Call backend API to update patient
      const updatedPatient = await patientService.updatePatient(patient.id, patientData)

      setPatient(updatedPatient)
      alert('Patient information updated successfully!')
      setShowEditModal(false)
      
      // Optionally refresh data from backend
      // fetchPatientData()
      
    } catch (error) {
      console.error('Error updating patient:', error)
      alert('Failed to update patient. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  // ==========================================================================
  // FUNCTION: CANCEL EDIT
  // ==========================================================================
  const handleCancelEdit = () => {
    setShowEditModal(false)
    setEditedPatient(null)
    setSelectedDate(null)
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
                onClick={handleEditPatient}
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

      {/* ====================================================================
          EDIT PATIENT MODAL
          ==================================================================== */}
      {showEditModal && editedPatient && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={handleCancelEdit}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

          {/* Modal */}
          <div
            className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 xs:p-8 max-w-2xl w-full 
                     shadow-2xl max-h-[90vh] overflow-y-auto transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCancelEdit}
              className="absolute top-4 right-4 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-smooth"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-xl xs:text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Edit Patient Information
            </h2>

            <div className="space-y-4">
              
              {/* ============================================================
                  NAME FIELDS
                  ============================================================ */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                {/* First Name - REQUIRED */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter first name"
                    value={editedPatient.first_name}
                    onChange={(e) => setEditedPatient({ ...editedPatient, first_name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none 
                             focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                             transition-all text-sm xs:text-base
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </div>
                
                {/* Last Name - REQUIRED */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter last name"
                    value={editedPatient.last_name}
                    onChange={(e) => setEditedPatient({ ...editedPatient, last_name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none 
                             focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                             transition-all text-sm xs:text-base
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </div>
              </div>

              {/* ============================================================
                  DATE OF BIRTH
                  ============================================================ */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date of Birth
                </label>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDobChange}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select date of birth"
                  maxDate={new Date()}
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={100}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none 
                           focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                           transition-all cursor-pointer text-sm xs:text-base
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           placeholder-gray-400 dark:placeholder-gray-500"
                  wrapperClassName="w-full"
                />
              </div>

              {/* ============================================================
                  AGE & GENDER
                  ============================================================ */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                {/* Age - Auto-calculated */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    placeholder="Auto-calculated from DOB"
                    value={editedPatient.age}
                    onChange={(e) => setEditedPatient({ ...editedPatient, age: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none 
                             focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                             transition-all text-sm xs:text-base
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </div>
                
                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Gender
                  </label>
                  <select
                    value={editedPatient.gender}
                    onChange={(e) => setEditedPatient({ ...editedPatient, gender: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none 
                             focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                             transition-all bg-white dark:bg-gray-700 cursor-pointer text-sm xs:text-base
                             text-gray-900 dark:text-white"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* ============================================================
                  NATIONALITY & NATIONAL ID
                  ============================================================ */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nationality
                  </label>
                  <input
                    type="text"
                    placeholder="Enter nationality"
                    value={editedPatient.nationality}
                    onChange={(e) => setEditedPatient({ ...editedPatient, nationality: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none 
                             focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                             transition-all text-sm xs:text-base
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    National ID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 851234567V"
                    value={editedPatient.national_id}
                    onChange={(e) => setEditedPatient({ ...editedPatient, national_id: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none 
                             focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                             transition-all text-sm xs:text-base
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </div>
              </div>

              {/* ============================================================
                  MOBILE & EMAIL
                  ============================================================ */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+94 77 123 4567"
                    value={editedPatient.mobile_number}
                    onChange={(e) => setEditedPatient({ ...editedPatient, mobile_number: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none 
                             focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                             transition-all text-sm xs:text-base
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="patient@example.com"
                    value={editedPatient.email}
                    onChange={(e) => setEditedPatient({ ...editedPatient, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none 
                             focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                             transition-all text-sm xs:text-base
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </div>
              </div>

              {/* ============================================================
                  LANGUAGE & BLOOD TYPE
                  ============================================================ */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Preferred Language
                  </label>
                  <select
                    value={editedPatient.preferred_language}
                    onChange={(e) => setEditedPatient({ ...editedPatient, preferred_language: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none 
                             focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                             transition-all bg-white dark:bg-gray-700 cursor-pointer text-sm xs:text-base
                             text-gray-900 dark:text-white"
                  >
                    <option value="English">English</option>
                    <option value="Sinhala">Sinhala</option>
                    <option value="Tamil">Tamil</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Blood Type
                  </label>
                  <select
                    value={editedPatient.blood_type}
                    onChange={(e) => setEditedPatient({ ...editedPatient, blood_type: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none 
                             focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                             transition-all bg-white dark:bg-gray-700 cursor-pointer text-sm xs:text-base
                             text-gray-900 dark:text-white"
                  >
                    <option value="">Select Blood Type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>

              {/* ============================================================
                  MEDICAL INFORMATION (OPTIONAL)
                  ============================================================ */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Chronic Conditions
                </label>
                <input
                  type="text"
                  placeholder="e.g., Diabetes Type 2, Hypertension"
                  value={editedPatient.chronics}
                  onChange={(e) => setEditedPatient({ ...editedPatient, chronics: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none 
                           focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                           transition-all text-sm xs:text-base
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Allergies
                </label>
                <input
                  type="text"
                  placeholder="e.g., Penicillin, Peanuts"
                  value={editedPatient.allergies}
                  onChange={(e) => setEditedPatient({ ...editedPatient, allergies: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none 
                           focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                           transition-all text-sm xs:text-base
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Drug Precautions
                </label>
                <input
                  type="text"
                  placeholder="e.g., Avoid NSAIDs"
                  value={editedPatient.drug_precautions}
                  onChange={(e) => setEditedPatient({ ...editedPatient, drug_precautions: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none 
                           focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                           transition-all text-sm xs:text-base
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              {/* ============================================================
                  MRN (READ-ONLY)
                  ============================================================ */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Patient MRN (Cannot be changed)
                </label>
                <input
                  type="text"
                  value={editedPatient.mrn}
                  disabled
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none 
                           transition-all text-sm xs:text-base
                           bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400
                           cursor-not-allowed"
                />
              </div>
            </div>

            {/* Modal Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCancelEdit}
                disabled={saving}
                className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-medium 
                         text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-smooth text-sm xs:text-base
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePatient}
                disabled={saving}
                className="flex-1 px-6 py-3 bg-tecnot-primary dark:bg-tecnot-light text-white dark:text-gray-900 rounded-lg font-medium 
                         hover:bg-tecnot-dark dark:hover:bg-tecnot-primary transition-smooth shadow-lg hover:shadow-xl text-sm xs:text-base
                         disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PatientDetail