import React from 'react'
import AdminHeader from '../Components/Admin/AdminHeader/AdminHeader'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer/footer'

const AdminRoot = () => {
  return (
    <div>
      <AdminHeader />
      <Outlet />
      <Footer />
    </div>
  )
}

export default AdminRoot