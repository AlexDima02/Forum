import React, { useState } from 'react'
import { UserAuth } from '../../../components/contexts/AuthContext';

function DashboardUser() {

  
  const { user, settingUsername, changeEmail } = UserAuth();
  const [ name, setName ] = useState(user.displayName);
  console.log(name);
  const [ email, setEmail ] = useState('');

  console.log(email);

  const handleSubmit = async (e) => {

    e.preventDefault();
    await settingUsername(user, name).then((e) => {

      console.log(e);

    }).catch((e) => {

      console.log(e.message)

    });

    await changeEmail(user, email).then((res) => {

      

    }).catch((e) => {

        console.log(e.message);

    })


  }
  console.log(user.displayName);

  return (
    <div className='border border-blue-800 rounded-lg p-5 mx-3 my-5'>
        <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col justify-start place-content-between'> 
            <div id='header' className='flex-col'>

                    <h1 className='text-xl font-bold'>Profile Information</h1>
                    <p>Update your account's profile information and email address.</p>

            </div>
            <div className='flex flex-col my-5 h-36 place-content-between'>

                <div className='w-1/2 flex flex-col'>
                    <label htmlFor="name">Name</label>
                    <input onChange={(e) => setName(e.target.value)} defaultValue={user.displayName} id="name" type="text" name='name' className='focus:border-blue-700 focus:shadow-sm focus:shadow-blue-200 outline-none rounded-sm py-1 px-3 border border-blue-400'/>
                </div>

                <div className='w-1/2 flex flex-col'>
                    <label htmlFor="email">Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} defaultValue={user.email} type="email" name='email' className='focus:border-blue-700 focus:shadow-sm focus:shadow-blue-200 outline-none rounded-sm py-1 px-3 border border-blue-400'/>
                </div>

            </div>
            <div >
                <button type='submit' className='rounded-md text-white bg-blue-600 px-4 py-1'>SAVE</button>
            </div>
      </form>
    </div>
  )
}

export default DashboardUser
