import React, { useState } from 'react'
import { UserAuth } from '../../components/contexts/AuthContext';

function NewPost() {

    // Post state
    const [ image, setImage ] = useState('');

    const handleInsertImage = async (e) => {

        console.log(e.target.files[0]);
        try{

            

        }catch(e){

            console.log(e);

        }

    }

  return (
    <div>
        <div className='max-w-6xl m-auto mt-5'>
            <div className='flex w-full place-content-start px-5 mb-10'>
                <div className='flex w-full place-content-between'>
                    <div>
                        <h1 className='text-white font-bold text-3xl'>Create Post</h1>
                    </div>
                    <div>
                        <a href="/" className='font-bold bg-primary-color p-3 rounded-md text-white w-fit'>X</a>
                    </div>
                </div>
            </div>
            <form action="">
                <div className='bg-primary-color p-10 rounded-lg'>
                    <div className='max-w-5xl m-auto'>
                        <div className='w-full'>
                            <div className='w-full'>
                                <textarea rows="2" className="p-5 block w-full text-3xl font-bold text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="New post title here..." required></textarea>
                            </div>

                            <div className='flex place-content-around w-full m-auto bg-gray-800 text-white py-5 my-5'>
                                <div> 
                                    <button className='bg-button-color w-20 h-20'>B</button>
                                </div>
                                <div>
                                    <button className='bg-button-color w-20 h-20'>I</button>
                                </div>
                                <div>
                                    <input onChange={(e) => handleInsertImage(e)} className='bg-button-color w-20 h-20' type='file' accept='image/*' />
                                </div>
                                <div>
                                    <button className='bg-button-color w-20 h-20'>Link</button>
                                </div>
                            </div>

                            <div className='w-full'>

                                <textarea rows="2" className=" p-5 block w-full text-3xl font-bold text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="New post title here..." required></textarea>

                            </div>

                            <div className='w-full flex place-content-end mt-10'>

                                <div className='w-fit'>

                                    <button type='submit' className='bg-button-color rounded-md px-5 py-2 font-bold text-white'>Publish</button>

                                </div>

                            </div>

                        </div>
                    </div>
                </div>

                </form>

            </div>
            
        
    </div>
  )
}

export default NewPost;
