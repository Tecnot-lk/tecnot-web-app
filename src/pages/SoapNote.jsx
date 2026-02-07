// ====================
// SOAP NOTE PAGE
// View and edit SOAP notes
// ====================

import React, { useState } from 'react'
import { ArrowLeft, Download, Edit, Save, User, Calendar, Cake } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import Header from '../components/Header'
import { soapNotesData } from '../data/soapNotesData'
import { patientsData } from '../data/patientsData'

function SoapNote() {
  // Get both patient code and session ID from URL
  const { code, sessionId } = useParams()
  
  // Find the SOAP note for this specific session
  const originalSoapNote = soapNotesData.find(note => 
    note.sessionId === parseInt(sessionId) && note.patientCode === code
  )
  
  // Find the patient data to get DOB and age
  const patientData = patientsData.find(p => p.code === code)
  
  // State to toggle edit mode
  const [isEditing, setIsEditing] = useState(false)
  
  // State for SOAP note data (initialized from found note or default)
  const [soapData, setSoapData] = useState(
    originalSoapNote ? {
      patient: `${originalSoapNote.patientName} / ${originalSoapNote.patientCode}`,
      date: originalSoapNote.date,
      time: originalSoapNote.time,
      complaint: originalSoapNote.complaint,
      subjective: originalSoapNote.subjective,
      objective: originalSoapNote.objective,
      assessment: originalSoapNote.assessment,
      plan: originalSoapNote.plan
    } : null
  )
  
  // Handle save changes
  const handleSave = () => {
    setIsEditing(false)
    alert('Changes saved! (In production, this would update the database)')
  }
  
  // Handle export to PDF
  const handleExport = () => {
    alert('PDF export feature will be added with backend integration!')
    // In real app, this would generate and download PDF
  }
  
  // If SOAP note not found, show error
  if (!soapData) {
    return (
      <div className="animate-fadeIn">
        <Header title="SOAP Note Not Found" subtitle="The requested consultation record could not be found" />
        <div className="p-4 sm:p-6 lg:p-8">
          <Link 
            to={`/patient/${code}`}
            className="inline-flex items-center gap-2 text-tecnot-primary hover:text-tecnot-dark transition-smooth"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Patient</span>
          </Link>
          <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-red-800">SOAP note for session #{sessionId} not found.</p>
          </div>
        </div>
      </div>
    )
  }

  const SectionTitle = ({ children, icon: Icon }) => (
    <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-tecnot-primary">
      {Icon && <Icon className="w-5 h-5 text-tecnot-primary" />}
      <h3 className="font-bold text-gray-900 text-sm xs:text-base sm:text-lg">{children}</h3>
    </div>
  )

  const ReadOnlyField = ({ label, value }) => (
    <div className="bg-gray-50 rounded-lg p-3 xs:p-4">
      <label className="block text-xs xs:text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <p className="text-sm xs:text-base text-gray-900 whitespace-pre-wrap">{value || 'None'}</p>
    </div>
  )

  const EditableField = ({ label, value, field, rows = 4 }) => (
    <div>
      <label className="block text-xs xs:text-sm font-semibold text-gray-700 mb-2">{label}</label>
      {isEditing ? (
        <textarea
          value={value}
          onChange={(e) => handleChange(field, e.target.value)}
          rows={rows}
          className="w-full px-3 xs:px-4 py-2 xs:py-3 border-2 border-gray-200 rounded-lg 
                   outline-none focus:border-tecnot-primary focus:ring-4 
                   focus:ring-tecnot-primary/20 transition-all resize-none
                   text-sm xs:text-base"
        />
      ) : (
        <div className="bg-white border-2 border-gray-200 rounded-lg p-3 xs:p-4">
          <p className="text-sm xs:text-base text-gray-900 whitespace-pre-wrap">{value || 'None'}</p>
        </div>
      )}
    </div>
  )

  return (
    <div className="animate-fadeIn w-full">
      <Header title="SOAP Note" subtitle={`${patient.first_name} ${patient.last_name}`} />
      
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
        
        {/* Top Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
          <Link 
            to={`/patient/${code}`}
            className="inline-flex items-center gap-2 text-tecnot-primary hover:text-tecnot-dark transition-smooth"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium text-sm sm:text-base">Back to {originalSoapNote.patientName}'s Folder</span>
          </Link>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-lg font-medium transition-smooth text-sm sm:text-base ${
                isEditing
                  ? 'bg-tecnot-primary text-white hover:bg-tecnot-dark'
                  : 'border-2 border-tecnot-primary text-tecnot-primary hover:bg-tecnot-light'
              }`}
            >
              {isEditing ? <Save className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
              {isEditing ? 'Save Changes' : 'Edit Note'}
            </button>
            
            <button
              onClick={handleExport}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 sm:px-6 py-3 rounded-lg font-medium hover:shadow-xl transition-smooth text-sm sm:text-base"
            >
              <Download className="w-5 h-5" />
              Share as PDF
            </button>
          </div>
        </div>
        
        {/* SOAP Note Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          
          {/* Header with Patient Info */}
          <div className="bg-gradient-to-r from-tecnot-primary to-tecnot-dark text-white p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-3 mb-4">
              <h2 className="text-xl sm:text-2xl font-bold break-words">{soapData.patient}</h2>
              <div className="bg-white/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap">
                Consultation Completed
              </div>
            </div>
            
            {/* Patient Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <span className="text-tecnot-light block text-xs">Consultation Date</span>
                  <span className="font-medium break-words">{soapData.date} at {soapData.time}</span>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <User className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <span className="text-tecnot-light block text-xs">Chief Complaint</span>
                  <span className="font-medium break-words">{soapData.complaint}</span>
                </div>
              </div>
              
              {patientData && (
                <>
                  <div className="flex items-start gap-2">
                    <Cake className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <span className="text-tecnot-light block text-xs">Date of Birth</span>
                      <span className="font-medium">{patientData.dob}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <User className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <span className="text-tecnot-light block text-xs">Age</span>
                      <span className="font-medium">{patientData.age} years</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          
          {/* SOAP Sections */}
          <div className="p-4 sm:p-6 lg:p-8 space-y-6">
            
            {/* Subjective */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold text-base sm:text-lg">S</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Subjective</h3>
              </div>
              {isEditing ? (
                <textarea
                  value={soapData.subjective}
                  onChange={(e) => setSoapData({...soapData, subjective: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-tecnot-primary/30 rounded-lg outline-none focus:border-tecnot-primary transition-smooth resize-none text-sm sm:text-base"
                  rows="4"
                />
              ) : (
                <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-line text-gray-700 text-sm sm:text-base">
                  {soapData.subjective}
                </div>
              )}
            </div>
            
            {/* Objective */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-emerald-600 font-bold text-base sm:text-lg">O</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Objective</h3>
              </div>
              {isEditing ? (
                <textarea
                  value={soapData.objective}
                  onChange={(e) => setSoapData({...soapData, objective: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-tecnot-primary/30 rounded-lg outline-none focus:border-tecnot-primary transition-smooth resize-none text-sm sm:text-base"
                  rows="4"
                />
              ) : (
                <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-line text-gray-700 text-sm sm:text-base">
                  {soapData.objective}
                </div>
              )}
            </div>
            
            {/* Assessment */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 font-bold text-base sm:text-lg">A</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Assessment</h3>
              </div>
              {isEditing ? (
                <textarea
                  value={soapData.assessment}
                  onChange={(e) => setSoapData({...soapData, assessment: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-tecnot-primary/30 rounded-lg outline-none focus:border-tecnot-primary transition-smooth resize-none text-sm sm:text-base"
                  rows="3"
                />
              ) : (
                <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-line text-gray-700 text-sm sm:text-base">
                  {soapData.assessment}
                </div>
              )}
            </div>
            
            {/* Plan */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-600 font-bold text-base sm:text-lg">P</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Plan</h3>
              </div>
              {isEditing ? (
                <textarea
                  value={soapData.plan}
                  onChange={(e) => setSoapData({...soapData, plan: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-tecnot-primary/30 rounded-lg outline-none focus:border-tecnot-primary transition-smooth resize-none text-sm sm:text-base"
                  rows="5"
                />
              ) : (
                <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-line text-gray-700 text-sm sm:text-base">
                  {soapData.plan}
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="bg-gray-50 border-t border-gray-200 p-4 sm:p-6">
            <p className="text-xs sm:text-sm text-gray-600 text-center">
              Generated by TECNOT AI Clinical Scribe • Review carefully before sharing with patients
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SoapNote