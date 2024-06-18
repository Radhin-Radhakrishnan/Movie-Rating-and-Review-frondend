import React from 'react'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/footer'
import { Outlet } from 'react-router-dom'

const UserRoot = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default UserRoot