import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./Home.module.css"

function Home() {

  return (
    <>
      <main>
        <div className={styles.mid}>
          <div className={styles.mid__content}>
            <h1 className={styles.mid__title}>Welcome to FoodView</h1>
            <p className={styles.mid__subtitle}>Discover delicious local dishes, order from partners, and manage your favorite meals — all in one place.</p>

            <div className={styles.mid__actions}>
              <Link to="/user-register" className={`${styles.btn} ${styles['btn--primary']}`}>Register</Link>
              <Link to="/user-login" className={`${styles.btn} ${styles['btn--ghost']}`}>Log In</Link>
              <Link to="/dashboard" className={`${styles.btn} ${styles['btn--ghost']}`}>Discover Foods</Link>
            </div>
          </div>

          <aside className={styles.mid__aside}>
            <div className={styles.mid__media}>
              <img src="https://media.istockphoto.com/id/637790866/photo/100-lamb-greek-burger.jpg?s=612x612&w=0&k=20&c=cYxRAfU7OdjJCK4M7dbH4YUIk7SGqETlDvONBEOATuw=" alt="Delicious food" />
            </div>
          </aside>
        </div>
      </main>
    </>
    
  )
}

export default Home