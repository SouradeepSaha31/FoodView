import Router from "express";
import isLoggedIn from "../middlewares/isLoggedIn.middleware.js";
import isFoodPartner from "../middlewares/isFoodPartner.middleware.js"
import isUser from "../middlewares/isUser.middleware.js"
import multer from "multer"
import { addFood, getFood, getFoodForPartner} from "../controllers/food.controller.js";
const foodRouter = Router()

const upload = multer({
    storage : multer.memoryStorage()
})

foodRouter.route("/addfood").post(isLoggedIn, isFoodPartner, upload.single("image"), addFood)
foodRouter.route("/getfoodforpartner").get(isLoggedIn, isFoodPartner, getFoodForPartner)
foodRouter.route("/getfood").get(isLoggedIn, isUser, getFood)
// get food for specific profile of food partner
foodRouter.route("/getfood/:partnerid").get(isLoggedIn, getFood)

export default foodRouter;