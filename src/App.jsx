import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import SignUp from './components/SignUp/SignUp'
import { AuthProvider } from './components/contexts/AuthContext'

function App() {
  

  return (
    <AuthProvider>
      <SignUp />
      <div className='bg-red-400 w-fit p-5 text-white font-bold'>Signed up</div>
    </AuthProvider>
  )
}

export default App
