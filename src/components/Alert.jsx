import React from 'react'

const Alert = (props) => {

  return (
    <div className='bg-red-300 p-3 rounded-lg text-red-800'>
        <p>{props.error}</p>
    </div>
  )
}

export default Alert
