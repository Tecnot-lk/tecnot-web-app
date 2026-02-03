// ====================
// NEW SESSION PAGE - FULLY RESPONSIVE
// Record patient consultation with audio
// ====================

import React, { useState } from 'react'
import { Mic, Square, FileText, Search, User } from 'lucide-react'
import Header from '../components/Header'

function NewSession() {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [showPatientSearch, setShowPatientSearch] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState(null)
  
  const patients = [
    { name: 'Malik', code: '001' },
    { name: 'Shiman', code: '021' },
    { name: 'Ibrahim', code: '022' },
    { name: 'Prajith', code: '232' },
  ]
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  
  const startRecording = () => {
    if (!selectedPatient) {
      alert('Please select a patient first!')
      return
    }
    setIsRecording(true)
    alert('Recording started! (Demo - real recording coming with backend)')
  }
  
  const stopRecording = () => {
    setIsRecording(false)
    setRecordingTime(0)
    alert('Recording stopped! Transcript will appear here.')
  }
  
  return (
    <div className="animate-fadeIn">
      <Header 
        title="New Consultation Session" 
        subtitle="Record and transcribe patient consultation"
      />
      
      {/* Main Content - Responsive padding */}
      <div className="p-3 xs:p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
        
        {/* Patient Selection - Responsive */}
        <div className="bg-white rounded-lg sm:rounded-xl 
                       p-4 xs:p-5 sm:p-6 
                       shadow-sm border border-gray-100 
                       mb-4 xs:mb-6">
          <h3 className="text-base xs:text-lg font-bold text-gray-900 mb-3 xs:mb-4">
            Select Patient
          </h3>
          
          {selectedPatient ? (
            <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between 
                           bg-tecnot-light rounded-lg p-3 xs:p-4 gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 xs:w-12 xs:h-12 
                               rounded-full bg-tecnot-primary 
                               flex items-center justify-center 
                               text-white font-bold 
                               text-sm xs:text-base
                               flex-shrink-0">
                  {selectedPatient.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 text-sm xs:text-base truncate">
                    {selectedPatient.name}
                  </p>
                  <p className="text-xs xs:text-sm text-gray-600">
                    Code: {selectedPatient.code}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPatient(null)}
                className="text-xs xs:text-sm text-tecnot-primary hover:underline font-medium"
              >
                Change Patient
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => setShowPatientSearch(!showPatientSearch)}
                className="w-full flex items-center gap-2 justify-center 
                         bg-tecnot-light text-tecnot-primary 
                         px-4 xs:px-6 py-2.5 xs:py-3 
                         rounded-lg font-medium 
                         hover:bg-tecnot-primary hover:text-white 
                         transition-smooth
                         text-sm xs:text-base"
              >
                <Search className="w-4 h-4 xs:w-5 xs:h-5" />
                Search Patient
              </button>
              
              {/* Patient List Dropdown */}
              {showPatientSearch && (
                <div className="mt-3 xs:mt-4 space-y-2">
                  {patients.map((patient) => (
                    <button
                      key={patient.code}
                      onClick={() => {
                        setSelectedPatient(patient)
                        setShowPatientSearch(false)
                      }}
                      className="w-full flex items-center gap-3 
                               p-3 xs:p-3.5 
                               bg-gray-50 hover:bg-tecnot-light 
                               rounded-lg transition-smooth 
                               text-left"
                    >
                      <User className="w-4 h-4 xs:w-5 xs:h-5 text-gray-600 flex-shrink-0" />
                      <span className="font-medium text-gray-900 text-sm xs:text-base">
                        {patient.name} / {patient.code}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Recording Area - Responsive */}
        <div className="bg-gradient-to-br from-tecnot-light to-white 
                       rounded-xl sm:rounded-2xl 
                       p-6 xs:p-8 sm:p-10 lg:p-12 
                       shadow-lg border border-tecnot-primary/20 
                       text-center">
          
          {/* Microphone Icon - Responsive size */}
          <div className={`mx-auto w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 
                         rounded-full flex items-center justify-center 
                         mb-4 xs:mb-5 sm:mb-6 
                         ${isRecording 
                           ? 'bg-red-500 animate-pulse-slow shadow-2xl shadow-red-500/50' 
                           : 'bg-tecnot-primary shadow-xl'
                         }`}>
            <Mic className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 text-white" />
          </div>
          
          {/* Status Text - Responsive */}
          <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-2">
            {isRecording ? 'Recording in Progress...' : 'Ready to Record'}
          </h2>
          <p className="text-gray-600 mb-4 xs:mb-6 text-sm xs:text-base px-2">
            {isRecording 
              ? 'Speak clearly. AI is listening and transcribing...' 
              : 'Click "Start Recording" to begin the consultation'
            }
          </p>
          
          {/* Timer - Responsive */}
          <div className="text-3xl xs:text-4xl sm:text-5xl font-bold text-tecnot-primary mb-6 xs:mb-8">
            {formatTime(recordingTime)}
          </div>
          
          {/* Recording Controls - Responsive */}
          <div className="flex flex-col xs:flex-row gap-3 xs:gap-4 justify-center">
            {!isRecording ? (
              <button
                onClick={startRecording}
                className="flex items-center justify-center gap-2 xs:gap-3 
                         bg-tecnot-primary text-white 
                         px-6 xs:px-8 py-3 xs:py-4 
                         rounded-lg sm:rounded-xl 
                         font-semibold text-base xs:text-lg 
                         hover:bg-tecnot-dark transition-smooth 
                         shadow-lg btn-glow
                         active:scale-95
                         w-full xs:w-auto"
              >
                <Mic className="w-5 h-5 xs:w-6 xs:h-6" />
                Start Recording
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="flex items-center justify-center gap-2 xs:gap-3 
                         bg-red-500 text-white 
                         px-6 xs:px-8 py-3 xs:py-4 
                         rounded-lg sm:rounded-xl 
                         font-semibold text-base xs:text-lg 
                         hover:bg-red-600 transition-smooth 
                         shadow-lg
                         active:scale-95
                         w-full xs:w-auto"
              >
                <Square className="w-5 h-5 xs:w-6 xs:h-6" />
                Stop Recording
              </button>
            )}
          </div>
          
          {/* Language Support Info - Responsive */}
          <div className="mt-6 xs:mt-8 pt-4 xs:pt-6 border-t border-gray-200">
            <p className="text-xs xs:text-sm text-gray-600 mb-2">
              <span className="font-semibold">Language Support:</span> Sinhala • Tamil • English
            </p>
            <p className="text-[10px] xs:text-xs text-gray-500">
              Microphone: Default - Built-in Microphone
            </p>
          </div>
        </div>
        
        {/* Quick Tip - Responsive */}
        <div className="mt-4 xs:mt-6 
                       bg-blue-50 border border-blue-200 
                       rounded-lg sm:rounded-xl 
                       p-4 xs:p-5 sm:p-6">
          <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2 text-sm xs:text-base">
            <FileText className="w-4 h-4 xs:w-5 xs:h-5" />
            What happens next?
          </h4>
          <ol className="text-xs xs:text-sm text-blue-800 space-y-1 ml-5 xs:ml-6 list-decimal">
            <li>Your conversation will be transcribed in real-time</li>
            <li>AI will identify speaker (Doctor vs Patient)</li>
            <li>SOAP notes will be auto-generated</li>
            <li>You can review and edit before saving</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default NewSession