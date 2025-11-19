import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import styles from '../Navbar/Navbar.module.css'
import { CgProfile } from "react-icons/cg";


function Navbar() {
    const [open, setOpen] = useState(false)

  return (
    <>
    {/* <main className={styles.main}> */}
      <nav className={styles.header}>
        <h1>Fooedview</h1>

        <div className={styles.links}>
          <NavLink to="/dashboard" className={({isActive}) => `${styles.navlink} ${isActive ? styles.active : ""}`}>Dashboard</NavLink>
          <NavLink to="/cart" className={({isActive}) => `${styles.navlink} ${isActive ? styles.active : ""}`}>Cart</NavLink>
          <NavLink to="/orders" className={({isActive}) => `${styles.navlink} ${isActive ? styles.active : ""}`}>Orders</NavLink>
          <CgProfile className={styles.arrow}/>
        </div>


      </nav>
    {/* </main> */}
    </>
  )
}

export default Navbar