import userModel from "../models/user.model.js"

const isUser = async (req, res, next) => {
    let id = req.user._id
    let normalUser = await userModel.findById(id)
    if (!normalUser) return res.status(404).json({message : "You don't have the permission to get all foods"})
    req.normalUser = normalUser
    next()
}

export default isUser;