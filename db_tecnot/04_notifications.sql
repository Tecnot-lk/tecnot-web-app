CREATE TABLE IF NOT EXISTS notifications (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id  UUID        REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type       TEXT        NOT NULL,   -- 'session' | 'patient' | 'soap'
  title      TEXT        NOT NULL,
  message    TEXT,
  read       BOOLEAN     DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION notify_on_new_session()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.notifications (doctor_id, type, title, message)
  VALUES (
    NEW.doctor_id,
    'session',
    'New session completed',
    'SOAP note generated for session on ' || TO_CHAR(NEW.created_at, 'DD Mon YYYY')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_session_created ON sessions;
CREATE TRIGGER on_session_created
  AFTER INSERT ON sessions
  FOR EACH ROW EXECUTE FUNCTION notify_on_new_session();

CREATE OR REPLACE FUNCTION notify_on_new_patient()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.notifications (doctor_id, type, title, message)
  VALUES (
    NEW.doctor_id,
    'patient',
    'New patient added',
    NEW.first_name || ' ' || NEW.last_name || ' has been added to your patient list'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_patient_created ON patients;
CREATE TRIGGER on_patient_created
  AFTER INSERT ON patients
  FOR EACH ROW EXECUTE FUNCTION notify_on_new_patient();

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Doctors see own notifications"    ON notifications;
DROP POLICY IF EXISTS "Doctors insert own notifications" ON notifications;
DROP POLICY IF EXISTS "Doctors update own notifications" ON notifications;
DROP POLICY IF EXISTS "Doctors delete own notifications" ON notifications;

CREATE POLICY "Doctors see own notifications"    ON notifications FOR SELECT USING (auth.uid() = doctor_id);
CREATE POLICY "Doctors insert own notifications" ON notifications FOR INSERT WITH CHECK (auth.uid() = doctor_id);
CREATE POLICY "Doctors update own notifications" ON notifications FOR UPDATE USING (auth.uid() = doctor_id);
CREATE POLICY "Doctors delete own notifications" ON notifications FOR DELETE USING (auth.uid() = doctor_id);
CREATE INDEX IF NOT EXISTS idx_notifications_doctor_id ON notifications(doctor_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read      ON notifications(doctor_id, read);
