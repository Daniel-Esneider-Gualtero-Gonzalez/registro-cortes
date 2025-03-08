import { createClient } from "@supabase/supabase-js"
import variablesEntorno from "../configenv"

export const clienteSupabase = createClient(variablesEntorno.supabase_url,variablesEntorno.supabase_anon_key)
