import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nmncetlbauimmfzyhfqh.supabase.co'
const supabaseKey = 'sb_publishable_gHPodGQ8rmdsiDw-yqrZvw_bFEz8zLQ'

export const supabase = createClient(supabaseUrl, supabaseKey)

