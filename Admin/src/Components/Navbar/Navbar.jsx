import React, {useState} from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import styles from "./Navbar.module.css";
import baseUrl from '../../BaseUrl/BaseUrl';

function Navbar() {
  const navigate = useNavigate()

  const logout = async () => {
    try {

      const response = await baseUrl.get("/api/foodpartner/logout")
      // alert(response.data.message)
      navigate("/partner-login")
      
    } catch (error) {
      console.log(error)
      alert(error.response.data.message)
    }
  }

  return (
    <>
      <nav className={styles.header}>
        <h1>Fooedview</h1>

        <div className={styles.links}>
          <NavLink to="/partner-profile" className={({isActive}) => `${styles.navlink} ${isActive ? styles.active : ""}`}>Profile</NavLink>
          <NavLink to="/create-food" className={({isActive}) => `${styles.navlink} ${isActive ? styles.active : ""}`}>Create Food</NavLink>
          <NavLink to="/orders" className={({isActive}) => `${styles.navlink} ${isActive ? styles.active : ""}`}>Orders</NavLink>
          <button onClick={logout}>Log Out</button>
          <CgProfile className={styles.arrow}/>
        </div>


      </nav>
    </>
  )
}

export default Navbar