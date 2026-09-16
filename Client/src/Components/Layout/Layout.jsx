import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from '../Gsap/ScrollToTop'

function Layout() {
  return (
    <>
    <ScrollToTop/>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-slate-950">
        <Outlet />
      </main> 
      <Footer />
    </>
  )
}

export default Layout