import { config } from "dotenv";

let variablesEntorno  = null
if(typeof window === "undefined" ) {
    config()
    variablesEntorno = {
        supabase_url: process.env.SUPABASE_URL,
        supabase_anon_key : process.env.SUPABASE_ANON_KEY
    }
}else{
    variablesEntorno = {
        supabase_url: "https://fqaagjnediaimuhvxfmy.supabase.co",
        supabase_anon_key : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxYWFnam5lZGlhaW11aHZ4Zm15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyNjQ3MjEsImV4cCI6MjA1NTg0MDcyMX0.Au4SlbVezitjhoh2qNQBibxCGGFgeE8EKrKokpKD0R0"
    }
}


    // AJUSTAR MANUALMENTE LAS VARIABLE CUANDO SE ESTA DESARROLLANDO
export default variablesEntorno
