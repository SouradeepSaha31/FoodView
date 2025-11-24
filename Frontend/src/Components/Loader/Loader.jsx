import React from 'react'
import styles from "./Loader.module.css"

function Loader({show = false}) {
  return (
    <>
         <div className={styles.loaderContainer} style={{display : show ? "flex" : "none"}}>
            <div className={styles.loader}></div>
        </div>
    </>
  )
}

export default Loader