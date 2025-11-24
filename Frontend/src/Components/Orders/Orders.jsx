import React, {useState, useEffect} from 'react'
import styles from "./Orders.module.css"
import { RxCross2 } from "react-icons/rx";
import baseUrl from '../../BaseUrl/BaseUrl';


function Orders() {
    let [orders, setOrders] = useState([])
    let [singleOrder, setSingleOrder] = useState([])
    let [toggle, setToggle] = useState(true)
    let [stopClickingOnOrders, setStopClickingOnOrders] = useState(false)

    const fetchOrders = async () => {
          try {
              console.log("hi")
              const response = await baseUrl.get("/api/food/getorders", {withCredentials: true});
              console.log("hello")
              console.log(response.data);
              setOrders(response.data.orders);
          } catch (error) {
              console.log(error.response.data.message);
              console.log(error);
              alert(error.response.data.message);
          }
      };

  useEffect(() => {
      fetchOrders();
  }, []);

  const orderPopup = async (orderId) => {
    try {
      setStopClickingOnOrders(true)
      console.log(orderId)
      const response = await baseUrl.post(`/api/food/orderpopup/${orderId}`, {withCredentials: true});
      console.log(response.data)
      setSingleOrder(response.data.order.orderItems)
      setToggle(false)
      setStopClickingOnOrders(false)
      
    } catch (error) {
      console.log(error)
      alert(error.response.data.message)
    }
  }

  const userSubtotal = singleOrder.reduce((acc, curr) => acc + (curr.id.price * curr.quantity), 0)
  const delivaryChagre = 40
  const totalPrice = userSubtotal + delivaryChagre
  

  const items = Array.from("4444444")
  let img = [
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=465&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=410&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ]


  return (
    <>
        <div className={styles.orders}>
          {/* popup container */}
          <div className={styles.popup} style={{display : toggle ? "none" : "block"}} >
            <div className={styles.content}>
              <div className={styles.close} onClick={() => setToggle(true)}>
                <RxCross2 />
              </div>
              <h1>Total {singleOrder.length} items</h1>
              <div className={styles.ordereditems}>
                {
                  singleOrder.map((item, index) => (
                    <>
                      <div key={index} className={styles.itemcard}>
                        <div className={styles.itemcardimage}>
                          <img src={item.id.image} alt="" />
                        </div>
                        <div className={styles.itemcarddetails}>
                          <h3>{item.id.title}</h3>
                          <p>Quantity: {item.quantity}</p>
                          <p>Price: ₹ {item.id.price}</p>
                        </div>
                      </div>
                    </>
                  ))
                }
              </div>
              <div className={styles.billbox}>
                    <h2>Total Bill</h2>
                    <div className={styles.summaryRow}><span>Items total</span><span>₹ {userSubtotal}</span></div>
                    <div className={styles.summaryRow}><span>Delivery</span><span>₹ {delivaryChagre}</span></div>
                    <div className={styles.summaryRow}><strong>Total</strong><strong>₹ {totalPrice}</strong></div>
                    <button className={styles.checkoutBtn}>Paid</button>
              </div>
            </div>
          </div>

          {/* container */}

          <div className={styles.container}>
            {
              orders.length === 0 ? (
                <h2 className={styles.noorder}>No orders placed yet.</h2>
              ) : (
                orders.map((item, index) => (
                  <>
                  <div key={index} className={styles.orderCard} onClick={() => stopClickingOnOrders ? "" : orderPopup(item._id)}>
                    <h2 className={styles.date}>{item.dateAndTime.finalDate}</h2>
                    <h2 className={styles.time}>{item.dateAndTime.finalTime}</h2>
                    <h3 className={styles.total}>Total {item.orderItems.length} orders</h3>
                    <div className={styles.imgdiv}>
                      {
                        item.orderItems.map((orderItem, index) => (
                          <div key={index} className={styles.img}>
                            <img src={orderItem.id.image} alt="" />
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