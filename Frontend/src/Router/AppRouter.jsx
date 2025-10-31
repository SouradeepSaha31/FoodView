import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx'
import UserRegister from '../Components/UserRegister/UserRegister.jsx'
import UserLogin from '../Components/UserLogin/UserLogin.jsx'
import PartnerRegister from '../Components/PartnerRegister/PartnerRegister.jsx'
import PartnerLogin from '../Components/PartnerLogin/PartnerLogin.jsx'
import FoodReels from '../Components/FoodReels/FoodReels.jsx'
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
        <Route path="/user-register" element={<UserRegister/>} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/partner-register" element={<PartnerRegister />} />
        <Route path="/partner-login" element={<PartnerLogin />} />
        <Route path="/food-reels" element={<ProtectedRoute Component={FoodReels} />} />
        <Route path="/partner-profile" element={<ProtectedRoute Component={PartnerProfile} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter