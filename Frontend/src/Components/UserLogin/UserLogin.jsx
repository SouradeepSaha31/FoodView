import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import baseUrl from "../../BaseUrl/BaseUrl.js"
import styles from "./UserLogin.module.css"
// import { ToastContainer, toast } from 'react-toastify';

export default function UserLogin(){
    // const notify = () => toast('Wow so easy !');

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
            const response = await baseUrl.post('/api/user/login', data, {withCredentials: true});
            console.log(response.data.user)
            navigate("/dashboard");
        } catch (error) {
            console.log("error in handle submit in user login")
            alert(error.response.data.message)
        }
    }

	return (
        <div className={styles.wraper}>
             {/* <ToastContainer 
                position="top-center"
                autoClose={1000}
             /> */}
            <div className={styles.card}>

                <h2 className={styles.text}>Login as a User</h2>
                {/* <button onClick={notify}>Notify !</button>/ */}

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

                <h4>Nwe Here ? <Link to="/user-register">Register</Link></h4>

            </div>
            
        </div>
	)
}

