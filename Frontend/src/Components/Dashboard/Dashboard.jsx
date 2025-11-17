import React, { useEffect, useState, useRef, useCallback } from 'react'
import {useNavigate} from 'react-router-dom'
import styles from "./Dashboard.module.css"
import baseUrl from "../../BaseUrl/BaseUrl.js"

function Dashboard() {
    const navigate = useNavigate();

    let [foods, setFoods] = useState([]);

    useEffect(() => {
        const fetchfoods = async () => {
            try {
                const response = await baseUrl.get("/api/food/getfood", {withCredentials: true});
                setFoods(response.data.foods);
                console.log(foods)
            } catch (error) {
                console.log(error.response.data.message);
                console.log(error);
                alert(error.response.data.message);
            }
        };
        fetchfoods();
    }, []);


    const handleLogout = async (e) => {
        try {
            const response = await baseUrl.get("/api/user/logout", { withCredentials: true });
            alert(response.data.message);
            navigate("/user-login");
        } catch (error) {
            console.log(error);
            alert("Error logging out");
        }
    }
        return (
            <>
            <h1 onClick={handleLogout}>Logout</h1>
            
            </>
        );
}


export default Dashboard