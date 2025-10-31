import isLoggedIn from "../middlewares/isLoggedIn.middleware.js";
import foodModel from "../models/food.model.js"
import foodPartnerModel from "../models/foodPartner.model.js"
import { fileUpload } from "../services/storage.service.js"
import { v4 as uuid } from 'uuid';

const addFood = async (req, res) => {
    try {
        const {title, description} = req.body
        const file = req.file
        const id = req.foodPartner._id

        console.log(file)

        if (!title) return res.status(400).json({message : "video title is required"})
        if (!description) return res.status(400).json({message : "video description is required"})
        if (!file) return res.status(400).json({message : "video not found"})

        const response = await fileUpload(file, uuid())

        const food = await foodModel.create({
            title,
            description,
            video : response.url,
            videoId : response.fileId,
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

const getFood = async (req, res) => {
    try {

        const foods = await foodModel.find()
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

const deleteFood = async (req, res) => {
    try {

        console.log(req.params)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "error in delete food controller", 
            error
        })
    }
}

export {addFood, getFood, deleteFood}