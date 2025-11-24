import Router from "express";
import isLoggedIn from "../middlewares/isLoggedIn.middleware.js";
import isFoodPartner from "../middlewares/isFoodPartner.middleware.js"
import isUser from "../middlewares/isUser.middleware.js"
import multer from "multer"
import { 
    addFood, 
    getFoodForPartner,
    getPartnerOrders, 
    partnerOrderPopup,
    getFood, 
    addToCart, 
    lessToCart, 
    getCartItems, 
    placeOrder, 
    getOrders, 
    ordersPopup
} from "../controllers/food.controller.js";
const foodRouter = Router()

const upload = multer({
    storage : multer.memoryStorage()
})

// food partner routes
foodRouter.route("/addfood").post(isLoggedIn, isFoodPartner, upload.single("image"), addFood)
foodRouter.route("/getfoodforpartner").get(isLoggedIn, isFoodPartner, getFoodForPartner)
foodRouter.route("/getpartnerorders").get(isLoggedIn, isFoodPartner, getPartnerOrders)
foodRouter.route("/partnerorderpopup/:orderId").post(isLoggedIn, isFoodPartner, partnerOrderPopup)

// user routes
foodRouter.route("/getfood").get(getFood)
foodRouter.route("/addtocart/:foodId").post(isLoggedIn, isUser, addToCart)
foodRouter.route("/lesstocart/:foodId").post(isLoggedIn, isUser, lessToCart)
foodRouter.route("/getcartitems").get(isLoggedIn, isUser, getCartItems)
foodRouter.route("/placeorder").post(isLoggedIn, isUser, placeOrder)
foodRouter.route("/getorders").get(isLoggedIn, isUser, getOrders)
foodRouter.route("/orderpopup/:orderId").post(isLoggedIn, isUser, ordersPopup)


export default foodRouter;