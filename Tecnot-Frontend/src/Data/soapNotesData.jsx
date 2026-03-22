// ====================
// SHARED SOAP NOTES DATA
// Central source of truth for all SOAP notes
// Each SOAP note is linked to a session ID
// ====================

export const soapNotesData = [
  // Malik's SOAP Notes (Patient 001)
  {
    sessionId: 1,
    patientName: 'Malik',
    patientCode: '001',
    date: '25/11/2025',
    time: '10:17am',
    complaint: 'Leg pain',
    subjective: 'Patient complains of persistent pain in the right leg for the past 3 days. Pain is described as sharp and worsens with movement. No history of trauma or injury.',
    objective: 'Patient appears in mild distress. Right leg examination reveals tenderness in the calf muscle. No swelling or discoloration observed. Vital signs: BP 120/80, Pulse 72 bpm, Temp 98.6°F.',
    assessment: 'Likely muscle strain in the right calf. No signs of deep vein thrombosis or fracture.',
    plan: 'Prescribed pain relief medication (Ibuprofen 400mg TDS). Advised rest and ice application. Follow-up in 1 week if symptoms persist.'
  },
  {
    sessionId: 2,
    patientName: 'Malik',
    patientCode: '001',
    date: '30/11/2025',
    time: '02:30pm',
    complaint: 'Chest pain',
    subjective: 'Patient reports mild chest discomfort that started this morning. Describes it as a dull ache, no radiation to arms. No shortness of breath. Patient is anxious about heart problems.',
    objective: 'Patient alert and oriented. Chest examination normal, heart sounds regular. No abnormal lung sounds. ECG performed - shows normal sinus rhythm. Vital signs: BP 118/78, Pulse 76 bpm, O2 saturation 98%.',
    assessment: 'Musculoskeletal chest pain, likely due to muscle strain. Cardiac causes ruled out based on examination and ECG.',
    plan: 'Reassured patient. Prescribed muscle relaxant. Advised stress management techniques. Return if symptoms worsen or new symptoms develop.'
  },
  {
    sessionId: 3,
    patientName: 'Malik',
    patientCode: '001',
    date: '03/01/2026',
    time: '11:45am',
    complaint: 'Stomach pain',
    subjective: 'Patient complains of abdominal pain in the upper abdomen for 2 days. Pain is cramping in nature, associated with mild nausea. No vomiting or diarrhea. Pain increases after meals.',
    objective: 'Abdomen soft, mild tenderness in epigastric region. No guarding or rebound tenderness. Bowel sounds present and normal. Vital signs stable.',
    assessment: 'Likely gastritis or dyspepsia. No signs of acute abdomen.',
    plan: 'Prescribed antacid (Omeprazole 20mg OD before breakfast) for 2 weeks. Advised dietary modifications - avoid spicy and oily foods. Follow-up in 2 weeks.'
  },
  {
    sessionId: 4,
    patientName: 'Malik',
    patientCode: '001',
    date: '10/01/2026',
    time: '09:15am',
    complaint: 'Leg pain',
    subjective: 'Patient returns with left leg pain this time. Started yesterday after long walk. Pain is in the shin area, described as aching.',
    objective: 'Left shin area tender on palpation. No swelling. Good range of motion. Vital signs normal.',
    assessment: 'Shin splints - likely overuse injury.',
    plan: 'Advised rest, ice application, and stretching exercises. Prescribed anti-inflammatory gel for local application. Recommended proper footwear. Follow-up PRN.'
  },

  // Shiman's SOAP Notes (Patient 021)
  {
    sessionId: 5,
    patientName: 'Shiman',
    patientCode: '021',
    date: '30/11/2025',
    time: '02:30pm',
    complaint: 'Chest pain',
    subjective: 'Patient presents with chest pain that started 2 hours ago. Sharp, stabbing pain on left side of chest, worsens with deep breathing. No previous cardiac history.',
    objective: 'Patient anxious but stable. Respiratory rate slightly elevated at 22/min. Chest examination shows localized tenderness over left 5th rib. Heart sounds normal. ECG normal. Vital signs: BP 125/82, Pulse 88 bpm.',
    assessment: 'Costochondritis - inflammation of rib cartilage. Cardiac causes excluded.',
    plan: 'Prescribed NSAIDs (Ibuprofen 400mg TDS) for pain and inflammation. Heat therapy advised. Avoid heavy lifting. Review in 5 days.'
  },
  {
    sessionId: 6,
    patientName: 'Shiman',
    patientCode: '021',
    date: '05/12/2025',
    time: '03:15pm',
    complaint: 'Chest pain follow-up',
    subjective: 'Patient reports improvement in chest pain. Now only mild discomfort, mostly when pressing on the area. Breathing easier.',
    objective: 'Tenderness over ribs reduced significantly. No respiratory distress. Vital signs normal.',
    assessment: 'Costochondritis improving as expected.',
    plan: 'Continue current medication for another week. Gradually resume normal activities. Discharge if resolved at next visit.'
  },

  // Ibrahim's SOAP Notes (Patient 022)
  {
    sessionId: 7,
    patientName: 'Ibrahim',
    patientCode: '022',
    date: '03/01/2026',
    time: '11:45am',
    complaint: 'Stomach pain',
    subjective: 'Patient complains of severe stomach pain for past 6 hours. Pain is in lower right abdomen, sharp in nature. Associated with loss of appetite and one episode of vomiting.',
    objective: 'Patient in visible discomfort. Temperature 99.8°F. Abdomen examination shows tenderness and guarding in right iliac fossa. Positive McBurney\'s point tenderness. Rebound tenderness present.',
    assessment: 'Suspected acute appendicitis. Requires urgent surgical evaluation.',
    plan: 'URGENT REFERRAL to surgery department. Patient sent to emergency room for immediate evaluation. Advised NBM (nothing by mouth). IV fluids started.'
  },
  {
    sessionId: 8,
    patientName: 'Ibrahim',
    patientCode: '022',
    date: '10/01/2026',
    time: '09:30am',
    complaint: 'Stomach pain follow-up',
    subjective: 'Post-appendectomy follow-up. Patient had surgery 5 days ago. Reports minimal pain at surgical site, well controlled with medications. No fever or discharge from wound.',
    objective: 'Surgical wound healing well. No signs of infection. Abdomen soft, non-tender. Bowel sounds present. Vitals stable.',
    assessment: 'Post-operative recovery progressing well.',
    plan: 'Continue antibiotics for 2 more days. Wound care instructions given. Suture removal scheduled for day 10. Return if fever, increased pain, or wound discharge.'
  },
  {
    sessionId: 9,
    patientName: 'Ibrahim',
    patientCode: '022',
    date: '17/01/2026',
    time: '02:00pm',
    complaint: 'Digestive issues',
    subjective: 'Patient reports bloating and irregular bowel movements since surgery. No pain, just discomfort. Appetite returning to normal.',
    objective: 'Abdomen soft and non-tender. Surgical scar healing well. Bowel sounds normal.',
    assessment: 'Post-surgical digestive adjustment. Normal finding after abdominal surgery.',
    plan: 'Advised high fiber diet and adequate water intake. Prescribed probiotics. Should resolve in 1-2 weeks. Follow-up PRN.'
  },

  // Siddiha's SOAP Notes (Patient 111)
  {
    sessionId: 10,
    patientName: 'Alfred',
    patientCode: '111',
    date: '10/01/2026',
    time: '09:15am',
    complaint: 'Leg pain',
    subjective: 'Patient complains of bilateral leg pain, particularly in thighs and calves. Pain is cramping in nature, mostly at night. Patient is elderly and has history of diabetes.',
    objective: 'Peripheral pulses palpable but weak. Skin temperature normal. No ulcers or skin changes. Blood sugar: 165 mg/dL (fasting). BP: 140/90.',
    assessment: 'Possible peripheral vascular disease secondary to diabetes. Also considering diabetic neuropathy.',
    plan: 'Ordered Doppler ultrasound of lower limbs. HbA1c test requested. Prescribed pain medication and advised leg elevation. Strict diabetic diet counseling. Follow-up with test results.'
  },

  // Aaisha's SOAP Notes (Patient 232)
  {
    sessionId: 11,
    patientName: 'Sanuka',
    patientCode: '232',
    date: '15/01/2026',
    time: '10:00am',
    complaint: 'Migraine',
    subjective: 'Patient presents with severe throbbing headache on right side, lasting for 8 hours. Associated with nausea and sensitivity to light. Patient has history of migraines, occurs 2-3 times per month.',
    objective: 'Patient in dark room, appears distressed. Neurological examination normal. No neck stiffness. Vital signs: BP 118/75, Pulse 70 bpm.',
    assessment: 'Acute migraine attack consistent with patient\'s history.',
    plan: 'Prescribed Sumatriptan 50mg for acute attack. Anti-emetic given. Advised rest in dark, quiet room. Discussed trigger avoidance. Consider prophylactic medication if attacks increase.'
  },
  {
    sessionId: 12,
    patientName: 'Sanuka',
    patientCode: '232',
    date: '20/01/2026',
    time: '11:30am',
    complaint: 'Migraine follow-up',
    subjective: 'Patient had another migraine attack 2 days ago. Sumatriptan was effective. Patient concerned about frequency of attacks. Identifies stress and lack of sleep as triggers.',
    objective: 'Patient comfortable today. No acute symptoms. Neurological exam normal.',
    assessment: 'Recurrent migraines. Frequency increasing - now considering prophylaxis.',
    plan: 'Started on Propranolol 40mg OD for migraine prophylaxis. Maintain headache diary. Stress management counseling. Sleep hygiene advice. Review in 4 weeks to assess response.'
  },
  {
    sessionId: 13,
    patientName: 'Sanuka',
    patientCode: '232',
    date: '25/01/2026',
    time: '01:45pm',
    complaint: 'Headache',
    subjective: 'Patient reports tension-type headache today. Different from usual migraines - feels like band around head. Work stress mentioned.',
    objective: 'No focal neurological deficits. Muscle tension noted in neck and shoulders. BP normal.',
    assessment: 'Tension-type headache, likely stress-related.',
    plan: 'Prescribed simple analgesics. Recommended relaxation techniques and neck exercises. Continue migraine prophylaxis. Advised stress management strategies.'
  },
  {
    sessionId: 14,
    patientName: 'Sanuka',
    patientCode: '232',
    date: '30/01/2026',
    time: '03:00pm',
    complaint: 'Migraine',
    subjective: 'Despite prophylaxis, patient had another severe migraine. Lasted 12 hours. Vomiting multiple times. Very distressed.',
    objective: 'Patient recovering from attack. Appears fatigued. Slightly dehydrated. Vital signs stable.',
    assessment: 'Breakthrough migraine despite prophylactic treatment. May need dose adjustment.',
    plan: 'Increased Propranolol to 80mg OD. Prescribed anti-emetics to keep at home. IV fluids given for dehydration. Referral to neurologist for specialized management. Follow-up in 2 weeks.'
  },
  {
    sessionId: 15,
    patientName: 'Sanuka',
    patientCode: '232',
    date: '02/02/2026',
    time: '09:45am',
    complaint: 'Tension headache',
    subjective: 'Mild headache today. Patient states it\'s tension-related from work. Taking regular breaks and practicing relaxation.',
    objective: 'Patient appears well. No acute distress. Neck muscles less tense than previous visit.',
    assessment: 'Tension headache, improving with lifestyle modifications.',
    plan: 'Continue current migraine prophylaxis. Stress management working well. Neurology appointment scheduled for next week. Encouraged to maintain headache diary for neurologist review.'
  }
]