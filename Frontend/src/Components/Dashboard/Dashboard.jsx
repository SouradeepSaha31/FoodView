import React, { useEffect, useState, useRef, useCallback } from 'react'
import {useNavigate} from 'react-router-dom'
import styles from "./Dashboard.module.css"
import baseUrl from "../../BaseUrl/BaseUrl.js"
import { FaPlus, FaMinus } from "react-icons/fa6";



function Dashboard() {
    const navigate = useNavigate();
    let [foods, setFoods] = useState([]);

    // useEffect(() => {
    //     const fetchfoods = async () => {
    //         try {
    //             const response = await baseUrl.get("/api/food/getfood", {withCredentials: true});
    //             setFoods(response.data.foods);
    //             console.log(foods)
    //         } catch (error) {
    //             console.log(error.response.data.message);
    //             console.log(error);
    //             alert(error.response.data.message);
    //         }
    //     };
    //     fetchfoods();
    // }, []);


    // const handleLogout = async (e) => {
    //     try {
    //         const response = await baseUrl.get("/api/user/logout", { withCredentials: true });
    //         alert(response.data.message);
    //         navigate("/user-login");
    //     } catch (error) {
    //         console.log(error);
    //         alert("Error logging out");
    //     }
    // }


    const items = Array.from("11111222222111");
    const [count, setCount] = useState(0)

        return (
            <>
                <div className={styles.dashboard}>
                    <div className={styles.container}>
                        {items.map((food, index) => (
                            <div key={index} className={styles.food_card}>
                                <div className={styles.imageDiv}>
                                    <img src="https://images.unsplash.com/photo-1551024601-bec78aea704b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVsaWNpb3VzJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D" alt="" />
                                </div>
                                <div className={styles.infoDiv}>
                                    <div className={styles.infoleft}>
                                        <h3 className={styles.name}>Biriyani</h3>
                                        <h3 className={styles.price}>300</h3>
                                    </div>
                                    <div className={styles.inforight}>
                                        <div className={styles.cartbox}>
                                            <div className={styles.minus} onClick={() => setCount((prev) => (prev == 0 ? 0 : prev-1))}><FaMinus /></div>
                                            <div className={styles.count}>{count}</div>
                                            <div className={styles.plus} onClick={() => setCount((prev) => prev+1)}><FaPlus /></div>
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