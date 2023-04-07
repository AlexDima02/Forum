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
import ReplyComponent from './components/RepliesComponent/ReplyComponent';
import PopupModal from '../../components/PopupModal';

function Thread() {

    const { userMessage, user, setComments, userComments, pushComments, getComments, deletePosts, getMessages, deleteComments, commentIds, updateThreadFeedback, like, commentReplies, deleteReplies } = UserAuth();
    const [ open, setOpen ] = useState(false);
    const [ openPopup, setPopup ] = useState(false);
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
             setComments(null);
            
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
            
            // Delete all the replies
            const replies = commentReplies?.filter((el) => el.postID === id);
            replies.map((el) => deleteReplies(el.id));
            // Show how messages disappeared - #4 request
            getMessages();
            // Navigate to home after - #5 request
            navigator('/');

            }catch(e){

                console.log(e);


            }
        
    }

    
  return (
    <div className='max-w-7xl m-auto flex flex-col h-fit overflow-y-hidden overflow-x-hidden mt-10'>

        {/* Popup in case of anonymous user */}
        <div className={openPopup ? 'h-screen w-screen fixed top-0 left-0 right-0 bottom-0 flex flex-col place-content-center z-40' : 'hidden'}>

            <div className='bg-gray-900 opacity-50 h-screen w-screen fixed top-0 left-0 right-0 bottom-0'></div>
            <PopupModal setPopup={setPopup} openPopup={openPopup}/>

        </div>
        {userMessage ? userMessage.map((element) => {
            if(element.id === id){

                return (

                    <div className='w-full flex flex-col shadow-sm  rounded-md p-5 bg-primary-color text-white min-h-fit m-auto'>

                        <div className='flex'>
                            <div className='w-16 h-16 overflow-hidden'>
                                <img className='w-full h-full object-cover' src={element.photo} alt="" />
                            </div>
                            <p className='self-center ml-10'>{element.message}</p>
                        
                        
                        </div>
                        <div className='flex place-content-end mt-10'>
                            
                            {/* Check if the user connected is the author of the post to be able to delete its own post */}
                            {element.uid === user.uid ? <span className='cursor-pointer' onClick={() => handleDelete()}>Delete</span> : null}
                            <span className='mx-5 cursor-pointer'><FontAwesomeIcon className={element.likes.filter((el) => el.user === user.uid)[0] ? 'text-red-600' : 'text-white'} id={element.id} onClick={(e) => localStorage.getItem('account') ? updateThreadFeedback(e.target.id, element) : setPopup(!openPopup)} icon={faArrowUp}></FontAwesomeIcon>&nbsp;<span className='pl-2'>{element.likes ? element.likes.length : 0}</span></span>
                            <p className='text-text-color font-bold opacity-50'>Last edited on {element.date}</p>
                            
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
                                <div className='rounded-lg w-auto h-full bg-primary-color text-text-color mr-5'>
                                    <div className='overflow-hidden object-cover w-28 h-28'>
                                    
                                        <img src={el.photo} alt="Nice image" className='w-full h-full'/>
                                    
                                    </div>
                                    
                                    
                                    
                                    <p className='mt-2 text-center'>{el.name}</p>

                                    
                            
                                
                                
                                </div>
                                <div className='bg-primary-color p-3 rounded-lg h-full w-full'>
                                    
                                    <p className='text-text-color opacity-50 font-bold'>{el.date}</p>
                                    <div className='w-auto h-fit mt-4 text-white'>
                                        <p>{el.comm}</p>
                                    </div>
                                    
                                    <>
                                       <CommentOptions popUp={setPopup} popUpStatus={openPopup} id={el.id} uid={el.uid}/>
                                    </>
                                    
                                    
                                </div>
                               
                                
                        </div>
                        {/* Every reply for every comment on the post */}
                        <div className='w-full'>
                            {console.log(el.id)}
                            <ReplyComponent popUp={setPopup} popUpStatus={openPopup} postIdentifiacation={el.postID} replies={el.replies} id={el.id}/>
                        </div>
                    </div>
                )

            }
        }) : null}

        
        
        <div className={`${!open ? 'translate-y-[200%] transition-all overflow-y-hidden' : 'transition-all translate-y-0'} bg-primary-color shadow-lg rounded-lg w-full h-full border-2 border-blue-500`}>
            <form action="" onSubmit={(e) => handleSubmit(e)}>
                {userMessage ? userMessage?.map((element) => {
                    if(element.id === id){

                        return (

                            <div className='flex place-content-start'><span className='pl-5 flex flex-col place-content-center text-secondary-color'><ReplyIcon /></span><q className='ml-5 pl-5 bg-gray-300 leading-8 font-bold w-full'>{element.message}</q></div>

                        )

                    }
                }) : null}
                <div className='w-full'>
                    <textarea onChange={(e) => setComments(id, e.target.value, user)} className='outline-none bg-secondary-color w-full h-1/2 p-2 md:w-full text-text-color' placeholder='Reply to this comment..' name="" id="" cols="30" rows="10"></textarea>
                </div>
                <div className='flex place-content-end'>
                    <button type='submit' className='bg-button-color font-bold px-5 py-2 text-white w-fit cursor-pointer'>Reply</button>
                </div>
            </form>
        </div>
        <button onClick={() => localStorage.getItem('account') ? setOpen(!open) : setPopup(!openPopup)} className='bg-button-color px-5 py-2 text-white font-bold w-fit'>{open ? 'Close' : 'Reply'}</button> 
    </div>
  )
}


export default Thread;