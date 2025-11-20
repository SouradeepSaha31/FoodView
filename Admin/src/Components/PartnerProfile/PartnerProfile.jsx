import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../BaseUrl/BaseUrl.js";
import styles from "./PartnerProfile.module.css";
import { IoIosAdd } from "react-icons/io";


function PartnerProfile() {
  const navigate = useNavigate();
  // let [playvideo, setPlayvideo] = useState();

  let [foods, setFoods] = useState([]);

  // const handleLogout = async (e) => {
  //   try {
  //     await baseUrl.get("/api/foodpartner/logout", { withCredentials: true });
  //     navigate("/partner-login");
  //   } catch (error) {
  //     console.log(error);
  //     alert("Error logging out");
  //   }
  // };

  // useEffect(() => {
  //       const fetchfoods = async () => {
  //           try {
  //               const response = await baseUrl.get(`/api/food/getfood/${detailes._id}`,{withCredentials : true} );
  //               setFoods(response.data.foods);
  //               console.log(response.data.foods)
  //           } catch (error) {
  //               console.log(error.response.data.message);
  //               console.log(error);
  //               alert(error.response.data.message);
  //           }
  //       };
  //       fetchfoods();
  //   }, []);

  let [toggle, setToggle] = useState(false);
  let [imgShow, setImgShow] = useState(false);
  let [imageURL, setImageURL] = useState();

  let demoFoods = [
              { id: 1, title: 'Chicken Biryani', price: 300, desc: 'Fragrant basmati rice with tender chicken.', img: 'https://placehold.co/400x300?text=Biryani' },
              { id: 2, title: 'Paneer Butter Masala', price: 220, desc: 'Creamy tomato gravy with soft paneer cubes.', img: 'https://placehold.co/400x300?text=Paneer' },
              { id: 3, title: 'Masala Dosa', price: 120, desc: 'Crispy dosa with spiced potato filling.', img: 'https://placehold.co/400x300?text=Dosa' },
              { id: 4, title: 'Gulab Jamun', price: 80, desc: 'Soft milk dumplings soaked in syrup.', img: 'https://placehold.co/400x300?text=Sweet' },
              { id: 5, title: 'Fish Curry', price: 350, desc: 'Tangy, spicy coastal-style fish curry.', img: 'https://placehold.co/400x300?text=Fish' },
              { id: 6, title: 'Veg Pulao', price: 190, desc: 'Aromatic rice with seasonal vegetables.', img: 'https://placehold.co/400x300?text=Pulao' }
            ]
    const addFoodImage = (e) => {
      e.preventDefault()
      let imgUrl = URL.createObjectURL(e.target.files[0])
      setImageURL(imgUrl)
      console.log(imgUrl)
      setImgShow(true)
    }

  return (
    <>
      <div className={styles.profile}>

        <div className={styles.popup} style={{display : toggle ? "block" : "none"}}>
          <div className={styles.popupContainer}>
            <input type="file" id="myfile" style={{display : "none"}} onChange={addFoodImage}/>
            <div className={styles.labelAndImage}>
              <label htmlFor="myfile" className={styles.file}>
                <IoIosAdd className={styles.addFileIcon}/>
              </label>
              <label htmlFor="myfile" className={styles.imgDiv} style={{display : imgShow ? "block" : "none"}}>
                <img src={imageURL} alt="" />
              </label>
            </div>
            <div className={styles.titleAndPrice}>
              <input type="text" placeholder="Add a Title"/>
              <input type="text" placeholder="Add Price"/>
            </div>
            <textarea type="text" className={styles.description} placeholder="Add a Description"></textarea>
            <div className={styles.buttons}>
              <button className={styles.close} onClick={() => setToggle(false)}>Close</button>
              <button className={styles.add}>Add</button>
            </div>
          </div>
        </div>

        {/* Profile header: avatar + shop name */}
        <div className={styles.pp_container}>
          <header className={styles.pp_header}>
            <div className={styles.pp_avatar}>
              <img src="https://placehold.co/200x200?text=Shop" alt="" />
            </div>

            <div className={styles.pp_shopInfo}>
              <h2 className={styles.pp_shopName}>Souradeep's Kitchen</h2>
              <p className={styles.pp_shopMeta}>Authentic regional flavours · Open 9:00 - 22:00</p>
            </div>
          </header>

          {/* total items count */}
          <div className={styles.pp_count} aria-live="polite">Total items: {demoFoods.length}</div>

          {/* horizontal list of food items */}
          <section className={styles.pp_items} aria-label="Food items">
            <div className={styles.addButton} onClick={() => (setToggle(true))}>
              <IoIosAdd />
            </div>
            {demoFoods.map((food) => (
              <article key={food.id} className={styles.food_card}>
                <div className={styles.food_img}>
                  <img src={food.img} alt="" />
                </div>
                <div className={styles.food_body}>
                  <div className={styles.food_top}>
                    <h3 className={styles.food_title}>{food.title}</h3>
                    <div className={styles.food_price}>₹{food.price}</div>
                  </div>
                  <p className={styles.food_desc}>{food.desc}</p>
                </div>
              </article>
            ))}
          </section>
        </div>
      </div>
    </>
  );
}

export default PartnerProfile;
