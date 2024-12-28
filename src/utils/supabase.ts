import { createClient } from "@supabase/supabase-js";

const apiKey = import.meta.env.VITE_SUPABASE_KEY;
const apiUrl = import.meta.env.VITE_SUPABASE_URL;

if (!apiUrl || !apiKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(apiUrl, apiKey);

export default supabase;
