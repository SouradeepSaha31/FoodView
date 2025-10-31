import express from "express"
const app = express()
import cookieParser from "cookie-parser"
import cors from "cors"

app.use(cors({
    origin : ["http://localhost:5173"],
    credentials : true
}))
app.use(express.json({limit : "30kb"}))
app.use(express.urlencoded({extended : true, limit : "30kb"}))
app.use(cookieParser())


import userRouter from "./routes/user.route.js";
import foodPartnerRouter from "./routes/foodPartner.route.js"
import foodRouter from "./routes/food.route.js"
import protectedRouter from "./routes/protected.route.js"

app.use("/api/user", userRouter)
app.use("/api/foodpartner", foodPartnerRouter)
app.use("/api/food", foodRouter)
app.use("/api/protected", protectedRouter)

export default app;