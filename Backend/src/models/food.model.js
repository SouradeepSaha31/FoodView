import mongoose from "mongoose"

const foodSchema = new mongoose.Schema({
    title : {
        type : String,
        require : true
    },
    description : {
        type : String,
        required : true
    },
    video : {
        type : String,
        required : true
    },
    videoId : {
        type : String,
        required : true
    },
    foodPartner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "foodPartner"
    }
}, {
    timestamps : true
})

const foodModel = mongoose.model("food", foodSchema)

export default foodModel