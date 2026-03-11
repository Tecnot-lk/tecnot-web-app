-- ============================================================
-- TECNOT — SUPABASE DATABASE SETUP
-- ============================================================

-- ─────────────────────────────────────────────────────────────
-- 1. PROFILES TABLE (one row per doctor/user)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name  TEXT,
  last_name   TEXT,
  email       TEXT,
  phone       TEXT,
  specialty   TEXT,
  license_number TEXT,
  clinic_name TEXT,
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create a profile row when a new user signs up
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ─────────────────────────────────────────────────────────────
-- 2. PATIENTS TABLE
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS patients (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id           UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  mrn                 TEXT UNIQUE,
  first_name          TEXT NOT NULL,
  last_name           TEXT NOT NULL,
  date_of_birth       DATE,
  age                 INTEGER,
  gender              TEXT,
  nationality         TEXT,
  national_id         TEXT,
  mobile_number       TEXT,
  email               TEXT,
  preferred_language  TEXT DEFAULT 'English',
  blood_type          TEXT,
  chronics            TEXT,
  allergies           TEXT,
  drug_precautions    TEXT,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- 3. SESSIONS TABLE
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS sessions (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id         UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  patient_id        UUID REFERENCES patients(id) ON DELETE CASCADE NOT NULL,
  chief_complaint   TEXT,
  vitals            JSONB,           -- { height, weight, temperature, blood_pressure, heart_rate, spo2 }
  transcript        TEXT,
  soap_subjective   TEXT,
  soap_objective    TEXT,
  soap_assessment   TEXT,
  soap_plan         TEXT,
  status            TEXT DEFAULT 'completed',
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- 4. ROW LEVEL SECURITY (RLS)
-- Doctors can only see their own data
-- ─────────────────────────────────────────────────────────────

-- Profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile"   ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Patients
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Doctors see own patients"    ON patients FOR SELECT USING (auth.uid() = doctor_id);
CREATE POLICY "Doctors insert patients"     ON patients FOR INSERT WITH CHECK (auth.uid() = doctor_id);
CREATE POLICY "Doctors update own patients" ON patients FOR UPDATE USING (auth.uid() = doctor_id);
CREATE POLICY "Doctors delete own patients" ON patients FOR DELETE USING (auth.uid() = doctor_id);

-- Sessions
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Doctors see own sessions"    ON sessions FOR SELECT USING (auth.uid() = doctor_id);
CREATE POLICY "Doctors insert sessions"     ON sessions FOR INSERT WITH CHECK (auth.uid() = doctor_id);
CREATE POLICY "Doctors update own sessions" ON sessions FOR UPDATE USING (auth.uid() = doctor_id);
CREATE POLICY "Doctors delete own sessions" ON sessions FOR DELETE USING (auth.uid() = doctor_id);

-- ─────────────────────────────────────────────────────────────
-- 5. STORAGE BUCKET FOR PROFILE PICTURES
-- Run this in Supabase Dashboard → Storage → New Bucket
-- OR via SQL:
-- ─────────────────────────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT DO NOTHING;

CREATE POLICY "Anyone can view avatars"
  ON storage.objects FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Auth users can upload avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update own avatar"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- ─────────────────────────────────────────────────────────────
-- DONE ✅
-- ─────────────────────────────────────────────────────────────
