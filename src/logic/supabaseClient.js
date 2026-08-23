import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("FATAL ERROR: VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY is not defined in the environment. Client cannot initialize.");
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
