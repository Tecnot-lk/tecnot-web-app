// =============================================================================
// DUMMY SOAP NOTES DATA
// =============================================================================
//
// PURPOSE:
// - Provide sample SOAP notes for frontend development
// - Use this when backend is not ready yet
// - Shows what historical SOAP notes look like
//
// NOTE: This file is OPTIONAL and only for testing
// Delete this file when backend integration is complete
//
// =============================================================================

export const soapNotesData = [
  {
    id: '1',
    patient_id: '1',
    patient_mrn: 'MRN001234',
    patient_name: 'Malik Fernando',
    session_date: '2026-02-10T10:30:00Z',
    complaint: 'General checkup and diabetes follow-up',
    
    soap: {
      subjective: `Chief Complaint: Patient presents for routine diabetes follow-up and general checkup.

History of Present Illness: Patient reports good compliance with medication. Blood sugar levels have been stable over the past month. No episodes of hypoglycemia or hyperglycemia. Patient monitors blood glucose at home regularly.

Review of Systems:
- Constitutional: Denies fever, fatigue, or weight changes
- Cardiovascular: Denies chest pain or palpitations
- Respiratory: Denies shortness of breath or cough
- GI: Denies abdominal pain, nausea, or changes in bowel habits
- Musculoskeletal: Denies joint pain or stiffness

Past Medical History: Diabetes Type 2 (diagnosed 2018), Hypertension
Current Medications: Metformin 500mg BD, Amlodipine 5mg OD
Allergies: Penicillin`,

      objective: `Vitals:
- Height: 172 cm
- Weight: 78 kg
- BMI: 26.4
- Blood Pressure: 128/82 mmHg
- Heart Rate: 74 bpm
- Temperature: 36.8°C
- SpO2: 98%

Physical Examination:
- General: Alert, oriented, well-nourished, in no acute distress
- HEENT: Normocephalic, atraumatic, pupils equal and reactive
- Cardiovascular: Regular rate and rhythm, no murmurs, rubs, or gallops
- Respiratory: Clear to auscultation bilaterally, no wheezes or crackles
- Abdomen: Soft, non-tender, non-distended, normal bowel sounds
- Extremities: No edema, peripheral pulses intact
- Neurological: Alert and oriented x3, cranial nerves II-XII intact

Lab Results (from last visit 1 month ago):
- HbA1c: 6.8%
- Fasting Blood Glucose: 118 mg/dL
- Lipid Panel: Total Cholesterol 185, LDL 110, HDL 48, Triglycerides 135`,

      assessment: `Primary Diagnoses:
1. Diabetes Mellitus Type 2 - Well controlled (HbA1c 6.8%)
2. Essential Hypertension - Controlled

Clinical Impression:
Patient's diabetes is well-controlled on current regimen. Blood pressure is within target range. Patient demonstrates good understanding of disease management and medication compliance. No acute concerns at this time.

Risk Factors:
- Family history of cardiovascular disease
- Borderline BMI
- Sedentary lifestyle`,

      plan: `Treatment Plan:
1. Continue current medications
   - Metformin 500mg PO BD with meals
   - Amlodipine 5mg PO OD in the morning

2. Lifestyle Modifications
   - Encourage 30 minutes of moderate exercise 5 days per week
   - Continue diabetic diet with carbohydrate counting
   - Weight reduction goal: 5kg over 6 months

3. Monitoring
   - Continue home blood glucose monitoring (fasting and 2hr post-prandial)
   - Self-monitoring of blood pressure weekly

4. Laboratory Orders
   - HbA1c in 3 months
   - Lipid panel in 6 months
   - Annual diabetic eye exam (due in 2 months)
   - Annual foot exam performed today - no neuropathy detected

Follow-up:
- Return in 3 months or sooner if blood sugar not controlled
- Call if blood glucose consistently >180 mg/dL or <70 mg/dL
- Emergency visit if chest pain, severe hypoglycemia, or DKA symptoms

Patient Education:
- Reviewed signs/symptoms of hypo/hyperglycemia
- Discussed foot care and daily inspection
- Reinforced medication adherence
- Patient verbalizes understanding`
    },
    
    created_at: '2026-02-10T11:15:00Z',
    finalized: true
  },
  
  {
    id: '2',
    patient_id: '2',
    patient_mrn: 'MRN005678',
    patient_name: 'Shiman Perera',
    session_date: '2026-01-15T14:00:00Z',
    complaint: 'Seasonal allergies and nasal congestion',
    
    soap: {
      subjective: `Chief Complaint: "My nose has been really congested and I've been sneezing a lot."

History of Present Illness: Patient reports 1 week of nasal congestion, sneezing, and watery eyes. Symptoms worse in the morning. Denies fever, sore throat, or cough. No known sick contacts. Patient tried over-the-counter antihistamine with minimal relief.

Associated Symptoms: Itchy eyes, mild headache (frontal)
Aggravating Factors: Being outdoors, exposure to dust
Relieving Factors: Indoor environment with AC

Past Medical History: No chronic medical conditions
Current Medications: None regular, tried Cetirizine 10mg OD for 3 days
Allergies: Sulfa drugs`,

      objective: `Vitals:
- Height: 175 cm
- Weight: 72 kg
- Temperature: 36.5°C
- Blood Pressure: 118/76 mmHg
- Heart Rate: 68 bpm
- Respiratory Rate: 16/min

Physical Examination:
- General: Alert, appears well, mild nasal congestion evident
- Eyes: Mild conjunctival injection, no discharge, PERRLA
- ENT: 
  * Nasal mucosa edematous and erythematous bilaterally
  * Clear nasal discharge
  * Turbinates enlarged
  * Throat: No erythema or exudates
  * Tonsils: Not enlarged
- Neck: No lymphadenopathy
- Chest: Clear to auscultation, no wheezing
- Cardiovascular: RRR, no murmurs`,

      assessment: `Primary Diagnosis: Allergic Rhinitis (Seasonal)

Differential Diagnoses Considered:
1. Viral upper respiratory infection - Less likely due to duration and lack of fever
2. Vasomotor rhinitis - Possible but symptoms more consistent with allergic etiology

Clinical Reasoning:
Patient presents with classic symptoms of allergic rhinitis including sneezing, nasal congestion, watery eyes, and itchy eyes. Symptoms pattern suggests environmental trigger. Physical exam consistent with allergic rhinitis.`,

      plan: `Medications:
1. Loratadine 10mg PO OD x 14 days (non-sedating antihistamine)
2. Fluticasone nasal spray 2 sprays each nostril OD x 14 days
3. Artificial tears PRN for eye symptoms

Non-Pharmacological Management:
- Avoid known allergen triggers when possible
- Keep windows closed during high pollen days
- Use air conditioning with HEPA filter
- Shower and change clothes after outdoor activities
- Consider allergen testing if symptoms persist

Follow-up:
- Return in 2 weeks if no improvement
- Sooner if symptoms worsen or new symptoms develop
- May need referral to ENT/Allergist if symptoms chronic or refractory

Patient Education:
- Proper technique for nasal spray administration demonstrated
- Advised that nasal spray may take 3-5 days for full effect
- Instructed to continue medications for full 14 days
- Discussed environmental control measures
- Patient verbalizes understanding and agrees with plan`
    },
    
    created_at: '2026-01-15T14:45:00Z',
    finalized: true
  },

  {
    id: '3',
    patient_id: '3',
    patient_mrn: 'MRN009012',
    patient_name: 'Aisha Khan',
    session_date: '2025-12-05T09:15:00Z',
    complaint: 'Asthma exacerbation',
    
    soap: {
      subjective: `Chief Complaint: Increased shortness of breath and wheezing for past 2 days.

History of Present Illness: Patient with known asthma reports worsening symptoms over past 48 hours. Increased use of rescue inhaler (Salbutamol) from once weekly to 4-5 times per day. Patient reports exposure to dust during home cleaning 3 days ago. Currently using controller medication (Budesonide inhaler) regularly.

Associated Symptoms:
- Chest tightness
- Nocturnal awakening due to breathing difficulty
- Mild cough with clear sputum
- Denies fever, chills, or sick contacts

Asthma History: Diagnosed age 25, usually well-controlled with current regimen
Peak Flow Meter: Personal best 380 L/min, current reading 280 L/min (74% of personal best)
Allergies: Peanuts, Shellfish (food), Dust (environmental)`,

      objective: `Vitals:
- Temperature: 36.7°C
- Blood Pressure: 125/78 mmHg
- Heart Rate: 92 bpm (elevated)
- Respiratory Rate: 24/min (elevated)
- SpO2: 94% on room air

Physical Examination:
- General: Mild respiratory distress, speaking in full sentences
- Respiratory:
  * Bilateral expiratory wheezes throughout all lung fields
  * Prolonged expiratory phase
  * No use of accessory muscles
  * Good air entry bilaterally
  * No crackles
- Cardiovascular: Tachycardic but regular rhythm, no murmurs
- Peak Flow: 280 L/min (74% of personal best - moderate exacerbation)`,

      assessment: `Primary Diagnosis: Acute Asthma Exacerbation - Moderate Severity

Severity Assessment:
- Peak flow 60-80% of personal best: Moderate exacerbation
- Increased symptoms and rescue inhaler use
- Some limitation of daily activities
- No signs of severe or life-threatening asthma

Trigger: Environmental allergen exposure (dust)

Risk Factors:
- Known allergen sensitivity
- Previous exacerbations
- Current controller medication use suggests persistent asthma`,

      plan: `Immediate Treatment:
1. Salbutamol nebulization 2.5mg - Given in clinic
2. Post-nebulization assessment: SpO2 improved to 97%, decreased wheezing

Medications - Acute Phase (Next 5 days):
1. Prednisolone 40mg PO OD for 5 days (oral corticosteroid burst)
2. Salbutamol MDI 2 puffs q4-6h PRN for symptoms
3. Continue Budesonide 200mcg 2 puffs BD (controller medication)

Long-term Controller:
- Consider step-up therapy after acute phase if needed
- Current: Budesonide 200mcg BD
- May need to increase to 400mcg BD if frequent exacerbations

Monitoring:
- Peak flow monitoring TID and record
- Watch for signs of worsening (peak flow <60%, severe symptoms)
- Spacer device use with all inhalers

Follow-up:
- Phone check-in in 2 days
- Office visit in 1 week to assess response
- Emergency visit if: Peak flow <60%, severe breathlessness, no improvement with rescue inhaler

Patient Education:
- Reviewed asthma action plan
- Proper inhaler technique demonstrated and confirmed
- Allergen avoidance strategies discussed
- Signs/symptoms requiring emergency care reviewed
- Importance of controller medication compliance emphasized
- Patient verbalizes understanding and has written action plan

Referrals:
- Consider allergist referral if frequent exacerbations continue
- Pulmonologist consultation if not controlled on step-up therapy`
    },
    
    created_at: '2025-12-05T10:30:00Z',
    finalized: true
  }
]

// Export default for easier importing
export default soapNotesData