import React, {useState} from 'react'
import styles from "./Orders.module.css"
import { RxCross2 } from "react-icons/rx";


function Orders() {

  const items = Array.from("4444444")
  let img = [
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=465&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=410&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ]
  let [toggle, setToggle] = useState(true);

  return (
    <>
        <div className={styles.orders}>
          <div className={styles.popup} style={{display : toggle ? "none" : "block"}} >
            <div className={styles.content}>
              <div className={styles.close} onClick={() => setToggle(true)}>
                <RxCross2 />
              </div>
              <h1>Total 4 items</h1>
              <div className={styles.ordereditems}>
                {
                  items.map((img) => (
                    <>
                      <div className={styles.itemcard}>
                        <div className={styles.itemcardimage}>
                          <img src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=410&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                        </div>
                        <div className={styles.itemcarddetails}>
                          <h3>Chicken Biriyani alur dum</h3>
                          <p>Quantity: 2</p>
                          <p>Price: ₹ 300</p>
                        </div>
                      </div>
                    </>
                  ))
                }
              </div>
              <div className={styles.billbox}>
                    <h2>Total Bill</h2>
                    <div className={styles.summaryRow}><span>Items total</span><span>₹ 200</span></div>
                    <div className={styles.summaryRow}><span>Delivery</span><span>₹ 40</span></div>
                    <div className={styles.summaryRow}><strong>Total</strong><strong>₹ {200 + 40}</strong></div>
                    <button className={styles.checkoutBtn}>Paid</button>
              </div>
            </div>
          </div>
          <div className={styles.container}>
            {
              items.length === 0 ? (
                <h2 className={styles.noorder}>No orders placed yet.</h2>
              ) : (
                items.map((item, index) => (
                  <>
                  <div key={index} className={styles.orderCard} onClick={() => setToggle(false)}>
                    <h2>Order {index+1}</h2>
                    <h3>Total {img.length} orders</h3>
                    <div className={styles.imgdiv}>
                      {
                        img.map((img) => (
                          <div className={styles.img}>
                            <img src={img} alt="" />
                          </div>
                        ))
                      }
                    </div>
                  </div>
                  </>
                ))
              )
            }
          </div>
        </div>
    </>
  )
}

export default Orders