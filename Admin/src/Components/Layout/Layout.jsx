import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar.jsx'
import Footer from '../Footer/Footer.jsx'

function Layout() {
  return (
    <>
        <Navbar />
        <Outlet />
        <Footer />
    </>
  )
}

export default Layout