import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../BaseUrl/BaseUrl.js";
import styles from "./PartnerProfile.module.css";
import { IoIosAdd } from "react-icons/io";
import { IoCamera } from "react-icons/io5";



function PartnerProfile({detailes}) {
  let [foods, setFoods] = useState([]);

  useEffect(() => {
        const fetchfoods = async () => {
            try {
                const response = await baseUrl.get(`/api/food/getfoodforpartner`,{withCredentials : true} );
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

  
  let demoFoods = [
    { id: 1, title: 'Chicken Biryani', price: 300, description: 'Fragrant basmati rice with tender chicken.', image: 'https://placehold.co/400x300?text=Biryani' },
    { id: 2, title: 'Paneer Butter Masala', price: 220, description: 'Creamy tomato gravy with soft paneer cubes.', image: 'https://placehold.co/400x300?text=Paneer' },
    { id: 3, title: 'Masala Dosa', price: 120, description: 'Crispy dosa with spiced potato filling.', image: 'https://placehold.co/400x300?text=Dosa' },
    { id: 4, title: 'Gulab Jamun', price: 80, description: 'Soft milk dumplings soaked in syrup.', image: 'https://placehold.co/400x300?text=Sweet' },
    { id: 5, title: 'Fish Curry', price: 350, description: 'Tangy, spicy coastal-style fish curry.', image: 'https://placehold.co/400x300?text=Fish' },
    { id: 6, title: 'Veg Pulao', price: 190, description: 'Aromatic rice with seasonal vegetables.', image: 'https://placehold.co/400x300?text=Pulao' }
  ]

  let [toggle, setToggle] = useState(false);
  let [imgShowInFrontendToggle, setImgShowInFrontendToggle] = useState(false);
  let [imageURL, setImageURL] = useState();
  let [loderToggle, setLoderToggle] = useState(false);

    const showFoodImageInFrontend = (e) => {
      e.preventDefault()
      setImageURL(URL.createObjectURL(e.target.files[0]))
      setImgShowInFrontendToggle(true)
    }

    const sendFood = async (e) => {
      e.preventDefault()
      
      if(!e.target.image.files[0]) return alert("Food image title required")
      if(!e.target.title.value) return alert("Food title required")
      if(!e.target.price.value) return alert("Price required")
      if(!e.target.description.value) return alert("Description title required")

      const foodDet = new FormData();
      foodDet.append("image", e.target.image.files[0]);
      foodDet.append("title", e.target.title.value);
      foodDet.append("price", e.target.price.value);
      foodDet.append("description", e.target.description.value);

      try {
        setLoderToggle(true)
        const response = await baseUrl.post("/api/food/addfood", foodDet, {withCredentials : true})
        console.log(response.data.message)
        window.location.reload();
        setLoderToggle(false)
      } catch (error) {
        alert("error in sendFood function in partner profile")
        console.log(error)
      }
    }

    const addProfilePicture = async (e) => {
      e.preventDefault()
      console.log(e.target.files[0])
      // return
      if (!e.target.files[0]) return alert("add profile picture")
      const formdata = new FormData()
      formdata.append("profilepic", e.target.files[0])
      try {
        setLoderToggle(true)
        const response = await baseUrl.post("/api/foodpartner/addprofilepic", formdata, {withCredentials : true})
        window.location.reload();
        setLoderToggle(false)
        
      } catch (error) {
        console.log(error)
        alert(error.response.data.message)
      }
    }

  return (
    <>
      <div className={styles.profile}>
        {/* loader */}
        <div className={styles.loaderContainer} style={{display : loderToggle ? "flex" : "none"}}>
          <div className={styles.loader}></div>
        </div>
        {/* popup for add food item */}
        <div className={styles.popup} style={{display : toggle ? "block" : "none"}}>
          <form className={styles.popupContainer} encType="multipart/form-data" onSubmit={sendFood}>
            <input type="file" id="myfile" name="image" style={{display : "none"}} onChange={showFoodImageInFrontend}/>
            <div className={styles.labelAndImage}>
              <label htmlFor="myfile" className={styles.file}>
                <IoIosAdd className={styles.addFileIcon}/>
              </label>
              <label htmlFor="myfile" className={styles.imgDiv} style={{display : imgShowInFrontendToggle ? "block" : "none"}}>
                <img src={imageURL} alt="" />
              </label>
            </div>
            <div className={styles.titleAndPrice}>
              <input type="text" name="title" placeholder="Add a Title"/>
              <input type="text" name="price" placeholder="Add Price"/>
            </div>
            <textarea type="text" name="description" className={styles.description} placeholder="Add a Description"></textarea>
            <div className={styles.buttons}>
              <button className={styles.close} onClick={() => setToggle(false)}>Close</button>
              <button type="submit" className={styles.add} style={{display : loderToggle ? "none" : "block"}}>Add</button>
            </div>
          </form>
        </div>

        {/* Profile header: avatar + shop name */}
        <div className={styles.pp_container}>
          <header className={styles.pp_header}>
            <div className={styles.pp_avatar}>
              <input type="file" id="profilepic" name="profilePicture" onChange={addProfilePicture} style={{display : "none"}}/>
              <label htmlFor="profilepic" className={styles.addProfilePic}>
                <IoCamera />
              </label>
              <img src={detailes.image === "default_partner_profile_image.jpg" ? `/${detailes.image}` : detailes.image} alt="" />
            </div>

            <div className={styles.pp_shopInfo}>
              <h2 className={styles.pp_shopName}>{detailes.businessname}</h2>
              <h2 className={styles.pp_contactName}>{detailes.contactname}</h2> 
              <h2 className={styles.pp_phoneNo}>{detailes.phoneno}</h2> 
              <p className={styles.pp_shopMeta}>{detailes.address}</p>
            </div>
          </header>

          {/* total items count */}
          <div className={styles.pp_count} aria-live="polite">Total items: {foods.length}</div>

          {/* horizontal list of food items */}
          <section className={styles.pp_items} aria-label="Food items">
            <div className={styles.addButton} onClick={() => (setToggle(true))}>
              <IoIosAdd />
            </div>
            {foods.reverse().map((food) => (
              <article key={food.id} className={styles.food_card}>
                <div className={styles.food_img}>
                  <img src={food.image} alt="" />
                </div>
                <div className={styles.food_body}>
                  <div className={styles.food_top}>
                    <h3 className={styles.food_title}>{food.title}</h3>
                    <div className={styles.food_price}>₹{food.price}</div>
                  </div>
                  <p className={styles.food_desc}>{food.description}</p>
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
