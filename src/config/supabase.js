
import { createClient } from '@supabase/supabase-js'

let tokenInfo = localStorage.getItem("sb-narivuecshkbtcueblcl-auth-token")
const jsonObject = JSON.parse(tokenInfo);
const access_token = jsonObject.access_token


const supabaseUrl = 'https://narivuecshkbtcueblcl.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hcml2dWVjc2hrYnRjdWVibGNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU3MjAyMjAsImV4cCI6MjAxMTI5NjIyMH0.skPRKNsXkp1bVe3oNEAPo5kngqaStvPUQuzqo_puqLs"
const supabase = createClient(supabaseUrl, supabaseKey,{
    headers: {
      Authorization: `Bearer ${access_token}`, // Replace access_token with your actual token
    },
  })

export default supabase