import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import baseUrl from "../../BaseUrl/BaseUrl.js"
import styles from "./PartnerLogin.module.css"

export default function PartnerLogin(){
    const navigate = useNavigate();

	const handleSubmit = async (e) => {
        e.preventDefault();
        if (!e.target.email.value) {
            alert("Email is required.");
            return;
        }
        if (!e.target.password.value) {
            alert("Password is required.");
            return;
        }
        const data = {
            email: e.target.email.value,
            password: e.target.password.value
        }
		console.log(data)
        try {
            const response = await baseUrl.post('/api/foodpartner/login', data, {withCredentials: true});
            console.log(response.data)
            navigate("/partner-profile");
        } catch (error) {
            console.log("error in handle submit in food partner login")
            alert(error.response.data.message)
        }
    }

	return (
        <div className={styles.wraper}>
            <div className={styles.card}>

                <h2 className={styles.text}>Login as a Food Partner</h2>

                <form action="" method="post" onSubmit={handleSubmit}>

                    <div className={styles.row}>
                        <label htmlFor="email" className={styles.label}>Email</label>      
                        <input id="email" name="email" type="email" className={styles.input} />
                    </div>

                    <div className={styles.row}>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <input id="password" name="password" type="password" className={styles.input}/>
                    </div>

                    <div className={styles.actions}>
                        <button type="submit" className={styles.btn}>Login</button>
                    </div>

                </form>

                <h4>New Here ? <Link to="/partner-register">Register</Link></h4>

            </div>
            
        </div>
	)
}

