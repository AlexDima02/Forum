import React, { useState } from 'react'
import { UserAuth } from '../../../components/contexts/AuthContext';

function TypeBar() {

  const { user, setMessage, pushMessages, getMessages } = UserAuth();
  const [ text, setText ] = useState('');
  
  
  // setMessage(text, user);

  const handleSubmit = async (e) => {

    e.preventDefault();
  
    try{

      const data = await pushMessages();
      console.log(data);
      await getMessages();
    

    }catch(e){

      console.log(e);

    }

   
  }

  return (
    <div className='bg-primary-color shadow-sm max-w-3xl rounded-md flex-col p-5 my-10'>
        <form action="" onSubmit={handleSubmit}>
          <div className='flex'>
              {/* <div className='w-20 h-20 flex justify-start'><span className='rounded-full overflow-hidden h-full border border-red-600'><img className='object-cover w-full h-full' src={user.photoURL} alt="" /></span></div> */}
              <div className='w-full'>
                  <textarea onChange={(e) => setMessage(e.target.value, user)} className='p-3 rounded-lg resize-none w-full bg-secondary-color text-text-color border border-gray-50 outline-none' name="" id="" cols="100" rows="5" placeholder='Tell me what is on your mind..'></textarea>
              </div>
          </div>
          <div className='flex justify-end'>
              {user.isAnonymous ? <a href='/login' className='rounded-lg px-5 py-2 bg-blue-400 text-white font-bold'>Login</a> : <button type='submit' className='rounded-md px-5 py-2 bg-button-color text-white font-bold'>Publish</button>}
          </div>
        </form>
    </div>
  )
}


export { TypeBar };
