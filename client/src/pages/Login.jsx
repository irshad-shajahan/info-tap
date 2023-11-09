import React, { useState } from 'react'
import { Button, Input } from '@nextui-org/react'
import logo from '../assets/Images/favicon.png'
import { toast } from 'react-toastify';
import { validateEmail } from '../components/validations/validate';
import { useDispatch } from 'react-redux';
import { hideLoading, showloading } from '../redux/features/alertSlice';
import { useUserLoginMutation } from '../redux/features/api/apiSlice';
import { useNavigate } from 'react-router-dom';

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [login, { isLoading }] = useUserLoginMutation()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    function validateForm(formData) {
        if (!formData.email) {
            toast.error('Email is required')
            return false
        } else if (!validateEmail(formData.email)) {
            toast.error('Please enter a valid email address')
            return false
        }
        if (!formData.password) {
            toast.error('Password is required')
            return false
        }
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm(formData)) {
            return
        }
        dispatch(showloading())
        if (isLoading) {
            return
        }
        try {
            const response = await login(formData)
            console.log(response);
            if (response?.data.success) {
                toast.success('Login succesful')
                dispatch(hideLoading())
                localStorage.setItem("token", response.data.token)
                const loc ={
                    isAdmin : response.data.response.isAdmin,
                    isMod :response.data.response.isModerator 
                }
                localStorage.setItem("check", JSON.stringify(loc))
                if (response.data.response.isAdmin) {
                    navigate('/admin')
                }else{
                    navigate('/')
                }
            } else {
                toast.error(response.data.message)
                dispatch(hideLoading())
            }
        } catch (error) {
            toast.error('error occurred')
            dispatch(hideLoading())
            console.error('Error:', error);
            // Handle error
        }
    }

    return (
        <div className='h-screen flex justify-center font-raleway items-center'>
            <form className='flex flex-col gap-10 w-[70%] lg:w-[30%]' onSubmit={handleSubmit}>
                <h1 className='text-center font-bold text-4xl lg:text-5xl flex justify-center items-center gap-5'><img src={logo} alt="" className='w-[20%] lg:w-[8%]' />Login</h1>
                <Input label='Email' name='email'
                    radius='sm'
                    value={formData.email}
                    onChange={handleChange} />
                <Input label='Password' name='password'
                    type='password'
                    radius='sm'
                    value={formData.password}
                    onChange={handleChange} />
                <Button type='submit' className={`bg-[#D8FC00] text-black font-bold text-lg lg:text-xl`} radius='sm'>Login</Button>
            </form>
        </div>
    )
}

export default Login