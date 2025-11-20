import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import styles from "./Footer.module.css";
import { IoMdAdd } from "react-icons/io";
import { MdAddShoppingCart } from "react-icons/md";
import { CgProfile } from "react-icons/cg";




function Footer() {
  return (
    <>
          <nav className={styles.footer}>    
              <NavLink to="/partner-profile" className={({isActive}) => `${styles.links} ${isActive ? styles.active : ""}`}>
                <h5 className={styles.text}>Profile</h5> 
                <CgProfile className={styles.icon}/>
              </NavLink>
              <NavLink to="/create-food" className={({isActive}) => `${styles.links} ${isActive ? styles.active : ""}`}>
                <h5 className={styles.text}>Create Food</h5>
                <IoMdAdd className={styles.icon}/>
              </NavLink>
              <NavLink to="/orders" className={({isActive}) => `${styles.links} ${isActive ? styles.active : ""}`}>
                <h5 className={styles.text}>Orders</h5>
                <MdAddShoppingCart className={styles.icon}/>
              </NavLink>
          </nav>
    </>
  )
}

export default Footer