// ====================
// PATIENT DETAIL PAGE - FULLY RESPONSIVE
// Shows a specific patient's session folder
// ====================

import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Calendar, Eye, Plus } from 'lucide-react'
import Header from '../components/Header'

function PatientDetail() {
  const { code } = useParams()
  
  const patient = {
    name: 'Malik',
    code: code,
    sessions: [
      { id: 1, date: '25/11/2025', complaint: 'Leg pain', time: '10:17am' },
      { id: 2, date: '30/11/2025', complaint: 'Chest pain', time: '02:30pm' },
      { id: 3, date: '03/01/2026', complaint: 'Stomach pain', time: '11:45am' },
      { id: 4, date: '10/01/2026', complaint: 'Leg pain', time: '09:15am' },
    ]
  }
  
  return (
    <div className="animate-fadeIn">
      <Header 
        title={`${patient.name}'s Folder`}
        subtitle={`Patient Code: ${patient.code}`}
      />
      
      {/* Main Content - Responsive padding */}
      <div className="p-3 xs:p-4 sm:p-6 lg:p-8">
        
        {/* Back Button */}
        <Link 
          to="/patients"
          className="inline-flex items-center gap-2 
                   text-tecnot-primary hover:text-tecnot-dark 
                   mb-4 xs:mb-6 transition-smooth
                   text-sm xs:text-base"
        >
          <ArrowLeft className="w-4 h-4 xs:w-5 xs:h-5" />
          <span className="font-medium">Back to Patients</span>
        </Link>
        
        {/* Patient Info Card - Responsive */}
        <div className="bg-gradient-to-r from-tecnot-primary to-tecnot-dark 
                       text-white rounded-lg sm:rounded-xl 
                       p-4 xs:p-5 sm:p-6 
                       mb-4 xs:mb-6 shadow-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl xs:text-2xl font-bold mb-1">
                {patient.name} / {patient.code}
              </h2>
              <p className="text-tecnot-light text-sm xs:text-base">
                Total Sessions: {patient.sessions.length}
              </p>
            </div>
            <Link
              to="/new-session"
              className="flex items-center gap-2 
                       bg-white text-tecnot-primary 
                       px-4 xs:px-6 py-2.5 xs:py-3 
                       rounded-lg font-medium 
                       hover:shadow-xl transition-smooth
                       text-sm xs:text-base
                       w-full sm:w-auto justify-center"
            >
              <Plus className="w-4 h-4 xs:w-5 xs:h-5" />
              <span>Start New Session</span>
            </Link>
          </div>
        </div>
        
        {/* Sessions List */}
        <h3 className="text-lg xs:text-xl font-bold text-gray-900 mb-3 xs:mb-4">
          Consultation History
        </h3>
        
        <div className="grid grid-cols-1 gap-3 xs:gap-4">
          {patient.sessions.map((session) => (
            <div
              key={session.id}
              className="bg-white rounded-lg sm:rounded-xl 
                       p-4 xs:p-5 sm:p-6 
                       shadow-sm card-hover border border-gray-100"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                
                {/* Session Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 xs:gap-3 mb-2">
                    <Calendar className="w-4 h-4 xs:w-5 xs:h-5 text-tecnot-primary flex-shrink-0" />
                    <span className="font-semibold text-gray-900 text-sm xs:text-base">
                      {session.date}
                    </span>
                    <span className="text-xs xs:text-sm text-gray-500">
                      {session.time}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm xs:text-base">
                    Complaint: <span className="font-medium">{session.complaint}</span>
                  </p>
                </div>
                
                {/* View Button */}
                <Link
                  to={`/soap-note/${session.id}`}
                  className="flex items-center justify-center gap-2 
                           bg-tecnot-light text-tecnot-primary 
                           px-4 xs:px-6 py-2.5 xs:py-3 
                           rounded-lg font-medium 
                           hover:bg-tecnot-primary hover:text-white 
                           transition-smooth
                           text-sm xs:text-base
                           w-full sm:w-auto"
                >
                  <Eye className="w-4 h-4 xs:w-5 xs:h-5" />
                  <span>View SOAP Note</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PatientDetail