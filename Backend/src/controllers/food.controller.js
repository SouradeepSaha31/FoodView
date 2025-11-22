import isLoggedIn from "../middlewares/isLoggedIn.middleware.js";
import foodModel from "../models/food.model.js"
import foodPartnerModel from "../models/foodPartner.model.js"
import { foodItemImageUpload } from "../services/storage.service.js"
import { v4 as uuid } from 'uuid';

const addFood = async (req, res) => {
    try {
        const {title, description, price} = req.body
        const image = req.file
        const id = req.foodPartner._id

        console.log(req.body,image)
        // return

        if (!title) return res.status(400).json({message : "title is required"})
        if (!description) return res.status(400).json({message : "description is required"})
        if (!price) return res.status(400).json({message : "price is required"})
        if (!image) return res.status(400).json({message : "image not found"})

        const response = await foodItemImageUpload(image, uuid())

        const food = await foodModel.create({
            title,
            description,
            price,
            image : response.url,
            imageId : response.fileId,
            foodPartner : id
        })

        res.status(201).json({
            message : "food created successfully",
            food
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "error in add food controller", 
            error
        })
    }
}

const getFoodForPartner = async (req, res) => {
    try {

        const id = req.foodPartner._id
        const foods = await foodModel.find({foodPartner : id})
        res.status(201).json({
            message : "Here are the all food items",
            foods
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "error in get food controller", 
            error
        })
    }
}
const getFood = async (req, res) => {
    try {

        
        res.status(201).json({
            message : "Here are the all food items",
            foods
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "error in get food controller", 
            error
        })
    }
}

export {addFood, getFood, getFoodForPartner}