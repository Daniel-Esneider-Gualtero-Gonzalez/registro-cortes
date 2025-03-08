import { config } from "dotenv";
import { variablesEntornoDev } from "./config-env-dev.js"

let variablesEntorno = null
const isBrowser = typeof window !== 'undefined';
if (isBrowser) {
    variablesEntorno = {
        supabase_url: variablesEntornoDev.SUPABASE_URL,
        supabase_anon_key: variablesEntornoDev.SUPABASE_ANON_KEY
    }
} else {
    config()
    variablesEntorno = {
        supabase_url: process.env.SUPABASE_URL,
        supabase_anon_key: process.env.SUPABASE_URL
    }
    
}


export default variablesEntorno 