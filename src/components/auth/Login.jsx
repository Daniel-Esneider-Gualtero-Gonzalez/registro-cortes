
import { useNavigate } from "react-router";
import { useContextAuth } from "../../context/contextAuth"
import { useEffect } from "react";
import useAlert from "../../hooks/useAlert";
import Alert from "../Alert";
import useLoading from "../../hooks/useLoading";
import Loading from "../Loading";

function Login() {
  const { user, singIn } = useContextAuth()
  const navigate = useNavigate()
  const {loading,onLoading,offLoading} = useLoading()
   const {alerts, typeAlerts,newAlert} = useAlert()


  const onLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target)
    const correo = formData.get("correo")
    const password = formData.get("password")
    onLoading()
    const { error } = await singIn(correo, password)
    offLoading()
    if(error){
      return newAlert({textAlert:`Error login ${error}` , typeAlert:typeAlerts.error})
    }
    navigate("/admin/cortes/list")


  }

  useEffect(() => {

    if (user) navigate("/admin/cortes/list")

  }, [user])

  if (loading) return <Loading allScreen={true} statusText="iniciando sesion por favor espere" loadingState={loading} />

  return (
    <form onSubmit={onLogin} className=" flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Iniciar Sesión
        </h2>
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:mx-auto sm:w-full sm:max-w-sm">
      {alerts.length > 0 && alerts.map((alerta)=>{
                return <Alert key={alerta.id_alert} textAlert={alerta.text_alert} typeAlert={alerta.type_alert}/>
            })}
        <div>
          <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
            Correo Electronico
          </label>
          
            <input
              id="correo"
              name="correo"
              type="email"
              required
              autoComplete="email"
              className=" w-full border border-black  px-3 py-1.5 outline-none focus:border-blue-600 sm:text-sm/6"
            />
      
        </div>

        <div>
        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
              Contraseña
            </label>
          
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className=" w-full border   border-black bg-white px-3 py-1.5  outline-none   focus:border-blue-600  sm:text-sm/6"
            />
         
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center border border-green-600  bg-green-600  px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-800  "
          >
            Iniciar sesión
          </button>
        </div>



      </div>
    </form>
  )
}

export default Login