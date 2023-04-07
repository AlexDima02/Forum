import React, { useState } from 'react'

function PopupModal(props) {

  return (
    <div className='rounded-lg  bg-primary-color  mx-5 z-50 md:w-1/2 md:m-auto'>
        <div className='border-b border-b-gray-500 flex place-content-between px-4 py-2 rounded-t-lg'>
            <h1 className='font-bold text-center py-5 text-white'>Log In to continue</h1>
            <span onClick={() => props.setPopup(!props.openPopup)} className='cursor-pointer rounded-md p-5 font-bold hover:bg-secondary-color text-white'>X</span>
        </div>
        <div className='mx-4 my-5 text-white'>
            <div className='w-25 h-25'><img src="" className='w-full h-full overflow-hidden object-cover' alt="Logo-photo" /></div>
            <p>Have patience, and porceed to one of these ways in order to enjoy our website!</p>
        </div>
        <div className='flex place-content-center'>
            <div className='w-1/2 flex flex-col my-10'>
                <a href="/login" className='bg-button-color rounded-md text-white font-bold text-center py-2 mb-3'>Login</a>
                <a href="/register" className='text-button-color font-bold w-full text-center'>Create Account</a>
            </div>

        </div>
      
    </div>
  )
}

export default PopupModal;