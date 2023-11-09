import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ChartPieIcon, LogoutIcon, TemplateIcon, UsersIcon } from "@heroicons/react/outline";
import Swal from 'sweetalert2'
import arrow from '../../assets/Images/control.png'
import mainLogo from '../../assets/Images/favicon.png'


function Layout({ children, id }) {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate()
  const Menus = [
    { id: 1, title: "Dashboard", icon: <ChartPieIcon className="w-6 h-6 cursor-pointer" />, link: '/' },
    { id: 2, title: "Members", icon: <UsersIcon className="w-6 h-6 cursor-pointer" />, link: '/admin/members' },
    { id: 3, title: "Digital Office", icon: <TemplateIcon className="w-6 h-6 cursor-pointer" />, link: '/digital-office' },
    { id: 4, title: "Streams", icon: <TemplateIcon className="w-6 h-6 cursor-pointer" />, link: '/Streams' },
    { id: 5, title: "Courses", icon: <TemplateIcon className="w-6 h-6 cursor-pointer" />, link: '/Courses' },
  ];
  function logoutHandler() {
    Swal.fire({
      title: 'Are you sure to logout?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Logout'
    }).then((result) => {
      if (result.isConfirmed) {
        //   Swal.fire(
        //     'Deleted!',
        //     'Your file has been deleted.',
        //     'success'
        //   )
        localStorage.removeItem('token')
        navigate('/login')
      }
    })

  }
  return (
    <div className="flex">
      <div
        className={` ${open ? "w-72" : "w-20 "
          } bg-gradient-to-tl from-blue-100 to-blue-900 h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src={arrow}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        {/* <span><ArrowCircleRightIcon/></span> */}
        <div className="flex gap-x-4 items-center">
          <img
            src={mainLogo}
            className={`cursor-pointer w-10 duration-500 ${open && "rotate-[360deg]"
              }`}
          />
          <h1
            className={`text-black origin-left font-medium text-xl duration-200 ${!open && "scale-0"
              }`}
          >
           <h1 className='text-3xl font-inter font-bold'>TAPCLONE</h1>
          </h1>
        </div>
        <ul className="pt-6">

          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  p-2 cursor-pointer hover:bg-light-white text-black text-base font-semibold items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"
                } ${Menu.id === id ? ' text-white bg-[#2389D2] rounded-lg' : ''}`}
              onClick={() => navigate(`${Menu?.link}`)}
            >
              <span>{Menu.icon}</span>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
          <li

            className={`flex  p-2 cursor-pointer hover:bg-light-white text-black text-sm items-center gap-x-4 mt-5`}
            onClick={logoutHandler}
          >
            <span><LogoutIcon className="w-6 h-6 cursor-pointer" /></span>
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              Logout
            </span>
          </li>
        </ul>
      </div>
      <div className=" flex-1 mt-16">
        {children}
      </div>
    </div>
  )
}

export default Layout