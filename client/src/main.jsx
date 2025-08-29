import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from'react-router-dom'
import {Toaster} from "react-hot-toast"
import GoogleProviderWrapper from './components/GoogleProviderWrapper.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <GoogleProviderWrapper>
      <App />
         <Toaster position="top-center" />
    </GoogleProviderWrapper>      
    </BrowserRouter> 
  </StrictMode>
)
