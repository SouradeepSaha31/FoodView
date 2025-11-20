import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx'
import PartnerRegister from '../Components/PartnerRegister/PartnerRegister.jsx'
import PartnerLogin from '../Components/PartnerLogin/PartnerLogin.jsx'
import PartnerProfile from '../Components/PartnerProfile/PartnerProfile.jsx'
import CreateFood from '../Components/CreateFood/CreateFood.jsx'
import Orders from '../Components/Orders/Orders.jsx'
import Home from '../Components/Home/Home.jsx'
import Layout from '../Components/Layout/Layout.jsx'


function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/partner-register" element={<PartnerRegister />} />
        <Route path="/partner-login" element={<PartnerLogin />} />
        <Route element={<Layout />}>
          <Route path="/partner-profile" element={<ProtectedRoute Component={PartnerProfile} PageName = "partnerprofile" />} />
          <Route path="/create-food" element={<ProtectedRoute Component={CreateFood} PageName = "createfood" />} />
          <Route path="/orders" element={<ProtectedRoute Component={Orders} PageName = "orders" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter