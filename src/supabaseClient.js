import {createClient} from "@supabase/supabase.js";

const supabaseUrl = "https://wxllchqeqxjkpiurgudk.supabase.co";
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4bGxjaHFlcXhqa3BpdXJndWRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NTU3NDIsImV4cCI6MjA2MzIzMTc0Mn0.dF_BXEmrDYw5uYll31UlR1YRdMSOqVbkOre-PJUfJU8'

export const supabase = createClient(supabaseUrl,supabaseKey);