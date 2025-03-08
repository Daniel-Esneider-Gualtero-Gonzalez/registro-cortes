import { supabaseClient } from "../supabaseClient"
import { useState } from "react"

function Auth() {
  
    const [usuario,setUsuario] = useState(null)

    async function iniSesion(correo,contrasena) {
        const obtenerSesion = await supabaseClient.auth.signInWithPassword(correo,contrasena)
        obtenerSesion.error ? null : setUsuario(await supabaseClient.auth.getUser())
    }

  return 
}

export default Auth