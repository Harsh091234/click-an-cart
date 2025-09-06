import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from'react-router-dom'
import {Toaster} from "react-hot-toast"
import GoogleProviderWrapper from './components/GoogleProviderWrapper.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <GoogleProviderWrapper>
    <BrowserRouter>
   
      <App />
         <Toaster toastOptions={{
    success: {
      style: {
        background: "#fff",
        color: "#0EA5E9", // sky-500
        border: "1px solid #bae6fd",
      },
      iconTheme: {
        primary: "#0EA5E9", // sky-500
        secondary: "#fff",
      },
    },
    error: {
      style: {
        background: "#fff",
        color: "#ef4444", // red-500
        border: "1px solid #fecaca", // red-200
      },
    },
  }} position="top-center" />
       
    </BrowserRouter> 
     </GoogleProviderWrapper>  
  </StrictMode>
)
