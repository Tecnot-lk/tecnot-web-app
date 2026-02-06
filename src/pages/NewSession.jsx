// ====================
// NEW SESSION PAGE (UPGRADED + FULLY RESPONSIVE + PATIENT MODAL SAME AS PATIENTS PAGE)
// Uses real microphone via MediaRecorder + Audio Preview + Transcript Preview + Add New Patient (DatePicker modal)
// ====================

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Mic, Square, FileText, Search, User, Loader2, Wand2, X } from 'lucide-react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function NewSession() {
  const navigate = useNavigate()

  // UI state machine: idle → recording → processing → done
  const [status, setStatus] = useState('idle') // 'idle' | 'recording' | 'processing' | 'done'
  const [recordingTime, setRecordingTime] = useState(0)
  const timerRef = useRef(null)

  const [showPatientSearch, setShowPatientSearch] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState(null)

  // ✅ Add patient modal states
  const [showAddPatientModal, setShowAddPatientModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    gender: '',
    nationality: '',
    mrn: '',
  })

  // Search filter
  const [patientQuery, setPatientQuery] = useState('')

  // Transcript + audio
  const [transcript, setTranscript] = useState('')
  const [audioUrl, setAudioUrl] = useState(null)

  // MediaRecorder refs
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])
  const streamRef = useRef(null)

  // Patients list (so new patients can be added)
  const [patients, setPatients] = useState([
    { name: 'Malik', code: '001' },
    { name: 'Shiman', code: '021' },
    { name: 'Ibrahim', code: '022' },
    { name: 'Prajith', code: '232' },
  ])

  // Filter patients based on query
  const filteredPatients = useMemo(() => {
    const q = patientQuery.trim().toLowerCase()
    if (!q) return patients
    return patients.filter(
      (p) => p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q)
    )
  }, [patientQuery, patients])

  // Format time MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Timer helpers
  const startTimer = () => {
    if (timerRef.current) return
    timerRef.current = setInterval(() => {
      setRecordingTime((t) => t + 1)
    }, 1000)
  }

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopTimer()
      if (audioUrl) URL.revokeObjectURL(audioUrl)
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Age helper
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

  // Start recording
  const startRecording = async () => {
    if (!selectedPatient) {
      alert('Please select a patient first!')
      return
    }

    // Reset outputs
    setTranscript('')
    if (audioUrl) URL.revokeObjectURL(audioUrl)
    setAudioUrl(null)
    setRecordingTime(0)

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream

      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data)
      }

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        const url = URL.createObjectURL(blob)
        setAudioUrl(url)

        setStatus('processing')

        // Demo transcript (replace with backend later)
        setTimeout(() => {
          setTranscript(
            `Doctor: Hi ${selectedPatient.name}, what brings you in today?\n` +
              `Patient: I've been having discomfort and would like to check.\n` +
              `Doctor: Okay, we'll go through symptoms and history, then plan next steps.`
          )
          setStatus('done')
        }, 1200)
      }

      mediaRecorder.start()
      setStatus('recording')
      startTimer()
    } catch (err) {
      console.error(err)
      alert('Microphone access denied or not available. Please allow mic permission and try again.')
      setStatus('idle')
    }
  }

  // Stop recording
  const stopRecording = () => {
    try {
      stopTimer()
      setStatus('processing')

      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop()
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop())
        streamRef.current = null
      }
    } catch (err) {
      console.error(err)
      setStatus('idle')
    }
  }

  const canStart = status === 'idle' || status === 'done'
  const canStop = status === 'recording'

  const goToSoapNote = () => {
    navigate('/soap-note/1')
  }

  // Save new patient
  const handleSaveNewPatient = () => {
    const name = newPatient.name.trim()
    const mrn = newPatient.mrn.trim()

    if (!name || !mrn) {
      alert('Please fill Patient Name and Patient MRN')
      return
    }

    const exists = patients.some((p) => p.code?.toLowerCase() === mrn.toLowerCase())
    if (exists) {
      alert('This Patient MRN already exists. Please use a unique MRN.')
      return
    }

    const created = {
      name,
      code: mrn, // MRN acts as code for now
      dob: selectedDate ? selectedDate.toISOString() : null,
      age: newPatient.age,
      gender: newPatient.gender,
      nationality: newPatient.nationality,
      mrn: mrn,
    }

    setPatients((prev) => [created, ...prev])
    setSelectedPatient(created)

    setNewPatient({ name: '', age: '', gender: '', nationality: '', mrn: '' })
    setSelectedDate(null)
    setShowAddPatientModal(false)
    setShowPatientSearch(false)
    setPatientQuery('')
  }

  return (
    <div className="animate-fadeIn">
      <Header title="New Consultation Session" subtitle="Record and transcribe patient consultation" />

      {/* Main Content - Responsive padding */}
      <div className="p-3 xs:p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
        {/* Patient Selection */}
        <div className="bg-white rounded-lg sm:rounded-xl p-4 xs:p-5 sm:p-6 shadow-sm border border-gray-100 mb-4 xs:mb-6">
          <h3 className="text-base xs:text-lg font-bold text-gray-900 mb-3 xs:mb-4">
            Select Patient
          </h3>

          {selectedPatient ? (
            <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between bg-tecnot-light rounded-lg p-3 xs:p-4 gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 xs:w-12 xs:h-12 rounded-full bg-tecnot-primary flex items-center justify-center text-white font-bold text-sm xs:text-base flex-shrink-0">
                  {selectedPatient.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 text-sm xs:text-base truncate">
                    {selectedPatient.name}
                  </p>
                  <p className="text-xs xs:text-sm text-gray-600">MRN: {selectedPatient.code}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedPatient(null)}
                className="text-xs xs:text-sm text-tecnot-primary hover:underline font-medium"
                disabled={status === 'recording' || status === 'processing'}
              >
                Change Patient
              </button>
            </div>
          ) : (
            <div>
              {/* Search + Add New (Responsive) */}
              <div className="flex flex-col xs:flex-row gap-3 flex-wrap">
                <button
                  onClick={() => setShowPatientSearch(!showPatientSearch)}
                  className="w-full xs:flex-1 flex items-center gap-2 justify-center bg-tecnot-light text-tecnot-primary px-4 xs:px-6 py-2.5 xs:py-3 rounded-lg font-medium hover:bg-tecnot-primary hover:text-white transition-smooth text-sm xs:text-base"
                  disabled={status === 'recording' || status === 'processing'}
                >
                  <Search className="w-4 h-4 xs:w-5 xs:h-5" />
                  Search Patient
                </button>

                <button
                  onClick={() => setShowAddPatientModal(true)}
                  className="w-full xs:w-auto flex items-center justify-center gap-2 bg-tecnot-primary text-white px-4 xs:px-6 py-2.5 xs:py-3 rounded-lg font-medium hover:bg-tecnot-dark transition-smooth shadow-lg text-sm xs:text-base"
                  disabled={status === 'recording' || status === 'processing'}
                >
                  <span className="text-lg leading-none">+</span>
                  Add New Patient
                </button>
              </div>

              {/* Dropdown */}
              {showPatientSearch && (
                <div className="mt-3 xs:mt-4">
                  <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
                    <Search className="w-4 h-4 text-gray-400" />
                    <input
                      value={patientQuery}
                      onChange={(e) => setPatientQuery(e.target.value)}
                      placeholder="Type name or MRN..."
                      className="bg-transparent outline-none text-sm w-full"
                    />
                  </div>

                  <div className="mt-3 space-y-2 max-h-56 overflow-auto pr-1">
                    {filteredPatients.map((patient) => (
                      <button
                        key={patient.code}
                        onClick={() => {
                          setSelectedPatient(patient)
                          setShowPatientSearch(false)
                          setPatientQuery('')
                        }}
                        className="w-full flex items-center gap-3 p-3 xs:p-3.5 bg-gray-50 hover:bg-tecnot-light rounded-lg transition-smooth text-left"
                      >
                        <User className="w-4 h-4 xs:w-5 xs:h-5 text-gray-600 flex-shrink-0" />
                        <span className="font-medium text-gray-900 text-sm xs:text-base">
                          {patient.name} / {patient.code}
                        </span>
                      </button>
                    ))}

                    {filteredPatients.length === 0 && (
                      <div className="text-sm text-gray-500 p-3">No matches found.</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Recording Area */}
        <div className="bg-gradient-to-br from-tecnot-light to-white rounded-xl sm:rounded-2xl p-6 xs:p-8 sm:p-10 lg:p-12 shadow-lg border border-tecnot-primary/20 text-center">
          <div
            className={`mx-auto w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center mb-4 xs:mb-5 sm:mb-6 ${
              status === 'recording'
                ? 'bg-red-500 animate-pulse-slow shadow-2xl shadow-red-500/50'
                : 'bg-tecnot-primary shadow-xl'
            }`}
          >
            <Mic className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 text-white" />
          </div>

          <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-2">
            {status === 'recording'
              ? 'Recording in Progress...'
              : status === 'processing'
              ? 'Processing audio...'
              : status === 'done'
              ? 'Transcript Ready'
              : 'Ready to Record'}
          </h2>

          <p className="text-gray-600 mb-4 xs:mb-6 text-sm xs:text-base px-2">
            {status === 'recording'
              ? 'Speak clearly. AI will transcribe after you stop.'
              : status === 'processing'
              ? 'Please wait while we generate the transcript...'
              : 'Click "Start Recording" to begin the consultation'}
          </p>

          <div className="text-3xl xs:text-4xl sm:text-5xl font-bold text-tecnot-primary mb-6 xs:mb-8">
            {formatTime(recordingTime)}
          </div>

          <div className="flex flex-col xs:flex-row gap-3 xs:gap-4 justify-center flex-wrap">
            <button
              onClick={startRecording}
              disabled={!canStart || status === 'processing'}
              className={`flex items-center justify-center gap-2 xs:gap-3 px-6 xs:px-8 py-3 xs:py-4 rounded-lg sm:rounded-xl font-semibold text-base xs:text-lg transition-smooth shadow-lg active:scale-95 w-full xs:w-auto ${
                canStart && status !== 'processing'
                  ? 'bg-tecnot-primary text-white hover:bg-tecnot-dark btn-glow'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Mic className="w-5 h-5 xs:w-6 xs:h-6" />
              Start Recording
            </button>

            <button
              onClick={stopRecording}
              disabled={!canStop}
              className={`flex items-center justify-center gap-2 xs:gap-3 px-6 xs:px-8 py-3 xs:py-4 rounded-lg sm:rounded-xl font-semibold text-base xs:text-lg transition-smooth shadow-lg active:scale-95 w-full xs:w-auto ${
                canStop ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Square className="w-5 h-5 xs:w-6 xs:h-6" />
              Stop Recording
            </button>
          </div>

          <div className="mt-6 xs:mt-8 pt-4 xs:pt-6 border-t border-gray-200">
            <p className="text-xs xs:text-sm text-gray-600 mb-2">
              <span className="font-semibold">Language Support:</span> Sinhala • Tamil • English
            </p>
            <p className="text-[10px] xs:text-xs text-gray-500">Microphone: Browser default device</p>
          </div>
        </div>

        {/* Transcript + Audio Preview */}
        {(audioUrl || transcript) && (
          <div className="mt-4 xs:mt-6 bg-white rounded-lg sm:rounded-xl p-4 xs:p-5 sm:p-6 shadow-sm border border-gray-100">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm xs:text-base">
              <FileText className="w-4 h-4 xs:w-5 xs:h-5 text-tecnot-primary" />
              Transcript Preview
            </h4>

            {audioUrl && (
              <div className="mb-4">
                <audio controls src={audioUrl} className="w-full" />
                <p className="text-[10px] xs:text-xs text-gray-500 mt-2">
                  Tip: This audio will later be uploaded to the backend for Whisper transcription.
                </p>
              </div>
            )}

            <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-line text-gray-700 text-xs xs:text-sm min-h-[90px]">
              {status === 'processing' ? (
                <span className="inline-flex items-center gap-2 text-gray-600">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating transcript...
                </span>
              ) : transcript ? (
                transcript
              ) : (
                'No transcript yet.'
              )}
            </div>

            <div className="flex gap-3 mt-4 flex-wrap justify-end">
              <button
                onClick={goToSoapNote}
                disabled={!transcript || status === 'processing'}
                className={`flex items-center gap-2 px-5 xs:px-6 py-2.5 xs:py-3 rounded-lg font-medium transition-smooth text-sm xs:text-base ${
                  transcript && status !== 'processing'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-xl'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Wand2 className="w-5 h-5" />
                Generate SOAP Note
              </button>
            </div>
          </div>
        )}

        {/* Quick Tip */}
        <div className="mt-4 xs:mt-6 bg-blue-50 border border-blue-200 rounded-lg sm:rounded-xl p-4 xs:p-5 sm:p-6">
          <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2 text-sm xs:text-base">
            <FileText className="w-4 h-4 xs:w-5 xs:h-5" />
            What happens next?
          </h4>
          <ol className="text-xs xs:text-sm text-blue-800 space-y-1 ml-5 xs:ml-6 list-decimal">
            <li>Record the consultation using the microphone</li>
            <li>Audio is transcribed (Whisper) and speaker labels are added</li>
            <li>SOAP notes are generated (Mistral) automatically</li>
            <li>You review and edit before saving or sharing</li>
          </ol>
        </div>
      </div>

      {/* Add Patient Modal (Same UI as Patients page) */}
      {showAddPatientModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn"
          onClick={() => {
            setShowAddPatientModal(false)
            setNewPatient({ name: '', age: '', gender: '', nationality: '', mrn: '' })
            setSelectedDate(null)
          }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

          {/* Modal */}
          <div
            className="relative bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transform transition-all duration-300 scale-100 hover:scale-[1.02]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setShowAddPatientModal(false)
                setNewPatient({ name: '', age: '', gender: '', nationality: '', mrn: '' })
                setSelectedDate(null)
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-smooth"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">New Patient</h2>

            {/* Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name</label>
              <input
                type="text"
                placeholder="Enter patient name"
                value={newPatient.name}
                onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 transition-all"
                autoFocus
              />
            </div>

            {/* DOB */}
            <div className="mb-4">
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
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 transition-all cursor-pointer"
                wrapperClassName="w-full"
              />
            </div>

            {/* Age */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
              <input
                type="number"
                placeholder="Enter Age"
                min="0"
                max="150"
                value={newPatient.age}
                onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 transition-all"
              />
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select
                value={newPatient.gender}
                onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 transition-all bg-white cursor-pointer"
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male" className="text-gray-900">
                  Male
                </option>
                <option value="Female" className="text-gray-900">
                  Female
                </option>
                <option value="Prefer not to say" className="text-gray-900">
                  Prefer not to say
                </option>
              </select>
            </div>

            {/* Nationality */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Nationality</label>
              <input
                type="text"
                placeholder="Enter Nationality"
                value={newPatient.nationality}
                onChange={(e) => setNewPatient({ ...newPatient, nationality: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 transition-all"
              />
            </div>

            {/* MRN */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Patient MRN</label>
              <input
                type="text"
                placeholder="e.g., 001, 002"
                value={newPatient.mrn}
                onChange={(e) => setNewPatient({ ...newPatient, mrn: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 transition-all"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowAddPatientModal(false)
                  setNewPatient({ name: '', age: '', gender: '', nationality: '', mrn: '' })
                  setSelectedDate(null)
                }}
                className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-smooth"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNewPatient}
                className="flex-1 px-6 py-3 bg-tecnot-primary text-white rounded-lg font-medium hover:bg-tecnot-dark transition-smooth shadow-lg hover:shadow-xl"
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