import React, { useState } from 'react'
import { UserAuth } from '/src/components/contexts/AuthContext.jsx';
import { useParams } from 'react-router-dom';

function CommentOptions(props) {

    const { getComments, deleteComments, editComments, replyComments, setReplies, user } = UserAuth();
    const [ input, setInput ] = useState('');
    const [ open, setOpen ] = useState(false);
    const [ replying, isReplying ] = useState(false);
    const { id } = useParams();
    
    
    const handleSpecificComment = async (el) => {

        try{

            deleteComments(el);
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
    
        <div className='flex mt-5'>
                                                   
                {user.uid === props.uid ? <span onClick={(e) => handleSpecificComment(e.target.id)} id={props.id} className='mr-10 cursor-pointer'>Delete</span> : null}
                {user.uid === props.uid ? <span onClick={(e) => setOpen(!open)}>Edit</span> : null}
                <span onClick={() => isReplying(!replying)}>Reply</span>
                {replying && (

                    <div>

                        <input onChange={(e) => setReplies(e.target.value)} type="text" id={props.id}/>
                        <span onClick={() => handleReply(props.id)}>Reply</span>

                    </div>

                )}
                <div className={`${open ? 'flex' : 'hidden'} border border-blue-300`}>
                    <input onChange={(e) => setInput(e.target.value)} type="text" className='border border-blue-600' />
                    <span onClick={(e) => handleEditComment(props.id)}>Edit</span>
                </div>
                           
        </div>
  )
}

export default CommentOptions;