import React, {use, useState} from 'react'
import styles from "./UserRegister.module.css"
import baseUrl from "../../BaseUrl/BaseUrl.js"
import {Link} from "react-router-dom"

export default function UserRegister() {
    let [passwordConditaion, setPasswordCondition] = useState({
        minChar : false,
        upperCase : false,
        lowerCase : false,
        specialChar : false
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!e.target.fullname.value) {
            alert("Fullname is required.");
            return;
        }
        if (!e.target.email.value) {
            alert("Email is required.");
            return;
        }
        if (!rules.minChar || !rules.upperCase || !rules.lowerCase || !rules.specialChar) {
            alert("Password does not meet all the requirements.");
            return;
        }
        const data = {
            fullname: e.target.fullname.value,
            email: e.target.email.value,
            password: e.target.password.value
        }
        try {
            const response = await baseUrl.post('/api/user/register', data, {withCredentials: true});
            console.log(response.data)
        } catch (error) {
            console.log("error in handle submit in user register")
            alert(error.response.data.message)
        }
    }

    const ruleChanger = (e) => {
        const password = e.target.value;
        setPasswordCondition({
            minChar : password.length >= 8,
            upperCase : /[A-Z]/.test(password),
            lowerCase : /[a-z]/.test(password),
            specialChar : /[!@#$%^&*(),.?":{}|<>]/.test(password)
        })
    }

	return (
        <div className={styles.wraper}>
            <div className={styles.card}>

                <h2 className={styles.text}>Register as a User</h2>

                <form action="" method="post" onSubmit={handleSubmit}>

                    <div className={styles.row}>
                        <label htmlFor="fullname" className={styles.label}>Name</label>
                        <input id="fullname" name="fullname" type="text" className={styles.input} />
                    </div>

                    <div className={styles.row}>
                        <label htmlFor="email" className={styles.label}>Email</label>      
                        <input id="email" name="email" type="email" className={styles.input} />
                    </div>

                    <div className={styles.row}>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <input id="password" name="password" type="password" className={styles.input} onChange={ruleChanger}/>
                    </div>

                    <div className={styles.passwordprotection}>
                      <label className={styles.passwordlabel}>Password must contain:</label>
                        <div className={styles.rules}>
                          <label className={styles.rule}>
                            <input type="checkbox" checked={passwordConditaion.minChar} />
                            Minimum 8 characters
                          </label>
                          <label className={styles.rule}>
                            <input type="checkbox" checked={passwordConditaion.upperCase} />
                            At least 1 uppercase letter
                          </label>
                          <label className={styles.rule}>
                            <input type="checkbox" checked={passwordConditaion.lowerCase} />
                            At least 1 lowercase letter
                          </label>
                          <label className={styles.rule}>
                            <input type="checkbox" checked={passwordConditaion.specialChar} />
                            At least 1 special character
                          </label>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <button type="submit" className={styles.btn}>Register</button>
                    </div>

                </form>

                <h4>already have an account ? <Link to="/user-login">log in</Link></h4>

            </div>
            
        </div>
	)
}

