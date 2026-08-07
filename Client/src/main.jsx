import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"
import App from './App.jsx'
import { VideoProvider } from './Context/VideoContext.jsx'
import { AuthContextProvider } from './Context/authContext.jsx'
createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
  
  <VideoProvider>
      <App />
  </VideoProvider>
  </AuthContextProvider>
)
