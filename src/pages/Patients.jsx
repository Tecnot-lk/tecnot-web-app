import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, User, Plus, X, Loader2 } from 'lucide-react'
import Header from '../components/Header'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import * as patientService from '../services/patientService'

function Patients() {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [newPatient, setNewPatient] = useState({
    first_name: '',
    last_name: '',
    age: '',
    gender: '',
    nationality: '',
    national_id: '',
    mobile_number: '',
    email: '',
    preferred_language: 'English',
    blood_type: '',
    chronics: '',
    allergies: '',
    drug_precautions: '',
    mrn: ''
  })

  useEffect(() => {
    fetchPatients()
  }, [])

  const fetchPatients = async () => {
    try {
      setLoading(true)
      const data = await patientService.getPatients()
      console.log('API Response:', data)
      console.log('Patients from API:', data.results)
      setPatients(data.results || [])
    } catch (error) {
      console.error('Error fetching patients:', error)
      console.log('Using dummy data fallback')
      // Using dummy data for development
      const dummyData = [
        { id: '1', mrn: 'MRN001234', first_name: 'Malik', last_name: 'Fernando', age: 38, gender: 'Male', mobile_number: '+94771234567', national_id: '851234567V' },
        { id: '2', mrn: 'MRN005678', first_name: 'Shiman', last_name: 'Perera', age: 35, gender: 'Male', mobile_number: '+94712345678', national_id: '901234567V' },
        { id: '3', mrn: 'MRN009012', first_name: 'Aisha', last_name: 'Khan', age: 42, gender: 'Female', mobile_number: '+94763456789', national_id: '821234567V' },
      ]
      console.log('Dummy patients loaded:', dummyData)
      setPatients(dummyData)
    } finally {
      setLoading(false)
    }
  }

  const calculateAge = (dob) => {
    if (!dob) return ''
    const birth = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birth.getFullYear()
    const m = today.getMonth() - birth.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
    return age < 0 ? '' : String(age)
  }

  const handleDobChange = (date) => {
    setSelectedDate(date)
    const computedAge = calculateAge(date)
    setNewPatient(prev => ({ ...prev, age: computedAge }))
  }

  const handleSavePatient = async () => {
    if (!newPatient.first_name || !newPatient.last_name) {
      alert('Please fill in patient name')
      return
    }

    try {
      const patientData = {
        ...newPatient,
        date_of_birth: selectedDate ? selectedDate.toISOString().split('T')[0] : null
      }
      await patientService.createPatient(patientData)
      alert('Patient added successfully!')
      setShowAddModal(false)
      resetForm()
      fetchPatients()
    } catch (error) {
      console.error('Error adding patient:', error)
      alert('Failed to add patient. Please try again.')
    }
  }

  const resetForm = () => {
    setNewPatient({
      first_name: '',
      last_name: '',
      age: '',
      gender: '',
      nationality: '',
      national_id: '',
      mobile_number: '',
      email: '',
      preferred_language: 'English',
      blood_type: '',
      chronics: '',
      allergies: '',
      drug_precautions: '',
      mrn: ''
    })
    setSelectedDate(null)
  }

  const filteredPatients = patients.filter(patient => {
    const query = searchQuery.toLowerCase()
    
    // Debug logging - only log first patient to avoid spam
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

  return (
    <div className="animate-fadeIn w-full min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header title="Patient Records" subtitle="Manage your patients" />
      
      <div className="w-full px-3 xs:px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-[1600px] mx-auto">
        
        {/* Search & Add Patient */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search by name, MRN, mobile, or national ID..."
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

        {/* Patient Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-tecnot-primary dark:text-tecnot-light" />
          </div>
        ) : filteredPatients.length === 0 ? (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-sm xs:text-base">
              {searchQuery ? 'No patients found matching your search.' : 'No patients yet. Add your first patient to get started.'}
            </p>
          </div>
        ) : (
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
                  <div className={`w-12 h-12 xs:w-14 xs:h-14 rounded-full flex items-center justify-center 
                                text-white font-bold text-lg xs:text-xl flex-shrink-0
                                ${patient.gender === 'Female' ? 'bg-pink-500' : patient.gender === 'Male' ? 'bg-blue-500' : 'bg-gray-500'}`}>
                    {patient.first_name?.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 dark:text-white text-base xs:text-lg truncate">
                      {patient.first_name} {patient.last_name}
                    </h3>
                    <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400">MRN: {patient.mrn}</p>
                  </div>
                </div>

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

      {/* Add Patient Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowAddModal(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

          {/* Modal */}
          <div
            className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 xs:p-8 max-w-2xl w-full 
                     shadow-2xl max-h-[90vh] overflow-y-auto transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-smooth"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-xl xs:text-2xl font-bold text-gray-900 dark:text-white mb-6">New Patient</h2>

            <div className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name *</label>
                  <input
                    type="text"
                    placeholder="Enter first name"
                    value={newPatient.first_name}
                    onChange={(e) => setNewPatient({ ...newPatient, first_name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none 
                             focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                             transition-all text-sm xs:text-base
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name *</label>
                  <input
                    type="text"
                    placeholder="Enter last name"
                    value={newPatient.last_name}
                    onChange={(e) => setNewPatient({ ...newPatient, last_name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none 
                             focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                             transition-all text-sm xs:text-base
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </div>
              </div>

              {/* DOB */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date of Birth</label>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDobChange}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select date of birth"
                  maxDate={new Date()}
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={100}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none 
                           focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                           transition-all cursor-pointer text-sm xs:text-base
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           placeholder-gray-400 dark:placeholder-gray-500"
                  wrapperClassName="w-full"
                />
              </div>

              {/* Age & Gender */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Age</label>
                  <input
                    type="number"
                    placeholder="Auto-calculated from DOB"
                    value={newPatient.age}
                    onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none 
                             focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                             transition-all text-sm xs:text-base
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gender</label>
                  <select
                    value={newPatient.gender}
                    onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none 
                             focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                             transition-all bg-white dark:bg-gray-700 cursor-pointer text-sm xs:text-base
                             text-gray-900 dark:text-white"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Nationality & National ID */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nationality</label>
                  <input
                    type="text"
                    placeholder="Enter nationality"
                    value={newPatient.nationality}
                    onChange={(e) => setNewPatient({ ...newPatient, nationality: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none 
                             focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                             transition-all text-sm xs:text-base
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">National ID</label>
                  <input
                    type="text"
                    placeholder="e.g., 851234567V"
                    value={newPatient.national_id}
                    onChange={(e) => setNewPatient({ ...newPatient, national_id: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none 
                             focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                             transition-all text-sm xs:text-base
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </div>
              </div>

              {/* Mobile & Email */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mobile Number</label>
                  <input
                    type="tel"
                    placeholder="+94 77 123 4567"
                    value={newPatient.mobile_number}
                    onChange={(e) => setNewPatient({ ...newPatient, mobile_number: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none 
                             focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                             transition-all text-sm xs:text-base
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="patient@example.com"
                    value={newPatient.email}
                    onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none 
                             focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                             transition-all text-sm xs:text-base
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </div>
              </div>

              {/* Language & Blood Type */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preferred Language</label>
                  <select
                    value={newPatient.preferred_language}
                    onChange={(e) => setNewPatient({ ...newPatient, preferred_language: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none 
                             focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                             transition-all bg-white dark:bg-gray-700 cursor-pointer text-sm xs:text-base
                             text-gray-900 dark:text-white"
                  >
                    <option value="English">English</option>
                    <option value="Sinhala">Sinhala</option>
                    <option value="Tamil">Tamil</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Blood Type</label>
                  <select
                    value={newPatient.blood_type}
                    onChange={(e) => setNewPatient({ ...newPatient, blood_type: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none 
                             focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                             transition-all bg-white dark:bg-gray-700 cursor-pointer text-sm xs:text-base
                             text-gray-900 dark:text-white"
                  >
                    <option value="">Select Blood Type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>

              {/* Medical Info */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Chronic Conditions</label>
                <input
                  type="text"
                  placeholder="e.g., Diabetes Type 2, Hypertension"
                  value={newPatient.chronics}
                  onChange={(e) => setNewPatient({ ...newPatient, chronics: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none 
                           focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                           transition-all text-sm xs:text-base
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Allergies</label>
                <input
                  type="text"
                  placeholder="e.g., Penicillin, Peanuts"
                  value={newPatient.allergies}
                  onChange={(e) => setNewPatient({ ...newPatient, allergies: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none 
                           focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                           transition-all text-sm xs:text-base
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Drug Precautions</label>
                <input
                  type="text"
                  placeholder="e.g., Avoid NSAIDs"
                  value={newPatient.drug_precautions}
                  onChange={(e) => setNewPatient({ ...newPatient, drug_precautions: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none 
                           focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                           transition-all text-sm xs:text-base
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              {/* MRN */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Patient MRN</label>
                <input
                  type="text"
                  placeholder="Auto-generated (leave blank)"
                  value={newPatient.mrn}
                  onChange={(e) => setNewPatient({ ...newPatient, mrn: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none 
                           focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                           transition-all text-sm xs:text-base
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-medium 
                         text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-smooth text-sm xs:text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePatient}
                className="flex-1 px-6 py-3 bg-tecnot-primary dark:bg-tecnot-light text-white dark:text-gray-900 rounded-lg font-medium 
                         hover:bg-tecnot-dark dark:hover:bg-tecnot-primary transition-smooth shadow-lg hover:shadow-xl text-sm xs:text-base"
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