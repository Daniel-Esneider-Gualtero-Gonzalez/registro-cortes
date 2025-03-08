import React from 'react'
import { NavLink } from 'react-router'
import { formatDate } from '../utils/utilsDate.js'


function Registro({ listCortes = [] }) {

    return (
        <>
            {listCortes !== null && listCortes.map((corte) => {
                return <div key={corte.id} className='border flex flex-col gap-3 p-3 rounded '>
                    <div className='flex justify-between'>
                        <h3 className='text-2xl'>{corte.marca}</h3>
                        <span className='border p-2 rounded-3xl'><span className='font-bold'>Referencia:</span> {corte.numero_referencia}</span>
                    </div>
                    <p className='text-md'>{corte.descripcion}</p>
                    <div className='text-sm flex gap-2 flex-wrap'>
                        <span className='p-2 border rounded-3xl'><span className='font-bold'>Fecha registro: </span> <input readOnly value={formatDate(corte.fecha_registro, true)} type="datetime-local" name="" id="" /></span>
                        <span className='p-2 border rounded-3xl'><span className='font-bold'>Fecha actualización: </span> <input readOnly value={formatDate(corte.fecha_actualizacion, true)} type="datetime-local" name="" id="" /></span>
                        <span className='p-2 border w-fit rounded-3xl h-fit'> <span className='font-bold'>Estado: </span>{corte.estado}</span>
                        <span className='p-2 border w-fit rounded-3xl h-fit'> <span className='font-bold'>Cantidad: </span>{corte.cantidad}</span>
                    </div>

                    <div className='flex gap-2 items-center'>
                        

                        <NavLink to={`/admin/cortes/delete/${corte.numero_referencia}`} className="flex border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-colors duration-500 w-fit ml-auto  p-1">
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16z" /><path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" /></svg>
                        Eliminar
                        </NavLink>
                        <NavLink to={`/admin/cortes/edit/${corte.numero_referencia}`} className="flex border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-500 w-fit   p-1">Editar
                            <svg className='ml-3' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 18v-6a3 3 0 0 1 3 -3h10l-4 -4m0 8l4 -4" /></svg>
                        </NavLink>
                    </div>
                </div>

            })}
        </>
    )
}

export default Registro