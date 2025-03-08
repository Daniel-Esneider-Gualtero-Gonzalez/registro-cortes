import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import {  useContextAuth } from './context/contextAuth.jsx'
import Login from './components/auth/Login.jsx'
// admin
import CreateRegisterCorte from './pages/admin/CreateRegisterCorte.jsx'
import ListCortes from './pages/admin/ListCortes.jsx'
import ProtectedRoutes from './rutes/ProtectedRoutes.jsx'
import AdminNavbar from './components/AdminNavbar.jsx'
import EditCorte from './pages/admin/EditCorte.jsx'
import { ContextCorteProvider } from './context/contextCortes.jsx'
import DeleteCorte from './pages/admin/DeleteCorte.jsx'


function App() {
 const {user} = useContextAuth()
  return (
    <>
       <ContextCorteProvider>
        <BrowserRouter>
        { user ? <AdminNavbar /> : null}
          <Routes>
            <Route path='/' element={<ListCortes />}/>
            <Route path='/admin' element ={<ProtectedRoutes />}>
            <Route path='cortes/list/' element={<ListCortes />} />
             <Route path='cortes/create/' element={<CreateRegisterCorte />} />
             <Route  path='cortes/edit/:reference' element={<EditCorte />}/>
             <Route  path='cortes/delete/:reference' element={ <DeleteCorte />}/>
            </Route>
            <Route  path='/login' element={<Login />}/>
          </Routes>

        </BrowserRouter>
        </ContextCorteProvider>
      

    </>
  )
}

export default App
