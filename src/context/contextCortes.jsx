import { createContext, use } from "react";
import useDatabase from "../hooks/useDatabase.js";

const contextCorte = createContext()

export function useContextCorte() {
    return use(contextCorte)
}

export const ContextCorteProvider = ({ children }) => {
    const {listCortes,getListCortes,getCortePorReferencia,updateCorteById} = useDatabase()
    return <contextCorte.Provider value={{listCortes,getListCortes,getCortePorReferencia,updateCorteById}}>
        {children}
    </contextCorte.Provider>
}