// NewSession.jsx (COPY-PASTE FULL FILE)
// ✅ Same "Add New Patient" modal as Patients.jsx
// ✅ Plus icon next to search bar
// ✅ Mobile + desktop responsive
// ✅ Creates patient using patientService.createPatient()
// ✅ After adding: refresh list + auto-select new patient

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Mic, Square, Loader2, Play, Plus, X } from 'lucide-react'
import Header from '../components/Header'
import PatientBanner from '../components/PatientBanner'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import * as patientService from '../services/patientService'

function NewSession() {
  const navigate = useNavigate()

  // =========================
  // PATIENTS LIST + SEARCH
  // =========================
  const [patients, setPatients] = useState([])
  const [loadingPatients, setLoadingPatients] = useState(true)
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  // =========================
  // ADD PATIENT MODAL (same as Patients.jsx)
  // =========================
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [newPatient, setNewPatient] = useState({
    first_name: '',
    last_name: '',
    age: '',
    gender: '',
    nationality: '',
    national_id: '',
    mobile_number: '',
    email: '',
    preferred_language: 'English',
    blood_type: '',
    chronics: '',
    allergies: '',
    drug_precautions: '',
    mrn: ''
  })

  useEffect(() => {
    fetchPatients()
  }, [])

  const fetchPatients = async () => {
    try {
      setLoadingPatients(true)
      const data = await patientService.getPatients()
      setPatients(data.results || [])
    } catch (error) {
      console.error('Error fetching patients:', error)
      // fallback dummy data
      setPatients([
        { id: '1', mrn: 'MRN001234', first_name: 'Malik', last_name: 'Fernando', age: 38, gender: 'Male', mobile_number: '+94771234567' },
        { id: '2', mrn: 'MRN005678', first_name: 'Shiman', last_name: 'Perera', age: 35, gender: 'Male', mobile_number: '+94712345678' }
      ])
    } finally {
      setLoadingPatients(false)
    }
  }

  const filteredPatients = useMemo(() => {
    const query = searchQuery.toLowerCase()
    return patients.filter((patient) => {
      return (
        patient.first_name?.toLowerCase().includes(query) ||
        patient.last_name?.toLowerCase().includes(query) ||
        patient.mrn?.toLowerCase().includes(query) ||
        patient.mobile_number?.includes(query)
      )
    })
  }, [patients, searchQuery])

  // =========================
  // DOB -> AGE (same as Patients.jsx)
  // =========================
  const calculateAge = (dob) => {
    if (!dob) return ''
    const birth = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birth.getFullYear()
    const m = today.getMonth() - birth.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
    return age < 0 ? '' : String(age)
  }

  const handleDobChange = (date) => {
    setSelectedDate(date)
    const computedAge = calculateAge(date)
    setNewPatient((prev) => ({ ...prev, age: computedAge }))
  }

  const resetForm = () => {
    setNewPatient({
      first_name: '',
      last_name: '',
      age: '',
      gender: '',
      nationality: '',
      national_id: '',
      mobile_number: '',
      email: '',
      preferred_language: 'English',
      blood_type: '',
      chronics: '',
      allergies: '',
      drug_precautions: '',
      mrn: ''
    })
    setSelectedDate(null)
  }

  const handleSavePatient = async () => {
    if (!newPatient.first_name || !newPatient.last_name) {
      alert('Please fill in patient name')
      return
    }

    try {
      const patientData = {
        ...newPatient,
        date_of_birth: selectedDate ? selectedDate.toISOString().split('T')[0] : null
      }

      // create in backend
      const created = await patientService.createPatient(patientData)

      alert('Patient added successfully!')
      setShowAddModal(false)
      resetForm()

      // refresh list
      await fetchPatients()

      // auto-select created patient if backend returns it
      if (created && (created.mrn || created.id)) {
        setSelectedPatient(created)
      } else {
        // fallback: select by MRN (if user entered MRN)
        if (patientData.mrn) {
          const found = patients.find((p) => p.mrn === patientData.mrn)
          if (found) setSelectedPatient(found)
        }
      }
    } catch (error) {
      console.error('Error adding patient:', error)
      alert('Failed to add patient. Please try again.')
    }
  }

  // =========================
  // VITALS
  // =========================
  const [vitals, setVitals] = useState({
    height: '',
    weight: '',
    temperature: '',
    blood_pressure: '',
    heart_rate: '',
    spo2: ''
  })

  // =========================
  // RECORDING (stable refs)
  // =========================
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [audioBlob, setAudioBlob] = useState(null)
  const [processing, setProcessing] = useState(false)

  const mediaRecorderRef = useRef(null)
  const streamRef = useRef(null)
  const chunksRef = useRef([])
  const recordingIntervalRef = useRef(null)

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream

      const recorder = new MediaRecorder(stream)
      mediaRecorderRef.current = recorder
      chunksRef.current = []

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data)
      }

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' })
        setAudioBlob(blob)
      }

      recorder.start()
      setIsRecording(true)

      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } catch (error) {
      alert('Microphone access denied. Please enable microphone permissions.')
      console.error('Recording error:', error)
    }
  }

  const handleStopRecording = () => {
    const recorder = mediaRecorderRef.current
    if (!recorder) return

    if (recorder.state !== 'inactive') recorder.stop()
    setIsRecording(false)

    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current)
      recordingIntervalRef.current = null
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop())
      streamRef.current = null
    }
  }

  const handlePlayAudio = () => {
    if (!audioBlob) return
    const url = URL.createObjectURL(audioBlob)
    const audio = new Audio(url)
    audio.play()
    audio.onended = () => URL.revokeObjectURL(url)
  }

  const handleReRecord = () => {
    setAudioBlob(null)
    setRecordingTime(0)
    chunksRef.current = []
  }

  const handleGenerateSOAP = async () => {
    if (!audioBlob) {
      alert('No recording found!')
      return
    }

    setProcessing(true)

    setTimeout(() => {
      setProcessing(false)
      navigate('/soap-note/new', {
        state: {
          patient: selectedPatient,
          vitals
        }
      })
    }, 2500)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="animate-fadeIn w-full">
      <Header title="New Consultation Session" subtitle="Record patient consultation" />

      {selectedPatient && <PatientBanner patient={selectedPatient} session={{ vitals }} />}

      <div className="w-full px-3 xs:px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-4xl mx-auto">
        {/* STEP 1 */}
        {!selectedPatient ? (
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-4 xs:p-6 sm:p-8">
            <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900 mb-4 xs:mb-6">
              Select Patient
            </h2>

            {/* Search + Plus icon */}
            <div className="flex items-stretch gap-2 xs:gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, MRN, or mobile..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg 
                           outline-none focus:border-tecnot-primary focus:ring-4 
                           focus:ring-tecnot-primary/20 transition-all text-sm xs:text-base"
                />
              </div>

              <button
                onClick={() => setShowAddModal(true)}
                className="shrink-0 px-3 xs:px-4 rounded-lg border-2 border-gray-200
                         hover:border-tecnot-primary hover:bg-tecnot-light/50 transition-all
                         flex items-center justify-center"
                title="Add New Patient"
                aria-label="Add New Patient"
              >
                <Plus className="w-5 h-5 xs:w-6 xs:h-6 text-tecnot-primary" />
              </button>
            </div>

            {/* Patients list */}
            {loadingPatients ? (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="w-8 h-8 animate-spin text-tecnot-primary" />
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredPatients.map((patient) => (
                  <button
                    key={patient.id}
                    onClick={() => setSelectedPatient(patient)}
                    className="w-full text-left p-3 xs:p-4 border border-gray-200 rounded-lg 
                             hover:border-tecnot-primary hover:bg-tecnot-light/50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 xs:w-12 xs:h-12 rounded-full flex items-center justify-center 
                                  text-white font-bold text-base xs:text-lg
                                  ${patient.gender === 'Female'
                                    ? 'bg-pink-500'
                                    : patient.gender === 'Male'
                                    ? 'bg-blue-500'
                                    : 'bg-gray-500'
                                  }`}
                      >
                        {patient.first_name?.charAt(0) || 'P'}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm xs:text-base truncate">
                          {patient.first_name} {patient.last_name}
                        </p>
                        <p className="text-xs xs:text-sm text-gray-600">
                          MRN: {patient.mrn} • {patient.age || '-'}Y {patient.gender || ''}
                        </p>
                        {patient.mobile_number && (
                          <p className="text-[11px] xs:text-xs text-gray-500 mt-1 truncate">
                            {patient.mobile_number}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {/* STEP 2: Vitals */}
            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-4 xs:p-6 sm:p-8">
              <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900 mb-4 xs:mb-6">
                Patient Vitals
              </h2>

              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 xs:gap-4">
                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-2">
                    Height (cm) *
                  </label>
                  <input
                    type="number"
                    placeholder="175"
                    value={vitals.height}
                    onChange={(e) => setVitals({ ...vitals, height: e.target.value })}
                    className="w-full px-3 xs:px-4 py-2 xs:py-3 border-2 border-gray-200 rounded-lg 
                             outline-none focus:border-tecnot-primary focus:ring-4 
                             focus:ring-tecnot-primary/20 transition-all text-sm xs:text-base"
                  />
                </div>

                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-2">
                    Weight (kg) *
                  </label>
                  <input
                    type="number"
                    placeholder="70"
                    value={vitals.weight}
                    onChange={(e) => setVitals({ ...vitals, weight: e.target.value })}
                    className="w-full px-3 xs:px-4 py-2 xs:py-3 border-2 border-gray-200 rounded-lg 
                             outline-none focus:border-tecnot-primary focus:ring-4 
                             focus:ring-tecnot-primary/20 transition-all text-sm xs:text-base"
                  />
                </div>

                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-2">
                    Temperature (°C)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="37.2"
                    value={vitals.temperature}
                    onChange={(e) => setVitals({ ...vitals, temperature: e.target.value })}
                    className="w-full px-3 xs:px-4 py-2 xs:py-3 border-2 border-gray-200 rounded-lg 
                             outline-none focus:border-tecnot-primary focus:ring-4 
                             focus:ring-tecnot-primary/20 transition-all text-sm xs:text-base"
                  />
                </div>

                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-2">
                    Blood Pressure
                  </label>
                  <input
                    type="text"
                    placeholder="120/80"
                    value={vitals.blood_pressure}
                    onChange={(e) => setVitals({ ...vitals, blood_pressure: e.target.value })}
                    className="w-full px-3 xs:px-4 py-2 xs:py-3 border-2 border-gray-200 rounded-lg 
                             outline-none focus:border-tecnot-primary focus:ring-4 
                             focus:ring-tecnot-primary/20 transition-all text-sm xs:text-base"
                  />
                </div>

                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-2">
                    Heart Rate (bpm)
                  </label>
                  <input
                    type="number"
                    placeholder="72"
                    value={vitals.heart_rate}
                    onChange={(e) => setVitals({ ...vitals, heart_rate: e.target.value })}
                    className="w-full px-3 xs:px-4 py-2 xs:py-3 border-2 border-gray-200 rounded-lg 
                             outline-none focus:border-tecnot-primary focus:ring-4 
                             focus:ring-tecnot-primary/20 transition-all text-sm xs:text-base"
                  />
                </div>

                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-2">
                    SpO2 (%)
                  </label>
                  <input
                    type="number"
                    placeholder="98"
                    value={vitals.spo2}
                    onChange={(e) => setVitals({ ...vitals, spo2: e.target.value })}
                    className="w-full px-3 xs:px-4 py-2 xs:py-3 border-2 border-gray-200 rounded-lg 
                             outline-none focus:border-tecnot-primary focus:ring-4 
                             focus:ring-tecnot-primary/20 transition-all text-sm xs:text-base"
                  />
                </div>
              </div>
            </div>

            {/* STEP 3: Recording */}
            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-4 xs:p-6 sm:p-8">
              <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900 mb-4 xs:mb-6">
                Record Consultation
              </h2>

              <div className="text-center py-6 xs:py-8 sm:py-12">
                <div
                  className={`w-24 h-24 xs:w-32 xs:h-32 sm:w-40 sm:h-40 mx-auto mb-6 xs:mb-8 
                              rounded-full flex items-center justify-center transition-all duration-300
                              ${isRecording ? 'bg-red-100 animate-pulse-slow' : 'bg-gray-100'}`}
                >
                  <Mic
                    className={`w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 
                                ${isRecording ? 'text-red-500' : 'text-gray-400'}`}
                  />
                </div>

                <div className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-900 mb-3 xs:mb-4">
                  {formatTime(recordingTime)}
                </div>

                <p className="text-sm xs:text-base text-gray-600 mb-6 xs:mb-8">
                  {isRecording ? '🔴 Recording in Progress...' : audioBlob ? '✅ Recording Complete' : 'Ready to Record'}
                </p>

                <div className="flex flex-col xs:flex-row justify-center gap-3 xs:gap-4">
                  {!isRecording && !audioBlob && (
                    <button
                      onClick={handleStartRecording}
                      disabled={!vitals.height || !vitals.weight}
                      className="px-6 xs:px-8 py-3 xs:py-4 bg-tecnot-primary text-white rounded-lg 
                               font-semibold hover:bg-tecnot-dark transition-smooth shadow-lg 
                               disabled:opacity-50 disabled:cursor-not-allowed
                               flex items-center justify-center gap-2 text-sm xs:text-base"
                    >
                      <Mic className="w-5 h-5" />
                      Start Recording
                    </button>
                  )}

                  {isRecording && (
                    <button
                      onClick={handleStopRecording}
                      className="px-6 xs:px-8 py-3 xs:py-4 bg-red-500 text-white rounded-lg 
                               font-semibold hover:bg-red-600 transition-smooth shadow-lg
                               flex items-center justify-center gap-2 text-sm xs:text-base"
                    >
                      <Square className="w-5 h-5" />
                      Stop Recording
                    </button>
                  )}

                  {audioBlob && !processing && (
                    <>
                      <button
                        onClick={handlePlayAudio}
                        className="px-6 xs:px-8 py-3 xs:py-4 bg-gray-200 text-gray-800 rounded-lg 
                                 font-semibold hover:bg-gray-300 transition-smooth
                                 flex items-center justify-center gap-2 text-sm xs:text-base"
                      >
                        <Play className="w-5 h-5" />
                        Play
                      </button>

                      <button
                        onClick={handleReRecord}
                        className="px-6 xs:px-8 py-3 xs:py-4 bg-gray-500 text-white rounded-lg 
                                 font-semibold hover:bg-gray-600 transition-smooth
                                 flex items-center justify-center gap-2 text-sm xs:text-base"
                      >
                        Re-record
                      </button>

                      <button
                        onClick={handleGenerateSOAP}
                        className="px-6 xs:px-8 py-3 xs:py-4 bg-tecnot-primary text-white rounded-lg 
                                 font-semibold hover:bg-tecnot-dark transition-smooth shadow-lg
                                 flex items-center justify-center gap-2 text-sm xs:text-base"
                      >
                        Generate SOAP Note
                      </button>
                    </>
                  )}

                  {processing && (
                    <div className="text-center">
                      <Loader2 className="w-8 h-8 animate-spin text-tecnot-primary mx-auto mb-3" />
                      <p className="text-sm xs:text-base text-gray-600">
                        Processing audio... This may take a minute.
                      </p>
                    </div>
                  )}
                </div>

                {!vitals.height || !vitals.weight ? (
                  <p className="text-xs xs:text-sm text-red-500 mt-4">
                    Please enter at least Height and Weight to start recording
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================= */}
      {/* ADD PATIENT MODAL (same as Patients.jsx) */}
      {/* ========================= */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowAddModal(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

          {/* Modal */}
          <div
            className="relative bg-white rounded-2xl p-6 xs:p-8 max-w-2xl w-full 
                     shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-smooth"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-6">New Patient</h2>

            <div className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    placeholder="Enter first name"
                    value={newPatient.first_name}
                    onChange={(e) => setNewPatient({ ...newPatient, first_name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none 
                             focus:border-tecnot-primary focus:ring-4 focus:ring-tecnot-primary/20 
                             transition-all text-sm xs:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    placeholder="Enter last name"
                    value={newPatient.last_name}
                    onChange={(e) => setNewPatient({ ...newPatient, last_name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none 
                             focus:border-tecnot-primary focus:ring-4 focus:ring-tecnot-primary/20 
                             transition-all text-sm xs:text-base"
                  />
                </div>
              </div>

              {/* DOB */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDobChange}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select date of birth"
                  maxDate={new Date()}
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={100}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none 
                           focus:border-tecnot-primary focus:ring-4 focus:ring-tecnot-primary/20 
                           transition-all cursor-pointer text-sm xs:text-base"
                  wrapperClassName="w-full"
                />
              </div>

              {/* Age & Gender */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    placeholder="Auto-calculated from DOB"
                    value={newPatient.age}
                    onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none 
                             focus:border-tecnot-primary focus:ring-4 focus:ring-tecnot-primary/20 
                             transition-all text-sm xs:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    value={newPatient.gender}
                    onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none 
                             focus:border-tecnot-primary focus:ring-4 focus:ring-tecnot-primary/20 
                             transition-all bg-white cursor-pointer text-sm xs:text-base"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Nationality & National ID */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nationality</label>
                  <input
                    type="text"
                    placeholder="Enter nationality"
                    value={newPatient.nationality}
                    onChange={(e) => setNewPatient({ ...newPatient, nationality: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none 
                             focus:border-tecnot-primary focus:ring-4 focus:ring-tecnot-primary/20 
                             transition-all text-sm xs:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">National ID</label>
                  <input
                    type="text"
                    placeholder="e.g., 851234567V"
                    value={newPatient.national_id}
                    onChange={(e) => setNewPatient({ ...newPatient, national_id: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none 
                             focus:border-tecnot-primary focus:ring-4 focus:ring-tecnot-primary/20 
                             transition-all text-sm xs:text-base"
                  />
                </div>
              </div>

              {/* Mobile & Email */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                  <input
                    type="tel"
                    placeholder="+94 77 123 4567"
                    value={newPatient.mobile_number}
                    onChange={(e) => setNewPatient({ ...newPatient, mobile_number: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none 
                             focus:border-tecnot-primary focus:ring-4 focus:ring-tecnot-primary/20 
                             transition-all text-sm xs:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="patient@example.com"
                    value={newPatient.email}
                    onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none 
                             focus:border-tecnot-primary focus:ring-4 focus:ring-tecnot-primary/20 
                             transition-all text-sm xs:text-base"
                  />
                </div>
              </div>

              {/* Language & Blood Type */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Language</label>
                  <select
                    value={newPatient.preferred_language}
                    onChange={(e) => setNewPatient({ ...newPatient, preferred_language: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none 
                             focus:border-tecnot-primary focus:ring-4 focus:ring-tecnot-primary/20 
                             transition-all bg-white cursor-pointer text-sm xs:text-base"
                  >
                    <option value="English">English</option>
                    <option value="Sinhala">Sinhala</option>
                    <option value="Tamil">Tamil</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Blood Type</label>
                  <select
                    value={newPatient.blood_type}
                    onChange={(e) => setNewPatient({ ...newPatient, blood_type: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none 
                             focus:border-tecnot-primary focus:ring-4 focus:ring-tecnot-primary/20 
                             transition-all bg-white cursor-pointer text-sm xs:text-base"
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

              {/* Medical Info (optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Chronic Conditions</label>
                <input
                  type="text"
                  placeholder="e.g., Diabetes Type 2, Hypertension"
                  value={newPatient.chronics}
                  onChange={(e) => setNewPatient({ ...newPatient, chronics: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none 
                           focus:border-tecnot-primary focus:ring-4 focus:ring-tecnot-primary/20 
                           transition-all text-sm xs:text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
                <input
                  type="text"
                  placeholder="e.g., Penicillin, Peanuts"
                  value={newPatient.allergies}
                  onChange={(e) => setNewPatient({ ...newPatient, allergies: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none 
                           focus:border-tecnot-primary focus:ring-4 focus:ring-tecnot-primary/20 
                           transition-all text-sm xs:text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Drug Precautions</label>
                <input
                  type="text"
                  placeholder="e.g., Avoid NSAIDs"
                  value={newPatient.drug_precautions}
                  onChange={(e) => setNewPatient({ ...newPatient, drug_precautions: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none 
                           focus:border-tecnot-primary focus:ring-4 focus:ring-tecnot-primary/20 
                           transition-all text-sm xs:text-base"
                />
              </div>

              {/* MRN */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Patient MRN</label>
                <input
                  type="text"
                  placeholder="Auto-generated (leave blank)"
                  value={newPatient.mrn}
                  onChange={(e) => setNewPatient({ ...newPatient, mrn: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none 
                           focus:border-tecnot-primary focus:ring-4 focus:ring-tecnot-primary/20 
                           transition-all text-sm xs:text-base"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-medium 
                         text-gray-700 hover:bg-gray-50 transition-smooth text-sm xs:text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePatient}
                className="flex-1 px-6 py-3 bg-tecnot-primary text-white rounded-lg font-medium 
                         hover:bg-tecnot-dark transition-smooth shadow-lg hover:shadow-xl text-sm xs:text-base"
              >
                Add Patient
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NewSession
