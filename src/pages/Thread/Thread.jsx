import React, { useState } from 'react'
import { UserAuth } from '../../components/contexts/AuthContext';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ReplyIcon from '@mui/icons-material/Reply';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import ArrowCircleUpSharpIcon from '@mui/icons-material/ArrowCircleUpSharp';
import { query, where, collection, getDocs } from 'firebase/firestore';
import { db } from '../../components/Database';
import CommentOptions from './components/CommentOptions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faAddressBook } from '@fortawesome/free-solid-svg-icons'
import ReplyComponent from './components/ReplyComponent';

function Thread() {

    const { userMessage, user, setComments, userComments, pushComments, getComments, deletePosts, getMessages, deleteComments, commentIds, updateThreadFeedback, like } = UserAuth();
    const [ open, setOpen ] = useState(false);
    const navigator = useNavigate();
    console.log(open)
    console.log(userMessage)
    console.log(userComments)
    console.log(commentIds)
    const { id } = useParams();
    
    const calculateNumber = () => {
        let arr = [];
        if(userMessage && userComments){

           const array = userComments.filter((comm) => comm.id === id);
            arr = [...array];
            
        }

        return arr
    }
    
    const result = calculateNumber()
    console.log(result.length)


    const handleSubmit = async (e) => {

        e.preventDefault();
        calculateNumber();
        

        try{

            // Push the new comments - #1 request
             pushComments();
             // Get the comments to see - #2 request
             getComments();
             
            
        }catch(e){

            console.log(e.message);


        }


    }

    // Delete the entire thread including the comments
    const handleDelete = async () => {
        
        
        try{
            
            // Delete the thread with that id - #3 request
            deletePosts(id);
            // After deleting posts free up the space and clear the comments of that post that was deleted
            // Search for the keys that are equal to the id of each comment, so the refference is the id of each comment
            // If the comments postID is equal to the id from the URL, meaning id of the post
            // Map through them and delete them one by one
            console.log(userComments);
            // Get the comments with the ids that are == with my deleted thread created by Firebase - #4 request
            const filter = userComments.filter((el) => el.postID === id);
            filter.map((el) => deleteComments(el.id));
            
            // Show how messages disappeared - #4 request
            getMessages();
            // Navigate to home after - #5 request
            navigator('/home');

            }catch(e){

                console.log(e);


            }
        
    }

    
  return (
    <div className='max-w-7xl m-auto flex flex-col h-fit overflow-y-hidden overflow-x-hidden'>
        {userMessage ? userMessage.map((element) => {
            if(element.id === id){

                return (

                    <div className='w-full flex flex-col shadow-sm  rounded-md p-5 border border-gray-300 min-h-fit m-auto'>

                        <div className='flex'>
                            <div className='w-16 h-16 overflow-hidden'>
                                <img className='w-full h-full object-cover' src={element.photo} alt="" />
                            </div>
                            <p className='self-center ml-10'>{element.message}</p>
                        
                        
                        </div>
                        <div className='flex place-content-end mt-10'>
                            {/* Check if the user connected is the author of the post to be able to delete its own post */}
                            {element.uid === user.uid ? <span className='cursor-pointer' onClick={() => handleDelete()}>Delete</span> : null}
                            <span className='mx-5 cursor-pointer'><FontAwesomeIcon className={like ? 'text-red-600' : 'text-black'} id={element.id} onClick={(e) => updateThreadFeedback(e.target.id, element)} icon={faArrowUp}></FontAwesomeIcon>&nbsp;<span className='pl-2'>{element.likes ? element.likes.length : 0}</span></span>
                            <p className='text-gray-300 font-bold'>Last edited on {element.date}</p>
                            
                        </div>
                        
                    </div>

                )    
            
            }
            
        }) : null}

        {userComments ? userComments?.map((el) => {

            if(el.postID === id){

                return (
                    <div className='flex flex-col'>
                        <div className='flex h-1/5 my-10'>
                                <div className='rounded-lg w-auto h-full border mr-5'>
                                    <div className='overflow-hidden object-cover w-28 h-28'>
                                    
                                        <img src={el.photo} alt="Nice image" className='w-full h-full'/>
                                    
                                    </div>
                                    
                                    
                                    
                                    <p className='mt-2 text-center'>{el.name}</p>

                                    
                            
                                
                                
                                </div>
                                <div className='border border-gray-300 p-3 rounded-lg h-full w-full'>
                                    
                                    <p className='text-gray-300 font-bold'>{el.date}</p>
                                    <div className='w-auto h-fit mt-4'>
                                        <p>{el.comm}</p>
                                    </div>
                                    
                                    <>
                                       <CommentOptions id={el.id} uid={el.uid}/>
                                    </>
                                    
                                    
                                </div>
                               
                                
                        </div>
                        <div className='w-full'>
                            <ReplyComponent replies={el.replies} id={el.id}/>
                        </div>
                    </div>
                )

            }
        }) : null}
        
        <div className={`${!open ? 'translate-y-96 transition-all overflow-y-hidden' : 'transition-all translate-y-0'} shadow-lg rounded-lg w-full h-full border-2 border-blue-500`}>
            <form action="" onSubmit={(e) => handleSubmit(e)}>
                {userMessage ? userMessage?.map((element) => {
                    if(element.id === id){

                        return (

                            <div className='mx-3 flex place-content-start'><span><ReplyIcon/></span><q className='ml-5 bg-gray-200 leading-8 px-2 font-bold'>{element.message}</q></div>

                        )

                    }
                }) : null}
                
                <textarea onChange={(e) => setComments(id, e.target.value, user)} className='outline-none border border-blue-500 w-full h-1/2 p-2 md:w-1/2' name="" id="" cols="30" rows="10"></textarea>

                <div className='flex place-content-end'>
                    <button type='submit' className='bg-blue-600 px-5 py-2 text-white w-fit'>Reply</button>
                </div>
            </form>
        </div>
        <button onClick={() => setOpen(!open)} className='bg-blue-600 px-5 py-2 text-white w-fit'>{open ? 'Close' : 'Reply'}</button> 
    </div>
  )
}


export default Thread;