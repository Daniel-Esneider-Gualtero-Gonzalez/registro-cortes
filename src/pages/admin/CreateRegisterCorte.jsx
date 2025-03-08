import useAlert from "../../hooks/useAlert"
import useLoading from "../../hooks/useLoading"
import useModal from "../../hooks/useModal"
import Modal from "../../components/Modal.jsx"
import { useState } from "react"
import { Link } from "react-router"
import useDatabase from "../../hooks/useDatabase.js"
import { formatDate } from "../../utils/utilsDate.js"


function CreateRegisterCorte() {
    const [newCorte, setNewCorte] = useState(null)
    const [stateCreate, setEstateCreate] = useState({
        is_created: false,
        no_created: null,
        messagge: null
    })
    const { loading, onLoading, offLoading } = useLoading()
    const { registerNewCorte } = useDatabase()
    const { modal_state, modal_name } = useModal("Registrar nuevo corte")

    const registerCorte = async (newcorte) => {
        onLoading()
        const { error } = await registerNewCorte(newcorte)
        offLoading()
        if (error) return setEstateCreate({ ...stateCreate, no_created: true, messagge: `${error.message}` })

        return setEstateCreate({ ...stateCreate, is_created: true })
    }

    const onSubmitRegister = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const newCorte = {}
        for (const [name, value] of formData.entries()) {
            newCorte[name] = value
        }
        setNewCorte(newCorte)
        registerCorte(newCorte)
    }
    const cleanStateCorte = () => {
        setEstateCreate({ is_created: false, no_created: null, messagge: null })
    }
    const tryAgainRegister = () => {
        cleanStateCorte()
        if (newCorte) {
            registerCorte(newCorte)
        }

    }
    return (

        <><section className="">
            {loading && <Modal >
                <div role="status" className="flex flex-col justify-center items-center">
                    <svg aria-hidden="true" className="w-10 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span >Registrando corte por favor espere...</span>
                </div>
            </Modal>}

            {stateCreate.is_created && <Modal>
                <div className="flex flex-col gap-4 justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-green-600" width="50" height="50" viewBox="0 0 24 24" fill="currentColor" >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12.01 2.011a3.2 3.2 0 0 1 2.113 .797l.154 .145l.698 .698a1.2 1.2 0 0 0 .71 .341l.135 .008h1a3.2 3.2 0 0 1 3.195 3.018l.005 .182v1c0 .27 .092 .533 .258 .743l.09 .1l.697 .698a3.2 3.2 0 0 1 .147 4.382l-.145 .154l-.698 .698a1.2 1.2 0 0 0 -.341 .71l-.008 .135v1a3.2 3.2 0 0 1 -3.018 3.195l-.182 .005h-1a1.2 1.2 0 0 0 -.743 .258l-.1 .09l-.698 .697a3.2 3.2 0 0 1 -4.382 .147l-.154 -.145l-.698 -.698a1.2 1.2 0 0 0 -.71 -.341l-.135 -.008h-1a3.2 3.2 0 0 1 -3.195 -3.018l-.005 -.182v-1a1.2 1.2 0 0 0 -.258 -.743l-.09 -.1l-.697 -.698a3.2 3.2 0 0 1 -.147 -4.382l.145 -.154l.698 -.698a1.2 1.2 0 0 0 .341 -.71l.008 -.135v-1l.005 -.182a3.2 3.2 0 0 1 3.013 -3.013l.182 -.005h1a1.2 1.2 0 0 0 .743 -.258l.1 -.09l.698 -.697a3.2 3.2 0 0 1 2.269 -.944zm3.697 7.282a1 1 0 0 0 -1.414 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" /></svg>
                    <span className="font-semibold text-lg">Corte registrado exitosamente</span>
                    <div className="flex gap-2">
                        <Link reloadDocument to={"../cortes/list"} className="border text-blue-600 hover:text-white hover:bg-blue-600 border-blue-600 p-1"  >Ver todos los cortes </Link>
                        <Link reloadDocument replace to={"../cortes/create"} className="border text-blue-600 hover:text-white hover:bg-blue-600 border-blue-600 p-1" >Registrar otro corte</Link>
                    </div>
                </div>

            </Modal>}

            {stateCreate.no_created && <Modal>
                <div className="flex flex-col gap-4 justify-center items-center">

                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="currentColor" className='mx-auto text-red-600'>
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-6.489 5.8a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" />
                    </svg>
                    <span className="font-semibold text-lg">Error al registar el nuevo corte</span>
                    <p className="text-center">{stateCreate.messagge && stateCreate.messagge}</p>
                    <div className="flex gap-2">
                        <button onClick={tryAgainRegister} className="border border-green-600 text-green-600 hover:bg-green-600 hover:text-white p-1">Intentar de nuevo</button>
                        <button onClick={cleanStateCorte} className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white p-1">Cancelar</button>
                    </div>
                </div>

            </Modal>}

            <button onClick={() => history.back()} type="button" className=" text-blue-600 flex items-center gap-1 mt-5 ml-5 border border-blue-600 hover:bg-blue-600 hover:text-white ">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l14 0" />
                    <path d="M5 12l4 4" /><path d="M5 12l4 -4" /></svg>
                Volver
            </button>
            <h1 className='text-center mt-10'>Registrar nuevo corte</h1>
            <form onSubmit={onSubmitRegister} className="w-[90%]  mx-auto mt-10 sm:w-[70%] md:w-[60%] xl:w-[40%]">
                <input type="hidden" name="fecha_registro" value={formatDate()} />
                <input type="hidden" name="fecha_actualizacion" value={formatDate()} />

                <fieldset className="flex flex-col gap-4" disabled={stateCreate.is_created || stateCreate.no_created}>
                    <div >
                        <label className="">Marca</label>
                        <select required name="marca" id="floating_email" className="block p-1.5 px-0 w-full   border border-black  dark:text-white dark:border-gray-600  outline-none  "   >
                            <option value="meropower">meropower</option>
                            <option value="bixler">Bixler</option>
                        </select>

                    </div>

                    <div className="" >
                        <label htmlFor="numero_referencia" className="">N° referencia</label>
                        <input min={0} required type="number" name="numero_referencia" id="numero_referencia" className="w-full ring-0 outline-none border border-black text-neutral-900  text-sm   focus:border-blue-600 block  p-1.5" placeholder=" " />
                    </div>

                    <div >
                        <label htmlFor="cantidad" >Cantidad</label>
                        <input required id="cantidad" name="cantidad" className="w-full ring-0 outline-none border border-black text-neutral-900  text-sm   focus:border-blue-600 block  p-1.5" placeholder=" " />

                    </div>
                    <div >
                        <label htmlFor="descripcion" >Descripcion</label>
                        <textarea required cols={4} rows={4} id="descripcion" name="descripcion" className="w-full ring-0 outline-none border border-black text-neutral-900  text-sm   focus:border-blue-600 block  p-1.5" placeholder=" " />
                    </div>

                    <div className="grid md:grid-cols-2 md:gap-6">

                        <div >
                            <label htmlFor="estado" >Estado</label>
                            <input required id="estado" name="estado" className="w-full ring-0 outline-none border border-black text-neutral-900  text-sm   focus:border-blue-600 block  p-1.5"  placeholder=" " />
                        </div>

                    </div>
                    <button type="submit" className="hover:text-white text-green-600 font-semibold border border-green-600 hover:bg-green-600  mx-auto w-full flex justify-center bg-white-700   px-5 py-2.5 text-center ">
                        Registrar Corte
                    </button>
                </fieldset>



            </form>
        </section>
        </>
    )
}

export default CreateRegisterCorte