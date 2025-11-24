import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import styles from "./Cart.module.css"
import baseUrl from "../../BaseUrl/BaseUrl.js"
import { FaPlus, FaMinus } from "react-icons/fa6";
import Loader from "../Loader/Loader.jsx"


function Cart() {
  const navigate = useNavigate()
  let [cartItems, setCartItems] = useState([])
  let [stopClickingOnAddLessButtons, setStopClickingOnAddLessButtons] = useState(false);
  let [loaderToggle, setLoaderToggle] = useState(true)

  
  const fetchCartItems = async () => {
          try {
              setLoaderToggle(true)
              console.log("hi")
              const response = await baseUrl.get("/api/food/getcartitems", {withCredentials: true});
              console.log("hello")
              console.log(response.data.cartItems);
              setCartItems(response.data.cartItems);
              setLoaderToggle(false)
          } catch (error) {
              console.log(error.response.data.message);
              console.log(error);
              alert(error.response.data.message);
          }
      };

  useEffect(() => {
      fetchCartItems();
  }, []);

  
  const addTocart = async (foodid) => {
    try {
      setStopClickingOnAddLessButtons(true)
      console.log("call", foodid)
      const response = await baseUrl.post(`/api/food/addtocart/${foodid}`)
      console.log(response.data.message)
      console.log(response.data.cartItems)
      fetchCartItems();
      setStopClickingOnAddLessButtons(false)
    } catch (error) {
      console.log(error)
      alert(error.response.data.message)
      setStopClickingOnAddLessButtons(false)
    }
  }
  const lessTocart = async (foodid) => {
    try {
      setStopClickingOnAddLessButtons(true)
      console.log("call", foodid)
      const response = await baseUrl.post(`/api/food/lesstocart/${foodid}`)
      console.log(response.data.message)
      console.log(response.data.cartItems)
      fetchCartItems();
      setStopClickingOnAddLessButtons(false)
    } catch (error) {
            console.log(error)
            alert(error.response.data.message)
            setStopClickingOnAddLessButtons(false)
      }
  }

  const userSubtotal = cartItems.reduce((acc, curr) => acc + (curr.id.price * curr.quantity), 0)
  const delivaryChagre = 40
  const totalPrice = userSubtotal + delivaryChagre

  const placedOrder = async (userSubtotal, delivaryChagre) => {

      try {
        setLoaderToggle(true)
        const response = await baseUrl.post("/api/food/placeorder", {userSubtotal, delivaryChagre})
        setLoaderToggle(false)
        navigate("/orders")
        
      } catch (error) {
        console.log(error)
        alert(error.response.data.message)
      }
    }
    



  


  return (
    <div className={styles.cart}>
      {/* Loader */}
      <Loader show = {loaderToggle}/>
      <div className={styles.cart__inner}>
        {
        cartItems.length === 0 ? (
          <div className={styles.emptyCart} style={{display : !loaderToggle ? "block" : "none"}}   role="alert">
            Your cart is empty.
          </div>
        ) : (
          <>

        <section className={styles.cart_left} aria-label="Cart items">
          {cartItems.map((item, index) => (
            <article key={index} className={styles.cartItem}>
              <div className={styles.cartItem__img}>
                <img src={item.id.image} alt="" />
              </div>
              <div className={styles.cartItem__meta}>
                <div>
                  <div className={styles.cartItem__title}>{item.id.title}</div>
                  <div className={styles.cartItem__price}>₹ {item.id.price}</div>
                </div>
                <div className={styles.cartbox}>
                  <div className={styles.minus} onClick={() => stopClickingOnAddLessButtons ? "" : lessTocart(item.id._id)}><FaMinus /></div>
                  <div className={styles.count}>{item.quantity}</div>
                  <div className={styles.plus} onClick={() => stopClickingOnAddLessButtons ? "" : addTocart(item.id._id)}><FaPlus /></div>
                </div>
              </div>
            </article>
          ))}
        </section>

        <aside className={styles.cart_right} aria-label="Order summary">
          <h3>Order Summary</h3>
          <div className={styles.summaryRow}><span>Items total</span><span>{userSubtotal}</span></div>
          <div className={styles.summaryRow}><span>Delivery</span><span>₹ {delivaryChagre}</span></div>
          <div className={styles.summaryRow}><strong>Total</strong><strong>₹ {totalPrice}</strong></div>
          <button className={styles.checkoutBtn} onClick={() => placedOrder(userSubtotal, delivaryChagre)}>Checkout</button>
        </aside>
          </>
        )
        }
      </div>
    </div>
  )
}

export default Cart