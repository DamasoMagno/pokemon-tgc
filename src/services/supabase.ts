import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ndprdrbfcmmgrbsvbsrn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kcHJkcmJmY21tZ3Jic3Zic3JuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg5NTgwNDYsImV4cCI6MjA0NDUzNDA0Nn0.X_OYKLE4HHscIyqjlPFWeHbzfBryAOxbDlJyO2ePh08"
);

export { supabase }