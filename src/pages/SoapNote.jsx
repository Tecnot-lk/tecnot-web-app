// ====================
// SOAP NOTE PAGE - FULLY RESPONSIVE
// View and edit SOAP notes
// ====================

import React, { useState } from 'react'
import { ArrowLeft, Download, Edit, Save } from 'lucide-react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'

function SoapNote() {
  const [isEditing, setIsEditing] = useState(false)
  
  const [soapData, setSoapData] = useState({
    patient: 'Malik / 001',
    date: '25/11/2025',
    time: '10:17am',
    subjective: '- Reporting leg pain\n- Duration: Long time\n- Patient mentions difficulty walking',
    objective: '1. Acute leg pain likely due to muscle strain\n2. No swelling, redness, numbness, or red-flag symptoms observed',
    assessment: 'Muscle strain in right leg. No signs of serious injury or fracture.',
    plan: '1. Rest + ice for 24-48 hours; take paracetamol/ibuprofen if needed\n2. Light stretching after 48 hours\n3. Return if pain worsens or no improvement in 1 week'
  })
  
  const handleExport = () => {
    alert('PDF export feature will be added with backend integration!')
  }
  
  return (
    <div className="animate-fadeIn">
      <Header 
        title="SOAP Note" 
        subtitle={`${soapData.patient} - ${soapData.date} ${soapData.time}`}
      />
      
      {/* Main Content - Responsive padding */}
      <div className="p-3 xs:p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
        
        {/* Top Actions - Responsive layout */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 xs:mb-6">
          <Link 
            to="/patients"
            className="inline-flex items-center gap-2 
                     text-tecnot-primary hover:text-tecnot-dark 
                     transition-smooth
                     text-sm xs:text-base"
          >
            <ArrowLeft className="w-4 h-4 xs:w-5 xs:h-5" />
            <span className="font-medium">Back to Patients</span>
          </Link>
          
          <div className="flex flex-col xs:flex-row gap-2 xs:gap-3 w-full sm:w-auto">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center justify-center gap-2 
                       px-4 xs:px-6 py-2.5 xs:py-3 
                       rounded-lg font-medium 
                       transition-smooth
                       text-sm xs:text-base
                       ${isEditing
                         ? 'bg-tecnot-primary text-white hover:bg-tecnot-dark'
                         : 'border-2 border-tecnot-primary text-tecnot-primary hover:bg-tecnot-light'
                       }`}
            >
              {isEditing ? <Save className="w-4 h-4 xs:w-5 xs:h-5" /> : <Edit className="w-4 h-4 xs:w-5 xs:h-5" />}
              {isEditing ? 'Save Changes' : 'Edit Note'}
            </button>
            
            <button
              onClick={handleExport}
              className="flex items-center justify-center gap-2 
                       bg-gradient-to-r from-blue-500 to-purple-500 
                       text-white 
                       px-4 xs:px-6 py-2.5 xs:py-3 
                       rounded-lg font-medium 
                       hover:shadow-xl transition-smooth
                       text-sm xs:text-base"
            >
              <Download className="w-4 h-4 xs:w-5 xs:h-5" />
              <span className="hidden xs:inline">Share as PDF</span>
              <span className="xs:hidden">PDF</span>
            </button>
          </div>
        </div>
        
        {/* SOAP Note Card - Responsive */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          
          {/* Header - Responsive */}
          <div className="bg-gradient-to-r from-tecnot-primary to-tecnot-dark text-white 
                         p-4 xs:p-5 sm:p-6">
            <h2 className="text-xl xs:text-2xl font-bold mb-2">
              {soapData.patient}
            </h2>
            <div className="flex flex-wrap items-center gap-2 xs:gap-4 sm:gap-6 
                           text-tecnot-light text-xs xs:text-sm">
              <span>{soapData.date}</span>
              <span className="hidden xs:inline">•</span>
              <span>{soapData.time}</span>
              <span className="hidden xs:inline">•</span>
              <span className="bg-white/20 px-2 xs:px-3 py-1 rounded-full text-[10px] xs:text-xs">
                Consultation completed
              </span>
            </div>
          </div>
          
          {/* SOAP Sections - Responsive */}
          <div className="p-4 xs:p-6 sm:p-8 space-y-4 xs:space-y-6">
            
            {/* Subjective */}
            <div>
              <div className="flex items-center gap-2 xs:gap-3 mb-2 xs:mb-3">
                <div className="w-8 h-8 xs:w-10 xs:h-10 
                               rounded-lg bg-blue-100 
                               flex items-center justify-center
                               flex-shrink-0">
                  <span className="text-blue-600 font-bold text-base xs:text-lg">S</span>
                </div>
                <h3 className="text-lg xs:text-xl font-bold text-gray-900">Subjective</h3>
              </div>
              {isEditing ? (
                <textarea
                  value={soapData.subjective}
                  onChange={(e) => setSoapData({...soapData, subjective: e.target.value})}
                  className="w-full px-3 xs:px-4 py-2.5 xs:py-3 
                           text-sm xs:text-base
                           border-2 border-tecnot-primary/30 rounded-lg 
                           outline-none focus:border-tecnot-primary 
                           transition-smooth resize-none"
                  rows="4"
                />
              ) : (
                <div className="bg-gray-50 rounded-lg p-3 xs:p-4 
                               whitespace-pre-line text-gray-700
                               text-sm xs:text-base">
                  {soapData.subjective}
                </div>
              )}
            </div>
            
            {/* Objective */}
            <div>
              <div className="flex items-center gap-2 xs:gap-3 mb-2 xs:mb-3">
                <div className="w-8 h-8 xs:w-10 xs:h-10 
                               rounded-lg bg-emerald-100 
                               flex items-center justify-center
                               flex-shrink-0">
                  <span className="text-emerald-600 font-bold text-base xs:text-lg">O</span>
                </div>
                <h3 className="text-lg xs:text-xl font-bold text-gray-900">Objective</h3>
              </div>
              {isEditing ? (
                <textarea
                  value={soapData.objective}
                  onChange={(e) => setSoapData({...soapData, objective: e.target.value})}
                  className="w-full px-3 xs:px-4 py-2.5 xs:py-3 
                           text-sm xs:text-base
                           border-2 border-tecnot-primary/30 rounded-lg 
                           outline-none focus:border-tecnot-primary 
                           transition-smooth resize-none"
                  rows="4"
                />
              ) : (
                <div className="bg-gray-50 rounded-lg p-3 xs:p-4 
                               whitespace-pre-line text-gray-700
                               text-sm xs:text-base">
                  {soapData.objective}
                </div>
              )}
            </div>
            
            {/* Assessment */}
            <div>
              <div className="flex items-center gap-2 xs:gap-3 mb-2 xs:mb-3">
                <div className="w-8 h-8 xs:w-10 xs:h-10 
                               rounded-lg bg-purple-100 
                               flex items-center justify-center
                               flex-shrink-0">
                  <span className="text-purple-600 font-bold text-base xs:text-lg">A</span>
                </div>
                <h3 className="text-lg xs:text-xl font-bold text-gray-900">Assessment</h3>
              </div>
              {isEditing ? (
                <textarea
                  value={soapData.assessment}
                  onChange={(e) => setSoapData({...soapData, assessment: e.target.value})}
                  className="w-full px-3 xs:px-4 py-2.5 xs:py-3 
                           text-sm xs:text-base
                           border-2 border-tecnot-primary/30 rounded-lg 
                           outline-none focus:border-tecnot-primary 
                           transition-smooth resize-none"
                  rows="3"
                />
              ) : (
                <div className="bg-gray-50 rounded-lg p-3 xs:p-4 
                               whitespace-pre-line text-gray-700
                               text-sm xs:text-base">
                  {soapData.assessment}
                </div>
              )}
            </div>
            
            {/* Plan */}
            <div>
              <div className="flex items-center gap-2 xs:gap-3 mb-2 xs:mb-3">
                <div className="w-8 h-8 xs:w-10 xs:h-10 
                               rounded-lg bg-orange-100 
                               flex items-center justify-center
                               flex-shrink-0">
                  <span className="text-orange-600 font-bold text-base xs:text-lg">P</span>
                </div>
                <h3 className="text-lg xs:text-xl font-bold text-gray-900">Plan</h3>
              </div>
              {isEditing ? (
                <textarea
                  value={soapData.plan}
                  onChange={(e) => setSoapData({...soapData, plan: e.target.value})}
                  className="w-full px-3 xs:px-4 py-2.5 xs:py-3 
                           text-sm xs:text-base
                           border-2 border-tecnot-primary/30 rounded-lg 
                           outline-none focus:border-tecnot-primary 
                           transition-smooth resize-none"
                  rows="5"
                />
              ) : (
                <div className="bg-gray-50 rounded-lg p-3 xs:p-4 
                               whitespace-pre-line text-gray-700
                               text-sm xs:text-base">
                  {soapData.plan}
                </div>
              )}
            </div>
          </div>
          
          {/* Footer - Responsive */}
          <div className="bg-gray-50 border-t border-gray-200 p-4 xs:p-6">
            <p className="text-xs xs:text-sm text-gray-600 text-center">
              Generated by TECNOT AI Clinical Scribe • Review carefully before sharing with patients
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SoapNote