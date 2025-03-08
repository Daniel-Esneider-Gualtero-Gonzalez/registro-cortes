import React, { useEffect, useState } from 'react'

let zIndex = 1

function Modal({ modal_state, name , isCancel ,onCancel, children}) {

    // if(!modal_state) return 
    useEffect(() => {
        zIndex += 1

        return () => zIndex -= 1

    }, [])

    return (
        <>

            <div style={{ 'zIndex': `${zIndex}` }} className='border max-w-[80%]  w-fit bg-white h-fit flex flex-col gap-4 m-auto p-4 inset-0 absolute'>
                <div className='modal-top-section flex gap-4 justify-between items-center '>
                    <h3 className='font-semibold text-xl'> {name && name} </h3>
                    {isCancel && <span>X</span> }
                </div>

                    {children}
            
                
            </div>

        </>
    )
}

export default Modal