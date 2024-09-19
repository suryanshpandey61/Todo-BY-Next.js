
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zqskydzflleyhqqwyznr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpxc2t5ZHpmbGxleWhxcXd5em5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY0OTYyNDMsImV4cCI6MjA0MjA3MjI0M30.7jor9vyWhwubTomnIs39mmXulW9V-4yQQzdst4gcLGM'
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };