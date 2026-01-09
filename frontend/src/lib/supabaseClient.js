import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://swahqjobmjlwpiuyyzdf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3YWhxam9ibWpsd3BpdXl5emRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5OTQxMjksImV4cCI6MjA4MjU3MDEyOX0.v_ocxqFUw26Q2RzG5BfwCcum66oSiJtJvGJnaSjBGHU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
