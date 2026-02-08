import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Mic, Square, Loader2, Play } from 'lucide-react'
import Header from '../components/Header'
import PatientBanner from '../components/PatientBanner'

function NewSession() {
  const navigate = useNavigate()
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [vitals, setVitals] = useState({
    height: '',
    weight: '',
    temperature: '',
    blood_pressure: '',
    heart_rate: '',
    spo2: ''
  })
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [audioBlob, setAudioBlob] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [mediaRecorder, setMediaRecorder] = useState(null)
  const [recordingInterval, setRecordingInterval] = useState(null)

  // Dummy patients for search
  const patients = [
    { id: '1', mrn: 'MRN001234', first_name: 'Malik', last_name: 'Fernando', age: 38, gender: 'Male', blood_type: 'O+', chronics: 'Diabetes Type 2', allergies: 'Penicillin', drug_precautions: 'Avoid NSAIDs', national_id: '851234567V' },
    { id: '2', mrn: 'MRN005678', first_name: 'Shiman', last_name: 'Perera', age: 35, gender: 'Male', blood_type: 'A+', chronics: '', allergies: '', drug_precautions: '', national_id: '871234567V' },
  ]

  const filteredPatients = patients.filter(p =>
    p.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.mrn.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      const chunks = []

      recorder.ondataavailable = (e) => chunks.push(e.data)
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' })
        setAudioBlob(blob)
      }

      recorder.start()
      setMediaRecorder(recorder)
      setIsRecording(true)

      const interval = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
      setRecordingInterval(interval)

    } catch (error) {
      alert('Microphone access denied. Please enable microphone permissions.')
      console.error('Recording error:', error)
    }
  }

  const handleStopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop()
      mediaRecorder.stream.getTracks().forEach(track => track.stop())
      setIsRecording(false)
      clearInterval(recordingInterval)
    }
  }

  const handleGenerateSOAP = async () => {
    if (!audioBlob) {
      alert('No recording found!')
      return
    }

    setProcessing(true)
    
    // Simulate AI processing
    setTimeout(() => {
      setProcessing(false)
      navigate('/soap-note/new')
    }, 3000)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="animate-fadeIn w-full min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header title="New Consultation Session" subtitle="Record patient consultation" />
      
      {selectedPatient && (
        <PatientBanner 
          patient={selectedPatient} 
          session={{ vitals }}
        />
      )}

      <div className="w-full px-3 xs:px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-4xl mx-auto">
        
        {/* Step 1: Select Patient */}
        {!selectedPatient ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 xs:p-6 sm:p-8 transition-colors">
            <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 xs:mb-6">
              Select Patient
            </h2>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search by name or MRN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg 
                         outline-none focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 
                         focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20 transition-all text-sm xs:text-base
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredPatients.map(patient => (
                <button
                  key={patient.id}
                  onClick={() => setSelectedPatient(patient)}
                  className="w-full text-left p-3 xs:p-4 border border-gray-200 dark:border-gray-600 rounded-lg 
                           hover:border-tecnot-primary dark:hover:border-tecnot-light hover:bg-tecnot-light/50 dark:hover:bg-gray-700
                           transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 xs:w-12 xs:h-12 rounded-full flex items-center justify-center 
                                  text-white font-bold text-base xs:text-lg
                                  ${patient.gender === 'Male' ? 'bg-blue-500' : 'bg-pink-500'}`}>
                      {patient.first_name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 dark:text-white text-sm xs:text-base truncate">
                        {patient.first_name} {patient.last_name}
                      </p>
                      <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400">
                        MRN: {patient.mrn} • {patient.age}Y {patient.gender}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            
            {/* Step 2: Enter Vitals */}
            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 xs:p-6 sm:p-8 transition-colors">
              <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 xs:mb-6">
                Patient Vitals
              </h2>

              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 xs:gap-4">
                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Height (cm) *
                  </label>
                  <input
                    type="number"
                    placeholder="175"
                    value={vitals.height}
                    onChange={(e) => setVitals({...vitals, height: e.target.value})}
                    className="w-full px-3 xs:px-4 py-2 xs:py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg 
                             outline-none focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 
                             focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20 transition-all text-sm xs:text-base
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Weight (kg) *
                  </label>
                  <input
                    type="number"
                    placeholder="70"
                    value={vitals.weight}
                    onChange={(e) => setVitals({...vitals, weight: e.target.value})}
                    className="w-full px-3 xs:px-4 py-2 xs:py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg 
                             outline-none focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 
                             focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20 transition-all text-sm xs:text-base
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Temperature (°C)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="37.2"
                    value={vitals.temperature}
                    onChange={(e) => setVitals({...vitals, temperature: e.target.value})}
                    className="w-full px-3 xs:px-4 py-2 xs:py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg 
                             outline-none focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 
                             focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20 transition-all text-sm xs:text-base
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Blood Pressure
                  </label>
                  <input
                    type="text"
                    placeholder="120/80"
                    value={vitals.blood_pressure}
                    onChange={(e) => setVitals({...vitals, blood_pressure: e.target.value})}
                    className="w-full px-3 xs:px-4 py-2 xs:py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg 
                             outline-none focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 
                             focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20 transition-all text-sm xs:text-base
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Heart Rate (bpm)
                  </label>
                  <input
                    type="number"
                    placeholder="72"
                    value={vitals.heart_rate}
                    onChange={(e) => setVitals({...vitals, heart_rate: e.target.value})}
                    className="w-full px-3 xs:px-4 py-2 xs:py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg 
                             outline-none focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 
                             focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20 transition-all text-sm xs:text-base
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    SpO2 (%)
                  </label>
                  <input
                    type="number"
                    placeholder="98"
                    value={vitals.spo2}
                    onChange={(e) => setVitals({...vitals, spo2: e.target.value})}
                    className="w-full px-3 xs:px-4 py-2 xs:py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg 
                             outline-none focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 
                             focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20 transition-all text-sm xs:text-base
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Recording Interface */}
            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 xs:p-6 sm:p-8 transition-colors">
              <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 xs:mb-6">
                Record Consultation
              </h2>

              <div className="text-center py-6 xs:py-8 sm:py-12">
                <div className={`w-24 h-24 xs:w-32 xs:h-32 sm:w-40 sm:h-40 mx-auto mb-6 xs:mb-8 
                              rounded-full flex items-center justify-center transition-all duration-300
                              ${isRecording ? 'bg-red-100 dark:bg-red-900/30 animate-pulse-slow' : 'bg-gray-100 dark:bg-gray-700'}`}>
                  <Mic className={`w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 
                                ${isRecording ? 'text-red-500 dark:text-red-400' : 'text-gray-400 dark:text-gray-500'}`} />
                </div>

                <div className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3 xs:mb-4">
                  {formatTime(recordingTime)}
                </div>

                <p className="text-sm xs:text-base text-gray-600 dark:text-gray-400 mb-6 xs:mb-8">
                  {isRecording ? '🔴 Recording in Progress...' : 
                   audioBlob ? '✅ Recording Complete' : 
                   'Ready to Record'}
                </p>

                <div className="flex flex-col xs:flex-row justify-center gap-3 xs:gap-4">
                  {!isRecording && !audioBlob && (
                    <button
                      onClick={handleStartRecording}
                      disabled={!vitals.height || !vitals.weight}
                      className="px-6 xs:px-8 py-3 xs:py-4 bg-tecnot-primary dark:bg-tecnot-light text-white dark:text-gray-900 rounded-lg 
                               font-semibold hover:bg-tecnot-dark dark:hover:bg-tecnot-primary transition-smooth shadow-lg 
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
                      className="px-6 xs:px-8 py-3 xs:py-4 bg-red-500 dark:bg-red-600 text-white rounded-lg 
                               font-semibold hover:bg-red-600 dark:hover:bg-red-700 transition-smooth shadow-lg
                               flex items-center justify-center gap-2 text-sm xs:text-base"
                    >
                      <Square className="w-5 h-5" />
                      Stop Recording
                    </button>
                  )}

                  {audioBlob && !processing && (
                    <>
                      <button
                        onClick={() => {
                          setAudioBlob(null)
                          setRecordingTime(0)
                        }}
                        className="px-6 xs:px-8 py-3 xs:py-4 bg-gray-500 dark:bg-gray-600 text-white rounded-lg 
                                 font-semibold hover:bg-gray-600 dark:hover:bg-gray-700 transition-smooth
                                 flex items-center justify-center gap-2 text-sm xs:text-base"
                      >
                        Re-record
                      </button>

                      <button
                        onClick={handleGenerateSOAP}
                        className="px-6 xs:px-8 py-3 xs:py-4 bg-tecnot-primary dark:bg-tecnot-light text-white dark:text-gray-900 rounded-lg 
                                 font-semibold hover:bg-tecnot-dark dark:hover:bg-tecnot-primary transition-smooth shadow-lg
                                 flex items-center justify-center gap-2 text-sm xs:text-base"
                      >
                        <Play className="w-5 h-5" />
                        Generate SOAP Note
                      </button>
                    </>
                  )}

                  {processing && (
                    <div className="text-center">
                      <Loader2 className="w-8 h-8 animate-spin text-tecnot-primary dark:text-tecnot-light mx-auto mb-3" />
                      <p className="text-sm xs:text-base text-gray-600 dark:text-gray-400">
                        Processing audio... This may take a minute.
                      </p>
                    </div>
                  )}
                </div>

                {!vitals.height || !vitals.weight ? (
                  <p className="text-xs xs:text-sm text-red-500 dark:text-red-400 mt-4">
                    Please enter at least Height and Weight to start recording
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default NewSession