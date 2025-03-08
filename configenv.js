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
       
    }
}


    // AJUSTAR MANUALMENTE LAS VARIABLE CUANDO SE ESTA DESARROLLANDO
export default variablesEntorno
