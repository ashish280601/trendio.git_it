import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Routers from "../../Routers/Routers"
// import AdminNav from "../../admin/AdminNav"
// import { useLocation } from 'react-router-dom'


const Layout = () => {

  // const location = useLocation();
  return (
   <>
   <Header/>
   {/* {
    location.pathname.startsWith('/dashboard')? <AdminNav/>:<Header/>
   } */}

   <div>
    <Routers/>
   </div>

   <Footer/>
   </>
  )
}

export default Layout
