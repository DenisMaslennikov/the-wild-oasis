import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://dhwwdjeezvasandmimpm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRod3dkamVlenZhc2FuZG1pbXBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExODcyMzMsImV4cCI6MjA1Njc2MzIzM30.y6LsM7VnMrZTMPDuRmX-JvKJ8asmd4hr0xhKuwWKIKg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
