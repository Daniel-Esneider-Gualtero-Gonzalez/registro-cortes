
function FilterCortes({ filterSuccess = () => { }, }) {
    // Formatear la fecha para mostrarla
    const opciones = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'America/Bogota', // Zona horaria de Colombia
    };

    const onSubmitFiltros = (event) => {
        event.preventDefault()

    }
    const onChangeFilter = (event) => {
        console.log("change filters", event.target.name)
    }
    return (
        <form onChange={onChangeFilter} onSubmit={onSubmitFiltros} className="w-full h-full overflow-auto flex flex-col gap-3  border shadow-2xl p-1 sm:w-[80%] md:w-[60%]  bg-white z-50 m-auto absolute inset-0 ">
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
                    <input required id="estado" name="estado" className="w-full ring-0 outline-none border border-black text-neutral-900  text-sm   focus:border-blue-600 block  p-1.5" placeholder=" " />
                </div>

            </div>


            <button onClick={() => filterSuccess()} type="button" className="text-white bg-green-700 hover:border-1 mx-auto w-[40%] flex justify-center bg-white-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm   px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12.01 2.011a3.2 3.2 0 0 1 2.113 .797l.154 .145l.698 .698a1.2 1.2 0 0 0 .71 .341l.135 .008h1a3.2 3.2 0 0 1 3.195 3.018l.005 .182v1c0 .27 .092 .533 .258 .743l.09 .1l.697 .698a3.2 3.2 0 0 1 .147 4.382l-.145 .154l-.698 .698a1.2 1.2 0 0 0 -.341 .71l-.008 .135v1a3.2 3.2 0 0 1 -3.018 3.195l-.182 .005h-1a1.2 1.2 0 0 0 -.743 .258l-.1 .09l-.698 .697a3.2 3.2 0 0 1 -4.382 .147l-.154 -.145l-.698 -.698a1.2 1.2 0 0 0 -.71 -.341l-.135 -.008h-1a3.2 3.2 0 0 1 -3.195 -3.018l-.005 -.182v-1a1.2 1.2 0 0 0 -.258 -.743l-.09 -.1l-.697 -.698a3.2 3.2 0 0 1 -.147 -4.382l.145 -.154l.698 -.698a1.2 1.2 0 0 0 .341 -.71l.008 -.135v-1l.005 -.182a3.2 3.2 0 0 1 3.013 -3.013l.182 -.005h1a1.2 1.2 0 0 0 .743 -.258l.1 -.09l.698 -.697a3.2 3.2 0 0 1 2.269 -.944zm3.697 7.282a1 1 0 0 0 -1.414 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" /></svg>
            </button>
        </form>
    )
}

export default FilterCortes