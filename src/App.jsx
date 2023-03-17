import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard/Dashboard';
import { AuthProvider } from './components/contexts/AuthContext'
import ResetPassword from './components/ResetPassword/ResetPassword';
import CompletePasswordReset from './components/completeResetPassword/CompletePasswordReset';



function App() {
  

  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ResetPassword />} />
        <Route path="/reset-password" element={<CompletePasswordReset />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
