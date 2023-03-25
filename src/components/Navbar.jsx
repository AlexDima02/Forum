import React, { useState } from 'react'
import { UserAuth } from './contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function Navbar() {

  const { user, signout } = UserAuth();
  const [ show, setShow ] = useState(false);
  

  const navigate = useNavigate();

  const toggleDropdown = () => {

    setShow(!show);

  }

  const handleLogout = async (e) => {

    e.preventDefault();
    setShow(!show);
    await signout().then(() => {

        navigate('/login');

    })


  }


  const isAuthenticated =  () => {

    return (

      <>
      
            <li className='pr-5'><a href="/home">Home</a></li>
            <div className='relative z-10'>
                <div onClick={toggleDropdown} className='flex cursor-pointer'>
                  <h1>{user.displayName}</h1>
                  <span className={`ml-3 ${show ? 'rotate-0 transition-transform' : 'rotate-180 transition-transform'}`}><KeyboardArrowDownIcon /></span>
                </div>
                <div className={`${show ? 'opacity-1 absolute flex-col flex border border-gray-400-700 p-2 h-28 place-content-between translate-y-0 shadow-md transition duration-500' : 'transition duration-500 opacity-0 absolute flex-col flex border border-red-700 p-2 h-20 place-content-between -translate-y-72'} bg-white -z-10 w-full`}>
                  <span className='border-gray-300 border-b pb-3'><a href="/profile">Profile</a></span>
                  <span className='pb-3'><a onClick={handleLogout} href="">Logout</a></span>
                </div>
            </div>
      </>


    )


  }
  
  const notAuthenticated =  () => {

    return (

      <>
              <li><a href="/home">Home</a></li>
              <li><a href="/login">Login</a></li>
              <li><a href="/register">Register</a></li>
           
      </>


    )
  }

  return (
    <nav className='flex place-content-between align-middle mx-4 leading-10 border border-red-600'>
        <div className='w-full h-full'>
            <img src="" alt="forum-logo" className='w-10 h-10' />
        </div>
        <ul className='flex w-1/2 place-content-between'>
            {user ? isAuthenticated() : notAuthenticated()}
        </ul>
    </nav>
  )
}


export default Navbar;
