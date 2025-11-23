import React, { useEffect, useState, useRef, useCallback } from 'react'
import {useNavigate} from 'react-router-dom'
import styles from "./Dashboard.module.css"
import baseUrl from "../../BaseUrl/BaseUrl.js"
import { FaPlus, FaMinus } from "react-icons/fa6";



function Dashboard({detailes}) {
    // console.log(detailes)
    // console.log(detailes.cart.foodItems)
    // const navigate = useNavigate();
    let [foods, setFoods] = useState([]);
    let [cart, setCart] = useState([]);
    let [stopClickingOnAddLessButtons, setStopClickingOnAddLessButtons] = useState(false);

    useEffect(() => {
        const fetchfoods = async () => {
            try {
                const response = await baseUrl.get("/api/food/getfood", {withCredentials: true});
                setFoods(response.data.allFoods);
                setCart(response.data.cart)
                console.log(response.data)
            } catch (error) {
                console.log(error.response.data.message);
                console.log(error);
                alert(error.response.data.message);
            }
        };
        fetchfoods();
    }, []);

    const addTocart = async (foodid) => {
        try {
            setStopClickingOnAddLessButtons(true)
            console.log("call", foodid)
            const response = await baseUrl.post(`/api/food/addtocart/${foodid}`)
            console.log(response.data.message)
            console.log(response.data.cartItems)
            setCart(response.data.cartItems)
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
            setCart(response.data.cartItems)
            setStopClickingOnAddLessButtons(false)
        } catch (error) {
            console.log(error)
            alert(error.response.data.message)
            setStopClickingOnAddLessButtons(false)
        }
    }


    const items = Array.from("11111222222111");
    const [count, setCount] = useState(0)

        return (
            <>
                <div className={styles.dashboard}>
                    <div className={styles.container}>
                        {foods.map((food, index) => (
                            <div key={index} className={styles.food_card}>
                                <div className={styles.imageDiv}>
                                    <img src={`${food.image}`} alt="" />
                                </div>
                                <div className={styles.infoDiv}>
                                    <div className={styles.infoleft}>
                                        <h3 className={styles.name}>{food.title}</h3>
                                        <h3 className={styles.price}>{food.price}</h3>
                                    </div>
                                    <div className={styles.inforight}>
                                        <div className={styles.cartbox}>
                                            <div className={styles.minus} onClick={() => stopClickingOnAddLessButtons ? "" : lessTocart(food._id)}><FaMinus /></div>
                                            <div className={styles.count}>
                                                {cart.find((f) => f.id === food._id)?.quantity || 0}
                                            </div>
                                            <div className={styles.plus} onClick={() => stopClickingOnAddLessButtons ? "" : addTocart(food._id)}><FaPlus /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))} 
                    </div>
                </div>            
            </>
        );
}


export default Dashboard