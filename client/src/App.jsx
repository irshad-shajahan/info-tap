import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import UserRouter from './routes/userRouter'
import AdminRouter from './routes/adminRouter'
import Login from './pages/Login'
import FallbackUI from './components/shared/FallbackUI'
import { useSelector } from 'react-redux'
import { Switch } from "@nextui-org/react";
import useDarkMode from "use-dark-mode";
import { BsMoonStarsFill, BsSun } from 'react-icons/bs'
import PublicRoute from './components/RouteProtection/publicRoute';
import ProtectedRoute from './components/RouteProtection/protectedRoute';
import Test from './pages/test';


function App() {
  const isLoading = useSelector((state) => state.alerts.loading)
  const darkMode = useDarkMode(false);
  const check = JSON.parse(localStorage.getItem('check'))
  const isAdmin = check?.isAdmin
  return (
    <main className={`${darkMode.value ? 'dark' : ''} text-foreground bg-background`}>
      <Switch
        className='fixed left-5 lg:left-auto right-auto lg:right-5 top-5'
        defaultSelected
        size="lg"
        onChange={darkMode.toggle}
        color="secondary"
        thumbIcon={({ isSelected, className }) =>
          isSelected ? (
            <BsSun className={className} />
          ) : (
            <BsMoonStarsFill className={className} />
          )
        }
      >
      </Switch>
      <BrowserRouter>
        {isLoading && <FallbackUI />}
        <div className='overflw-hidden'>
          <Routes>
            <Route path="/" element={
              isAdmin ? (
                <ProtectedRoute>
                  <AdminRouter />
                </ProtectedRoute>
              ) : <ProtectedRoute>
                <UserRouter />
              </ProtectedRoute>

            } />
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path="/admin/*" element={
              <ProtectedRoute>
                <AdminRouter />
              </ProtectedRoute>} />
              <Route path="/user/*" element={
              <ProtectedRoute>
                <UserRouter />
              </ProtectedRoute>} />
              <Route path='/test' element={<Test/>}/>
          </Routes>
          
        </div>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </BrowserRouter>
    </main>
  )
}

export default App
