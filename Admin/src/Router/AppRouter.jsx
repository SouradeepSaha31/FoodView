import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx'
import PartnerRegister from '../Components/PartnerRegister/PartnerRegister.jsx'
import PartnerLogin from '../Components/PartnerLogin/PartnerLogin.jsx'
import PartnerProfile from '../Components/PartnerProfile/PartnerProfile.jsx'
import Home from '../Components/Home/Home.jsx'


function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/normal" element={
          <>
            <h1>hello</h1>
          </>
        } />
        <Route path="/partner-register" element={<PartnerRegister />} />
        <Route path="/partner-login" element={<PartnerLogin />} />
        <Route path="/partner-profile" element={<ProtectedRoute Component={PartnerProfile} PageName = "partnerprofile" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter