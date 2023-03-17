import React from 'react'

function TypeBar() {
  return (
    <div className='bg-gray-200 border border-white shadow-sm max-w-3xl m-auto rounded-md flex-col p-5'>
        <div className='flex'>
            <div className='w-ful h-full'><span className='rounded-full h-full border border-red-600'>Photo</span></div>
            <div className='w-full'>
                <textarea className='p-1 resize-none w-full bg-gray-700 text-gray-200 border-2 border-gray-200 outline-none' name="" id="" cols="100" rows="5" placeholder='Tell me what is on your mind..'></textarea>
            </div>
        </div>
        <div className=''>
            <button type='submit' className='rounded-lg px-5 py-2 bg-blue-400 text-white font-bold'>Publish</button>
        </div>
    </div>
  )
}


export { TypeBar };
