import React, { useState } from 'react'
import { UserAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../Alert';

function SignIn() {

    // Import login functionality from the context inside the component AuthContext
    const { login, user, getMessages } = UserAuth();
    console.log(user)
    const [ email, setEmail ] = useState('');
    console.log(email)
    const [ password, setPassword ] = useState('');
    console.log(password)
    const [ error, setError ] = useState('');
    console.log(error);
    const navigate = useNavigate();

    const handleSignIn = async (e) => {

        e.preventDefault();
        setError('');
        try{

            setError('')
            const response = await login(email, password);
            localStorage.setItem('account', response.user.isAnonymous);
            console.log(response.user.isAnonymous);
            navigate('/');
            getMessages();


        }catch(e){

            console.log(e.message);
            setError('Email or password wrong!');

        }

        
    }

  return (
    <div>
      <form onSubmit={(e) => handleSignIn(e)} className='m-auto p-5 md:w-1/2'>
            <div className='flex place-content-center justify-center rounded-lg border border-gray-400 p-5'>
            <div className='w-4/5 flex flex-col h-96 place-content-between'>
                <div id='header'>
                    
                        <h1 className='text-xl font-bold'>Welcome!</h1>
                        <p className=''>Join us by creating your account</p>
                   
                </div>
                {error ? <Alert error={error}/> : null}
                <div className='flex flex-col w-full'>

                    <label htmlFor="email">Enter your email:</label>
                    <input onChange={(e) => setEmail(e.target.value)} className='focus:border-blue-700 focus:shadow-sm focus:shadow-blue-200 outline-none rounded-sm py-1 px-3 border border-blue-400' type="email" id='email' placeholder='Email'/>
                </div>
                <div className='flex flex-col w-full'>

                    <label htmlFor="password">Enter your password:</label>
                    <input onChange={(e) => setPassword(e.target.value)} className='focus:border-blue-700 focus:shadow-sm focus:shadow-blue-200 outline-none rounded-sm py-1 px-3 border border-blue-400' type="password" id='password' placeholder='Password'/>
                </div>
                <div>
                    <button className='w-full bg-blue-500 text-white py-1 mb-3 font-bold rounded-sm' type='submit'>Sign up</button>
                    <div className='flex place-content-between'>
                        <a href="/register">Create an account</a>
                        <a href="/forgot-password">Forgot my password</a>
                    </div>
                </div>
            </div>
            </div>
        </form>
    </div>
  )
}


export default SignIn;