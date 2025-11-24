import app from "./src/app.js"
import connectdb from "./src/db/db.js"
import dotenv from "dotenv"
dotenv.config()

connectdb()
.then(()=>{
    app.listen(process.env.PORT || 3000, () => {
        console.log(`app is running on port http://localhost:${process.env.PORT || 3000}`)
    })
})
.catch((error)=>{
    console.log("mongodb connextion error in server.js", error)
})
