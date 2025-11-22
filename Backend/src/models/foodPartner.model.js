import mongoose from "mongoose"

const foodPartnerSchema = new mongoose.Schema({
    businessname : {
        type : String,
        required : true
    },
    contactname : {
        type : String,
        required : true
    },
    phoneno : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        sparse : true
    },
    password : {
        type : String,
        required : true,
    },
    address : {
        type : String,
        required : true,
    },
    avatar : {
        type : String,
        default : "default_partner_profile_image.jpg"
    },
    avatarId : {
        type : String,
        default : null
    }
},{
    timestamps : true
});

const foodPartnerModel = mongoose.model("foodPartner", foodPartnerSchema)

export default foodPartnerModel;