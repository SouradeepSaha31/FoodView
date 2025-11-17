import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx'
import UserRegister from '../Components/UserRegister/UserRegister.jsx'
import UserLogin from '../Components/UserLogin/UserLogin.jsx'
import FoodReels from '../Components/Dashboard/Dashboard.jsx'
import Home from '../Components/Home/Home.jsx'
import Layout from '../Components/Layout/Layout.jsx'
import Cart from "../Components/Cart/Cart.jsx"
import Orders from "../Components/Orders/Orders.jsx"


function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
          <Route path="/user-register" element={<UserRegister/>} />
          <Route path="/user-login" element={<UserLogin />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<ProtectedRoute Component={FoodReels} PageName = "dashboard" />} />
          <Route path="/cart" element={<ProtectedRoute Component={Cart} PageName = "cart" />} />
          <Route path="/orders" element={<ProtectedRoute Component={Orders} PageName = "orders" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter