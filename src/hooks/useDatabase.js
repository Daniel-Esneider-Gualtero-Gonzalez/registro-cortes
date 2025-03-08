import React, { useState } from 'react'
import { clienteSupabase } from '../supabaseClient.js'

function useDatabase() {
    const [listCortes, setListCortes] = useState(null)

    const getListCortes = async () => {

        let getListCortes = await clienteSupabase.from('Corte').select('*')

        if (getListCortes.error || getListCortes.status !== 200) return { error: "Erro al obtener los cortes " }
        setListCortes(getListCortes.data)
        return { data: getListCortes.data }
    }

    const registerNewCorte = async (dataNewCorte = {}) => {

        let { data, error } = await clienteSupabase
            .from('Corte')
            .insert([
                dataNewCorte,
            ])
            .select()

        if (error) return { error }
        return { data }

    }

    const getCortePorReferencia = async (referencia) => {

        if (!listCortes) {
            const { data, error } = await getListCortes()
            if (error) return error

            return { data: data.find(({ numero_referencia }) => numero_referencia === referencia) }
        }

        return { data: listCortes.find(({ numero_referencia }) => numero_referencia === referencia) }
    }

    const updateCorteById = async (id, dataToUpdate = {}) => {

        const { data, error } = await clienteSupabase
            .from('Corte')
            .update(dataToUpdate)
            .eq('id', id)
            .select()

        if (error) return { error: "Error al actualizar el corte" }

        return { data }

        // if(listCortes){
        //     setListCortes(e=> {
        //         return e.map(corte=> {
        //             if(corte.id === id) return data
        //             return corte
        //         })
        //     })
        // }
    }

    const deleteCorteByReference = async (referencia) => {

       
            const { error } = await clienteSupabase
            .from('Corte')
            .delete()
            .eq('numero_referencia', referencia)
        
           if(error) return { error:error.message}
        

    }
    return {
        listCortes, getListCortes, getCortePorReferencia, updateCorteById, registerNewCorte, deleteCorteByReference
    }
}

export default useDatabase