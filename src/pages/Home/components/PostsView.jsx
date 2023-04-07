import React, { useState } from 'react'
import { UserAuth } from '../../../components/contexts/AuthContext';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowCircleUpSharpIcon from '@mui/icons-material/ArrowCircleUpSharp';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faAddressBook } from '@fortawesome/free-solid-svg-icons'
import PopupModal from '../../../components/PopupModal';

function PostsView() {

    const { userMessage, user, userComments, deletePosts, updateStateLikes, deleteLikeUser, getMessages, updateThreadFeedback } = UserAuth();
    const [ currentLink, setCurrentLink ] = useState('');
    const [ openPopup, setPopup ] = useState(false);
    console.log(openPopup)
    const [ checked, setCheck ] = useState(true);
    const [ like, setLikes ] = useState(false);
    const [ identification, setIdentification ] = useState();
    
    
  return (
    <div className='w-full shadow-sm max-w-3xl rounded-md flex-col p-5 min-h-screen bg-primary-color'>

      {/* Popup in case of anonymous user */}
        <div className={openPopup ? 'h-screen w-screen fixed top-0 left-0 right-0 bottom-0 flex flex-col place-content-center z-40' : 'hidden'}>

          <div className='bg-gray-900 opacity-50 h-screen w-screen fixed top-0 left-0 right-0 bottom-0'></div>
          <PopupModal setPopup={setPopup} openPopup={openPopup}/>

        </div>

        <div className='mb-10'>

            <h1 className='opacity-10 text-md font-bold text-text-color'>Threads</h1>
            <h1 className='pl-10 text-2xl font-bold text-text-color'>Threads</h1>

        </div>

        {userMessage ? userMessage?.map((element) => (
          
            
            <div className='flex h-1/5 mb-5'>
              {console.log(element.likes.filter((el) => el.user === user.uid))}
                <a href={`/thread/${element.id}`} key={element.id} className='rounded-lg w-1/2 h-full border mr-5'>

                  <div className='bg-secondary-color text-text-color rounded-lg'>
                      <div className='overflow-hidden object-cover h-2/3 rounded-lg'>
                        
                        <img src={element.photo} alt="Nice image" className='w-full h-full'/>
                      
                      </div>
                        
                      
                        <div>
                          <p className='mt-2 text-center'>{element.name}</p>
                        </div>
                        
              
                  
                  
                  </div>
                  
                </a>
                <div className='bg-secondary-color text-white p-3 rounded-lg h-full w-full'>
                      
                      <a href={`/thread/${element.id}`} key={element.id}>
                          <p className='opacity-30 text-text-color font-bold'>{element.date}</p>
                          <div className='w-auto h-fit mt-4'>
                            <p>{element.message}</p>
                          </div>
                       </a>

                      <div className='flex place-content-between mt-10'>
                        
                        <div className='flex'>

                          <div className=''>
                           {localStorage.getItem('account') ? <span  className='pr-2 cursor-pointer'>{element.likes ? element.likes.length : 0}&nbsp;&nbsp;&nbsp;<FontAwesomeIcon className={element.likes.filter((el) => el.user === user.uid)[0] ? 'text-red-600' : 'text-white'} id={element.id} onClick={(e) => {updateThreadFeedback(e.target.id, element), setLikes(!like), setIdentification(element.id)}} icon={faArrowUp}></FontAwesomeIcon></span> 
                           : <span  className='pr-2 cursor-pointer'>{element.likes ? element.likes.length : 0}&nbsp;&nbsp;&nbsp;<FontAwesomeIcon className={element.likes.filter((el) => el.user === user.uid)[0] ? 'text-red-600' : 'text-white'} id={element.id} onClick={(e) => {setPopup(!openPopup)}} icon={faArrowUp}></FontAwesomeIcon></span>} 
                            {/* <ArrowCircleUpSharpIcon color='primary' sx={{ fontSize: 30 }}/> */}
                          </div>

                        </div>

                        <div className='flex'>
                          
                          <div className='mr-5'>
                            <span className='pr-2'>{userComments ? userComments.filter((item) => item.postID === element.id).length : 0}</span><ChatBubbleIcon/>
                          </div>
                          
                          {/* How many people viewed your post functionality */}
                          {/* <div>
                            <span className='pr-2'>12</span><VisibilityIcon/>
                          </div> */}

                        </div>

                      </div>
                </div> 
            </div>  
        )) : null}
    </div>
  )
}


export default PostsView;