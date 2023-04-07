import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Alert from '../Alert';
import { UserAuth } from '../contexts/AuthContext';
import GoodCall from '../GoodCall';


function CompletePasswordReset() {
  const [ email, setEmail ] = useState('');
  console.log(email)
  const [ password, setPassword ] = useState('');
  console.log(password)
  const [ confirmPass, setPass ] = useState('');
  console.log(confirmPass)
  const [ error, setError ] = useState('');
  const [ response, setResponse ] = useState('');
  const { completePasswordReset, user } = UserAuth();
  const navigate = useNavigate();

  // Get pieces from URL
  const query = useQuery();
  // Get oobCode from URL and bring it to the resetPassword function in order to work
  // It is a form of identification where to make the password reset request 
  const oobCode = query.get('oobCode');
  console.log(user)

  // Get the url 
  function useQuery(){

    const location = useLocation();
    return new URLSearchParams(location.search);

  }

  // This is a case of action dispatch
  // When the submit is happening this function is called with the local state
  // An then the context is changing with the new update
  const handleResetPassword = async (e) => {
    
    e.preventDefault();
    setError('');
    if(password !== confirmPass){
            
      return setError("Passwords do not match");

    }
    await completePasswordReset(oobCode, password).then(() => {

      setError('');
      setResponse('Password reset!');
      console.log('Password reset!');

    }).catch((e) => {

      setError('Password has been already reset!');

    })

    
  }

  return (
    <div>
       <form onSubmit={(e) => handleResetPassword(e)} action="POST" className='p-5 m-auto md:w-1/2'>
            <div className='flex place-content-center justify-center rounded-lg bg-primary-color p-5'>
            <div className='w-4/5 flex flex-col h-96 place-content-between'>
                <div id='header' className='text-white'>
                    
                        <h1 className='text-xl font-bold'>Welcome!</h1>
                        <p className=''>Join us by creating your account</p>
                   
                </div>
                {response ? <GoodCall afirmative={response} /> : null}
                {error ? <Alert error={error} /> : null}
                <div className='flex flex-col w-full'>

                    <label className='text-white' htmlFor="password">Enter your password:</label>
                    <input onChange={(e) => setPassword(e.target.value)} className='focus:border-blue-700 focus:shadow-sm focus:shadow-blue-200 outline-none rounded-sm py-1 px-3 border border-blue-400' type="password" id='password' placeholder='Password'/>
                </div>
                <div className='flex flex-col w-full'>

                    <label className='text-white' htmlFor="confirmPassword">Confirm your password:</label>
                    <input onChange={(e) => setPass(e.target.value)} className='focus:border-blue-700 focus:shadow-sm focus:shadow-blue-200 outline-none rounded-sm py-1 px-3 border border-blue-400' type="password" id='confirmPassword' placeholder='Password'/>
                </div>



                <button className='w-full bg-button-color text-white py-1 font-bold rounded-sm' type='submit'>Reset Password</button>
            </div>
            </div>
        </form>
    </div>
  )
}


export default CompletePasswordReset;