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
                    <div className='md:ml-20'>
                        <div className='flex h-1/5 my-10 ml-10'>
                            
                            <div className='rounded-lg w-auto h-full bg-primary-color text-text-color mr-5'>

                                <div className='overflow-hidden object-cover w-28 h-28 rounded-lg'>
                                
                                    <img src={el.photo} alt="Nice image" className='w-full h-full'/>

                                </div>

                                <p className='pt-2 text-center text-white'>{el.name}</p>

                            </div>

                            <div className='bg-primary-color p-3 rounded-lg h-full w-1/2'>
                                <div className='flex place-content-between'> 
                                    <h1 className='text-white'>{el.name}</h1>
                                    <p className='text-text-color opacity-50 font-bold text-end'>{el.date}</p>
                                </div>
                                <div className='my-5 text-white'>

                                    <p>{el.reply}</p>
                                    
                                </div>
                                <div key={el.commID}>
                                
                                {localStorage.getItem('account') ? <RepliesOptions replyName={el.name} post={props.postIdentifiacation} uid={el.uid} id={el.commID} replyCode={el} dbIdentification={props.id}/> : null} 

                                </div>

                            </div>
                            
                        </div>
                        
                        {/* Every reply of the selected reply */}
                        {/* Second level comments */}
                        {commentReplies ? commentReplies.map((reply) => {
                            if(reply.commID === el.commID){
                                {console.log(el.commID)}
                            return (
                                <div className='flex h-1/5 my-10 ml-20 md:ml-40'>
                                    <div className='rounded-lg w-auto h-full bg-primary-color text-text-color'>

                                            <div className='overflow-hidden object-cover w-28 h-28 rounded-lg'>

                                                <img src={reply.photo} alt="Nice image" className='w-full h-full'/>

                                            </div>

                                            <p className='pt-2 text-center text-white'>{reply.name}</p>

                                    </div>
                                    <div className='ml-5 bg-primary-color p-3 rounded-lg h-full w-1/2'>
                                        <div className='flex place-content-between'>
                                            <h1 className='text-white'>{reply.name}</h1>
                                            <p className='text-text-color opacity-50 font-bold text-end'>{reply.date}</p>
                                        </div>
                                        <div className='my-5 text-white'>
                                            <p>@{reply.toUser}&nbsp;&nbsp;{reply.reply}</p>
                                        </div>
                                        
                                        {localStorage.getItem('account') ? <RepliesOptions replyName={reply.name} post={props.postIdentifiacation} uid={reply.uid} secondLevel={reply.id} id={el.commID} dbIdentification={reply.id}/> : null}
                                    </div>

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