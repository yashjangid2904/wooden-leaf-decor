import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fmxvagagzexbkwwsanwn.supabase.co'
const supabaseKey = 'sb_publishable__VJkLXuSCOHFOvDxRSSnjw_gnh0CU-9'

export const supabase = createClient(supabaseUrl, supabaseKey)
