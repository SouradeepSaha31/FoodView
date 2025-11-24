import React, {useState, useEffect} from 'react'
import styles from "./Orders.module.css"
import baseUrl from '../../BaseUrl/BaseUrl.js';
import { RxCross2 } from "react-icons/rx";
import Loader from "../Loader/Loader.jsx"


function Orders() {
  let [orders, setOrders] = useState([])
  let [singleOrder, setSingleOrder] = useState([])
  let [totalSubPrice, setTotalSubPrice] = useState(0)
  let [toggle, setToggle] = useState(true)
  let [stopClickingOnOrders, setStopClickingOnOrders] = useState(false)
  let [loaderToggle, setLoaderToggle] = useState(true)

      const fetchOrders = async () => {
            try {
                setLoaderToggle(true)
                console.log("hi")
                const response = await baseUrl.get("/api/food/getpartnerorders", {withCredentials: true});
                console.log("hello")
                console.log(response.data);
                setOrders(response.data.orders);
                setLoaderToggle(false)
            } catch (error) {
                console.log(error.response.data.message);
                console.log(error);
                alert(error.response.data.message);
            }
        };
  
    useEffect(() => {
        fetchOrders();
    }, []);


    const subOrderPopup = async (orderId) => {
    try {
      setLoaderToggle(true)
      setStopClickingOnOrders(true)
      console.log(orderId)
      const response = await baseUrl.post(`/api/food/partnerorderpopup/${orderId}`, {withCredentials: true});
      console.log(response.data)
      setSingleOrder(response.data.order.orderItems.reverse())
      setTotalSubPrice(response.data.order.totalPrice)
      setToggle(false)
      setStopClickingOnOrders(false)
      setLoaderToggle(false)
      
    } catch (error) {
      console.log(error)
      alert(error.response.data.message)
    }
  }

  const partnerSubtotal = singleOrder.reduce((acc, curr) => acc + (curr.id.price * curr.quantity), 0)
  const delivaryChagre = totalSubPrice - partnerSubtotal
  const totalPrice = partnerSubtotal + delivaryChagre

  // if (loaderToggle) {
  //   return <Loader show = {true}/>
  // } else {
    return (
      <>
          <div className={styles.orders}>
            <Loader show = {loaderToggle}/>
              {/* popup div */}
            <div className={styles.popup} style={{display : toggle ? "none" : "block"}} >
              <div className={styles.content}>
                <div className={styles.close} onClick={() => setToggle(true)}>
                  <RxCross2 />
                </div>
                <h1>Total {singleOrder.length} items</h1>
                <div className={styles.ordereditems}>
                  {
                    singleOrder.map((item) => (
                      <>
                        <div className={styles.itemcard}>
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
                      <table className={styles.bill_table}>
                        <tr>
                          {/* <th>No.</th> */}
                          <th>Food Item</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>Total Price</th>
                        </tr>
                        {
                          singleOrder.map((item) => (
                            <>
                              <tr>
                                {/* <td>1</td> */}
                                <td>{item.id.title}</td>
                                <td>{item.quantity}</td>
                                <td>₹{item.id.price}</td>
                                <td>₹{item.id.price * item.quantity}</td>
                              </tr>
                            </>
                          ))
                        }



                        {/* <!-- Subtotal --> */}
                        <tr>
                          <td colspan="3" className={`${styles.right} ${styles.bold}`}>Subtotal</td>
                          <td class="bold">₹{partnerSubtotal}</td>
                        </tr>

                        {/* <!-- Tax --> */}
                        <tr>
                          <td colspan="3" className={`${styles.right} ${styles.bold}`}>Delivery Charge</td>
                          <td class="bold">₹{delivaryChagre}</td>
                        </tr>

                        {/* <!-- Grand Total --> */}
                        <tr className={styles.grand}>
                          <td colspan="3" className={`${styles.right} ${styles.bold} ${styles.big}`}>Grand Total</td>
                          <td  className={styles.bold}>₹{totalPrice}</td>
                        </tr>
                      </table>
                      <button className={styles.checkoutBtn}>Paid</button>
                </div>
              </div>
            </div>
              {/* container */}
            <div className={styles.container}>
              {
                orders.length === 0 ? (
                  <h2 className={styles.noorder} style={{display : !loaderToggle ? "block" : "none"}}>No orders placed yet.</h2>
                ) : (
                  orders.map((item, index) => (
                    <>
                    <div key={index} className={styles.orderCard} onClick={() => stopClickingOnOrders ? "" : subOrderPopup(item._id)}>
                      <p  className={styles.address}>{item.userId.address}</p>
                      <h2 className={styles.name}>{item.userId.fullname}</h2>
                      <h2 className={styles.dateandtime}>{item.dateAndTime.finalDate}, {item.dateAndTime.finalTime}</h2>
                      <h3  className={styles.total}>Total {item.orderItems.length} orders</h3>
                      <div className={styles.imgdiv}>
                        {
                          item.orderItems.map((each) => (
                            <div className={styles.img}>
                              <img src={each.id.image} alt="" />
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
// }
}

export default Orders