import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Calendar, Eye, Plus } from 'lucide-react'
import Header from '../components/Header'
import { patientsData } from '../data/patientsData' // Import shared data

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
        <div className="p-8">
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
      
      <div className="p-8">
        
        {/* Back Button */}
        <Link 
          to="/patients"
          className="inline-flex items-center gap-2 text-tecnot-primary hover:text-tecnot-dark mb-6 transition-smooth"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Patients</span>
        </Link>
        
        {/* Patient Info Card */}
        <div className="bg-gradient-to-r from-tecnot-primary to-tecnot-dark text-white rounded-xl p-6 mb-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">{patient.name} / {patient.code}</h2>
              <p className="text-tecnot-light">Total Sessions: {patient.sessions.length}</p>
            </div>
            <Link
              to="/new-session"
              className="flex items-center gap-2 bg-white text-tecnot-primary px-6 py-3 rounded-lg font-medium hover:shadow-xl transition-smooth"
            >
              <Plus className="w-5 h-5" />
              Start New Session
            </Link>
          </div>
        </div>
        
        {/* Sessions List */}
        <h3 className="text-xl font-bold text-gray-900 mb-4">Consultation History</h3>
        
        <div className="grid grid-cols-1 gap-4">
          {patient.sessions.map((session) => (
            <div
              key={session.id}
              className="bg-white rounded-xl p-6 shadow-sm card-hover border border-gray-100"
            >
              <div className="flex items-center justify-between">
                
                {/* Session Info */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-tecnot-primary" />
                    <span className="font-semibold text-gray-900">{session.date}</span>
                    <span className="text-sm text-gray-500">{session.time}</span>
                  </div>
                  <p className="text-gray-700">Complaint: <span className="font-medium">{session.complaint}</span></p>
                </div>
                
                {/* View Button */}
                <Link
                  to={`/soap-note/${patient.code}/${session.id}`}
                  className="flex items-center gap-2 bg-tecnot-light text-tecnot-primary px-6 py-3 rounded-lg font-medium hover:bg-tecnot-primary hover:text-white transition-smooth"
                >
                  <Eye className="w-5 h-5" />
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