import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout.jsx'
import LandingPage from './Components/LandingPage/LandingPage.jsx'
import Dashboard from './Components/DashboardPage/Dashboard.jsx'
import AboutPage from './Components/AboutPage/AboutPage.jsx'
import HistoryPage from './Components/HistoryPages/HistoryPage.jsx'
import Login from './Components/AuthenticaitonPages/Login.jsx'
import Signup from './Components/AuthenticaitonPages/Signup.jsx'
import VideoPlyer from './Components/VideoDisplay/VideoPlayer.jsx'
import GettingVedioPage from './Components/VideoDisplay/GettingVedioPage.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,       
    children: [
      { index: true, element: <LandingPage /> },
      {path : "/fetch-video", element : <GettingVedioPage/> }, 
      {path : "/dashboard", element :<Dashboard/>},
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