import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar';
import Thread from './pages/Thread/Thread';
import Dashboard from './pages/Dashboard/Dashboard';
import ResetPassword from './components/ResetPassword/ResetPassword';
import CompletePasswordReset from './components/completeResetPassword/CompletePasswordReset';
import { db } from './components/Database';
import { collection, getDocs } from 'firebase/firestore';
import { UserAuth } from './components/contexts/AuthContext';



function App() {
  
  const { userMessage, user } = UserAuth();
  console.log(userMessage);

  return (
      <>
        <Navbar />
        <Routes>
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path='/thread/:id' element={<Thread />} />
          <Route path="/profile" element={<Dashboard />} />
          <Route path="/forgot-password" element={<ResetPassword />} />
          <Route path="/reset-password" element={<CompletePasswordReset />} />
        </Routes>
      </>
  )
}

export default App
