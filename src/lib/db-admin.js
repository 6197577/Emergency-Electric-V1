import { createClient } from '@supabase/supabase-js';

// This client uses the SERVICE ROLE key, which bypasses all RLS policies.
// NEVER use this in client-side code (browsers).
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
