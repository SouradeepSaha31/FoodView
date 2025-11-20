import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Home.module.css'

function Home() {
  return (
    <main className={styles.partnerHome}>
      <section className={styles.card}>
        <div className={styles.brand}>
          <h1 className={styles.title}>FoodView Partner</h1>
          <p className={styles.subtitle}>Manage your menu, orders and profile — quick and easy.</p>
        </div>

        <div className={styles.actions}>
          <Link to="/partner-login" className={`${styles.btn} ${styles['btn--primary']}`}>Log in</Link>
          <Link to="/partner-register" className={`${styles.btn} ${styles['btn--outline']}`}>Register</Link>
        </div>
      </section>
    </main>
  )
}

export default Home