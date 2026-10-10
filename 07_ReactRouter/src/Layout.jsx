import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
    <Header/>
    <Outlet /> 
    <Footer />
    </>
  )
}

export default Layout

// outlet is change the funcnality inside itself ac to page and header | footer remAINS SAMe