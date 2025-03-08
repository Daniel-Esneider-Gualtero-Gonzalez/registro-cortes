import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useContextCorte } from "../../context/contextCortes"
import useLoading from "../../hooks/useLoading"
import ParameterError from "../../components/ParameterError"
import Loading from "../../components/Loading"
import ReferenceNotFoundError from "../../components/ReferenceNotFoundError"
import { formatDate } from "../../utils/utilsDate.js"
import Alert from "../../components/Alert.jsx"
import useAlert from "../../hooks/useAlert.js"

function EditCorte() {
    const { reference } = useParams()
    if (isNaN(reference)) return <ParameterError parameterName="referencia"  typeExpectedParameter="Numero" typeReceivedParameter="string" />
    const [corteToEdit, setCorteToEdit] = useState(null)
    const { loading, onLoading, offLoading } = useLoading()
    const {loading:loadingUpdate,offLoading:offLoadingUpdate,onLoading:onLoadingUpdate} = useLoading()
    const {alerts, typeAlerts,newAlert} = useAlert()
    const { getCortePorReferencia, updateCorteById } = useContextCorte()

    useEffect(() => {
        if (reference) {
            const encontrarCorte = async () => {
                onLoading()
                const { data, error } = await getCortePorReferencia(Number(reference))
                offLoading()
                if (data) setCorteToEdit(data)
            }
            encontrarCorte()
        }
    }, [])



    if (loading) return <Loading allScreen={true} loadingState={loading} />
    if (!corteToEdit) return <ReferenceNotFoundError reference={reference} />
    if (loadingUpdate) return <Loading allScreen={true} statusText="Actaulizando corte por favor espere..." loadingState={loadingUpdate} />

    
    const hayCambios = (objeto1, objeto2) => {
        for (const key in objeto1) {

            const element1 = objeto1[key];
            const element2 = objeto2[key]
            console.log(key, element1, element2)

            if (element1 !== element2) return true

        }

        return false
    }

    const onUpdateCorte = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)

        const dataUpdate = {}
        for (const [name, value] of formData.entries()) {

            if (name.includes("cantidad") || name.includes("id") || name.includes("numero_referencia")) {
                dataUpdate[`${name}`] = Number(value)
               
                continue
            }
            if (name.includes("fecha_registro")) {
                console.log("fecha formateaada", value , "fecha original", )

                if (value === formatDate(corteToEdit[`${name}`],true )) {
                    dataUpdate[`${name}`] = corteToEdit[`${name}`]
                } else {
                    dataUpdate[`${name}`] =formatDate(corteToEdit[`${name}`],false)
                }

            } else {
                dataUpdate[`${name}`] = value
            }
        }
        
        if (hayCambios(dataUpdate,corteToEdit)) {
            // despues de verificarf que si hubo cambios introducimos la fecha actual de actualizacion en el formatod del servidor
            dataUpdate['fecha_actualizacion'] = formatDate()
            onLoadingUpdate()
             const {data,error} = await updateCorteById(corteToEdit.id, dataUpdate)
            offLoadingUpdate()
             if(data){
                newAlert({textAlert:"Corte actualizado exitosamente" , typeAlert:typeAlerts.success})
                setCorteToEdit(data[0])
                
                return
             }
             if(error) return newAlert({textAlert:`Error al actualizar el corte ${error}` , typeAlert:typeAlerts.error})

            
            
        } else {
            
            newAlert({textAlert:"Por favor introdusca cambios para poder actualizar" , typeAlert:typeAlerts.warning})
        }

    }
    


    return (
        <section className="relative">
            <button onClick={()=> history.back()} type="button" className=" text-blue-600 flex items-center gap-1 mt-5 ml-5 border border-blue-600 hover:bg-blue-600 hover:text-white w-[25%]">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="30"  height="30"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round" >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" />
            <path d="M5 12l4 4" /><path d="M5 12l4 -4" /></svg>
                Volver
                </button>

            <div className="absolute right-0 z-10 bg-white max-h-64 overflow-auto">
            {alerts.length > 0 && alerts.map((alerta)=>{
                return <Alert key={alerta.id_alert} textAlert={alerta.text_alert} typeAlert={alerta.type_alert}/>
            })}
            </div>
            <h1 className='text-center mt-10'>Editar Corte con referencia <span>{reference}</span> </h1>
            <form onSubmit={onUpdateCorte} className="w-full mx-auto mt-10 sm:w-[80%] md:w-[60%]">
            
                <input type="hidden" name="id" value={corteToEdit.id} />
                <div className="relative z-0 w-full mb-5 group">
                    <select defaultValue={corteToEdit.marca} name="marca" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 "   >
                        <option value="meropower">meropower</option>
                        <option value="bixler">Bixler</option>
                    </select>
                    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Marca</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input defaultValue={reference} type="number" name="numero_referencia" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">N° Referencia</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input defaultValue={corteToEdit.cantidad} name="cantidad" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cantidad</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <textarea cols={4} rows={4} defaultValue={corteToEdit.descripcion} name="descripcion" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Descripcion</label>
                </div>

                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <input defaultValue={formatDate(corteToEdit.fecha_registro,true)}  type="datetime-local" name="fecha_registro" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" />
                        <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Fecha Registrado </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input defaultValue={corteToEdit.estado} name="estado" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Estado</label>
                    </div>
                    
                </div>


                <button type="submit" className="hover:text-white text-green-600 font-semibold border border-green-600 hover:bg-green-600  mx-auto w-full flex justify-center bg-white-700   px-5 py-2.5 text-center ">
                    Actualizar Corte
                </button>
            </form>
        </section>
    )
}

export default EditCorte