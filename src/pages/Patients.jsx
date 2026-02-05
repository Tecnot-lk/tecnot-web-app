import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Plus, Folder, Calendar, ChevronRight, X } from 'lucide-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Header from '../components/Header'
import { patientsData } from '../data/patientsData'

function Patients() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearchDropdown, setShowSearchDropdown] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const navigate = useNavigate()
  
  // Calculate summary data for each patient
  const patients = patientsData.map(patient => ({
    ...patient,
    sessionCount: patient.sessions.length,
    lastVisit: patient.sessions[patient.sessions.length - 1]?.date || 'N/A',
    diagnosis: patient.sessions[patient.sessions.length - 1]?.complaint || 'N/A'
  }))
  
  // Filter patients based on search query
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.code.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  // Handle patient selection from dropdown
  const handlePatientSelect = (patientCode) => {
    navigate(`/patient/${patientCode}`)
    setSearchQuery('')
    setShowSearchDropdown(false)
  }
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    setShowSearchDropdown(e.target.value.length > 0)
  }
  
  return (
    <div className="animate-fadeIn">
      <Header 
        title="Patient Records" 
        subtitle="Manage and view all your patient consultations"
      />
      
      <div className="p-8">
        
        {/* Search and Add Patient */}
        <div className="flex items-center justify-between mb-6">
          
          {/* Search Bar with Dropdown */}
          <div className="relative w-full max-w-md">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by patient name or MRN"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => searchQuery && setShowSearchDropdown(true)}
                className="outline-none text-sm w-full"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setShowSearchDropdown(false)
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {/* Search Dropdown */}
            {showSearchDropdown && filteredPatients.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
                {filteredPatients.map((patient) => (
                  <button
                    key={patient.id}
                    onClick={() => handlePatientSelect(patient.code)}
                    className="w-full px-4 py-3 hover:bg-gray-50 transition-smooth text-left border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full bg-tecnot-light flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-tecnot-primary">
                          {patient.name.charAt(0)}
                        </span>
                      </div>
                      
                      {/* Patient Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900">{patient.name}</span>
                          <span className="text-sm text-gray-400">/ {patient.code}</span>
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                          <span>{patient.sessionCount} sessions</span>
                          <span>•</span>
                          <span>Last: {patient.lastVisit}</span>
                        </div>
                      </div>
                      
                      {/* Arrow */}
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </button>
                ))}
              </div>
            )}
            
            {/* No Results Found */}
            {showSearchDropdown && searchQuery && filteredPatients.length === 0 && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-200 z-50 p-4 text-center">
                <p className="text-gray-500 text-sm">No patients found matching "{searchQuery}"</p>
              </div>
            )}
          </div>
          
          {/* Add Patient Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-tecnot-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-tecnot-dark transition-smooth shadow-lg btn-glow"
          >
            <Plus className="w-5 h-5" />
            Add New Patient
          </button>
        </div>
        
        {/* Patient List */}
        <div className="grid grid-cols-1 gap-4">
          {patients.map((patient) => (
            <Link
              key={patient.id}
              to={`/patient/${patient.code}`}
              className="bg-white rounded-xl p-6 shadow-sm card-hover border border-gray-100 group"
            >
              <div className="flex items-center justify-between">
                
                {/* Patient Info */}
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-full bg-tecnot-light flex items-center justify-center">
                    <span className="text-xl font-bold text-tecnot-primary">
                      {patient.name.charAt(0)}
                    </span>
                  </div>
                  
                  {/* Details */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {patient.name} <span className="text-gray-400">/ {patient.code}</span>
                    </h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Folder className="w-4 h-4" />
                        {patient.sessionCount} sessions
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Last visit: {patient.lastVisit}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Latest: {patient.diagnosis}
                    </p>
                  </div>
                </div>
                
                {/* Arrow Icon */}
                <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-tecnot-primary group-hover:translate-x-1 transition-smooth" />
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Add Patient Modal */}
      {showAddModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn"
          onClick={() => setShowAddModal(false)}
        >
          {/* Backdrop with blur */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
          
          {/* Modal Card */}
          <div 
            className="relative bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transform transition-all duration-300 scale-100 hover:scale-[1.02]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-smooth"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-6">New Patient</h2>
            
            {/* Name Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Patient Name
              </label>
              <input
                type="text"
                placeholder="Enter patient name"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 transition-all"
                autoFocus
              />
            </div>
            
            {/* Date of Birth with Custom Calendar */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select date of birth"
                maxDate={new Date()}
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 transition-all cursor-pointer"
                wrapperClassName="w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age
              </label>
              <input 
              type="number"
              placeholder="Enter Age"
              min="0"
              max="150"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 transition-all"
              />
              </div>

            
            {/* Gender Dropdown */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 transition-all text-gray-400 bg-white cursor-pointer"
                defaultValue=""
              >
                <option value="" disabled hidden>Select Gender</option>
                <option value="male" className="text-gray-900">Male</option>
                <option value="female" className="text-gray-900">Female</option>
                <option value="prefer-not-to-say" className="text-gray-900">Prefer not to say</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nationality
              </label>
              <input 
              type="text"
              placeholder="Enter Nationality"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 transition-all"
              />
              </div>
            
            {/* Unique Code Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Patient MRN
              </label>
              <input
                type="text"
                placeholder="e.g., 001, 002"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 transition-all"
              />
            </div>
            
            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-smooth"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Patient added! (This is just a demo)')
                  setShowAddModal(false)
                  setSelectedDate(null)
                }}
                className="flex-1 px-6 py-3 bg-tecnot-primary text-white rounded-lg font-medium hover:bg-tecnot-dark transition-smooth shadow-lg hover:shadow-xl"
              >
                Add Patient
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Patients