import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../BaseUrl/BaseUrl.js";
import styles from "./PartnerProfile.module.css";

function PartnerProfile({detailes}) {
  console.log(detailes)
  const navigate = useNavigate();
  let [playvideo, setPlayvideo] = useState();

  let [foods, setFoods] = useState([]);

  const handleLogout = async (e) => {
    try {
      await baseUrl.get("/api/foodpartner/logout", { withCredentials: true });
      navigate("/partner-login");
    } catch (error) {
      console.log(error);
      alert("Error logging out");
    }
  };

  useEffect(() => {
        const fetchfoods = async () => {
            try {
                const response = await baseUrl.get(`/api/food/getfood/${detailes._id}`,{withCredentials : true} );
                setFoods(response.data.foods);
                console.log(response.data.foods)
            } catch (error) {
                console.log(error.response.data.message);
                console.log(error);
                alert(error.response.data.message);
            }
        };
        fetchfoods();
    }, []);

  return (
    <div className={styles.container}>
      <h2 onClick={handleLogout}>Log Out</h2>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <img src="/foodie-connect-logo.png" alt="Foodie Connect" />
          </div>
          <ul className={styles.navLinks}>
            <li>
              <a href="#" className={styles.active}>Home</a></li>
            <li>
              <a href="#">Partners</a></li>
            <li>
              <a href="#">Preview</a></li>
            <li>
              <a href="#">Profile</a></li>
          </ul>
          <div className={styles.menuIcon}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>
      </header>

      <div className={styles.heroSection}>
        <div className={styles.profileInfo}>
          <div className={styles.profileImage}>
            <img src="https://placehold.co/150x150" alt="Profile" />
          </div>
          <div className={styles.businessInfo}>
            <h1>BUSINESS NAME: {detailes.businessname}</h1>
            <p>CONTACT PERSON: {detailes.contactname}</p>
            <p>LISTED FOODS: 27</p>
            <button className={styles.editButton}>EDIT PROFILE</button>
          </div>
        </div>
        <div className={styles.banner}>
          <img src="https://placehold.co/1200x300" alt="Food Banner" />
        </div>
      </div>

      <main className={styles.mainContent}>
        <h2>ALL FOOD VIDEOS (27)</h2>
        <div className={styles.videoGrid}>
          {foods.map((food, index) => (
              <div key={index} className={styles.videoCard} onMouseEnter = {() => (setPlayvideo(true), console.log("first"))} onMouseLeave={() => setPlayvideo(false)}>
                  <video
                    src = {food.video}
                    loop
                    autoPlay = {playvideo}
                    muted
                    playsInline
                    className={styles.reelVideo}
                  />
                  <div className={styles.videoInfo}>
                    <p className={styles.duration}>01:30</p>
                  </div>
              </div>
            ))}
        </div>
        {/* <button className={styles.loadMore}>LOAD MORE</button> */}
      </main>
    </div>
  );
}

export default PartnerProfile;
