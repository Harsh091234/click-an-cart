import React from 'react'
import { useThemeStore } from "./store/useThemeStore"
import {Routes, Route} from "react-router-dom"
import SettingsPage from './pages/SettingsPage';
import HomePage from './pages/HomePage';

const App = () => {
  const {theme} = useThemeStore();

  return (
    <div className='h-screen' data-theme={theme}>
      <Routes>
            <Route path="/" element={<HomePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </div>
  )
}

export default App