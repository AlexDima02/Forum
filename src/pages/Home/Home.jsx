import React from 'react'
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../components/contexts/AuthContext';
import { TypeBar } from './components/TypeBar';

function Home() {

    const { user, signout } = UserAuth();
    const navigate = useNavigate();

    

  return (
    <div className='max-w-7xl m-auto h-screen  border border-red-700 md:flex'>
      <div>
        <h1>You are logged in!</h1>
        <p>Welcome back {user.displayName}</p>
      </div>
      <div className='w-full'>
        <TypeBar />
      </div>
    </div>
  )
}

export default Home;
