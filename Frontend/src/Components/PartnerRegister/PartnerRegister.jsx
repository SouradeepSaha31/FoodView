import React, {useState} from "react";
import { Link } from "react-router-dom";
import baseUrl from "../../BaseUrl/BaseUrl.js";
import styles from "./PartnerRegister.module.css";

export default function PartnerRegister() {
	  let [passwordConditaion, setPasswordCondition] = useState({
		minChar: false,	
		upperCase: false,
		lowerCase: false,
		specialChar: false		
	  })

	  const handleSubmit = async (e) => {
        e.preventDefault();
        if (!e.target.businessname.value) {
            alert("Business name is required.");
            return;
        }
        if (!e.target.contactname.value) {
            alert("Contact name is required.");
            return;
        }
        if (!e.target.phoneno.value) {
            alert("Phone number is required.");
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
		    if (!e.target.address.value) {
		    	alert("Address is required.");
		    	return;
		    }
        const data = {
            businessname: e.target.businessname.value,
			      contactname: e.target.contactname.value,
			      phoneno: e.target.phoneno.value,
            email: e.target.email.value,
            password: e.target.password.value,
			      address: e.target.address.value
        }
		    console.log(data)
        try {
            const response = await baseUrl.post('/api/foodpartner/register', data, {withCredentials: true});
            console.log(response)
        } catch (error) {
            console.log("error in handle submit in food partner register")
			      console.log(error)
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
        <h2 className={styles.text}>Register as a Food Partner</h2>

        <form action="" method="post" onSubmit={handleSubmit}>
          <div className={styles.row}>
            <label htmlFor="businessName" className={styles.label}> Business Name</label>
            <input id="businessName" name="businessname" type="text" className={styles.input}/>
          </div>

          {/* ✅ Contact Name & Phone Number Side by Side */}
          <div className={styles.rowgroup}>
            <div className={`${styles.row} ${styles.half}`}>
              <label htmlFor="contactName" className={styles.label}> Contact Name</label>
              <input id="contactName" name="contactname" type="text" className={styles.input}/>
            </div>

            <div className={`${styles.row} ${styles.half}`}>
              <label htmlFor="phone" className={styles.label}>Phone Number</label>
              <input id="phone" name="phoneno" type="tel" className={styles.input} />
            </div>
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
                <input type="checkbox" checked={passwordConditaion.minChar} readOnly />
                Minimum 8 characters
              </label>
              <label className={styles.rule}>
                <input type="checkbox" checked={passwordConditaion.upperCase} readOnly />
                At least 1 uppercase letter
              </label>
              <label className={styles.rule}>
                <input type="checkbox" checked={passwordConditaion.lowerCase} readOnly />
                At least 1 lowercase letter
              </label>
              <label className={styles.rule}>
                <input type="checkbox" checked={passwordConditaion.specialChar} readOnly />
                At least 1 special character
              </label>
            </div>
          </div>

          <div className={styles.row}>
            <label htmlFor="address" className={styles.label}>Address</label>
            <input id="address" name="address" type="text" className={styles.input} />
          </div>


          <div className={styles.actions}>
            <button type="submit" className={styles.btn}>
              Register
            </button>
          </div>
        </form>

        <h4>
          Already have an account? <Link to="/food-partner-login">Log in</Link>
        </h4>
      </div>
    </div>
  );
}
