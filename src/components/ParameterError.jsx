import React from 'react'

function ParameterError({errorMessage="Error message defaul", parameterName = "parameterName", typeExpectedParameter = "Por defecto Número" ,typeReceivedParameter = "Por defecto string"}) {
  return (
    <section className='rounded border mx-auto w-[80%] h-[400px] flex flex-col gap-7 items-center justify-center'> 
     <h1 className='text-2xl'>Parametro </h1>
     <span><span className='font-semibold'>Nombre del parametro </span>: {parameterName}</span>
     <span><span className='font-semibold'>Tipo de parametro esperado : </span>{typeExpectedParameter}</span>
     <span><span className='font-semibold'>Tipo de parametro recibido : </span>{typeReceivedParameter}</span>
     <button onClick={()=> history.back() } className='flex border w-[30%] p-3 rounded  hover:bg-black bg-blue-600 text-white justify-center items-center'>Regresar</button>
    </section>
  )
}

export default ParameterError