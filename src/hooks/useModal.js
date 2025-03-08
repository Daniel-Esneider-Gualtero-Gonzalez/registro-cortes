import { useState } from "react"



function useModal(nameModal =  "modal Name default") {
    const [dataModal,setDataModal] = useState({
        modal_name : nameModal ,
        modal_state : false,
        change_name : (newName)=> setDataModal({...dataModal, modal_name : newName }),
        on_modal : ()=> setDataModal({...dataModal,modal_state:true}),
        off_modal : ()=> setDataModal({...dataModal, modal_state:false})

    })
    
  return dataModal
}

export default useModal