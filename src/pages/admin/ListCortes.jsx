import React, { useEffect, useState } from 'react'
import useLoading from '../../hooks/useLoading.js'
import Registro from '../../components/Registro'
import Loading from '../../components/Loading'
import FilterCortes from '../../components/FilterCortes'
import { useContextCorte } from '../../context/contextCortes'

function ListCortes() {
    const { loading, onLoading, offLoading } = useLoading()
    const { listCortes, getListCortes } = useContextCorte()

    const [mostrarFiltros, setMostrarFiltros] = useState(false)

    const handleClickShowFilters = () => {
        setMostrarFiltros(true)
    }

    useEffect(() => {
        const fethData = async () => {
            onLoading()
            const response = await getListCortes()
            offLoading()

        }
        if(!listCortes) fethData()
    }, [])
    return (


        <>
            {loading ? <Loading allScreen={true} statusText={"cargando cortes..."} loadingState={loading} />
                :
                <section className='relative'>

                    {mostrarFiltros && <FilterCortes filterSuccess={()=>setMostrarFiltros(false)} /> }
                        

                    <div id='filters' className='flex justify-center items-center'>
                        <button type='button' onClick={handleClickShowFilters} className='bg-blue-600 text-white hover:scale-105 transition-transform duration-75 border rounded-3xl px-10 py-2 font-semibold '>Filtrar cortes</button>


                    </div>
                    <div className="mx-auto grid md:grid-cols-2 gap-1 mt-10 lg:grid-cols-3  relative overflow-x-auto shadow-md sm:rounded-lg">
                        <Registro listCortes={listCortes} />
                    </div>
                </section>
            }
        </>

    )
}

export default ListCortes