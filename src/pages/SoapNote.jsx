// ====================
// SOAP NOTE PAGE
// View and edit SOAP notes
// ====================

import React, { useState } from 'react'
import { ArrowLeft, Download, Edit, Save, User, Calendar, Cake } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import Header from '../components/Header'
import { soapNoteData } from '../data/soapNotesData'
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
        <div className="p-8">
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
  
  return (
    <div className="animate-fadeIn">
      <Header 
        title="SOAP Note" 
        subtitle={`${soapData.patient} - ${soapData.date} ${soapData.time}`}
      />
      
      <div className="p-8 max-w-5xl mx-auto">
        
        {/* Top Actions */}
        <div className="flex items-center justify-between mb-6">
          <Link 
            to={`/patient/${code}`}
            className="inline-flex items-center gap-2 text-tecnot-primary hover:text-tecnot-dark transition-smooth"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to {originalSoapNote.patientName}'s Folder</span>
          </Link>
          
          <div className="flex gap-3">
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-smooth ${
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
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:shadow-xl transition-smooth"
            >
              <Download className="w-5 h-5" />
              Share as PDF
            </button>
          </div>
        </div>
        
        {/* SOAP Note Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          
          {/* Header with Patient Info */}
          <div className="bg-gradient-to-r from-tecnot-primary to-tecnot-dark text-white p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-2xl font-bold">{soapData.patient}</h2>
              <div className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
                Consultation Completed
              </div>
            </div>
            
            {/* Patient Details Grid */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <div>
                  <span className="text-tecnot-light block text-xs">Consultation Date</span>
                  <span className="font-medium">{soapData.date} at {soapData.time}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <div>
                  <span className="text-tecnot-light block text-xs">Chief Complaint</span>
                  <span className="font-medium">{soapData.complaint}</span>
                </div>
              </div>
              
              {patientData && (
                <>
                  <div className="flex items-center gap-2">
                    <Cake className="w-4 h-4" />
                    <div>
                      <span className="text-tecnot-light block text-xs">Date of Birth</span>
                      <span className="font-medium">{patientData.dob}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <div>
                      <span className="text-tecnot-light block text-xs">Age</span>
                      <span className="font-medium">{patientData.age} years</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          
          {/* SOAP Sections */}
          <div className="p-8 space-y-6">
            
            {/* Subjective */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-lg">S</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Subjective</h3>
              </div>
              {isEditing ? (
                <textarea
                  value={soapData.subjective}
                  onChange={(e) => setSoapData({...soapData, subjective: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-tecnot-primary/30 rounded-lg outline-none focus:border-tecnot-primary transition-smooth resize-none"
                  rows="4"
                />
              ) : (
                <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-line text-gray-700">
                  {soapData.subjective}
                </div>
              )}
            </div>
            
            {/* Objective */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <span className="text-emerald-600 font-bold text-lg">O</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Objective</h3>
              </div>
              {isEditing ? (
                <textarea
                  value={soapData.objective}
                  onChange={(e) => setSoapData({...soapData, objective: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-tecnot-primary/30 rounded-lg outline-none focus:border-tecnot-primary transition-smooth resize-none"
                  rows="4"
                />
              ) : (
                <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-line text-gray-700">
                  {soapData.objective}
                </div>
              )}
            </div>
            
            {/* Assessment */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-lg">A</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Assessment</h3>
              </div>
              {isEditing ? (
                <textarea
                  value={soapData.assessment}
                  onChange={(e) => setSoapData({...soapData, assessment: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-tecnot-primary/30 rounded-lg outline-none focus:border-tecnot-primary transition-smooth resize-none"
                  rows="3"
                />
              ) : (
                <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-line text-gray-700">
                  {soapData.assessment}
                </div>
              )}
            </div>
            
            {/* Plan */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                  <span className="text-orange-600 font-bold text-lg">P</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Plan</h3>
              </div>
              {isEditing ? (
                <textarea
                  value={soapData.plan}
                  onChange={(e) => setSoapData({...soapData, plan: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-tecnot-primary/30 rounded-lg outline-none focus:border-tecnot-primary transition-smooth resize-none"
                  rows="5"
                />
              ) : (
                <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-line text-gray-700">
                  {soapData.plan}
                </div>
              )}
            </div>
          </div>
          
          {/* Footer */}
          <div className="bg-gray-50 border-t border-gray-200 p-6">
            <p className="text-sm text-gray-600 text-center">
              Generated by TECNOT AI Clinical Scribe • Review carefully before sharing with patients
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SoapNote