import isLoggedIn from "../middlewares/isLoggedIn.middleware.js";
import foodModel from "../models/food.model.js"
import foodPartnerModel from "../models/foodPartner.model.js"
import userModel from "../models/user.model.js";
import cartModel from "../models/cart.model.js"
import orderModel from "../models/order.model.js";
import subOrderModel from "../models/subOrder.model.js";
import { foodItemImageUpload } from "../services/storage.service.js"
import jwt from "jsonwebtoken"
import { v4 as uuid } from 'uuid';
import mongoose from "mongoose"

// food partner controllers

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
            foods : foods.reverse()
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "error in get food controller", 
            error
        })
    }
}
const getPartnerOrders = async (req, res) => {
    try {
        const {_id} = req.foodPartner

        const orders = await subOrderModel.find({foodPartnerId : _id}).populate("userId").populate("orderItems.id")
        console.log(orders)

        const dateAndTimeChangedOrder = orders.map((o) => {
            const date = new Date(o.createdAt);
    
            const finalDate = date.toLocaleDateString("en-IN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
            });
    
            const finalTime = date.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
            });
            return {
                _id : o._id,
                userId : o.userId,
                foodPartnerId : o.foodPartnerId,
                userOrderId : o.userOrderId,
                totalPrice : o.totalPrice,
                orderItems : o.orderItems.reverse(),
                dateAndTime : {
                    finalDate,
                    finalTime
                }
            }
        })

        console.log(dateAndTimeChangedOrder)

        res.status(201).json({message : "all orders", orders : dateAndTimeChangedOrder.reverse()})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "error in getPartnerOrders controller", 
            error
        })
    }
}
const partnerOrderPopup = async (req, res) => {
    try {

        let {orderId} = req.params
        const order = await subOrderModel.findById(orderId).populate("orderItems.id")
        res.status(201).json({message : "order send", order})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "error in partnerOrderPopup controller", 
            error
        })
    }
}


// user controllers

const getFood = async (req, res) => {
    try {

        const foods = await foodModel.find()

        if(!req.cookies.token){
            res.status(201).json({
                message : "Here are the all food items",
                allFoods : foods.reverse(),
                cart : []
            })
        } else {
            let data = jwt.verify(req.cookies.token, process.env.TOKEN_CODE)
            const user = await userModel.findById(data._id).populate("cartId")
            res.status(201).json({
                message : "Here are the all food items",
                allFoods : foods.reverse(),
                cart : user.cartId.foodItems
            })
        }

        res.status(201).json({
            message : "Here are the all food items",
            allFoods : foods.reverse()
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
            message : "error in lessTocart controller",
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

        res.status(201).json({message : "all cart items", cartItems : cart.foodItems.reverse()})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "error in getCartItems controller",
            error
        })
    }
}
const placeOrder = async (req, res) => {
    try {

        let {_id} = req.normalUser
        let {userSubtotal, delivaryChagre} = req.body
        const totalPrice = userSubtotal + delivaryChagre

        const cart = await cartModel.findOne({userId : _id})
        const newOrder = await orderModel.create({
            userId : _id,
            totalPrice,
            orderItems : cart.foodItems
        })
        const findNewOeder = await orderModel.findById(newOrder._id).populate("orderItems.id")
        const foodPartnerIdList = findNewOeder.orderItems.map((f) => {
            return f.id.foodPartner.toString()
        })
        const sortedFoodPartnerIdList = Array.from(new Set(foodPartnerIdList))

        sortedFoodPartnerIdList.forEach( async (fId) => {
            let subOrderItem = []
            findNewOeder.orderItems.forEach((eachItem) => {
            if (fId == eachItem.id.foodPartner.toString()){
                subOrderItem.push(eachItem)
            }
            })
            console.log(subOrderItem)
            const subTotal = subOrderItem.reduce((acc, curr) => acc + (curr.id.price * curr.quantity), 0)
            const subDelivaryCharge = delivaryChagre/sortedFoodPartnerIdList.length
            const subOrder = await subOrderModel.create({
                userId : findNewOeder.userId,
                foodPartnerId : new mongoose.Types.ObjectId(fId),
                userOrderId : findNewOeder._id,
                totalPrice : subTotal + subDelivaryCharge,
                orderItems : subOrderItem
            })

        })

        cart.foodItems = []
        cart.save()

        res.status(201).json({message : "order placed successfully"})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "error in placeOrder controller",
            error
        })
    }
}
const getOrders = async (req, res) => {
    try {

        let {_id} = req.normalUser

        const orders = await orderModel.find({userId : _id}).populate("orderItems.id")
        // console.log(orders)

        const dateAndTimeChangedOrder = orders.map((o) => {
            const date = new Date(o.createdAt);
    
            const finalDate = date.toLocaleDateString("en-IN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
            });
    
            const finalTime = date.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
            });
            return {
                _id : o._id,
                userId : o.userId,
                totalPrice : o.totalPrice,
                orderItems : o.orderItems.reverse(),
                dateAndTime : {
                    finalDate,
                    finalTime
                }
            }
        })

        console.log(dateAndTimeChangedOrder)

        res.status(201).json({message : "all orders", orders : dateAndTimeChangedOrder.reverse()})

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "error in placeOrder controller",
            error
        })
    }
}
const ordersPopup = async (req, res) => {
    try {
        let {orderId} = req.params
        const order = await orderModel.findById(orderId).populate("orderItems.id")
        res.status(201).json({message : "order send", order})

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "error in ordersPopup controller",
            error
        })
    }
}

export {
    addFood, 
    getFoodForPartner, 
    getPartnerOrders,
    partnerOrderPopup,
    getFood, 
    addToCart, 
    lessToCart, 
    getCartItems, 
    placeOrder, 
    getOrders, 
    ordersPopup
}