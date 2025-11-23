import isLoggedIn from "../middlewares/isLoggedIn.middleware.js";
import foodModel from "../models/food.model.js"
import foodPartnerModel from "../models/foodPartner.model.js"
import userModel from "../models/user.model.js";
import cartModel from "../models/cart.model.js"
import { foodItemImageUpload } from "../services/storage.service.js"
import jwt from "jsonwebtoken"
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

        const foods = await foodModel.find()

        if(!req.cookies.token){
            res.status(201).json({
                message : "Here are the all food items",
                allFoods : foods,
                cart : []
            })
        } else {
            let data = jwt.verify(req.cookies.token, process.env.TOKEN_CODE)
            const user = await userModel.findById(data._id).populate("cartId")
            res.status(201).json({
                message : "Here are the all food items",
                allFoods : foods,
                cart : user.cartId.foodItems
            })
        }

        res.status(201).json({
            message : "Here are the all food items",
            allFoods : foods
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "error in get food controller", 
            error
        })
    }
}
const addToCart = async (req, res) => {
    try {

        let {foodId} = req.params
        let {_id} = req.normalUser

        const cart = await cartModel.findOne({userId : _id})

        let index = -1

        if (cart.foodItems.length == 0){
            cart.foodItems.push({
                id : foodId,
                quantity : 1
            })
            cart.save()
        } else {
            cart.foodItems.forEach((f, i) => {
            if(f.id == foodId) {
                index = i
                return
            }
            })

            if(index != -1){
            cart.foodItems[index].quantity++
            cart.save()
            } else {
            cart.foodItems.push({
                id : foodId,
                quantity : 1
            })
            cart.save()
            }
        }
        console.log(cart)
        res.status(201).json({message : "item added", cartItems : cart.foodItems})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "error in addTocart controller",
            error
        })
    }
}
const lessToCart = async (req, res) => {
    try {

        let {foodId} = req.params
        let {_id} = req.normalUser

        const cart = await cartModel.findOne({userId : _id})

        let index = -1

        if (cart.foodItems.length == 0){
            return res.status(400).json({message : "cart is already empty"})
        } else {
            cart.foodItems.forEach((f, i) => {
            if(f.id == foodId) {
                index = i
                return
            }
            })

            if(index != -1){
            cart.foodItems[index].quantity--
            if(cart.foodItems[index].quantity == 0) cart.foodItems.splice(index, 1) 
            cart.save()
            } else {
            return res.status(400).json({message : "item does not exist"})
            }
        }
        console.log(cart)
        res.status(201).json({message : "item removed", cartItems : cart.foodItems})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "error in addTocart controller",
            error
        })
    }
}
const getCartItems = async (req, res) => {
    try {

        let {_id} = req.normalUser
        console.log(_id)

        const cart = await cartModel.findOne({userId : _id}).populate("foodItems.id")
        console.log(cart)

        res.status(201).json({message : "all cart items", cartItems : cart.foodItems})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "error in addTocart controller",
            error
        })
    }
}

export {addFood, getFood, getFoodForPartner, addToCart, lessToCart, getCartItems}