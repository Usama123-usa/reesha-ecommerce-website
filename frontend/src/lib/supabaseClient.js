import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://puvmgshyoppkbppntvia.supabase.co'
const supabaseAnonKey = 'sb_publishable_X1i3eQXakZGM_WWtfg9rgA_Mzp4vKzN'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
