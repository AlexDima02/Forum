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
                        <div className='bg-primary-color p-3 mt-5 rounded-lg h-full w-1/2'>
                            <div className='flex place-content-between'> 
                                <h1 className='text-white'>{el.name}</h1>
                                <p className='text-text-color opacity-50 font-bold'>{el.date}</p>
                            </div>
                            <div className='my-5 text-white'>

                                <p>{el.reply}</p>
                                
                            </div>
                            <div key={el.commID}>
                            
                               {localStorage.getItem('account') ? <RepliesOptions post={props.postIdentifiacation} uid={el.uid} id={el.commID} replyCode={el} dbIdentification={props.id}/> : null} 

                            </div>
                        
                        </div>
                        
                        {/* Every reply of the selected reply */}
                        {/* Second level comments */}
                        {commentReplies ? commentReplies.map((reply) => {
                            if(reply.commID === el.commID){
                                {console.log(el.commID)}
                            return (
                                
                                <div className='ml-20 bg-primary-color p-3 mt-5 rounded-lg h-full w-1/2'>
                                    <div className='flex place-content-between'>
                                        <h1 className='text-white'>{reply.name}</h1>
                                        <p className='text-text-color opacity-50 font-bold'>{reply.date}</p>
                                    </div>
                                    <div className='my-5 text-white'>
                                        <p>{reply.reply}</p>
                                    </div>
                                    
                                    {localStorage.getItem('account') ? <RepliesOptions post={props.postIdentifiacation} uid={reply.uid} secondLevel={reply.id} id={el.commID} dbIdentification={reply.id}/> : null}
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