// App.jsx (or your router file)
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout'
import LandingPage from './Components/LandingPage'
import GettingVedioPage from "./Components/GettingVedioPage.jsx"
import ProgressPage from './Components/ProgressPage.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,       // parent route renders Navbar + Outlet + Footer
    children: [
      { index: true, element: <LandingPage /> },
      {path : "/fetch-vedio", element : <GettingVedioPage/> }, 
      {path : "/progress", element :<ProgressPage/>}
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App