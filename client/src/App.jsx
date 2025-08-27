import React from 'react'
import { useThemeStore } from "./store/useThemeStore"
import {Routes, Route} from "react-router-dom"
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from "./pages/LoginPage"


const App = () => {
  const {theme} = useThemeStore();

  return (
    <div >
      
       <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      
    </div>
  )
}

export default App