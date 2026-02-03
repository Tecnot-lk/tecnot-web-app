// ====================
// PATIENTS PAGE - FULLY RESPONSIVE
// View all patients and their session folders
// ====================

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Plus, Folder, Calendar, ChevronRight, X } from 'lucide-react'
import Header from '../components/Header'

function Patients() {
  const [showAddModal, setShowAddModal] = useState(false)
  
  const patients = [
    { 
      id: 1, 
      name: 'Malik', 
      code: '001', 
      sessions: 4,
      lastVisit: '25/11/2025',
      diagnosis: 'Leg pain'
    },
    { 
      id: 2, 
      name: 'Shiman', 
      code: '021', 
      sessions: 2,
      lastVisit: '30/11/2025',
      diagnosis: 'Chest pain'
    },
    { 
      id: 3, 
      name: 'Ibrahim', 
      code: '022', 
      sessions: 3,
      lastVisit: '03/01/2026',
      diagnosis: 'Stomach pain'
    },
    { 
      id: 4, 
      name: 'Sanuka', 
      code: '111', 
      sessions: 1,
      lastVisit: '10/01/2026',
      diagnosis: 'Leg pain'
    },
    { 
      id: 5, 
      name: 'Prajith', 
      code: '232', 
      sessions: 5,
      lastVisit: '15/01/2026',
      diagnosis: 'Migraine'
    },
  ]
  
  return (
    <div className="animate-fadeIn">
      <Header 
        title="Patient Records" 
        subtitle="Manage and view all your patient consultations"
      />
      
      {/* Main Content - Responsive padding */}
      <div className="p-3 xs:p-4 sm:p-6 lg:p-8">
        
        {/* Search and Add Patient - Responsive layout */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          
          {/* Search Bar - Full width on mobile */}
          <div className="flex items-center gap-2 bg-white border border-gray-200 
                         rounded-lg px-3 xs:px-4 py-2.5 xs:py-3 
                         w-full sm:max-w-md shadow-sm">
            <Search className="w-4 h-4 xs:w-5 xs:h-5 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search by patient name or code..."
              className="outline-none text-sm xs:text-base w-full"
            />
          </div>
          
          {/* Add Patient Button - Full width on mobile */}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 
                       bg-tecnot-primary text-white 
                       px-4 xs:px-6 py-2.5 xs:py-3 
                       rounded-lg font-medium 
                       hover:bg-tecnot-dark transition-smooth 
                       shadow-lg btn-glow
                       active:scale-95
                       text-sm xs:text-base
                       w-full sm:w-auto"
          >
            <Plus className="w-4 h-4 xs:w-5 xs:h-5" />
            <span className="hidden xs:inline">Add New Patient</span>
            <span className="xs:hidden">Add Patient</span>
          </button>
        </div>
        
        {/* Patient List - Responsive cards */}
        <div className="grid grid-cols-1 gap-3 xs:gap-4">
          {patients.map((patient) => (
            <Link
              key={patient.id}
              to={`/patient/${patient.code}`}
              className="bg-white rounded-lg sm:rounded-xl 
                       p-4 xs:p-5 sm:p-6 
                       shadow-sm card-hover border border-gray-100 group"
            >
              <div className="flex items-center justify-between gap-3">
                
                {/* Patient Info */}
                <div className="flex items-center gap-3 xs:gap-4 flex-1 min-w-0">
                  {/* Avatar */}
                  <div className="w-12 h-12 xs:w-14 xs:h-14 
                                rounded-full bg-tecnot-light 
                                flex items-center justify-center
                                flex-shrink-0">
                    <span className="text-lg xs:text-xl font-bold text-tecnot-primary">
                      {patient.name.charAt(0)}
                    </span>
                  </div>
                  
                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base xs:text-lg font-bold text-gray-900 truncate">
                      {patient.name} <span className="text-gray-400">/ {patient.code}</span>
                    </h3>
                    <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-4 mt-1 text-xs xs:text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Folder className="w-3 h-3 xs:w-4 xs:h-4 flex-shrink-0" />
                        <span className="truncate">{patient.sessions} sessions</span>
                      </span>
                      <span className="hidden xs:inline">•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 xs:w-4 xs:h-4 flex-shrink-0" />
                        <span className="truncate">Last: {patient.lastVisit}</span>
                      </span>
                    </div>
                    <p className="text-xs xs:text-sm text-gray-500 mt-1 truncate">
                      Latest: {patient.diagnosis}
                    </p>
                  </div>
                </div>
                
                {/* Arrow Icon */}
                <ChevronRight className="w-5 h-5 xs:w-6 xs:h-6 
                                       text-gray-400 
                                       group-hover:text-tecnot-primary 
                                       group-hover:translate-x-1 
                                       transition-smooth
                                       flex-shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Add Patient Modal - Responsive */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl 
                         p-5 xs:p-6 sm:p-8 
                         max-w-md w-full 
                         shadow-2xl
                         max-h-[90vh] overflow-y-auto">
            
            {/* Header with close button */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl xs:text-2xl font-bold text-gray-900">
                New Patient
              </h2>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-smooth"
              >
                <X className="w-5 h-5 xs:w-6 xs:h-6" />
              </button>
            </div>
            
            {/* Form */}
            <div className="space-y-3 xs:space-y-4">
              {/* Name Input */}
              <div>
                <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter patient name"
                  className="w-full px-3 xs:px-4 py-2.5 xs:py-3 
                           text-sm xs:text-base
                           border-2 border-tecnot-primary/30 rounded-lg 
                           outline-none focus:border-tecnot-primary transition-smooth"
                />
              </div>
              
              {/* Code Input */}
              <div>
                <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2">
                  Unique Code
                </label>
                <input
                  type="text"
                  placeholder="Enter unique code"
                  className="w-full px-3 xs:px-4 py-2.5 xs:py-3 
                           text-sm xs:text-base
                           border-2 border-tecnot-primary/30 rounded-lg 
                           outline-none focus:border-tecnot-primary transition-smooth"
                />
              </div>
            </div>
            
            {/* Buttons */}
            <div className="flex flex-col xs:flex-row gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 xs:px-6 py-2.5 xs:py-3 
                         border-2 border-gray-300 rounded-lg 
                         font-medium text-gray-700 
                         hover:bg-gray-50 transition-smooth
                         text-sm xs:text-base"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Patient added! (Demo only)')
                  setShowAddModal(false)
                }}
                className="flex-1 px-4 xs:px-6 py-2.5 xs:py-3 
                         bg-tecnot-primary text-white rounded-lg 
                         font-medium hover:bg-tecnot-dark transition-smooth
                         text-sm xs:text-base"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Patients