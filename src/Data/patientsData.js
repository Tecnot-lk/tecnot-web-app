// =============================================================================
// DUMMY PATIENT DATA
// =============================================================================
//
// PURPOSE:
// - Provide sample patient data for frontend development
// - Use this when backend is not ready yet
// - Replace with actual API calls in production
//
// NOTE: This file is OPTIONAL and only for testing
// Delete this file when backend integration is complete
//
// =============================================================================

export const patientsData = [
  {
    id: '1',
    mrn: 'MRN001234',
    first_name: 'Malik',
    last_name: 'Fernando',
    age: 38,
    gender: 'Male',
    date_of_birth: '1985-03-15',
    nationality: 'Sri Lankan',
    national_id: '851234567V',
    mobile_number: '+94771234567',
    email: 'malik.fernando@example.com',
    preferred_language: 'Sinhala',
    blood_type: 'O+',
    chronics: 'Diabetes Type 2, Hypertension',
    allergies: 'Penicillin',
    drug_precautions: 'Avoid NSAIDs',
    created_at: '2025-01-10T10:30:00Z'
  },
  {
    id: '2',
    mrn: 'MRN005678',
    first_name: 'Shiman',
    last_name: 'Perera',
    age: 35,
    gender: 'Male',
    date_of_birth: '1988-07-22',
    nationality: 'Sri Lankan',
    national_id: '881234567V',
    mobile_number: '+94712345678',
    email: 'shiman.perera@example.com',
    preferred_language: 'English',
    blood_type: 'A+',
    chronics: null,
    allergies: 'Sulfa drugs',
    drug_precautions: null,
    created_at: '2025-02-05T14:15:00Z'
  },
  {
    id: '3',
    mrn: 'MRN009012',
    first_name: 'Aisha',
    last_name: 'Khan',
    age: 42,
    gender: 'Female',
    date_of_birth: '1981-11-08',
    nationality: 'Sri Lankan',
    national_id: '811234567V',
    mobile_number: '+94763456789',
    email: 'aisha.khan@example.com',
    preferred_language: 'Tamil',
    blood_type: 'B+',
    chronics: 'Asthma',
    allergies: 'Peanuts, Shellfish',
    drug_precautions: 'Beta-blockers contraindicated',
    created_at: '2024-11-20T09:00:00Z'
  },
  {
    id: '4',
    mrn: 'MRN003456',
    first_name: 'Kumari',
    last_name: 'Silva',
    age: 28,
    gender: 'Female',
    date_of_birth: '1995-04-12',
    nationality: 'Sri Lankan',
    national_id: '951234567V',
    mobile_number: '+94776543210',
    email: 'kumari.silva@example.com',
    preferred_language: 'Sinhala',
    blood_type: 'AB+',
    chronics: null,
    allergies: null,
    drug_precautions: null,
    created_at: '2026-01-15T11:20:00Z'
  },
  {
    id: '5',
    mrn: 'MRN007890',
    first_name: 'Rajesh',
    last_name: 'Kumar',
    age: 55,
    gender: 'Male',
    date_of_birth: '1968-09-30',
    nationality: 'Sri Lankan',
    national_id: '681234567V',
    mobile_number: '+94751234567',
    email: 'rajesh.kumar@example.com',
    preferred_language: 'Tamil',
    blood_type: 'O-',
    chronics: 'Chronic Kidney Disease Stage 3, Diabetes Type 2',
    allergies: 'Latex',
    drug_precautions: 'Metformin - reduce dose due to kidney function',
    created_at: '2024-08-03T16:45:00Z'
  }
]

// Export default for easier importing
export default patientsData