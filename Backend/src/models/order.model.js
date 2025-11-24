import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    totalPrice : {
        type : Number,
        required : true
    },
    orderItems : [
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

const orderModel = mongoose.model("order", orderSchema)

export default orderModel