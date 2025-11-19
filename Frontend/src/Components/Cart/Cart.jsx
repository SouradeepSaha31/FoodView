import React, {useState} from 'react'
import styles from "./Cart.module.css"
import { FaPlus, FaMinus } from "react-icons/fa6";


function Cart() {
  const items = [
    { id: 1, title: 'Chicken Biriyani', price: 300, img: 'https://placehold.co/300x300?text=Biriyani' },
    { id: 2, title: 'Veg Thali', price: 180, img: 'https://placehold.co/300x300?text=Thali' },
    { id: 2, title: 'Veg Thali', price: 180, img: 'https://placehold.co/300x300?text=Thali' },
    { id: 2, title: 'Veg Thali', price: 180, img: 'https://placehold.co/300x300?text=Thali' },
    { id: 2, title: 'Veg Thali', price: 180, img: 'https://placehold.co/300x300?text=Thali' },
    { id: 2, title: 'Veg Thali', price: 180, img: 'https://placehold.co/300x300?text=Thali' },
    { id: 2, title: 'Veg Thali', price: 180, img: 'https://placehold.co/300x300?text=Thali' },
  ]
      const [count, setCount] = useState(0)
  

  const subtotal = items.reduce((s, it) => s + it.price, 0)

  return (
    <div className={styles.cart}>
      <div className={styles.cart__inner}>
        {
        items.length === 0 ? (
          <div className={styles.emptyCart} role="alert">
            Your cart is empty.
          </div>
        ) : (
          <>

        <section className={styles.cart_left} aria-label="Cart items">
          {items.map(item => (
            <article key={item.id} className={styles.cartItem}>
              <div className={styles.cartItem__img}>
                <img src={item.img} alt="" />
              </div>
              <div className={styles.cartItem__meta}>
                <div>
                  <div className={styles.cartItem__title}>{item.title}</div>
                  <div className={styles.cartItem__price}>₹ {item.price}</div>
                </div>
                <div className={styles.cartbox}>
                  <div className={styles.minus} onClick={() => setCount((prev) => (prev == 0 ? 0 : prev-1))}><FaMinus /></div>
                  <div className={styles.count}>{count}</div>
                  <div className={styles.plus} onClick={() => setCount((prev) => prev+1)}><FaPlus /></div>
                </div>
              </div>
            </article>
          ))}
        </section>

        <aside className={styles.cart_right} aria-label="Order summary">
          <h3>Order Summary</h3>
          <div className={styles.summaryRow}><span>Items total</span><span>₹ 200</span></div>
          <div className={styles.summaryRow}><span>Items total</span><span>₹ 200</span></div>
          <div className={styles.summaryRow}><span>Items total</span><span>₹ 200</span></div>
          <div className={styles.summaryRow}><span>Items total</span><span>₹ 200</span></div>
          <div className={styles.summaryRow}><span>Delivery</span><span>₹ 40</span></div>
          <div className={styles.summaryRow}><strong>Total</strong><strong>₹ {200 + 40}</strong></div>
          <button className={styles.checkoutBtn}>Checkout</button>
        </aside>
          </>
        )
        }
      </div>
    </div>
  )
}

export default Cart