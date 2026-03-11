import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Edit, Save, FileText, Calendar, Loader2 } from 'lucide-react'
import Header from '../components/Header'
import PatientBanner from '../components/PatientBanner'
import * as patientService from '../services/patientService'

function SoapNote() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [patient, setPatient] = useState(null)
  const [session, setSession] = useState(null)

  // Dummy data - maps session IDs to patient MRNs
  const sessionPatientMapping = {
    // Malik Fernando sessions
    'malik-1': 'MRN001234',
    'malik-2': 'MRN001234',
    'malik-3': 'MRN001234',
    // Shiman Perera sessions
    'shiman-1': 'MRN005678',
    'shiman-2': 'MRN005678',
    'shiman-3': 'MRN005678',
    // Aisha Khan sessions
    'aisha-1': 'MRN009012',
    'aisha-2': 'MRN009012',
    'aisha-3': 'MRN009012',
  }

  const dummyPatients = {
    'MRN001234': {
      id: '1',
      mrn: 'MRN001234',
      first_name: 'Malik',
      last_name: 'Hanaffi',
      age: 38,
      gender: 'Male',
      blood_type: 'O+',
      chronics: 'Diabetes Type 2',
      allergies: 'Penicillin',
      drug_precautions: 'Avoid NSAIDs',
      national_id: '851234567V'
    },
    'MRN005678': {
      id: '2',
      mrn: 'MRN005678',
      first_name: 'Shiman',
      last_name: 'Nafaas',
      age: 35,
      gender: 'Male',
      blood_type: 'A+',
      chronics: 'None',
      allergies: 'None',
      drug_precautions: 'None',
      national_id: '901234567V'
    },
    'MRN009012': {
      id: '3',
      mrn: 'MRN009012',
      first_name: 'Shimani',
      last_name: 'Khan',
      age: 42,
      gender: 'Female',
      blood_type: 'B+',
      chronics: 'Hypertension',
      allergies: 'Sulfa drugs',
      drug_precautions: 'Monitor blood pressure',
      national_id: '821234567V'
    }
  }

  const [soapData, setSoapData] = useState({
    chief_complaint: '',
    history_present_illness: '',
    subjective: '',
    objective: '',
    assessment: '',
    plan: '',
    lab_orders: '',
    radiology_orders: '',
    medication_orders: '',
    procedure_orders: '',
    nursing_instructions: ''
  })

  // Historical SOAP notes - will be populated dynamically
  const [historicalNotes, setHistoricalNotes] = useState([])

  useEffect(() => {
    fetchSessionData()
  }, [id])

  const fetchSessionData = async () => {
    try {
      setLoading(true)
      
      console.log('Loading session ID:', id)
      
      // Get patient MRN for this session
      const patientMRN = sessionPatientMapping[id] || 'MRN001234'
      console.log('Patient MRN for this session:', patientMRN)
      
      const patientData = dummyPatients[patientMRN]
      console.log('Patient data:', patientData)
      
      setPatient(patientData)
      setSession({
        vitals: {
          height: '175',
          weight: '70',
          temperature: '37.2',
          blood_pressure: '120/80',
          heart_rate: '72',
        }
      })

      // Session-specific SOAP data
      const sessionSOAPData = {
        // Malik Fernando sessions
        'malik-1': {
          chief_complaint: 'Severe headache',
          history_present_illness: 'Patient reports severe right-sided throbbing headache for 3 days. Pain worsens in evening. Occasional blurry vision. Paracetamol ineffective.',
          subjective: 'Patient complains of severe headache on right side for 3 days. Describes pain as throbbing and worse in evening. Reports occasional blurry vision. Denies nausea. Tried paracetamol with minimal relief.',
          objective: `Vitals: Height: 175cm, Weight: 70kg, Temp: 37.2°C, BP: 120/80, HR: 72, SpO2: 98%

Physical Examination:
- Alert and oriented
- No focal neurological deficits
- Pupils equal and reactive`,
          assessment: `Tension headache, possible migraine.

Differential diagnosis:
1. Migraine without aura
2. Tension-type headache
3. Cluster headache (less likely)`,
          plan: `1. Prescribe Sumatriptan 50mg at onset of headache
2. Advise rest in dark room
3. Avoid triggers (stress, bright lights)
4. Follow-up in 1 week if no improvement
5. Consider CT scan if symptoms worsen
6. Patient education on migraine triggers provided`,
          lab_orders: '',
          radiology_orders: 'CT Brain if symptoms worsen or no improvement in 1 week',
          medication_orders: `1. Sumatriptan 50mg tablet
   - Take 1 tablet at onset of headache
   - Max 2 doses in 24 hours
   - Duration: 1 week supply`,
          procedure_orders: '',
          nursing_instructions: `Monitor patient for:
- Worsening symptoms
- Adverse medication reactions
- Call if severe nausea/vomiting develops`
        },
        'malik-2': {
          chief_complaint: 'Follow-up diabetes',
          history_present_illness: 'Patient with Type 2 Diabetes for 5 years. Here for routine follow-up. Reports good compliance with medications. Occasional episodes of low blood sugar.',
          subjective: 'Patient reports taking medications regularly. Checking blood sugar at home - fasting levels around 110-130 mg/dL. Had 2 episodes of hypoglycemia last month after skipping meals.',
          objective: `Vitals: Height: 175cm, Weight: 70kg, BP: 125/82, HR: 68

Lab Results:
- HbA1c: 7.2%
- Fasting glucose: 128 mg/dL
- Lipid panel: Within normal limits`,
          assessment: `Type 2 Diabetes Mellitus - adequately controlled.

HbA1c slightly elevated but improved from last visit (was 7.8%).`,
          plan: `1. Continue current medications (Metformin 500mg BD)
2. Reinforce importance of regular meals
3. Dietary counseling - avoid skipping meals
4. Repeat HbA1c in 3 months
5. Annual eye exam scheduled`,
          lab_orders: 'HbA1c in 3 months, Annual lipid panel',
          radiology_orders: '',
          medication_orders: `1. Metformin 500mg - Continue BD
2. Dispense: 90 days supply`,
          procedure_orders: '',
          nursing_instructions: `Patient education:
- Importance of regular meals
- Recognize hypoglycemia symptoms
- Keep glucose tabs handy`
        },
        'malik-3': {
          chief_complaint: 'Leg pain',
          history_present_illness: 'Patient reports left calf pain for 2 days. Pain started after long walk. No trauma. Pain worse with walking, better with rest.',
          subjective: 'Sharp pain in left calf, started 2 days ago after 5km walk. Pain rated 6/10, worse when walking. No swelling noticed. Denies fever or redness.',
          objective: `Vitals: BP: 118/78, HR: 70

Physical Examination:
- Left calf tender on palpation
- No swelling or erythema
- Negative Homan's sign
- Pedal pulses intact`,
          assessment: `Muscle strain (gastrocnemius) - left calf.

Rule out DVT (unlikely given clinical presentation).`,
          plan: `1. Rest, ice, compression, elevation (RICE)
2. NSAIDs for pain (Ibuprofen 400mg TDS)
3. Avoid strenuous activity for 1 week
4. Follow-up if symptoms worsen
5. Return immediately if swelling/redness develops`,
          lab_orders: '',
          radiology_orders: '',
          medication_orders: `1. Ibuprofen 400mg
   - Take 3 times daily with food
   - Duration: 5 days`,
          procedure_orders: '',
          nursing_instructions: `Teach patient RICE protocol.
Advise to return if DVT symptoms develop.`
        },
        
        // Shiman Perera sessions
        'shiman-1': {
          chief_complaint: 'Annual health checkup',
          history_present_illness: 'Patient here for annual preventive health screening. No current complaints. Feeling well overall.',
          subjective: 'No complaints. Exercises regularly (jogging 3x/week). Balanced diet. Non-smoker. Occasional social drinking. No family history of chronic diseases.',
          objective: `Vitals: Height: 178cm, Weight: 72kg, BMI: 22.7, BP: 115/75, HR: 65, SpO2: 99%

Physical Examination:
- General: Well-appearing, healthy
- Cardiovascular: Regular rhythm, no murmurs
- Respiratory: Clear bilaterally
- Abdomen: Soft, non-tender`,
          assessment: `Healthy adult male. All parameters within normal limits.`,
          plan: `1. Continue current healthy lifestyle
2. Routine lab work ordered
3. All vaccinations up to date
4. Next annual checkup in 1 year
5. Discussed importance of regular exercise and diet`,
          lab_orders: 'CBC, Lipid panel, Fasting glucose, Liver function tests, Kidney function tests',
          radiology_orders: '',
          medication_orders: '',
          procedure_orders: '',
          nursing_instructions: `Schedule lab work.
Provide health education materials.`
        },
        'shiman-2': {
          chief_complaint: 'Flu symptoms',
          history_present_illness: 'Patient reports fever, body aches, and sore throat for 2 days. Started suddenly. No cough initially, now mild dry cough. Several colleagues at work also sick.',
          subjective: 'Fever up to 38.5°C, chills, generalized body aches, sore throat. Mild dry cough started yesterday. Decreased appetite. Taking paracetamol with temporary relief.',
          objective: `Vitals: Temp: 38.3°C, BP: 120/78, HR: 82, SpO2: 97%

Physical Examination:
- Pharynx: Erythematous, no exudates
- Lungs: Clear, no wheezing
- No lymphadenopathy`,
          assessment: `Acute viral upper respiratory tract infection (likely Influenza).

No signs of bacterial infection or complications.`,
          plan: `1. Symptomatic treatment - rest and hydration
2. Paracetamol 1g QID for fever and pain
3. Throat lozenges for sore throat
4. Stay home from work for 3-5 days
5. Return if symptoms worsen or persist >5 days`,
          lab_orders: '',
          radiology_orders: '',
          medication_orders: `1. Paracetamol 1000mg
   - Take every 6 hours as needed
   - Duration: 5 days
2. Throat lozenges as needed`,
          procedure_orders: '',
          nursing_instructions: `Advise adequate rest and hydration.
Sick leave issued for 3 days.`
        },
        'shiman-3': {
          chief_complaint: 'Vaccination',
          history_present_illness: 'Patient here for influenza vaccination. Planning international travel next month.',
          subjective: 'No current illness. Requesting flu vaccine before travel. No previous adverse reactions to vaccines. No allergies.',
          objective: `Vitals: BP: 118/76, HR: 68, Temp: 36.8°C

Physical: Healthy appearance, no acute illness`,
          assessment: `Routine influenza vaccination indicated for international travel.`,
          plan: `1. Administer influenza vaccine today
2. Observe for 15 minutes post-vaccination
3. Advised possible mild side effects (arm soreness, low-grade fever)
4. Return if any concerning symptoms develop`,
          lab_orders: '',
          radiology_orders: '',
          medication_orders: '',
          procedure_orders: 'Influenza vaccine 0.5ml IM in left deltoid',
          nursing_instructions: `Administer flu vaccine.
Observe patient for 15 minutes.
Provide vaccination card.`
        },
        
        // Shimani Khan sessions
        'aisha-1': {
          chief_complaint: 'High blood pressure follow-up',
          history_present_illness: 'Patient with hypertension for 3 years. Here for routine follow-up. Currently on Amlodipine 5mg daily. Checking blood pressure regularly at home - readings around 135-145/85-90.',
          subjective: 'Taking medications daily. Home BP readings slightly elevated. No headaches, dizziness, or chest pain. Some stress at work recently.',
          objective: `Vitals: BP: 142/88 (repeated: 138/86), HR: 78, Weight: 68kg

Physical Examination:
- Cardiovascular: Regular rhythm, no murmurs
- No peripheral edema`,
          assessment: `Hypertension - suboptimally controlled.

Target BP <130/80 not achieved. Consider dose adjustment.`,
          plan: `1. Increase Amlodipine to 10mg daily
2. Stress reduction techniques discussed
3. Continue low-salt diet
4. Regular exercise encouraged
5. Follow-up in 4 weeks to reassess BP
6. Home BP monitoring log provided`,
          lab_orders: 'Basic metabolic panel, Lipid panel',
          radiology_orders: '',
          medication_orders: `1. Amlodipine 10mg tablet
   - Take 1 tablet once daily
   - Duration: 90 days supply`,
          procedure_orders: '',
          nursing_instructions: `BP monitoring education.
Provide low-sodium diet handout.
Schedule 4-week follow-up.`
        },
        'aisha-2': {
          chief_complaint: 'Chest pain',
          history_present_illness: 'Patient reports intermittent chest discomfort for 1 day. Describes as pressure-like sensation in center of chest. Worse after eating, better when sitting upright. No radiation to arm or jaw. No shortness of breath.',
          subjective: 'Central chest pressure, worse after meals. Duration 5-10 minutes. No exertional component. Denies nausea, sweating. Reports eating spicy food last night.',
          objective: `Vitals: BP: 140/85, HR: 76, SpO2: 98%, Temp: 36.9°C

Physical Examination:
- Cardiovascular: S1, S2 normal, no murmurs
- Respiratory: Clear bilaterally
- Abdomen: Mild epigastric tenderness
- ECG: Normal sinus rhythm, no ST changes`,
          assessment: `Gastroesophageal reflux disease (GERD) - likely cause of chest discomfort.

Cardiac cause unlikely given clinical presentation and normal ECG. Low risk for ACS.`,
          plan: `1. Omeprazole 20mg OD before breakfast
2. Dietary modifications - avoid spicy/fatty foods
3. Avoid eating 2-3 hours before bedtime
4. Elevate head of bed
5. Follow-up in 2 weeks
6. Return immediately if chest pain worsens or new symptoms`,
          lab_orders: '',
          radiology_orders: '',
          medication_orders: `1. Omeprazole 20mg capsule
   - Take 1 capsule daily before breakfast
   - Duration: 30 days`,
          procedure_orders: '',
          nursing_instructions: `GERD education provided.
Warning signs of cardiac emergency discussed.`
        },
        'aisha-3': {
          chief_complaint: 'Medication adjustment',
          history_present_illness: 'Patient with hypertension on treatment. Reports occasional dizziness, especially when standing up quickly. Concerned about medication side effects.',
          subjective: 'Dizzy spells 2-3 times per week when standing. No loss of consciousness. Blood pressure at home ranges 120-130/75-82. Otherwise feeling well.',
          objective: `Vitals: Sitting BP: 128/78, HR: 72
        Standing BP (after 3 min): 118/74, HR: 80

Physical: No orthostatic hypotension, no concerning findings`,
          assessment: `Hypertension - well controlled on current medications.

Occasional dizziness - mild, not orthostatic hypotension. Possibly positional/benign.`,
          plan: `1. Continue current medications (Amlodipine 10mg)
2. Advised to rise slowly from sitting/lying
3. Ensure adequate hydration
4. Monitor symptoms - keep diary
5. Return if dizziness worsens or fainting occurs
6. BP well controlled - no medication change needed`,
          lab_orders: '',
          radiology_orders: '',
          medication_orders: `1. Amlodipine 10mg - Continue current regimen`,
          procedure_orders: '',
          nursing_instructions: `Education on preventing positional dizziness.
Reassure patient about good BP control.`
        }
      }

      const sessionData = sessionSOAPData[id]
      console.log('Session SOAP data found:', sessionData ? 'Yes' : 'No')
      
      if (sessionData) {
        setSoapData(sessionData)
        console.log('SOAP data has been set!')
      } else {
        console.log('No SOAP data found for session ID:', id)
      }

      // Fetch historical notes for this patient - patient-specific sessions
      const patientHistoricalNotes = {
        'MRN001234': [
          { id: 'malik-1', date: '2026-02-05 14:30', chief_complaint: 'Severe headache' },
          { id: 'malik-2', date: '2026-01-15 10:20', chief_complaint: 'Follow-up diabetes' },
          { id: 'malik-3', date: '2025-12-20 16:45', chief_complaint: 'Leg pain' },
        ],
        'MRN005678': [
          { id: 'shiman-1', date: '2026-02-03 09:15', chief_complaint: 'Annual health checkup' },
          { id: 'shiman-2', date: '2026-01-20 14:00', chief_complaint: 'Flu symptoms' },
          { id: 'shiman-3', date: '2025-12-15 11:30', chief_complaint: 'Vaccination' },
        ],
        'MRN009012': [
          { id: 'Shimani-1', date: '2026-02-01 16:00', chief_complaint: 'High blood pressure follow-up' },
          { id: 'Shimani-2', date: '2026-01-10 10:45', chief_complaint: 'Chest pain' },
          { id: 'Shimani-3', date: '2025-12-05 13:20', chief_complaint: 'Medication adjustment' },
        ]
      }
      
      setHistoricalNotes(patientHistoricalNotes[patientMRN] || [])
      console.log('Historical notes loaded for patient:', patientMRN)
      
    } catch (error) {
      console.error('Error fetching session data:', error)
      // Default to first patient if error
      setPatient(dummyPatients['MRN001234'])
      setSession({
        vitals: {
          height: '175',
          weight: '70',
          temperature: '37.2',
          blood_pressure: '120/80',
          heart_rate: '72',
          spo2: '98'
        }
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = () => {
    console.log('Saving SOAP note:', soapData)
    alert('SOAP note saved successfully!')
    setIsEditing(false)
  }

  const handleChange = (field, value) => {
    setSoapData({ ...soapData, [field]: value })
  }

  const SectionTitle = ({ children, icon: Icon }) => (
    <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-tecnot-primary dark:border-tecnot-light">
      {Icon && <Icon className="w-5 h-5 text-tecnot-primary dark:text-tecnot-light" />}
      <h3 className="font-bold text-gray-900 dark:text-white text-sm xs:text-base sm:text-lg">{children}</h3>
    </div>
  )

  const ReadOnlyField = ({ label, value }) => (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 xs:p-4 transition-colors">
      <label className="block text-xs xs:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{label}</label>
      <p className="text-sm xs:text-base text-gray-900 dark:text-white whitespace-pre-wrap">{value || 'None'}</p>
    </div>
  )

  const EditableField = ({ label, value, field, rows = 4 }) => (
    <div>
      <label className="block text-xs xs:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{label}</label>
      {isEditing ? (
        <textarea
          value={value}
          onChange={(e) => handleChange(field, e.target.value)}
          rows={rows}
          className="w-full px-3 xs:px-4 py-2 xs:py-3 
                   border-2 border-gray-200 dark:border-gray-600 rounded-lg 
                   outline-none focus:border-tecnot-primary dark:focus:border-tecnot-light 
                   focus:ring-4 focus:ring-tecnot-primary/20 dark:focus:ring-tecnot-light/20
                   bg-white dark:bg-gray-700 
                   text-gray-900 dark:text-white
                   placeholder-gray-400 dark:placeholder-gray-500
                   transition-all resize-none text-sm xs:text-base"
        />
      ) : (
        <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg p-3 xs:p-4 transition-colors">
          <p className="text-sm xs:text-base text-gray-900 dark:text-white whitespace-pre-wrap">{value || 'None'}</p>
        </div>
      )}
    </div>
  )

  if (loading) {
    return (
      <div className="animate-fadeIn w-full min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header title="SOAP Note" subtitle="Loading..." />
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-tecnot-primary dark:text-tecnot-light" />
        </div>
      </div>
    )
  }

  if (!patient) {
    return (
      <div className="animate-fadeIn w-full min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header title="SOAP Note" subtitle="Not Found" />
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4">Session not found</p>
          <Link
            to="/patients"
            className="inline-flex items-center gap-2 text-tecnot-primary dark:text-tecnot-light hover:text-tecnot-dark dark:hover:text-tecnot-primary"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Patients
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fadeIn w-full min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header title="SOAP Note" subtitle={`${patient.first_name} ${patient.last_name}`} />
      
      {/* Patient Banner */}
      <PatientBanner patient={patient} session={session} />

      <div className="w-full px-3 xs:px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-[1800px] mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* MAIN CONTENT: SOAP Note (3 columns on desktop) */}
          <div className="lg:col-span-3 space-y-4 sm:space-y-6">
            
            {/* Header Actions */}
            <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3">
              <Link
                to={`/patient/${patient.mrn}`}
                className="inline-flex items-center gap-2 text-tecnot-primary dark:text-tecnot-light 
                         hover:text-tecnot-dark dark:hover:text-tecnot-primary
                         transition-smooth text-sm xs:text-base"
              >
                <ArrowLeft className="w-4 h-4 xs:w-5 xs:h-5" />
                Back to Patient
              </Link>

              <div className="flex gap-2 xs:gap-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex-1 xs:flex-none px-4 xs:px-6 py-2 xs:py-3 
                               border-2 border-gray-300 dark:border-gray-600
                               text-gray-700 dark:text-gray-300 rounded-lg font-medium 
                               hover:bg-gray-50 dark:hover:bg-gray-700
                               transition-smooth text-sm xs:text-base"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex-1 xs:flex-none px-4 xs:px-6 py-2 xs:py-3 
                               bg-tecnot-primary dark:bg-tecnot-light
                               text-white dark:text-gray-900 rounded-lg font-medium 
                               hover:bg-tecnot-dark dark:hover:bg-tecnot-primary
                               transition-smooth shadow-lg flex items-center justify-center gap-2
                               text-sm xs:text-base"
                    >
                      <Save className="w-4 h-4 xs:w-5 xs:h-5" />
                      Save
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex-1 xs:flex-none px-4 xs:px-6 py-2 xs:py-3 
                             bg-tecnot-primary dark:bg-tecnot-light
                             text-white dark:text-gray-900 rounded-lg font-medium 
                             hover:bg-tecnot-dark dark:hover:bg-tecnot-primary
                             transition-smooth shadow-lg flex items-center justify-center gap-2
                             text-sm xs:text-base"
                  >
                    <Edit className="w-4 h-4 xs:w-5 xs:h-5" />
                    Edit
                  </button>
                )}
              </div>
            </div>

            {/* SOAP Note Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm 
                         border border-gray-100 dark:border-gray-700 p-4 xs:p-6 sm:p-8 
                         space-y-6 sm:space-y-8 transition-colors">
              
              {/* Session Info */}
              <div className="flex items-center gap-2 text-xs xs:text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>Session Date: 05 Feb 2026, 2:30 PM</span>
              </div>

              {/* Chief Complaint (AI-Extracted, Read-Only) */}
              <div>
                <SectionTitle icon={FileText}>Chief Complaint</SectionTitle>
                <ReadOnlyField value={soapData.chief_complaint} />
              </div>

              {/* History of Present Illness (AI-Extracted, Read-Only) */}
              <div>
                <SectionTitle>History of Present Illness (HPI)</SectionTitle>
                <ReadOnlyField value={soapData.history_present_illness} />
              </div>

              {/* SOAP Sections */}
              <div className="grid grid-cols-1 gap-6">
                
                {/* Subjective */}
                <div>
                  <SectionTitle>S - SUBJECTIVE</SectionTitle>
                  <EditableField
                    label="Patient's Description"
                    value={soapData.subjective}
                    field="subjective"
                    rows={5}
                  />
                </div>

                {/* Objective */}
                <div>
                  <SectionTitle>O - OBJECTIVE</SectionTitle>
                  <EditableField
                    label="Clinical Findings & Vitals"
                    value={soapData.objective}
                    field="objective"
                    rows={6}
                  />
                </div>

                {/* Assessment */}
                <div>
                  <SectionTitle>A - ASSESSMENT</SectionTitle>
                  <EditableField
                    label="Diagnosis & Differential"
                    value={soapData.assessment}
                    field="assessment"
                    rows={5}
                  />
                </div>

                {/* Plan */}
                <div>
                  <SectionTitle>P - PLAN</SectionTitle>
                  <EditableField
                    label="Treatment Plan"
                    value={soapData.plan}
                    field="plan"
                    rows={6}
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="border-t-2 border-gray-200 dark:border-gray-700"></div>

              {/* Orders Section */}
              <div>
                <h2 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 xs:mb-6">
                  Orders & Instructions
                </h2>
                
                <div className="space-y-4 xs:space-y-5">
                  
                  {/* Lab Orders */}
                  <div>
                    <EditableField
                      label="🧪 Lab Orders"
                      value={soapData.lab_orders}
                      field="lab_orders"
                      rows={3}
                    />
                  </div>

                  {/* Radiology Orders */}
                  <div>
                    <EditableField
                      label="🏥 Radiology Orders"
                      value={soapData.radiology_orders}
                      field="radiology_orders"
                      rows={3}
                    />
                  </div>

                  {/* Medication Orders */}
                  <div>
                    <EditableField
                      label="💊 Medication Orders"
                      value={soapData.medication_orders}
                      field="medication_orders"
                      rows={4}
                    />
                  </div>

                  {/* Procedure Orders */}
                  <div>
                    <EditableField
                      label="🔬 Procedure Orders"
                      value={soapData.procedure_orders}
                      field="procedure_orders"
                      rows={3}
                    />
                  </div>

                  {/* Nursing Instructions */}
                  <div>
                    <EditableField
                      label="👩‍⚕️ Nursing Instructions"
                      value={soapData.nursing_instructions}
                      field="nursing_instructions"
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SIDEBAR: Historical SOAP Notes (1 column on desktop) */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm 
                         border border-gray-100 dark:border-gray-700 p-4 xs:p-5 sm:p-6 
                         lg:sticky lg:top-20 transition-colors">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-sm xs:text-base sm:text-lg">
                📚 Historical SOAP Notes
              </h3>

              <div className="space-y-3">
                {historicalNotes.map((note) => (
                  <div
                    key={note.id}
                    className={`p-3 rounded-lg border-2 transition-all cursor-pointer
                              ${note.id === id 
                                ? 'border-tecnot-primary dark:border-tecnot-light bg-tecnot-light dark:bg-tecnot-primary/20' 
                                : 'border-gray-200 dark:border-gray-600 hover:border-tecnot-primary dark:hover:border-tecnot-light hover:bg-tecnot-light/50 dark:hover:bg-gray-700'
                              }`}
                    onClick={() => note.id !== id && navigate(`/soap-note/${note.id}`)}
                  >
                    <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 mb-1">
                      📅 {new Date(note.date).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white text-xs xs:text-sm truncate">
                      {note.chief_complaint}
                    </p>
                    {note.id === id && (
                      <span className="inline-block mt-2 px-2 py-0.5 
                                     bg-tecnot-primary dark:bg-tecnot-light
                                     text-white dark:text-gray-900
                                     text-[10px] xs:text-xs rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <button
                className="w-full mt-4 px-4 py-2.5 
                         border-2 border-tecnot-primary dark:border-tecnot-light
                         text-tecnot-primary dark:text-tecnot-light rounded-lg font-medium 
                         hover:bg-tecnot-light dark:hover:bg-gray-700
                         transition-smooth text-xs xs:text-sm"
              >
                Continue This Session
              </button>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-[10px] xs:text-xs text-gray-500 dark:text-gray-400 mb-2">
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SoapNote