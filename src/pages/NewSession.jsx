import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Mic, Square, Loader2, Plus, X, FileText, Wand2 } from 'lucide-react'
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
  // ADD PATIENT MODAL
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
      setPatients([
        { id: '1', mrn: 'MRN001234', first_name: 'Malik', last_name: 'Fernando', age: 38, gender: 'Male', mobile_number: '+94771234567' },
        { id: '2', mrn: 'MRN005678', first_name: 'Shiman', last_name: 'Perera', age: 35, gender: 'Male', mobile_number: '+94712345678' }
      ])
    } finally {
      setLoadingPatients(false)
    }
  }

  const filteredPatients = useMemo(() => {
    const q = searchQuery.toLowerCase()
    return patients.filter((p) => (
      p.first_name?.toLowerCase().includes(q) ||
      p.last_name?.toLowerCase().includes(q) ||
      p.mrn?.toLowerCase().includes(q) ||
      p.mobile_number?.includes(q)
    ))
  }, [patients, searchQuery])

  // =========================
  // DOB -> AGE
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
    setNewPatient((prev) => ({ ...prev, age: calculateAge(date) }))
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
    // ✅ only first/last name required
    if (!newPatient.first_name || !newPatient.last_name) {
      alert('Please fill in First Name and Last Name')
      return
    }

    try {
      const patientData = {
        ...newPatient,
        // ✅ optional fields safe
        chronics: newPatient.chronics || null,
        allergies: newPatient.allergies || null,
        drug_precautions: newPatient.drug_precautions || null,
        date_of_birth: selectedDate ? selectedDate.toISOString().split('T')[0] : null
      }

      const created = await patientService.createPatient(patientData)

      alert('Patient added successfully!')
      setShowAddModal(false)
      resetForm()
      await fetchPatients()

      if (created?.id || created?.mrn) setSelectedPatient(created)
    } catch (error) {
      console.error('Error adding patient:', error)
      const status = error?.response?.status
      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.detail ||
        JSON.stringify(error?.response?.data) ||
        error?.message ||
        'Unknown error'
      alert(`Failed to add patient (${status || 'no status'}): ${msg}`)
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
  // RECORDING
  // =========================
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [audioBlob, setAudioBlob] = useState(null)
  const [processing, setProcessing] = useState(false)

  const mediaRecorderRef = useRef(null)
  const streamRef = useRef(null)
  const chunksRef = useRef([])
  const intervalRef = useRef(null)

  // =========================
  // TRANSCRIPT PREVIEW
  // =========================
  const [transcriptText, setTranscriptText] = useState('')
  const [audioUrl, setAudioUrl] = useState('')

  useEffect(() => {
    if (!audioBlob) {
      if (audioUrl) URL.revokeObjectURL(audioUrl)
      setAudioUrl('')
      return
    }
    const url = URL.createObjectURL(audioBlob)
    setAudioUrl(url)
    return () => URL.revokeObjectURL(url)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioBlob])

  const handleStartRecording = async () => {
    try {
      // reset UI
      setAudioBlob(null)
      setTranscriptText('')
      setRecordingTime(0)

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

        // ✅ demo transcript (replace later with Whisper result)
        setTranscriptText(
          `Doctor: Hi Malik, what brings you in today?\n` +
          `Patient: I've been having discomfort and would like to check.\n` +
          `Doctor: Okay, we'll go through symptoms and history, then plan next steps.`
        )
      }

      recorder.start()
      setIsRecording(true)

      intervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } catch (err) {
      console.error(err)
      alert('Microphone access denied. Please enable microphone permissions.')
    }
  }

  const handleStopRecording = () => {
    const recorder = mediaRecorderRef.current
    if (!recorder) return

    if (recorder.state !== 'inactive') recorder.stop()
    setIsRecording(false)

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop())
      streamRef.current = null
    }
  }

  const handleGenerateSOAP = () => {
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
          vitals,
          transcript: transcriptText
        }
      })
    }, 2000)
  }

  const formatTime = (s) => {
    const mins = Math.floor(s / 60)
    const secs = s % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // =========================
  // UI
  // =========================
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

            {loadingPatients ? (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="w-8 h-8 animate-spin text-tecnot-primary" />
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredPatients.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPatient(p)}
                    className="w-full text-left p-3 xs:p-4 border border-gray-200 rounded-lg 
                             hover:border-tecnot-primary hover:bg-tecnot-light/50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 xs:w-12 xs:h-12 rounded-full flex items-center justify-center 
                                  text-white font-bold text-base xs:text-lg
                                  ${p.gender === 'Female' ? 'bg-pink-500' : p.gender === 'Male' ? 'bg-blue-500' : 'bg-gray-500'}`}
                      >
                        {p.first_name?.charAt(0) || 'P'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm xs:text-base truncate">
                          {p.first_name} {p.last_name}
                        </p>
                        <p className="text-xs xs:text-sm text-gray-600">
                          MRN: {p.mrn} • {p.age || '-'}Y {p.gender || ''}
                        </p>
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
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-2">Height (cm) *</label>
                  <input
                    type="number"
                    value={vitals.height}
                    onChange={(e) => setVitals({ ...vitals, height: e.target.value })}
                    className="w-full px-3 xs:px-4 py-2 xs:py-3 border-2 border-gray-200 rounded-lg 
                             outline-none focus:border-tecnot-primary focus:ring-4 focus:ring-tecnot-primary/20 transition-all"
                    placeholder="175"
                  />
                </div>

                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-2">Weight (kg) *</label>
                  <input
                    type="number"
                    value={vitals.weight}
                    onChange={(e) => setVitals({ ...vitals, weight: e.target.value })}
                    className="w-full px-3 xs:px-4 py-2 xs:py-3 border-2 border-gray-200 rounded-lg 
                             outline-none focus:border-tecnot-primary focus:ring-4 focus:ring-tecnot-primary/20 transition-all"
                    placeholder="70"
                  />
                </div>

                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-2">Temperature (°C)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={vitals.temperature}
                    onChange={(e) => setVitals({ ...vitals, temperature: e.target.value })}
                    className="w-full px-3 xs:px-4 py-2 xs:py-3 border-2 border-gray-200 rounded-lg 
                             outline-none focus:border-tecnot-primary focus:ring-4 focus:ring-tecnot-primary/20 transition-all"
                    placeholder="37.2"
                  />
                </div>

                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-2">Blood Pressure</label>
                  <input
                    type="text"
                    value={vitals.blood_pressure}
                    onChange={(e) => setVitals({ ...vitals, blood_pressure: e.target.value })}
                    className="w-full px-3 xs:px-4 py-2 xs:py-3 border-2 border-gray-200 rounded-lg 
                             outline-none focus:border-tecnot-primary focus:ring-4 focus:ring-tecnot-primary/20 transition-all"
                    placeholder="120/80"
                  />
                </div>

                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-2">Heart Rate (bpm)</label>
                  <input
                    type="number"
                    value={vitals.heart_rate}
                    onChange={(e) => setVitals({ ...vitals, heart_rate: e.target.value })}
                    className="w-full px-3 xs:px-4 py-2 xs:py-3 border-2 border-gray-200 rounded-lg 
                             outline-none focus:border-tecnot-primary focus:ring-4 focus:ring-tecnot-primary/20 transition-all"
                    placeholder="72"
                  />
                </div>

                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-2">SpO2 (%)</label>
                  <input
                    type="number"
                    value={vitals.spo2}
                    onChange={(e) => setVitals({ ...vitals, spo2: e.target.value })}
                    className="w-full px-3 xs:px-4 py-2 xs:py-3 border-2 border-gray-200 rounded-lg 
                             outline-none focus:border-tecnot-primary focus:ring-4 focus:ring-tecnot-primary/20 transition-all"
                    placeholder="98"
                  />
                </div>
              </div>
            </div>

            {/* ✅ RECORDING CARD (SAME AS YOUR IMAGE) */}
            <div className="bg-teal-50/80 border border-teal-100 rounded-xl shadow-sm p-5 xs:p-6 sm:p-8">
              {/* mic circle */}
              <div className="flex justify-center">
                <div className="w-20 h-20 xs:w-24 xs:h-24 rounded-full bg-teal-400 flex items-center justify-center shadow-md">
                  <Mic className="w-10 h-10 xs:w-12 xs:h-12 text-white" />
                </div>
              </div>

              <div className="text-center mt-4">
                <h2 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900">
                  {isRecording ? 'Recording...' : 'Transcript Ready'}
                </h2>
                <p className="text-xs xs:text-sm text-gray-500 mt-1">
                  Click "Start Recording" to begin the consultation
                </p>

                <div className="text-3xl xs:text-4xl sm:text-5xl font-extrabold text-teal-500 mt-4">
                  {formatTime(recordingTime)}
                </div>

                {/* Buttons */}
                <div className="mt-5 flex flex-col xs:flex-row justify-center gap-3">
                  <button
                    onClick={handleStartRecording}
                    disabled={isRecording || !vitals.height || !vitals.weight}
                    className="px-6 py-3 rounded-lg bg-teal-500 text-white font-semibold shadow-md
                             hover:bg-teal-600 transition-all flex items-center justify-center gap-2
                             disabled:opacity-50 disabled:cursor-not-allowed min-w-[180px]"
                  >
                    <Mic className="w-5 h-5" />
                    Start Recording
                  </button>

                  <button
                    onClick={handleStopRecording}
                    disabled={!isRecording}
                    className="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 font-semibold shadow-md
                             hover:bg-gray-300 transition-all flex items-center justify-center gap-2
                             disabled:opacity-50 disabled:cursor-not-allowed min-w-[180px]"
                  >
                    <Square className="w-5 h-5" />
                    Stop Recording
                  </button>
                </div>

                <div className="mt-5 border-t border-teal-100 pt-4">
                  <p className="text-xs xs:text-sm text-gray-600">
                    <span className="font-semibold">Language Support:</span> Sinhala • Tamil • English
                  </p>
                  <p className="text-[11px] xs:text-xs text-gray-500 mt-1">
                    Microphone: Browser default device
                  </p>

                  {!vitals.height || !vitals.weight ? (
                    <p className="text-xs xs:text-sm text-red-500 mt-3">
                      Please enter at least Height and Weight to start recording
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* ✅ Transcript Preview Card (SAME AS YOUR IMAGE) */}
            {audioBlob && (
              <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 xs:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-tecnot-primary" />
                  <h3 className="font-bold text-gray-900 text-sm xs:text-base">Transcript Preview</h3>
                </div>

                <div className="bg-gray-100 rounded-full px-3 py-2">
                  <audio controls className="w-full" src={audioUrl} />
                </div>

                <p className="text-xs xs:text-sm text-gray-500 mt-3">
                  Tip: This audio will later be uploaded to the backend for Whisper transcription.
                </p>

                <div className="mt-4 bg-gray-50 border border-gray-100 rounded-xl p-4">
                  <pre className="whitespace-pre-wrap text-sm xs:text-base text-gray-800 font-sans leading-relaxed">
                    {transcriptText}
                  </pre>
                </div>

                <div className="mt-5 flex justify-end">
                  <button
                    onClick={handleGenerateSOAP}
                    disabled={processing}
                    className="px-5 xs:px-6 py-3 rounded-lg font-semibold text-white
                             bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-95
                             transition-all shadow-lg flex items-center gap-2
                             disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {processing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-5 h-5" />
                        Generate SOAP Note
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ADD PATIENT MODAL */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowAddModal(false)}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

          <div
            className="relative bg-white rounded-2xl p-6 xs:p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
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
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    placeholder="Enter first name"
                    value={newPatient.first_name}
                    onChange={(e) => setNewPatient({ ...newPatient, first_name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none 
                             focus:border-tecnot-primary focus:ring-4 focus:ring-tecnot-primary/20 transition-all"
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
                             focus:border-tecnot-primary focus:ring-4 focus:ring-tecnot-primary/20 transition-all"
                  />
                </div>
              </div>

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
                           focus:border-tecnot-primary focus:ring-4 focus:ring-tecnot-primary/20 transition-all cursor-pointer"
                  wrapperClassName="w-full"
                />
              </div>

              <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    placeholder="Auto-calculated from DOB"
                    value={newPatient.age}
                    onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none 
                             focus:border-tecnot-primary focus:ring-4 focus:ring-tecnot-primary/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    value={newPatient.gender}
                    onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none 
                             focus:border-tecnot-primary focus:ring-4 focus:ring-tecnot-primary/20 transition-all bg-white"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nationality</label>
                  <input
                    type="text"
                    placeholder="Enter nationality"
                    value={newPatient.nationality}
                    onChange={(e) => setNewPatient({ ...newPatient, nationality: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none 
                             focus:border-tecnot-primary focus:ring-4 focus:ring-tecnot-primary/20 transition-all"
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
                             focus:border-tecnot-primary focus:ring-4 focus:ring-tecnot-primary/20 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                  <input
                    type="tel"
                    placeholder="+94 77 123 4567"
                    value={newPatient.mobile_number}
                    onChange={(e) => setNewPatient({ ...newPatient, mobile_number: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none 
                             focus:border-tecnot-primary focus:ring-4 focus:ring-tecnot-primary/20 transition-all"
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
                             focus:border-tecnot-primary focus:ring-4 focus:ring-tecnot-primary/20 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Language</label>
                  <select
                    value={newPatient.preferred_language}
                    onChange={(e) => setNewPatient({ ...newPatient, preferred_language: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none 
                             focus:border-tecnot-primary focus:ring-4 focus:ring-tecnot-primary/20 transition-all bg-white"
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
                             focus:border-tecnot-primary focus:ring-4 focus:ring-tecnot-primary/20 transition-all bg-white"
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Chronic Conditions (optional)</label>
                <input
                  type="text"
                  placeholder="e.g., Diabetes Type 2, Hypertension"
                  value={newPatient.chronics}
                  onChange={(e) => setNewPatient({ ...newPatient, chronics: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none 
                           focus:border-tecnot-primary focus:ring-4 focus:ring-tecnot-primary/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Allergies (optional)</label>
                <input
                  type="text"
                  placeholder="e.g., Penicillin, Peanuts"
                  value={newPatient.allergies}
                  onChange={(e) => setNewPatient({ ...newPatient, allergies: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none 
                           focus:border-tecnot-primary focus:ring-4 focus:ring-tecnot-primary/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Drug Precautions (optional)</label>
                <input
                  type="text"
                  placeholder="e.g., Avoid NSAIDs"
                  value={newPatient.drug_precautions}
                  onChange={(e) => setNewPatient({ ...newPatient, drug_precautions: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none 
                           focus:border-tecnot-primary focus:ring-4 focus:ring-tecnot-primary/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Patient MRN</label>
                <input
                  type="text"
                  placeholder="Auto-generated (leave blank)"
                  value={newPatient.mrn}
                  onChange={(e) => setNewPatient({ ...newPatient, mrn: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none 
                           focus:border-tecnot-primary focus:ring-4 focus:ring-tecnot-primary/20 transition-all"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePatient}
                className="flex-1 px-6 py-3 bg-tecnot-primary text-white rounded-lg font-medium hover:bg-tecnot-dark transition-all shadow-lg"
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
