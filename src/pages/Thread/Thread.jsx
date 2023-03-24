import React, { useState } from 'react'
import { UserAuth } from '../../components/contexts/AuthContext';
import { useParams } from 'react-router-dom';
import ReplyIcon from '@mui/icons-material/Reply';


function Thread() {

    const { userMessage, user, setComments, userComments, pushComments, getComments } = UserAuth();
    const [ open, setOpen ] = useState(false);
    console.log(open)
    console.log(userMessage)
    console.log(userComments)
    const { id } = useParams();
    
    
    const handleSubmit = async (e) => {

        e.preventDefault();

        try{

            
            await pushComments();
            await getComments();
            

        }catch(e){

            console.log(e.message);


        }


    }

  return (
    <div className='max-w-7xl m-auto flex flex-col h-fit overflow-y-hidden overflow-x-hidden'>
        {userMessage ? userMessage.map((element) => {
            if(element.id === id){

                return (

                    <div className='w-full flex flex-col shadow-sm  rounded-md p-5 border border-gray-300 min-h-fit m-auto'>

                        <div><p>{element.message}</p></div>
                        <div className='flex place-content-end'><p className='text-gray-300 font-bold'>Last edited on {element.date}</p></div>

                    </div>

                )    
            
            }
            
        }) : null}

        {userComments ? userComments?.map((el) => {
            if(el.id === id){

                return (
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