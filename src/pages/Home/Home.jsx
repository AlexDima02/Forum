import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../components/contexts/AuthContext';
import { TypeBar } from './components/TypeBar';
import PostsView from './components/PostsView';


function Home() {

    const { user, signout } = UserAuth();
    const navigate = useNavigate();
    
    
  console.log(user.photoURL)
  return (
    <div className='max-w-7xl m-auto h-screen md:flex'>
     {localStorage.getItem('account') ? 
     <div className='w-full h-56 rounded-lg shadow-sm flex place-content-center bg-primary-color justify-center mt-10 mr-5 md:w-1/4'>
        <div className='flex flex-col place-content-center'>
          <div className="w-28 h-28 rounded-full overflow-hidden object-contain">
            <img className="w-full h-full" src={user.photoURL ? user.photoURL : null} alt="" />
          </div>
          <div className="w-full text-center mt-5 text-text-color font-bold">
            <p>{user.displayName ? user.displayName : null}</p>
          </div>
        </div>
    </div> : null} 
      <div className='w-full flex place-content-center '>
        <div>
          {/* <TypeBar /> */}
          <PostsView />
          </div>
      </div>
    </div>
  )
}

export default Home;
