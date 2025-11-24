import mongoose from "mongoose"

const subOrderSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    foodPartnerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "foodPartner",
        required : true
    },
    userOrderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "order",
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

const subOrderModel = mongoose.model("subOrder", subOrderSchema)

export default subOrderModel