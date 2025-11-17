import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import styles from '../Navbar/Navbar.module.css'

function Navbar() {
  return (
    <>
        <nav>
            <h1>FoodView</h1>
            <div className={styles.links}>
                <NavLink to="/dashboard" className={({isActive}) => `${isActive ? "text-white" : "text-black"}`}>Dashboard</NavLink>
                <NavLink to="/cart" className={({isActive}) => `${isActive ? "text-white" : "text-black"}`}>Cart</NavLink>
                <NavLink to="/orders" className={({isActive}) => `${isActive ? "text-white" : "text-black"}`}>Orders</NavLink>
            </div>
        </nav>
    </>
  )
}

export default Navbar