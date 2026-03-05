import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const SUPABASE_SERVICE_KEY = import.meta.env.VITE_SUPABASE_SERVICE_KEY as string;

// Public client — read-only access for all visitors
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Admin client — full access, used only inside the password-protected admin
export const adminSupabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
