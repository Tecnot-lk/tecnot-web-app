CREATE TABLE IF NOT EXISTS sessions (
  id                   UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id            UUID        REFERENCES auth.users(id)  ON DELETE CASCADE NOT NULL,
  patient_id           UUID        REFERENCES patients(id)    ON DELETE CASCADE NOT NULL, 
  chief_complaint      TEXT,
  history_present_illness TEXT,
  vitals               JSONB,
  transcript           TEXT, 
  soap_subjective      TEXT,
  soap_objective       TEXT,
  soap_assessment      TEXT,
  soap_plan            TEXT,
  lab_orders           TEXT,
  radiology_orders     TEXT,
  medication_orders    TEXT,
  procedure_orders     TEXT,
  nursing_instructions TEXT,
  status               TEXT        DEFAULT 'completed',
  created_at           TIMESTAMPTZ DEFAULT NOW(),
  updated_at           TIMESTAMPTZ DEFAULT NOW()
);


CREATE OR REPLACE FUNCTION update_sessions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_sessions_updated_at ON sessions;
CREATE TRIGGER set_sessions_updated_at
  BEFORE UPDATE ON sessions
  FOR EACH ROW EXECUTE FUNCTION update_sessions_updated_at();

ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Doctors see own sessions"    ON sessions;
DROP POLICY IF EXISTS "Doctors insert sessions"     ON sessions;
DROP POLICY IF EXISTS "Doctors update own sessions" ON sessions;
DROP POLICY IF EXISTS "Doctors delete own sessions" ON sessions;

CREATE POLICY "Doctors see own sessions"    ON sessions FOR SELECT USING (auth.uid() = doctor_id);
CREATE POLICY "Doctors insert sessions"     ON sessions FOR INSERT WITH CHECK (auth.uid() = doctor_id);
CREATE POLICY "Doctors update own sessions" ON sessions FOR UPDATE USING (auth.uid() = doctor_id);
CREATE POLICY "Doctors delete own sessions" ON sessions FOR DELETE USING (auth.uid() = doctor_id);
CREATE INDEX IF NOT EXISTS idx_sessions_doctor_id  ON sessions(doctor_id);
CREATE INDEX IF NOT EXISTS idx_sessions_patient_id ON sessions(patient_id);
CREATE INDEX IF NOT EXISTS idx_sessions_created_at ON sessions(created_at DESC);
