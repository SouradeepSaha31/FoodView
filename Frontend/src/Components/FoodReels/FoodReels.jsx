import React, { useEffect, useState, useRef, useCallback } from 'react'
import {useNavigate} from 'react-router-dom'
import styles from "./FoodReels.module.css"
import baseUrl from "../../BaseUrl/BaseUrl.js"

function FoodReels() {
    const navigate = useNavigate();

    let [foods, setFoods] = useState([]);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const reelsContainerRef = useRef(null);

    useEffect(() => {
        const fetchfoods = async () => {
            try {
                const response = await baseUrl.get("/api/food/getfood", {withCredentials: true});
                setFoods(response.data.foods);
            } catch (error) {
                console.log(error.response.data.message);
                console.log(error);
                alert(error.response.data.message);
            }
        };
        fetchfoods();
    }, []);

    const handleScroll = useCallback((e) => {
        e.preventDefault();
        if (e.deltaY > 0 && currentVideoIndex < foods.length - 1) {
            // Scrolling down
            setCurrentVideoIndex(prev => prev + 1);
        } else if (e.deltaY < 0 && currentVideoIndex > 0) {
            // Scrolling up
            setCurrentVideoIndex(prev => prev - 1);
        }
    }, [currentVideoIndex, foods.length]);

    useEffect(() => {
        const container = reelsContainerRef.current;
        if (container) {
            container.addEventListener('wheel', handleScroll, { passive: false });
            return () => container.removeEventListener('wheel', handleScroll);
        }
    }, [handleScroll]);


    const handleLogout = async (e) => {
        try {
            await baseUrl.get("/api/user/logout", { withCredentials: true });
            navigate("/user-login");
        } catch (error) {
            console.log(error);
            alert("Error logging out");
        }
    }
        return (
            <>
            <h1 onClick={handleLogout}>Logout</h1>
            <div className={styles.main}>
                <div className={styles.top}></div>
                <div className={styles.bottom}>
                    <div className={styles.left}></div>
                    <div className={styles.reelsWrapper}>
                        <div ref={reelsContainerRef} className={styles.reelsContainer}>
                            {foods.map((food, index) => (
                                <div 
                                    key={index}
                                    className={`${styles.videoContainer} ${index === currentVideoIndex ? styles.active : ''}`}
                                    style={{
                                        transform: `translateY(${(index - currentVideoIndex) * 100}%)`
                                    }}
                                >
                                    <video
                                        src={food.video}
                                        loop
                                        autoPlay
                                        muted
                                        playsInline
                                        className={styles.reelVideo}
                                    >
                                        Your browser does not support the video tag.
                                    </video>
                                    <button>visit</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            </>
        );
}


export default FoodReels