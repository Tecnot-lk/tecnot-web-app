import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validate Environment
if (!supabaseURL || !supabaseKey) {
    console.error('CRITICAL: Supabase credentials missing. Check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseKey)