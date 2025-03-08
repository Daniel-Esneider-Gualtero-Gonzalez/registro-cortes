import { Outlet , Navigate } from "react-router"
import { useContextAuth } from "../context/contextAuth.jsx"

function ProtectedRoutes({children}) {
    const {user} = useContextAuth()
    
   if(!user) return <Navigate to={"/login"}/>

   return <Outlet />
}

export default ProtectedRoutes