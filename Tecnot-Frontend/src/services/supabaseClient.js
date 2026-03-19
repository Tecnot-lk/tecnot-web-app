import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

/**
    * SUPABASE CLIENT SERVICE
    * Handles the connection between the React frontend and the Postgres backend.
    * Uses Environment Variables for secure credential management.
 */