import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://jydzfqycyxygnwtizajr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5ZHpmcXljeXh5Z253dGl6YWpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2NTI1MTEsImV4cCI6MjA5NTIyODUxMX0.MGdlfPmGmheF6DA3zgbEhokl1SLYm2YbVPhPKIv37wA"
);