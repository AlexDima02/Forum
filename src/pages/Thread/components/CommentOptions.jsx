import React, { useState } from 'react'
import { UserAuth } from '/src/components/contexts/AuthContext.jsx';
import { useParams } from 'react-router-dom';

function CommentOptions(props) {

    const { getComments, deleteComments, editComments, replyComments, setReplies, user, deleteReplies, commentReplies } = UserAuth();
    const [ input, setInput ] = useState('');
    const [ open, setOpen ] = useState(false);
    const [ replying, isReplying ] = useState(false);
    const { id } = useParams();
    
    
    const handleSpecificComment = async (el) => {
        console.log(el)
        try{

            deleteComments(el);
            // Delete all the replies
            const replies = commentReplies?.filter((el) => el.postID === el);
            replies.map((el) => deleteReplies(el.id));
            getComments();
            

        }catch(e){

            console.log(e.message);

        }
        
    }

    const handleEditComment = async (idComment) => {

        if(input !== ''){

            

            try{
                
                editComments(idComment, input);
                getComments();
                console.log('Comment updated!');
            
            }catch(e){

                console.log(e.message)
            
            }


        }


    }

    const handleReply = async (id) => {

        

        try{


            replyComments(id);
            console.log('Reply added')
            getComments();

        }catch(e){


            console.log(e.message);

        }


    }

  return (
    
        <div>
            <div className='flex mt-5 w-1/2 place-content-between'>
                <div>                              
                    {user.uid === props.uid ? <span onClick={(e) => handleSpecificComment(e.target.id)} id={props.id} className='mr-10 cursor-pointer text-white'>Delete</span> : null}
                </div>
                <div>
                    {user.uid === props.uid ? <span className='mr-10 cursor-pointer text-white' onClick={(e) => setOpen(!open)}>{open ? 'Cancel' : 'Edit'}</span> : null}
                </div>
                <div>
                    <span className='cursor-pointer text-white' onClick={() => localStorage.getItem('account') ? isReplying(!replying) : props.popUp(!props.popUpStatus)}>{replying ? 'Cancel' : 'Reply'}</span>
                </div>
            </div>
            
                {replying && (

                    <div className='flex flex-col'>

                        <input onChange={(e) => setReplies(e.target.value)} type="text" id={props.id} className='text-text-color px-2 outline-none rounded-xl my-4' placeholder='Reply with..'/>
                        <span className='cursor-pointer text-white' onClick={() => handleReply(props.id)}>Reply</span>

                    </div>

                )}

                {open && (

                    <div className='flex flex-col'>
                        <input onChange={(e) => setInput(e.target.value)} type="text" className='text-text-color px-2 outline-none rounded-xl my-4'/>
                        <span className='text-white cursor-pointer' onClick={(e) => handleEditComment(props.id)}>Edit</span>
                    </div>

                )}
                
                           
        </div>
  )
}

export default CommentOptions;