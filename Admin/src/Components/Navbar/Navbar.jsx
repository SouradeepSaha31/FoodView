import React, {useState} from 'react'
import { Link, NavLink } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <>
      <nav className={styles.header}>
        <h1>Fooedview</h1>

        <div className={styles.links}>
          <NavLink to="/partner-profile" className={({isActive}) => `${styles.navlink} ${isActive ? styles.active : ""}`}>Profile</NavLink>
          <NavLink to="/create-food" className={({isActive}) => `${styles.navlink} ${isActive ? styles.active : ""}`}>Create Food</NavLink>
          <NavLink to="/orders" className={({isActive}) => `${styles.navlink} ${isActive ? styles.active : ""}`}>Orders</NavLink>
          <CgProfile className={styles.arrow}/>
        </div>


      </nav>
    </>
  )
}

export default Navbar