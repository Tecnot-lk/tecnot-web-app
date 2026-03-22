import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('🔧 Loading Supabase...')
console.log('URL:', supabaseUrl)
console.log('Key present:', supabaseAnonKey ? 'YES' : 'NO')

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables! Check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

console.log('✅ Supabase client created successfully')