import React, { Component,useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Alert from '../Alert';
import { UserAuth } from '../contexts/AuthContext';

function SignUp(){

    const [ email, setEmail ] = useState('');
    console.log(email)
    const [ password, setPassword ] = useState('');
    console.log(password)
    const [ confirmPass, setPass ] = useState('');
    console.log(confirmPass)
    const [ name, setName ] = useState('');
    console.log(name);
    const { createUser, user, settingUsername } = UserAuth();
    const [ error, setError ] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    
    async function handleSubmit(e){
        
        e.preventDefault();
        setError('');
        // Verify if the current password is the same as the confirm password input
        if(password !== confirmPass){
            
            return setError("Passwords do not match")
        }
      
            // setLoading(true);
            await createUser(email, password).then((res) => {

                console.log(res.user);
                settingUsername(res.user, name);
                navigate('/home')

            }).catch((e) => {

                setError('This user has been already created!');
                console.log(e.message);

            })

        // setLoading(false);
    }

    return (
      <>
        <form onSubmit={(e) => handleSubmit(e)} action="POST" className='p-5 m-auto md:w-1/2'>
            <div className='flex place-content-center justify-center rounded-lg border border-gray-400 p-5'>
            <div className='w-4/5 flex flex-col h-96 place-content-between'>
                <div id='header'>
                    
                        <h1 className='text-xl font-bold'>Welcome!</h1>
                        <p className=''>Join us by creating your account</p>
                   
                </div>
                {error ? <Alert error={error} /> : null}
                <div className='flex flex-col w-full'>

                    <label htmlFor="email">Enter your email:</label>
                    <input onChange={(e) => setEmail(e.target.value)} className='focus:border-blue-700 focus:shadow-sm focus:shadow-blue-200 outline-none rounded-sm py-1 px-3 border border-blue-400' type="email" id='email' placeholder='Email'/>
                </div>
                <div className='flex flex-col w-full'>

                    <label htmlFor="email">Enter your name:</label>
                    <input onChange={(e) => setName(e.target.value)} className='focus:border-blue-700 focus:shadow-sm focus:shadow-blue-200 outline-none rounded-sm py-1 px-3 border border-blue-400' type="text" id='email' placeholder='Username'/>
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