import { createClient } from '@supabase/supabase-js'

// Set these in .env.local (locally) and in Vercel > Project Settings > Environment Variables.
// The anon key and the newer "publishable" key both work here. Tables arrive in Week 5.
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const supabase = url && key ? createClient(url, key) : null
