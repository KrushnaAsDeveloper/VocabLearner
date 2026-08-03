// App.jsx (or your router file)
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout'
import LandingPage from './Components/LandingPage'
import GettingVedioPage from "./Components/GettingVedioPage.jsx"
import ProgressPage from './Components/ProgressPage.jsx'
import AboutPage from './Components/AboutPage.jsx'
import HistoryPage from './Components/HistoryPage.jsx'
import Login from './Components/Login.jsx'
import Signup from './Components/Signup.jsx'
import VideoPlyer from './Components/VideoPlayer.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,       // parent route renders Navbar + Outlet + Footer
    children: [
      { index: true, element: <LandingPage /> },
      {path : "/fetch-video", element : <GettingVedioPage/> }, 
      {path : "/progress", element :<ProgressPage/>},
      {path : "/about", element :<AboutPage/>}, 
      {path : "/history", element :<HistoryPage/>}, 
      {path : "/login", element: <Login/>}, 
      {path : "/signup", element: <Signup/>}, 
      {path : "/video-player", element : <VideoPlyer/>}
    ],
  },
])

function App() {
    return <RouterProvider router={router} />
}

export default App