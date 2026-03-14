ALTER TABLE patients DROP CONSTRAINT IF EXISTS patients_doctor_id_fkey;

ALTER TABLE patients
ADD CONSTRAINT patients_doctor_id_fkey
FOREIGN KEY (doctor_id)
REFERENCES auth.users(id)
ON DELETE CASCADE;
