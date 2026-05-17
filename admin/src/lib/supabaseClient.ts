import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (typeof window !== 'undefined' && (!supabaseUrl || supabaseUrl.includes('your_supabase_url'))) {
  console.warn("Supabase URL is not configured correctly in .env.local");
}

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)
