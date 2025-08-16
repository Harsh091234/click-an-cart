import React from 'react'
import { useThemeStore } from "./store/useThemeStore"
import {Routes, Route} from "react-router-dom"
import SettingsPage from './pages/SettingsPage';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';

const App = () => {
  const {theme} = useThemeStore();

  return (
    <div className='h-screen flex flex-col' data-theme={theme}>
      

    <Navbar />

     
    
      <div className='flex-1 overflow-y-auto py-6 px-8 bg-base-200'>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<SignupPage />} />
             <Route path="/login" element={<LoginPage />} />
            <Route path="/settings" element={<SettingsPage />} />
      </Routes>
      </div>
      
    </div>
  )
}

export default App