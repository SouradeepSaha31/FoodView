import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    foodItems : [
        {
            id : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "food"
            },
            quantity : {
                type : Number,
                default : 0
            }
        }
    ]
}, {
    timestamps : true
})

const cartModel = mongoose.model("cart", cartSchema)

export default cartModel