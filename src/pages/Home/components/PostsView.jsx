import React from 'react'
import { UserAuth } from '../../../components/contexts/AuthContext';

function PostsView() {

    const { userMessage, user } = UserAuth();
    console.log(userMessage);
    
  return (
    <div className='w-full shadow-sm max-w-3xl rounded-md flex-col p-5 border border-gray-300 min-h-screen'>
        <div className='mb-4'>

            <h1>Threads</h1>

        </div>

        {userMessage ? userMessage?.map(element => (
            <div className='flex h-1/5 mb-5'>
                <div className='rounded-lg w-1/2 h-full border mr-5'>
                    <div className='overflow-hidden object-cover h-2/3'>
                      
                      <img src={element.photo} alt="Nice image" className='w-full h-full'/>
                    
                    </div>
                       
                    
                      
                        <p className='mt-2 text-center'>{element.name}</p>

                       
            
                
                
                </div>
                <div className='border border-gray-300 p-3 rounded-lg h-full w-full'>
                      
                        <p className='text-gray-300 font-bold'>{element.date}</p>
                       <div className='w-auto h-fit mt-4'>
                        <p>{element.message}</p>
                       </div>
                
                </div> 
            </div>  
             
        )) : null}
    </div>
  )
}


export default PostsView;