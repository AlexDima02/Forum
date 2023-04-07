import React, { useState } from 'react'
import { UserAuth } from '../../../../../components/contexts/AuthContext';
import { v4 as uuidv4 } from 'uuid';

function RepliesOptions(props) {

    const [ replying, setReplying ] = useState(false);
    const { writeReplies, pushCommReplies,user, getCommReplies, deleteReplies, deleteReplyComments,getComments, commentReplies } = UserAuth();
    


    const handleWrite = (e) => {

        writeReplies({
            

                commID: props.id,
                uid: user.uid,
                reply: e,
                date: new Date().toLocaleString('en-GB', { timeZone: 'UTC' }),
                name: user.displayName,
                id: uuidv4(),
                postID: props.post
        
               
        })


    }

    const handleSubmit = async () => {

        try{

            pushCommReplies();
            console.log('Reply added!');
            getCommReplies();

        }catch(e){

            console.log(e.message);

        }

    }

    const handleDelete = async (second, e, replyId) => {
        
        try{
            
            
            deleteReplies(second);
            console.log('Reply removed!');
            getCommReplies();
            getComments()

        }catch(e){

            console.log(e);

        }

        // Delete first level comments
        try{
            
            deleteReplyComments(e, replyId);
            console.log(props.id);
            const filter = commentReplies.filter((el) => el.commID === props.id);
            filter.map((el) =>  deleteReplies(el.id));
            getComments();
           

        }catch(e){

            console.log(e);

        }




    }
            return (
                <div>
                    <div className='flex place-content-between'>
                        <div>
                            {user.uid === props.uid ? <span className='cursor-pointer text-white' onClick={(e) => handleDelete(props.secondLevel, e.target.id, props.replyCode)} id={props.dbIdentification}>Delete</span> : null}
                        </div>
                        <div>
                            <span className='cursor-pointer text-white' onClick={() => setReplying(!replying)}>{replying ? 'Cancel' : 'Reply'}</span>
                        </div>
                    </div>
                    <div>
                        <div className={replying ? `flex flex-col` : 'hidden'}>
                            <textarea type="text" onChange={(e) => handleWrite(e.target.value)} className='text-text-color px-2 outline-none rounded-xl my-4 h-auto p-3'  placeholder='Reply to this person with..'/>
                            <span onClick={() => handleSubmit()} className='cursor-pointer w-fit text-white'>Reply</span>
                        </div> 
                    </div>
                </div>
            )
    

}


export default RepliesOptions;