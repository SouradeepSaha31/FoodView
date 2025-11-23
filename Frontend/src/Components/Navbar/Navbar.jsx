import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import styles from '../Navbar/Navbar.module.css'
import { CgProfile } from "react-icons/cg";
import baseUrl from '../../BaseUrl/BaseUrl';


function Navbar() {
  const navigate = useNavigate()
    const [open, setOpen] = useState(false)

    const logout = () => {
      try {

        const response = baseUrl.get("/api/user/logout", {withCredentials : true})
        navigate("/user-login")
        
      } catch (error) {
        console.log(error)
        alert(error.data.response.message)
      }
    }

  return (
    <>
      <nav className={styles.header}>
        <h1>Fooedview</h1>

        <div className={styles.links}>
          <NavLink to="/dashboard" className={({isActive}) => `${styles.navlink} ${isActive ? styles.active : ""}`}>Dashboard</NavLink>
          <NavLink to="/cart" className={({isActive}) => `${styles.navlink} ${isActive ? styles.active : ""}`}>Cart</NavLink>
          <NavLink to="/orders" className={({isActive}) => `${styles.navlink} ${isActive ? styles.active : ""}`}>Orders</NavLink>
          <button onClick={logout}>Log Out</button>
          <CgProfile className={styles.arrow}/>
        </div>


      </nav>
    </>
  )
}

export default Navbar