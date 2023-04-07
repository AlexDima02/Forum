import React, { useEffect, useState } from 'react'
import { UserAuth } from '../../../components/contexts/AuthContext';

function DashboardUser() {

  
  const { user, settingUsername, changeEmail, uploadImages, images } = UserAuth();
  const [ name, setName ] = useState(user.displayName);
  console.log(name);
  const [ email, setEmail ] = useState('');
  const [ open, setOpen ] = useState(false);
  const [ image, setImage ] = useState(user.photoURL);
  

  console.log(image)
  

  console.log(open)
  console.log(email);

  const handleSaveImages = async (e) => {

    setImage(e);
    // Upload the image to the database
    await uploadImages(e).then((res) => {

      console.log('File Uploaded!')

    }).catch((e) => {

      console.log(e.message);

    })


  }

  const handleSubmit = async (e) => {

    e.preventDefault();
    await settingUsername(user, name, image).then((e) => {

      console.log(e);

    }).catch((e) => {

      console.log(e.message)

    });

    await changeEmail(user, email).then((res) => {

      

    }).catch((e) => {

        console.log(e.message);

    })




  }

  console.log(user.displayName);

  return (
    <div className='bg-primary-color rounded-lg p-5 mx-3 my-5'>
        <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col justify-start place-content-between'> 
            <div id='header' className='flex-col text-white'>

                    <h1 className='text-xl font-bold'>Profile Information</h1>
                    <p>Update your account's profile information and email address.</p>

            </div>
            <div className='flex flex-col my-5 h-36 place-content-between'>

                <div className='w-full flex flex-col'>
                    <label className='text-white' htmlFor="name">Name</label>
                    <input onChange={(e) => setName(e.target.value)} defaultValue={user.displayName} id="name" type="text" name='name' className='focus:border-blue-700 focus:shadow-sm focus:shadow-blue-200 outline-none rounded-sm py-1 px-3 border border-blue-400'/>
                </div>

                <div className='w-full flex flex-col'>
                    <label className='text-white' htmlFor="email">Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} defaultValue={user.email} type="email" name='email' className='focus:border-blue-700 focus:shadow-sm focus:shadow-blue-200 outline-none rounded-sm py-1 px-3 border border-blue-400'/>
                </div>
            </div>
            <div className='w-24 h-24 flex flex-col bg-gray-400 place-content-center mb-5 cursor-pointer'>
                    <span onClick={(e) => setOpen(!open)} className='text-gray-100 font-bold text-center object-cover overflow-hidden'><img className='w-full h-full' src={user.photoURL} alt="" /></span>
                    <span className='hidden'><img src="" alt="" /></span>
            </div>
            <div className={`${open ? "translate-x-0 h-auto transition-all mb-5" : "h-0 -translate-x-[1300px] md:-translate-x-[200%]"} bg-secondary-color w-auto  grid grid-cols-3 grid-flow-row grid-rows-1`}>
                
                  {images ? images.map((img) => {
                      
                      return (
                        <div className='w-28 h-28 object-cover overflow-hidden'>
                              <img onClick={(e) => setImage(e.target.src)} className='w-full h-full hover:border hover:border-white cursor-pointer' src={img} alt="photo" />
                        </div>
                      )
                    }) : null}
                
                
                <div className='flex-col flex place-content-center justify-center'>

                  <input onChange={(e) => handleSaveImages(e.target.files[0])} className='bg-blue-600 text-white w-24' type='file'/>
                </div>
                
            </div>
            <div>
                <button type='submit' className='rounded-md font-bold text-white bg-button-color px-4 py-1'>SAVE</button>
            </div>
      </form>
    </div>
  )
}

export default DashboardUser
