import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import styles from '../Footer/Footer.module.css'
import { MdDashboard } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineBorderColor } from "react-icons/md";



function Footer() {
  return (
    <>
        {/* <main className={styles.main}> */}
          <nav className={styles.footer}>    
              <NavLink to="/dashboard" className={({isActive}) => `${styles.links} ${isActive ? styles.active : ""}`}>
                <h5 className={styles.text}>Dashboard</h5> 
                <MdDashboard className={styles.icon}/>
              </NavLink>
              <NavLink to="/cart" className={({isActive}) => `${styles.links} ${isActive ? styles.active : ""}`}>
                <h5 className={styles.text}>Cart</h5>
                <FaShoppingCart className={styles.icon}/>
              </NavLink>
              <NavLink to="/orders" className={({isActive}) => `${styles.links} ${isActive ? styles.active : ""}`}>
                <h5 className={styles.text}>Orders</h5>
                <MdOutlineBorderColor className={styles.icon}/>
              </NavLink>
          </nav>
        {/* </main> */}
    </>
  )
}

export default Footer