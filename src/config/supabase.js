
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://narivuecshkbtcueblcl.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hcml2dWVjc2hrYnRjdWVibGNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU3MjAyMjAsImV4cCI6MjAxMTI5NjIyMH0.skPRKNsXkp1bVe3oNEAPo5kngqaStvPUQuzqo_puqLs"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase