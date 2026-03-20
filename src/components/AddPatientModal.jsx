import React, { useState } from 'react'
import { X } from 'lucide-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import * as patientService from '../services/patientService'
import { supabase } from '../services/supabaseClient'

function AddPatientModal({ onClose, onSuccess }) {
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

  const calculateAge = (dob) => {
    if (!dob) return ''
    const birth = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birth.getFullYear()
    const m = today.getMonth() - birth.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
    return age < 0 ? '' : String(age)
  }

  const validateMobileNumber = (number) => {
    const cleaned = number.replace(/\s+/g, '')
    const localPattern = /^0\d{9}$/
    const intlPattern = /^\+94\d{9}$/
    return localPattern.test(cleaned) || intlPattern.test(cleaned)
  }

  const formatMobileNumber = (value) => {
    const cleaned = value.replace(/\s+/g, '')

    if (cleaned.startsWith('+94')) {
      const part1 = cleaned.slice(0, 3)
      const part2 = cleaned.slice(3, 5)
      const part3 = cleaned.slice(5, 8)
      const part4 = cleaned.slice(8, 12)
      return [part1, part2, part3, part4].filter(Boolean).join(' ')
    }

    if (cleaned.startsWith('0')) {
      const part1 = cleaned.slice(0, 3)
      const part2 = cleaned.slice(3, 6)
      const part3 = cleaned.slice(6, 10)
      return [part1, part2, part3].filter(Boolean).join(' ')
    }

    return cleaned
  }

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(email)
  }

  const handleDobChange = (date) => {
    setSelectedDate(date)
    const computedAge = calculateAge(date)
    setNewPatient((prev) => ({ ...prev, age: computedAge }))
  }

  const handleSavePatient = async () => {
    if (!newPatient.first_name || !newPatient.last_name) {
      alert('Please fill in patient name')
      return
    }

    if (newPatient.mobile_number && !validateMobileNumber(newPatient.mobile_number)) {
      alert('Enter a valid mobile number (077 004 9469 or +94 77 004 9469)')
      return
    }

    if (newPatient.email && !validateEmail(newPatient.email.trim())) {
      alert('Please enter a valid email address (must include @)')
      return
    }

    try {
      const patientData = {
        first_name: newPatient.first_name.trim(),
        last_name: newPatient.last_name.trim(),
        age: newPatient.age ? parseInt(newPatient.age, 10) : null,
        gender: newPatient.gender || null,
        nationality: newPatient.nationality.trim() || null,
        national_id: newPatient.national_id.trim() || null,
        mobile_number: newPatient.mobile_number.replace(/\s/g, '') || null,
        email: newPatient.email.trim() || null,
        preferred_language: newPatient.preferred_language || 'English',
        blood_type: newPatient.blood_type || null,
        chronics: newPatient.chronics.trim() || null,
        allergies: newPatient.allergies.trim() || null,
        drug_precautions: newPatient.drug_precautions.trim() || null,
        mrn: null,
        date_of_birth: selectedDate ? selectedDate.toISOString().split('T')[0] : null,
      }

      const createdPatient = await patientService.createPatient(patientData)

      const {
        data: { user }
      } = await supabase.auth.getUser()

      if (user) {
        await supabase.from('notifications').insert({
          doctor_id: user.id,
          type: 'patient',
          title: 'New patient added',
          message: `${createdPatient.first_name} ${createdPatient.last_name} (MRN: ${createdPatient.mrn}) has been added to your patient list.`,
          read: false,
        })
      }

      resetForm()
      onSuccess(createdPatient)
    } catch (error) {
      console.error('Error adding patient:', error)
      alert(`Failed to add patient: ${error.message}`)
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <div
        className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 xs:p-8 max-w-2xl w-full
                    shadow-2xl max-h-[90vh] overflow-y-auto transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-smooth"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl xs:text-2xl font-bold text-gray-900 dark:text-white mb-6">
          New Patient
        </h2>

        <div className="space-y-4">
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                First Name *
              </label>
              <input
                type="text"
                placeholder="Enter first name"
                value={newPatient.first_name}
                onChange={(e) => setNewPatient({ ...newPatient, first_name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none
                            focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                            transition-all text-sm xs:text-base
                            bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                placeholder="Enter last name"
                value={newPatient.last_name}
                onChange={(e) => setNewPatient({ ...newPatient, last_name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none
                            focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                            transition-all text-sm xs:text-base
                            bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date of Birth
            </label>
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
                        bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              wrapperClassName="w-full"
            />
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Age
              </label>
              <input
                type="number"
                placeholder="Auto-calculated from DOB"
                value={newPatient.age}
                onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none
                            focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                            transition-all text-sm xs:text-base
                            bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Gender
              </label>
              <select
                value={newPatient.gender}
                onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none
                            focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                            transition-all bg-white dark:bg-gray-700 cursor-pointer text-sm xs:text-base text-gray-900 dark:text-white"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nationality
              </label>
              <input
                type="text"
                placeholder="Enter nationality"
                value={newPatient.nationality}
                onChange={(e) => setNewPatient({ ...newPatient, nationality: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none
                            focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                            transition-all text-sm xs:text-base
                            bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                National ID
              </label>
              <input
                type="text"
                placeholder="e.g., 851234567V"
                value={newPatient.national_id}
                onChange={(e) => setNewPatient({ ...newPatient, national_id: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none
                            focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                            transition-all text-sm xs:text-base
                            bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                placeholder="077 004 9469 or +94 77 004 9469"
                value={newPatient.mobile_number}
                onChange={(e) => {
                  const value = e.target.value
                  const cleaned = value.replace(/\s/g, '')
                  if (/^\+?\d*$/.test(cleaned)) {
                    if (
                      (!cleaned.startsWith('+') && cleaned.length <= 10) ||
                      (cleaned.startsWith('+') && cleaned.length <= 12)
                    ) {
                      setNewPatient({ ...newPatient, mobile_number: formatMobileNumber(value) })
                    }
                  }
                }}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none
                            focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                            transition-all text-sm xs:text-base
                            bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter email (e.g., patient@example.com)"
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

          <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Preferred Language
              </label>
              <select
                value={newPatient.preferred_language}
                onChange={(e) => setNewPatient({ ...newPatient, preferred_language: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none
                            focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                            transition-all bg-white dark:bg-gray-700 cursor-pointer text-sm xs:text-base text-gray-900 dark:text-white"
              >
                <option value="English">English</option>
                <option value="Sinhala">Sinhala</option>
                <option value="Tamil">Tamil</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Blood Type
              </label>
              <select
                value={newPatient.blood_type}
                onChange={(e) => setNewPatient({ ...newPatient, blood_type: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none
                            focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                            transition-all bg-white dark:bg-gray-700 cursor-pointer text-sm xs:text-base text-gray-900 dark:text-white"
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

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Chronic Conditions
            </label>
            <input
              type="text"
              placeholder="e.g., Diabetes Type 2, Hypertension"
              value={newPatient.chronics}
              onChange={(e) => setNewPatient({ ...newPatient, chronics: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none
                        focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                        transition-all text-sm xs:text-base
                        bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Allergies
            </label>
            <input
              type="text"
              placeholder="e.g., Penicillin, Peanuts"
              value={newPatient.allergies}
              onChange={(e) => setNewPatient({ ...newPatient, allergies: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none
                        focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                        transition-all text-sm xs:text-base
                        bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Drug Precautions
            </label>
            <input
              type="text"
              placeholder="e.g., Avoid NSAIDs"
              value={newPatient.drug_precautions}
              onChange={(e) => setNewPatient({ ...newPatient, drug_precautions: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none
                        focus:border-tecnot-primary dark:focus:border-tecnot-light focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                        transition-all text-sm xs:text-base
                        bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Patient MRN
            </label>
            <input
              type="text"
              placeholder="Auto-generated by backend"
              value={newPatient.mrn}
              readOnly
              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg outline-none
                        transition-all text-sm xs:text-base
                        bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400
                        placeholder-gray-400 dark:placeholder-gray-500 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
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
  )
}

export default AddPatientModal