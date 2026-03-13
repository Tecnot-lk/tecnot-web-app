// =============================================================================
// PATIENTS PAGE - PATIENT LIST & SEARCH
// =============================================================================
//
// PURPOSE:
// - Display all patients in a searchable grid
// - Add new patients
// - Navigate to individual patient details
//
// BACKEND INTEGRATION POINTS:
// - Line 65: fetchPatients() - GET /api/patients
// - Line 145: handleSavePatient() - POST /api/patients
//
// FEATURES:
// - Real-time search (filters as you type)
// - Add patient modal with form validation
// - Responsive grid layout
// - Auto-calculate age from DOB
//
// =============================================================================

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, User, Plus, X, Loader2 } from 'lucide-react'
import Header from '../components/Header'
import AddPatientModal from '../components/AddPatientModal'
import 'react-datepicker/dist/react-datepicker.css'
import * as patientService from '../services/patientService'

function Patients() {
  // ==========================================================================
  // STATE MANAGEMENT
  // ==========================================================================
  
  // List of all patients
  const [patients, setPatients] = useState([])
  
  // Loading state
  const [loading, setLoading] = useState(true)
  
  // Search query
  const [searchQuery, setSearchQuery] = useState('')
  
  // Add patient modal visibility
  const [showAddModal, setShowAddModal] = useState(false)
  

  // ==========================================================================
  // EFFECT: FETCH PATIENTS ON MOUNT
  // ==========================================================================
  useEffect(() => {
    fetchPatients()
  }, [])

  // ==========================================================================
  // FUNCTION: FETCH PATIENTS FROM BACKEND
  // ==========================================================================
  /**
   * Fetches all patients from backend
   * 
   * BACKEND INTEGRATION:
   * - Endpoint: GET /api/patients
   * - Expected response: { results: Array, total: number }
   * 
   * ERROR HANDLING:
   * - Falls back to dummy data if backend fails
   * - In production, show error message instead
   */
  const fetchPatients = async () => {
    try {
      setLoading(true)
      
      // Call backend API
      const data = await patientService.getPatients()
      console.log('API Response:', data)
      console.log('Patients from API:', data.results)
      
      // Update state with results
      setPatients(data.results || [])
      
    } catch (error) {
      console.error('Error fetching patients:', error)
      console.log('Using dummy data fallback')
      
      // FALLBACK: Dummy data for frontend development
      // TODO: Remove in production, show error message instead
      const dummyData = [
        { 
          id: '1', 
          mrn: 'MRN001234', 
          first_name: 'Malik', 
          last_name: 'Hanaffi', 
          age: 38, 
          gender: 'Male', 
          mobile_number: '+94771234567', 
          national_id: '851234567V' 
        },
        { 
          id: '2', 
          mrn: 'MRN005678', 
          first_name: 'Shiman', 
          last_name: 'Nafaas', 
          age: 35, 
          gender: 'Male', 
          mobile_number: '+94712345678', 
          national_id: '901234567V' 
        },
        { 
          id: '3', 
          mrn: 'MRN009012', 
          first_name: 'Shimani', 
          last_name: 'Khan', 
          age: 42, 
          gender: 'Female', 
          mobile_number: '+94763456789', 
          national_id: '821234567V' 
        },
      ]
      console.log('Dummy patients loaded:', dummyData)
      setPatients(dummyData)
      
    } finally {
      setLoading(false)
    }
  }

  // ==========================================================================
  // FILTERED PATIENTS
  // ==========================================================================
  /**
   * Filters patients based on search query
   * 
   * SEARCHES:
   * - First name
   * - Last name
   * - MRN
   * - Mobile number
   * - National ID
   * 
   * NOTE: Search is case-insensitive and searches all fields
   */
  const filteredPatients = patients.filter(patient => {
    const query = searchQuery.toLowerCase()
    
    // Debug logging for first patient only (avoid spam)
    if (searchQuery && patient.id === patients[0]?.id) {
      console.log('=== SEARCH DEBUG ===')
      console.log('Search query:', query)
      console.log('Patient national_id:', patient.national_id)
      console.log('National ID match:', patient.national_id?.toLowerCase().includes(query))
      console.log('==================')
    }
    
    return (
      patient.first_name?.toLowerCase().includes(query) ||
      patient.last_name?.toLowerCase().includes(query) ||
      patient.mrn?.toLowerCase().includes(query) ||
      patient.mobile_number?.includes(query) ||
      patient.national_id?.toLowerCase().includes(query)
    )
  })

  // ==========================================================================
  // RENDER
  // ==========================================================================
  return (
    <div className="animate-fadeIn w-full min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header title="Patient Records" subtitle="Manage your patients" />
      
      <div className="w-full px-3 xs:px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-[1600px] mx-auto">
        
        {/* ====================================================================
            SEARCH BAR + ADD PATIENT BUTTON
            ==================================================================== */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
          
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search patients by name, MRN, or mobile number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none 
                       focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                       transition-all text-sm xs:text-base
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          {/* Add Patient Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 bg-tecnot-primary dark:bg-tecnot-light text-white dark:text-gray-900
                     px-4 xs:px-6 py-3 rounded-lg font-medium hover:bg-tecnot-dark dark:hover:bg-tecnot-primary
                     transition-smooth shadow-lg text-sm xs:text-base whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            Add Patient
          </button>
        </div>

        {/* ====================================================================
            PATIENT GRID
            ==================================================================== */}
        {loading ? (
          // Loading Spinner
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-tecnot-primary dark:text-tecnot-light" />
          </div>
        ) : filteredPatients.length === 0 ? (
          // Empty State
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-sm xs:text-base">
              {searchQuery ? 'No patients found matching your search.' : 'No patients yet. Add your first patient to get started.'}
            </p>
          </div>
        ) : (
          // Patient Cards Grid
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {filteredPatients.map((patient) => (
              <Link
                key={patient.id}
                to={`/patient/${patient.mrn}`}
                className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 xs:p-5 sm:p-6 shadow-sm 
                         border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200
                         card-hover"
              >
                <div className="flex items-start gap-3 xs:gap-4 mb-3">
                  
                  {/* Avatar - Color based on gender */}
                  <div className={`w-12 h-12 xs:w-14 xs:h-14 rounded-full flex items-center justify-center 
                                text-white font-bold text-lg xs:text-xl flex-shrink-0
                                ${patient.gender === 'Female' ? 'bg-pink-500' : patient.gender === 'Male' ? 'bg-blue-500' : 'bg-gray-500'}`}>
                    {patient.first_name?.charAt(0)}
                  </div>
                  
                  {/* Patient Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 dark:text-white text-base xs:text-lg truncate">
                      {patient.first_name} {patient.last_name}
                    </h3>
                    <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400">
                      MRN: {patient.mrn}
                    </p>
                  </div>
                </div>

                {/* Patient Details */}
                <div className="space-y-1.5 text-xs xs:text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex justify-between">
                    <span>Age:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{patient.age} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gender:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{patient.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Contact:</span>
                    <span className="font-medium text-gray-900 dark:text-white truncate ml-2">{patient.mobile_number}</span>
                  </div>
                </div>

                {/* View Details Link */}
                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-xs xs:text-sm text-tecnot-primary dark:text-tecnot-light font-medium">
                    View Details →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* ====================================================================
          ADD PATIENT MODAL
          ==================================================================== */}
      {showAddModal && (
          <AddPatientModal
            onClose={() => setShowAddModal(false)}
            onSuccess={() => {
              fetchPatients()
              setShowAddModal(false)
            }}
          />
        )}
    </div>
  )
}

export default Patients