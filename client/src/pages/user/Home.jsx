import { Button } from '@nextui-org/react'
import React, { useState } from 'react'
import Navbar from '../../components/shared/Navbar.jsx'
import { useCheckInMutation, useGetUserDetailsQuery } from '../../redux/features/api/apiSlice.js'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { hideLoading, showloading } from '../../redux/features/alertSlice.js'

function Home() {
  const dispatch = useDispatch()
  const [checkIn, Actions] = useCheckInMutation()
  const [location, setLocation] = useState(null);
  const { data, isLoading, isSuccess } = useGetUserDetailsQuery()
  // console.log(data?.response);
  function checkInHandler() {
    const checkInTime = new Date();
    try {
      if (!Actions.isLoading) {
        checkIn({ checkInTime }).then((res) => {
          console.log(res);
        }).catch((err) => {
          console.log(err);
          toast.error('error occurred while checking in')
        })
      }
    } catch (err) {
      toast.error('error occurred while checking in')
    }
  }
  if (isLoading) { 
    dispatch(showloading())
  } else {
    dispatch(hideLoading())
  }
  function formatTime(dateString) {
    const formattedTime = new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit',hour12:true });
    return formattedTime;
  }
  
  const markAttendance = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Send latitude and longitude to the backend for verification
          console.log({ latitude, longitude });
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    !isLoading && isSuccess && <div className='font-readex'>
      <Navbar />
      <div className='flex justify-center h-[92vh] w-full items-center'>
        {!data.response.isCheckedIn ? <Button onClick={checkInHandler} className='h-60 relative w-60 rounded-full bg-red-500 text-white text-3xl font-bold active:translate-y-3 shadow-2xl'>
          Check IN
        </Button> : 
        <div className='text-center flex flex-col'>
       <h1>HI {data.response.name}</h1>
       your location: {location?.latitude},{location?.longitude}
       <button className='' onClick={markAttendance}>test</button>
       <h2> you have successfully loggedIn at {formatTime(data.response.lastCheckInTime)} </h2>
        </div>}
      </div>
    </div>
  )
}

export default Home