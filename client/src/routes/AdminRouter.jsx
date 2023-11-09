import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminHome from '../pages/admin/AdminHome'
import Members from '../pages/admin/Members'
import AddMember from '../pages/admin/AddMember'

function AdminRouter() {
  return (
    <Routes>
    <Route path='/' element={<AdminHome />}/>
    <Route path='/members' element={<Members />}/>
    <Route path='/add-members' element={<AddMember/>}/>
</Routes>
  )
}

export default AdminRouter