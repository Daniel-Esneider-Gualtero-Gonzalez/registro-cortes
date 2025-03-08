
import { createContext,use, useEffect, useState } from "react";
import { clienteSupabase } from "../supabaseClient";

const ContextAuth = createContext()

export  function useContextAuth() {
    return use(ContextAuth)
} 

export const UseContextAuthProvider = ({children})=>{
    const [user,setUser] = useState(null)

    async function recuperarUsuario() {
        if(user) return

        const {data, error} = await clienteSupabase.auth.getSession()
        if(!data.session) return
        setUser(data)
        
    }
    recuperarUsuario()
    const singIn = async (correo,contra)=>{
        const {data,error} = await clienteSupabase.auth.signInWithPassword({
            email: correo,
            password: contra
        })

        if(error && error.code != 200) return {error : error?.message}
        setUser(data.user)
       
    }

    const singOut = async ()=>{
        const {error} = await clienteSupabase.auth.signOut()
        console.log("error al cerrar la sesion del usuario", error)
    }

    useEffect(()=> {
        console.log("change user", user)
    },[user])

    return <ContextAuth.Provider value={{user,singIn,singOut}}>
        {children}
    </ContextAuth.Provider>
}