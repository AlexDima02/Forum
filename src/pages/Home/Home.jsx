import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../components/contexts/AuthContext';
import { TypeBar } from './components/TypeBar';
import PostsView from './components/PostsView';


function Home() {

    const { user, signout } = UserAuth();
    const navigate = useNavigate();
    


  return (
    <div className='max-w-7xl m-auto h-screen md:flex'>
      <div className='w-1/2'>
        <h1>You are logged in!</h1>
        <p>Welcome back {user ? user.displayName : null}</p>
      </div>
      <div className='w-full'>
        <TypeBar />
        <PostsView />
      </div>
    </div>
  )
}

export default Home;
