import React, { useEffect, useState } from 'react'

const defaulDelayDelete = 5000

const typeAlerts = {
    info: "info",
    success: "success",
    error: "error",
    warning: "warning",

}

function useAlert() {
    const [alerts, setAlerts] = useState([])

    const insertAlert = (alerta)=> setAlerts([...alerts,alerta])
    const newAlert = ({ delayDelete, textAlert, typeAlert, autoDelete = true }) => {
        const id_alert = crypto.randomUUID()
        const newAlert = { id_alert, delay: delayDelete, text_alert: textAlert, type_alert: typeAlert }
        insertAlert(newAlert)
        if (autoDelete) setTimeout(() => deleteAlertById(id_alert), delayDelete ? delayDelete : defaulDelayDelete)
    }
    const deleteAlertById = (idAlert) => {
        setAlerts((alerts) => alerts.filter(({ id_alert }) => id_alert !== idAlert))
    }

    useEffect(()=>console.log("alertas", alerts) , [alerts])
    return {
        alerts, typeAlerts, newAlert, deleteAlertById
    }
}

export default useAlert