import React from 'react'
import { UserAuth } from '../../../components/contexts/AuthContext'
import { useNavigate } from 'react-router-dom';

function DashboardDeleteAccount() {
  
  const { user, deleteAccount } = UserAuth();
  const navigate = useNavigate();
  

  const handleDelete = async (e) => {
    
    await deleteAccount(user).then(() => {

      navigate('/login');

    });
  }


  return (
    <div className='bg-primary-color rounded-lg p-5 mx-3 my-5'>
        <div className='text-white'>
            <h1 className='text-xl font-bold'>Delete Account</h1>
            <p>Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.</p>
        </div>
        <div className='mt-5'>
                <button onClick={handleDelete} type='submit' className='rounded-md text-white bg-red-700 font-bold px-4 py-1'>DELETE</button>
        </div>
    </div>
  )
}

export default DashboardDeleteAccount
