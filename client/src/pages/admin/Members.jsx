import React from 'react'
import Layout from '../../components/shared/Layout'
import { Button } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import { HiStatusOnline } from 'react-icons/hi'
import { FcHome } from 'react-icons/fc'
import { useFetchMembersQuery } from '../../redux/features/api/apiSlice'
import {ImOffice} from 'react-icons/im'
import Errorpage from '../Errorpage'

function Members() {
    const { data, isLoading, isSuccess } = useFetchMembersQuery()
    const navigate = useNavigate()
    function getCurrentMonthName() {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const currentDate = new Date();
        const currentMonth = months[currentDate.getMonth()];
        return currentMonth;
    }

    if (!isLoading && !isSuccess) {
        return (
            <Errorpage />
        )
    }

    return (!isLoading && isSuccess &&
        <Layout id={2}>
            <div className='font-readex'>
                <div className='w-full flex justify-between px-10'>
                    <h1 className='text-4xl'>Members</h1>
                    <h2 className='text-center text-xl font-semibold'> {getCurrentMonthName()}</h2>
                    <Button className='mr-10 bg-[#D8FC00] text-black font-bold' onClick={() => navigate('/admin/add-members')}>Add Member</Button>
                </div>
                <div className='px-5 mt-5 flex flex-col gap-5'>
                   {data?.members.map((elem)=>(
                     <div key={elem.name} className='w-full px-10 justify-between flex gap-10 h-40 rounded-3xl  bg-gray-400 bg-opacity-20 items-center'>
                     <img className='rounded-[1rem] h-24 w-24 object-cover' src={elem.profileImage} alt="" />
                     <div className='w-[20%] flex flex-col items-start'>
                         <h1 className='text-2xl font-mont'>{elem.name}</h1>
                         <h5>{elem.role}</h5>
                         <p className={`flex items-center gap-2 text-green-500 font-semibold`}>Active <HiStatusOnline /></p>
                     </div>
                     <div className='flex gap-10 -mt-5 w-[30%] items-center'>
                         <div>
                             <h1 className='text-yellow-500 font-semibold text-xl'>LATE</h1>
                             <h2 className='text-center text-xl font-bold'>0</h2>
                         </div>
                         <div>
                             <h1 className='text-red-500 font-semibold text-xl'>LEAVE</h1>
                             <h2 className='text-center text-xl font-bold'>0</h2>
                         </div>
                         <div>
                          {elem.isWfh?<h1 className='font-semibold text-3xl flex flex-col items-center text-blue-300'>WFH<FcHome /> </h1>:<h1 className='font-semibold text-3xl flex flex-col items-center text-orange-600'>WFO<ImOffice/> </h1>
                             }
                         </div>
                     </div>
                     <div className='w-[20%] flex justify-end'>
                         <Button className='bg-[#D8FC00] text-black'>View Profile</Button>
                     </div>
                 </div>
                   ))}
                </div>
            </div>
        </Layout>
    )
}

export default Members