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
            {/* popup div */}
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
                    <table className={styles.bill_table}>
                      <tr>
                        {/* <th>No.</th> */}
                        <th>Food Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total Price</th>
                      </tr>

                      <tr>
                        {/* <td>1</td> */}
                        <td>Chicken Burger</td>
                        <td>2</td>
                        <td>₹120</td>
                        <td>₹240</td>
                      </tr>

                      <tr>
                        {/* <td>2</td> */}
                        <td>Pizza</td>
                        <td>1</td>
                        <td>₹280</td>
                        <td>₹280</td>
                      </tr>

                      <tr>
                        {/* <td>3</td> */}
                        <td>French Fries</td>
                        <td>3</td>
                        <td>₹80</td>
                        <td>₹240</td>
                      </tr>

                      {/* <!-- Subtotal --> */}
                      {/* <tr>
                        <td colspan="3" className={`${styles.right} ${styles.bold}`}>Subtotal</td>
                        <td class="bold">₹760</td>
                      </tr> */}

                      {/* <!-- Tax --> */}
                      {/* <tr>
                        <td colspan="3" className={`${styles.right} ${styles.bold}`}>GST (5%)</td>
                        <td class="bold">₹38</td>
                      </tr> */}

                      {/* <!-- Grand Total --> */}
                      <tr className={styles.grand}>
                        <td colspan="3" className={`${styles.right} ${styles.bold} ${styles.big}`}>Grand Total</td>
                        <td  className={styles.bold}>₹798</td>
                      </tr>
                    </table>
                    <button className={styles.checkoutBtn}>Paid</button>
              </div>
            </div>
          </div>
            {/* container */}
          <div className={styles.container}>
            {
              items.length === 0 ? (
                <h2 className={styles.noorder}>No orders placed yet.</h2>
              ) : (
                items.map((item, index) => (
                  <>
                  <div key={index} className={styles.orderCard} onClick={() => setToggle(false)}>
                    <h2>Souradeep</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur laudantium voluptates tempora exercitationem asperiores modi laboriosam amet facere repellendus debitis!</p>
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