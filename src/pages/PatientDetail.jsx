import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Calendar, Eye, Plus } from 'lucide-react'
import Header from '../components/Header'
import { patientsData } from '../data/patientsData'

function PatientDetail() {
  // Get patient code from URL
  const { code } = useParams()
  
  // Find the patient with this code
  const patient = patientsData.find(p => p.code === code)
  
  // If patient not found, show error
  if (!patient) {
    return (
      <div className="animate-fadeIn">
        <Header title="Patient Not Found" subtitle="The requested patient could not be found" />
        <div className="p-4 sm:p-6 lg:p-8">
          <Link 
            to="/patients"
            className="inline-flex items-center gap-2 text-tecnot-primary hover:text-tecnot-dark transition-smooth"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Patients</span>
          </Link>
          <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-red-800">Patient with code "{code}" not found.</p>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="animate-fadeIn">
      <Header 
        title={`${patient.name}'s Folder`}
        subtitle={`Patient Code: ${patient.code}`}
      />
      
      <div className="p-4 sm:p-6 lg:p-8">
        
        {/* Back Button */}
        <Link 
          to="/patients"
          className="inline-flex items-center gap-2 text-tecnot-primary hover:text-tecnot-dark mb-6 transition-smooth"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Patients</span>
        </Link>
        
        {/* Patient Info Card */}
        <div className="bg-gradient-to-r from-tecnot-primary to-tecnot-dark text-white rounded-xl p-4 sm:p-6 mb-6 shadow-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="w-full sm:w-auto">
              <h2 className="text-xl sm:text-2xl font-bold mb-1 break-words">{patient.name} / {patient.code}</h2>
              <p className="text-tecnot-light text-sm sm:text-base">Total Sessions: {patient.sessions.length}</p>
            </div>
            <Link
              to="/new-session"
              className="flex items-center justify-center gap-2 bg-white text-tecnot-primary px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:shadow-xl transition-smooth text-sm sm:text-base w-full sm:w-auto whitespace-nowrap"
            >
              <Plus className="w-5 h-5" />
              Start New Session
            </Link>
          </div>
        </div>
        
        {/* Sessions List */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Consultation History</h3>
        
        <div className="grid grid-cols-1 gap-4">
          {patient.sessions.map((session) => (
            <div
              key={session.id}
              className="bg-white rounded-xl p-4 sm:p-6 shadow-sm card-hover border border-gray-100"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                
                {/* Session Info */}
                <div className="w-full sm:w-auto flex-1">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-tecnot-primary flex-shrink-0" />
                    <span className="font-semibold text-gray-900 text-sm sm:text-base">{session.date}</span>
                    <span className="text-xs sm:text-sm text-gray-500">{session.time}</span>
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base break-words">
                    Complaint: <span className="font-medium">{session.complaint}</span>
                  </p>
                </div>
                
                {/* View Button */}
                <Link
                  to={`/soap-note/${patient.code}/${session.id}`}
                  className="flex items-center justify-center gap-2 bg-tecnot-light text-tecnot-primary px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-tecnot-primary hover:text-white transition-smooth text-sm sm:text-base w-full sm:w-auto whitespace-nowrap"
                >
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  View SOAP Note
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