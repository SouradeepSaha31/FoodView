import Router from "express"
import isLoggedIn from "../middlewares/isLoggedIn.middleware.js"
import { register, login, logout } from "../controllers/foodPartner.controller.js"

const foodPartnerRouter = Router()

foodPartnerRouter.route("/register").post(register)
foodPartnerRouter.route("/login").post(login)
foodPartnerRouter.route("/logout").get(isLoggedIn, logout)

export default foodPartnerRouter