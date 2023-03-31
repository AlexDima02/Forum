import React, { useState } from 'react'
import { UserAuth } from '../../../../../components/contexts/AuthContext';
import { v4 as uuidv4 } from 'uuid';

function RepliesOptions(props) {

    const [ replying, setReplying ] = useState(false);
    const { writeReplies, pushCommReplies,user, getCommReplies, deleteReplies, deleteReplyComments } = UserAuth();
    


    const handleWrite = (e) => {

        writeReplies({
            

                commID: props.id,
                uid: user.uid,
                reply: e,
                date: new Date().toLocaleString('en-GB', { timeZone: 'UTC' }),
                name: user.displayName,
                id: uuidv4()
        
               
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

    const handleDelete = async (e) => {
        console.log(e)
        try{
            
            deleteReplies(e);
            console.log('Reply removed!');
            getCommReplies();

        }catch(e){

            console.log(e.message);

        }


    }
            return (
                <div>
                    <div className='flex place-content-between'>
                        <div>
                            {user.uid === props.uid ? <span className='cursor-pointer' onClick={(e) => handleDelete(e.target.id)} id={props.dbIdentification}>Delete</span> : null}
                        </div>
                        <div>
                            <span className='cursor-pointer' onClick={() => setReplying(!replying)}>{replying ? 'Cancel' : 'Reply'}</span>
                        </div>
                    </div>
                    <div>
                        <div className={replying ? `flex flex-col` : 'hidden'}>
                            <input type="text" onChange={(e) => handleWrite(e.target.value)}/>
                            <span onClick={() => handleSubmit()} className='cursor-pointer w-fit'>Reply</span>
                        </div> 
                    </div>
                </div>
            )
    

}


export default RepliesOptions;