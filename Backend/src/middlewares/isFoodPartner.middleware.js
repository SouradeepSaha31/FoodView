import foodPartnerModel from "../models/foodPartner.model.js"

const isFoodPartner = async (req, res, next) => {
    let id = req.user._id
    let foodPartner = await foodPartnerModel.findById(id)
    if (!foodPartner) return res.status(404).json({message : "You don't have the permission to add foods"})
    req.foodPartner = foodPartner
    next()
}

export default isFoodPartner;