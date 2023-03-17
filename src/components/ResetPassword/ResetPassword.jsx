import React, { useState } from 'react'
import { UserAuth } from '../contexts/AuthContext';
import GoodCall from '../GoodCall';

function ResetPassword() {

    const [ email, setEmail ] = useState('');
    const [ error, setError ] = useState('');
    const [ response, setResponse ] = useState('');
    const { resetPassword } = UserAuth();


    const handleResetPassword = async (e) => {
        
            e.preventDefault();
            setError('');

            await resetPassword(email).then(() => {

                console.log('Action complete');
                setResponse('We have emailed your password reset link.');

            }).catch((e) => {

                console.log(e.message)
                setError(e.message);


            })


    }

  return (
    <div>
        <form onSubmit={(e) => handleResetPassword(e)} className='m-auto p-5 md:w-1/2'>
            <div className='flex place-content-center justify-center rounded-lg border border-gray-400 p-5'>
            <div className='w-4/5 flex flex-col h-96 place-content-between'>
                <div id='header'>
                    
                        <h1 className='text-xl font-bold'>Forgot Password?</h1>
                        <p className=''>Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.</p>
                   
                </div>
                {response ? <GoodCall afirmative={response}/> : null}
                <div className='flex flex-col w-full'>

                    <label htmlFor="email">Enter your email:</label>
                    <input onChange={(e) => setEmail(e.target.value)} className='focus:border-blue-700 focus:shadow-sm focus:shadow-blue-200 outline-none rounded-sm py-1 px-3 border border-blue-400' type="email" id='email' placeholder='Email'/>
                </div>
                <button  className='w-full bg-blue-500 text-white py-1 font-bold rounded-sm' type='submit'>Reset Password</button>
            </div>
            
            </div>
           
        </form>
    </div>
  )
}

export default ResetPassword;