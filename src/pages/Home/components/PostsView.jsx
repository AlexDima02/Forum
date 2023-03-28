import React, { useState } from 'react'
import { UserAuth } from '../../../components/contexts/AuthContext';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowCircleUpSharpIcon from '@mui/icons-material/ArrowCircleUpSharp';
import { v4 as uuidv4 } from 'uuid';

function PostsView() {

    const { userMessage, user, userComments, deletePosts, updateStateLikes, deleteLikeUser, getMessages, updateThreadFeedback } = UserAuth();
    const [ currentLink, setCurrentLink ] = useState('');
    const [ checked, setCheck ] = useState(true);
   
    
  return (
    <div className='w-full shadow-sm max-w-3xl rounded-md flex-col p-5 border border-gray-300 min-h-screen'>
        <div className='mb-4'>

            <h1>Threads</h1>

        </div>

        {userMessage ? userMessage?.map((element) => (
          
            
            <div className='flex h-1/5 mb-5'>

                <a href={`/thread/${element.id}`} key={element.id} className='rounded-lg w-1/2 h-full border mr-5'>

                  <div className=''>
                      <div className='overflow-hidden object-cover h-2/3'>
                        
                        <img src={element.photo} alt="Nice image" className='w-full h-full'/>
                      
                      </div>
                        
                      
                        
                          <p className='mt-2 text-center'>{element.name}</p>

                        
              
                  
                  
                  </div>
                  
                </a>
                <div className='border border-gray-300 p-3 rounded-lg h-full w-full'>
                      
                      <a href={`/thread/${element.id}`} key={element.id}>
                          <p className='text-gray-300 font-bold'>{element.date}</p>
                          <div className='w-auto h-fit mt-4'>
                            <p>{element.message}</p>
                          </div>
                       </a>

                      <div className='flex place-content-between mt-10'>
                        
                        <div className='flex'>

                          <div className=''>
                            <span id={element.id} onClick={(e) => updateThreadFeedback(e.target.id, element)} className='pr-2 cursor-pointer'>{element.likes ? element.likes.length : 0}&nbsp;&nbsp;&nbsp;<ArrowCircleUpSharpIcon sx={{ fontSize: 30 }}/></span>
                          </div>

                        </div>

                        <div className='flex'>
                          
                          <div className='mr-5'>
                            <span className='pr-2'>{userComments ? userComments.filter((item) => item.postID === element.id).length : 0}</span><ChatBubbleIcon/>
                          </div>
                          <div>
                            <span className='pr-2'>12</span><VisibilityIcon/>
                          </div>

                        </div>

                      </div>
                </div> 
            </div>  
        )) : null}
    </div>
  )
}


export default PostsView;