import Router from "express"
import isLoggedIn from "../middlewares/isLoggedIn.middleware.js"
import { register, login, logout, addProfilePic } from "../controllers/foodPartner.controller.js"
import isFoodPartner from "../middlewares/isFoodPartner.middleware.js"
import multer from "multer"

const foodPartnerRouter = Router()

const upload = multer({
    storage : multer.memoryStorage()
})


foodPartnerRouter.route("/register").post(register)
foodPartnerRouter.route("/login").post(login)
foodPartnerRouter.route("/logout").get(isLoggedIn, logout)
foodPartnerRouter.route("/addprofilepic").post(isLoggedIn, isFoodPartner, upload.single("profilepic"), addProfilePic)

export default foodPartnerRouter