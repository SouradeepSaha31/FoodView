import Router from "express";
import isLoggedIn from "../middlewares/isLoggedIn.middleware.js";
import isFoodPartner from "../middlewares/isFoodPartner.middleware.js"
import isUser from "../middlewares/isUser.middleware.js"
import multer from "multer"
import { addFood, getFood} from "../controllers/food.controller.js";
const foodRouter = Router()

const upload = multer({
    storage : multer.memoryStorage()
})

foodRouter.route("/").post(isLoggedIn, isFoodPartner, upload.single("video"), addFood)
foodRouter.route("/getfood").get(isLoggedIn, isUser, getFood)
// get food for specific profile of food partner
foodRouter.route("/getfood/:partnerid").get(isLoggedIn, getFood)

export default foodRouter;