import { NavLink } from "react-router"
import { useContextAuth } from "../context/contextAuth"
import useLoading from "../hooks/useLoading.js"
import { useState } from "react"

function AdminNavbar() {
    const { user, singOut } = useContextAuth()
    const { loading, onLoding, offLoading } = UseLoading()
    const [openMenuMobile, setOpenMenuMobile] = useState(false)

    const onSingOut = async () => {
        onLoding()
        const cerrarSesion = await singOut()

    }

    const handleOpenMenuMobile = () => setOpenMenuMobile(!openMenuMobile)
    return (
        <>


            <nav className="flex justify-between  items-center p-3">

                <div>
                    <NavLink to="/admin/cortes/list"  className="flex items-center space-x-3 ">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                    </NavLink>
                </div>
                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

                    <ul className="hidden  sm:flex items-center justify-center" >
                        <li>
                            <NavLink to="/admin/cortes/list" className=" px-4 py2 ">Lista cortes</NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/cortes/create" className="block py-1 px-4 border border-blue-600 hover:bg-blue-600 hover:text-white ">Registrar Corte</NavLink>
                        </li>
                    </ul>

                    <button onClick={handleOpenMenuMobile} className="border hover:border hover:border-blue-600 hover:bg-blue-600 hover:text-white border-black p-1 sm:hidden">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round" >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6l16 0" /><path d="M4 12l16 0" /><path d="M4 18l16 0" /></svg>
                    </button>
                    {
                        openMenuMobile && <ul  onClick={(event)=> {
                            const elementoOrigino = event.target
                            if(elementoOrigino.tagName === "A") return handleOpenMenuMobile()
                        }} className="right-0 flex flex-col gap-0.5 border md:hidden absolute bg-white z-50  top-0 w-[60%] sm:w-[40%] md:w-[20%] h-[100%]">

                            <li>
                                <button className="block ml-auto hover:border hover:border-red-600" onClick={handleOpenMenuMobile}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 24 24" fill="currentColor" className='mx-auto text-red-600'>
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-6.489 5.8a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" />
                                    </svg>
                                </button></li>
                            <li>
                                <NavLink to="/admin/cortes/list" className="border  border-blue-600 hover:bg-blue-600 hover:text-white flex w-full px-4 py-1 ">Lista cortes</NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/cortes/create" className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white flex py-1 px-4  rounded-sm ">Registrar Corte</NavLink>
                            </li>
                        </ul>
                    }



                </div>
            </nav>

        </>
    )
}

export default AdminNavbar