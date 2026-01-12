import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    // We don't throw here to prevent build/setup crashes, 
    // but we should handle this in actions.
    console.warn("Supabase credentials missing in .env.local")
}

export const supabase = createClient(
    supabaseUrl || '',
    supabaseAnonKey || ''
)
