import React, { Component,useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext';

function SignUp(props){

    const [ email, setEmail ] = useState('');
    console.log(email)
    const [ password, setPassword ] = useState('');
    console.log(password)
    const [ confirmPass, setPass ] = useState('');
    console.log(confirmPass)
    const { signup, currentUser } = useAuth();
    const [ error, setError ] = useState('');
    const [loading, setLoading] = useState(false);

   async function handleSubmit(e){
        
        e.preventDefault();
        // Verify if the current password is the same as the confirm password input
        if(password !== confirmPass){
            
            return setError("Passwords do not match")
        }
        try{
            setError('');
            setLoading(true);
            await  signup(email, password);
        } catch{

            setError('Failed to create an account');

        }
        
        setLoading(false);
    }

    return (
      <>
        <form onSubmit={(e) => handleSubmit(e)} action="POST" className='w-full p-5'>
            {error ? <div>Password do not match!</div> : null}
            {currentUser}
            <div className='flex place-content-center justify-center rounded-lg border border-gray-400 p-5'>
            <div className='w-4/5 flex flex-col h-96 place-content-between'>
                <div id='header'>
                    
                        <h1 className='text-xl font-bold'>Welcome!</h1>
                        <p className=''>Join us by creating your account</p>
                   
                </div>
                <div className='flex flex-col w-full'>

                    <label htmlFor="email">Enter your email:</label>
                    <input onChange={(e) => setEmail(e.target.value)} className='focus:border-blue-700 focus:shadow-sm focus:shadow-blue-200 outline-none rounded-sm py-1 px-3 border border-blue-400' type="email" id='email' placeholder='Email'/>
                </div>
                <div className='flex flex-col w-full'>

                    <label htmlFor="password">Enter your password:</label>
                    <input onChange={(e) => setPassword(e.target.value)} className='focus:border-blue-700 focus:shadow-sm focus:shadow-blue-200 outline-none rounded-sm py-1 px-3 border border-blue-400' type="password" id='password' placeholder='Password'/>
                </div>
                <div className='flex flex-col w-full'>

                    <label htmlFor="confirmPassword">Confirm your password:</label>
                    <input onChange={(e) => setPass(e.target.value)} className='focus:border-blue-700 focus:shadow-sm focus:shadow-blue-200 outline-none rounded-sm py-1 px-3 border border-blue-400' type="password" id='confirmPassword' placeholder='Password'/>
                </div>



                <button disabled={loading} className='w-full bg-blue-500 text-white py-1 font-bold rounded-sm' type='submit'>Sign up</button>
            </div>
            </div>
        </form>
      </>
    )

}


export default SignUp;