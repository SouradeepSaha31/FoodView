import Router from "express"
import isLoggedIn from "../middlewares/isLoggedIn.middleware.js"
import { register, login, logout } from "../controllers/user.controller.js"

const userRouter = Router()

userRouter.route("/register").post(register)
userRouter.route("/login").post(login)
userRouter.route("/logout").get(isLoggedIn, logout)

export default userRouter