import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/user/Home'

function UserRouter() {
  return (
    <Routes>
        <Route path='/' element={<Home />}/>
    </Routes>
  )
}

export default UserRouter