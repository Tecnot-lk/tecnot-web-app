CREATE TABLE IF NOT EXISTS patients (
  id                 UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id          UUID        REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  mrn                TEXT        UNIQUE,
  first_name         TEXT        NOT NULL,
  last_name          TEXT        NOT NULL,
  date_of_birth      DATE,
  age                INTEGER,
  gender             TEXT,
  nationality        TEXT,
  national_id        TEXT,
  mobile_number      TEXT,
  email              TEXT,
  preferred_language TEXT        DEFAULT 'English',
  blood_type         TEXT,
  chronics           TEXT,
  allergies          TEXT,
  drug_precautions   TEXT,
  created_at         TIMESTAMPTZ DEFAULT NOW(),
  updated_at         TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION update_patients_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_patients_updated_at ON patients;
CREATE TRIGGER set_patients_updated_at
  BEFORE UPDATE ON patients
  FOR EACH ROW EXECUTE FUNCTION update_patients_updated_at();

ALTER TABLE patients ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Doctors see own patients"    ON patients;
DROP POLICY IF EXISTS "Doctors insert patients"     ON patients;
DROP POLICY IF EXISTS "Doctors update own patients" ON patients;
DROP POLICY IF EXISTS "Doctors delete own patients" ON patients;

CREATE POLICY "Doctors see own patients"    ON patients FOR SELECT USING (auth.uid() = doctor_id);
CREATE POLICY "Doctors insert patients"     ON patients FOR INSERT WITH CHECK (auth.uid() = doctor_id);
CREATE POLICY "Doctors update own patients" ON patients FOR UPDATE USING (auth.uid() = doctor_id);
CREATE POLICY "Doctors delete own patients" ON patients FOR DELETE USING (auth.uid() = doctor_id);
CREATE INDEX IF NOT EXISTS idx_patients_doctor_id ON patients(doctor_id);
CREATE INDEX IF NOT EXISTS idx_patients_mrn       ON patients(mrn);
