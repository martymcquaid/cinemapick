import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://grfgqztuedpmyrrwrmly.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyZmdxenR1ZWRwbXlycnJybWx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4MDI2NzEsImV4cCI6MjA0OTM3ODY3MX0.7Yq8tHJNqW9xYnN8oJf4rXmGhJjZtVqJ9r2qF3kL7c'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)