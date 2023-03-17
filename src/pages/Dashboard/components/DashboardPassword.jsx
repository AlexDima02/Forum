import React, { useState } from 'react'
import { UserAuth } from '../../../components/contexts/AuthContext';
import Alert from '../../../components/Alert';

function DashboardPassword() {

  const { user, changePassword } = UserAuth();
  const [ password, setPassword ] = useState('');
  console.log(password);
  const [ currentPassword, setCurrentPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  console.log(confirmPassword)
  const [ verify, setVerify ] = useState('');
  console.log(verify)
  const [ error, setError ] = useState('');

  
  
  const handleChange = async (e) => {
    
    e.preventDefault();
    setError('');

    if(verify !== confirmPassword) {

     
      return setError('Passwords are not matching!')

    }else{

      setPassword(verify);

    }

    await changePassword(user, password).then((e) => {
      
      setError('');
      console.log('Password changed!');

    }).catch((e) => {

      console.log(e.message);
      setError(e.message);

    })

  }

  return (
    <div className='border border-blue-800 rounded-lg p-5 mx-3'>
         <form onSubmit={(e) => handleChange(e)} className='flex flex-col justify-start place-content-between'> 
            <div id='header' className='flex-col'>

                    <h1 className='text-xl font-bold'>Update Password</h1>
                    <p>Ensure your account is using a long, random password to stay secure.</p>

            </div>
            {error ? <Alert error={error} /> : null}
            <div className='flex flex-col my-5 h-full'>

                <div className='w-1/2 flex flex-col my-5'>
                    <label htmlFor="new-password">New Password</label>
                    <input onChange={(e) => setVerify(e.target.value)} type="password" name='new-password' className='focus:border-blue-700 focus:shadow-sm focus:shadow-blue-200 outline-none rounded-sm py-1 px-3 border border-blue-400'/>
                </div>
                <div className='w-1/2 flex flex-col'>
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" name='confirm-password' className='focus:border-blue-700 focus:shadow-sm focus:shadow-blue-200 outline-none rounded-sm py-1 px-3 border border-blue-400'/>
                </div>

            </div>
            <div >
                <button type='submit' className='rounded-md text-white bg-blue-600 px-4 py-1'>SAVE</button>
            </div>
      </form>
    </div>
  )
}

export default DashboardPassword
