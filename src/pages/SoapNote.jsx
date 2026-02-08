import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Edit, Save, FileText, Calendar } from 'lucide-react'
import Header from '../components/Header'
import PatientBanner from '../components/PatientBanner'

function SoapNote() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)

  // Dummy patient data
  const patient = {
    id: '1',
    mrn: 'MRN001234',
    first_name: 'Malik',
    last_name: 'Fernando',
    age: 38,
    gender: 'Male',
    blood_type: 'O+',
    chronics: 'Diabetes Type 2',
    allergies: 'Penicillin',
    drug_precautions: 'Avoid NSAIDs',
    national_id: '851234567V'
  }

  const session = {
    vitals: {
      height: '175',
      weight: '70',
      temperature: '37.2',
      blood_pressure: '120/80',
      heart_rate: '72',
      spo2: '98'
    }
  }

  const [soapData, setSoapData] = useState({
    chief_complaint: 'Severe headache',
    history_present_illness: 'Patient reports severe right-sided throbbing headache for 3 days. Pain worsens in evening. Occasional blurry vision. Paracetamol ineffective.',
    subjective: 'Patient complains of severe headache on right side for 3 days. Describes pain as throbbing and worse in evening. Reports occasional blurry vision. Denies nausea. Tried paracetamol with minimal relief.',
    objective: `Vitals:
- Height: 175cm, Weight: 70kg
- Temp: 37.2°C
- BP: 120/80, HR: 72, SpO2: 98%

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
  })

  // Historical SOAP notes
  const historicalNotes = [
    { id: '1', date: '2026-02-05 14:30', chief_complaint: 'Severe headache' },
    { id: '2', date: '2026-01-15 10:20', chief_complaint: 'Follow-up diabetes' },
    { id: '3', date: '2025-12-20 16:45', chief_complaint: 'Leg pain' },
  ]

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
                  💡 <strong>Tip:</strong> Click "Continue This Session" to add more notes to this consultation.
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