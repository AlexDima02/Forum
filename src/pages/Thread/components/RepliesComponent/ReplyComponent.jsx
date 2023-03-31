import React, { useState } from 'react'
import RepliesOptions from './components/RepliesOptions';
import { UserAuth } from '../../../../components/contexts/AuthContext';

function ReplyComponent(props) {

    console.log(props.replies?.map(el => el));
    const replies = props.replies;
    const { commentReplies } = UserAuth();
    
    console.log(replies);
    

        return (
            <div>
                {/* First level comment */}
               {replies ? replies?.map((el,index) => {
                return (
                    <div>
                        <div className='border border-gray-300 p-3 mt-5 rounded-lg h-full w-1/2'>
                            <div className='flex place-content-between'> 
                                <h1>{el.name}</h1>
                                <p>{el.date}</p>
                            </div>
                            <div>

                                <p>{el.reply}</p>
                                
                            </div>
                            <div key={el.commID}>
                            
                                <RepliesOptions post={props.postIdentifiacation} uid={el.uid} id={el.commID} replyCode={el} dbIdentification={props.id}/>

                            </div>
                        
                        </div>
                        
                        {/* Every reply of the selected reply */}
                        {/* Second level comments */}
                        {commentReplies ? commentReplies.map((reply) => {
                            if(reply.commID === el.commID){
                                {console.log(el.commID)}
                            return (
                                
                                <div className='ml-20 border border-gray-300 p-3 mt-5 rounded-lg h-full w-1/2'>
                                    <div className='flex place-content-between'>
                                        <h1>{reply.name}</h1>
                                        <p>{reply.date}</p>
                                    </div>
                                    <div className='my-5'>
                                        <p>{reply.reply}</p>
                                    </div>
                                    
                                    <RepliesOptions post={props.postIdentifiacation} uid={reply.uid} secondLevel={reply.id} id={el.commID} dbIdentification={reply.id}/>
                                </div>

                            )

                            }

                        }) : null}
                        
                    </div>
               )
            }) : null}
             
            </div>
           
        )


    
  
}


export default ReplyComponent;