import { createClient } from '@supabase/supabase-js';


// Initialize Supabase client
// Using direct values from project configuration
const supabaseUrl = 'https://giinbsjbwwzrtxjgqfyf.supabase.co';
const supabaseKey = 'sb_publishable_nYuhhMvf4ReRf5KixpHYHg_4uw8BS6S';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };