import Router from "express";
import isLoggedIn from "../middlewares/isLoggedIn.middleware.js";
import isFoodPartner from "../middlewares/isFoodPartner.middleware.js"
import isUser from "../middlewares/isUser.middleware.js"
import multer from "multer"
import { addFood, getFood, deleteFood } from "../controllers/food.controller.js";
const foodRouter = Router()

const upload = multer({
    storage : multer.memoryStorage()
})

foodRouter.route("/").post(isLoggedIn, isFoodPartner, upload.single("video"), addFood)
foodRouter.route("/getfood").get(isLoggedIn, isUser, getFood)
// foodRouter.route("/deletefood/:id").get(isLoggedIn, isFoodPartner, deleteFood)

export default foodRouter;