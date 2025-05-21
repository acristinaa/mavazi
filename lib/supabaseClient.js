import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://tkgwlluvsqxgtdwhtfpa.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrZ3dsbHV2c3F4Z3Rkd2h0ZnBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3NTg4MzMsImV4cCI6MjA2MzMzNDgzM30.YalcPkTWxaxP3qlgcp_WQKkF6IaBhqO-27qzvEsMGlU'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
