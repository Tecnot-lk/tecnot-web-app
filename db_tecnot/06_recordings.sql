INSERT INTO storage.buckets (id, name, public)
VALUES ('recordings', 'recordings', false)
ON CONFLICT DO NOTHING;
DROP POLICY IF EXISTS "Doctors can upload recordings"  ON storage.objects;
DROP POLICY IF EXISTS "Doctors can view own recordings" ON storage.objects;
DROP POLICY IF EXISTS "Doctors can delete own recordings" ON storage.objects;

CREATE POLICY "Doctors can upload recordings"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'recordings'
    AND auth.role() = 'authenticated'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Doctors can view own recordings"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'recordings'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Doctors can delete own recordings"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'recordings'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE TABLE IF NOT EXISTS recordings (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id        UUID        REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  patient_id       UUID        REFERENCES patients(id)   ON DELETE CASCADE NOT NULL,
  session_id       UUID        REFERENCES sessions(id)   ON DELETE SET NULL,
  storage_path     TEXT        NOT NULL,
  duration_seconds INTEGER,                   
  file_size_bytes  BIGINT,                     
  mime_type        TEXT DEFAULT 'audio/webm',  
  transcript       TEXT,
  status           TEXT        DEFAULT 'pending',
  error_message    TEXT,      

  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION update_recordings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_recordings_updated_at ON recordings;
CREATE TRIGGER set_recordings_updated_at
  BEFORE UPDATE ON recordings
  FOR EACH ROW EXECUTE FUNCTION update_recordings_updated_at();

ALTER TABLE recordings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Doctors see own recordings"    ON recordings;
DROP POLICY IF EXISTS "Doctors insert recordings"     ON recordings;
DROP POLICY IF EXISTS "Doctors update own recordings" ON recordings;
DROP POLICY IF EXISTS "Doctors delete own recordings" ON recordings;

CREATE POLICY "Doctors see own recordings"    ON recordings FOR SELECT USING (auth.uid() = doctor_id);
CREATE POLICY "Doctors insert recordings"     ON recordings FOR INSERT WITH CHECK (auth.uid() = doctor_id);
CREATE POLICY "Doctors update own recordings" ON recordings FOR UPDATE USING (auth.uid() = doctor_id);
CREATE POLICY "Doctors delete own recordings" ON recordings FOR DELETE USING (auth.uid() = doctor_id);
CREATE INDEX IF NOT EXISTS idx_recordings_doctor_id  ON recordings(doctor_id);
CREATE INDEX IF NOT EXISTS idx_recordings_patient_id ON recordings(patient_id);
CREATE INDEX IF NOT EXISTS idx_recordings_session_id ON recordings(session_id);
CREATE INDEX IF NOT EXISTS idx_recordings_status     ON recordings(doctor_id, status);


