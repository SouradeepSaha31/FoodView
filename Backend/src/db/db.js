import mongoose from "mongoose"

const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database Conection Successfull")
    } catch (error) {
        console.log("mongodb connection error on db.js", error)
        process.exit(1)
    }
}

export default connectdb