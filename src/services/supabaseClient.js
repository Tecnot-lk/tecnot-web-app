import { createClient } from '@supabase/supabase-js'

//add to a .env file at the end
const supabaseUrl = 'https://qzjfyakmkuwrdivkruul.supabase.co'
//add to a .env file at the end
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6amZ5YWtta3V3cmRpdmtydXVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3NTQ1ODgsImV4cCI6MjA4NzMzMDU4OH0.I7be34_4sTO14V0Uouux8wYMnDAYT7yOM1tVBOGrVwg'

export const supabase = createClient(supabaseUrl, supabaseKey)