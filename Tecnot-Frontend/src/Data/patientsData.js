// ====================
// SHARED PATIENT DATA
// Central source of truth for all patient information
// ====================

export const patientsData = [
  { 
    id: 1, 
    name: 'Malik', 
    code: '001',
    dob: '15/03/1985',
    age: 39,
    gender: 'Male',
    nationality: 'Sri Lankan',
    sessions: [
      { id: 1, date: '25/11/2025', complaint: 'Leg pain', time: '10:17am' },
      { id: 2, date: '30/11/2025', complaint: 'Chest pain', time: '02:30pm' },
      { id: 3, date: '03/01/2026', complaint: 'Stomach pain', time: '11:45am' },
      { id: 4, date: '10/01/2026', complaint: 'Leg pain', time: '09:15am' },
    ]
  },
  { 
    id: 2, 
    name: 'Shiman', 
    code: '021',
    dob: '22/07/1992',
    age: 32,
    gender: 'Male',
    nationality: 'Sri Lankan',
    sessions: [
      { id: 5, date: '30/11/2025', complaint: 'Chest pain', time: '02:30pm' },
      { id: 6, date: '05/12/2025', complaint: 'Chest pain follow-up', time: '03:15pm' },
    ]
  },
  { 
    id: 3, 
    name: 'Ibrahim', 
    code: '022',
    dob: '10/11/1988',
    age: 36,
    gender: 'Male',
    nationality: 'Sri Lankan',
    sessions: [
      { id: 7, date: '03/01/2026', complaint: 'Stomach pain', time: '11:45am' },
      { id: 8, date: '10/01/2026', complaint: 'Stomach pain follow-up', time: '09:30am' },
      { id: 9, date: '17/01/2026', complaint: 'Digestive issues', time: '02:00pm' },
    ]
  },
  { 
    id: 4, 
    name: 'Alfred', 
    code: '111',
    dob: '05/09/1950',
    age: 74,
    gender: 'Male',
    nationality: 'Sri Lankan',
    sessions: [
      { id: 10, date: '10/01/2026', complaint: 'Leg pain', time: '09:15am' },
    ]
  },
  { 
    id: 5, 
    name: 'Sanuka', 
    code: '232',
    dob: '18/01/1995',
    age: 29,
    gender: 'Male',
    nationality: 'Sri Lankan',
    sessions: [
      { id: 11, date: '15/01/2026', complaint: 'Migraine', time: '10:00am' },
      { id: 12, date: '20/01/2026', complaint: 'Migraine follow-up', time: '11:30am' },
      { id: 13, date: '25/01/2026', complaint: 'Headache', time: '01:45pm' },
      { id: 14, date: '30/01/2026', complaint: 'Migraine', time: '03:00pm' },
      { id: 15, date: '02/02/2026', complaint: 'Tension headache', time: '09:45am' },
    ]
  },
]