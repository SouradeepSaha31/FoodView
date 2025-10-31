import foodPartnerModel from "../models/foodPartner.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const register = async (req, res) => {
    try {

        const {businessname, contactname, phoneno, email, password, address} = req.body;

        console.log(req.body)
        // return

        // checking required fields

        if (!businessname) return res.status(400).json({message : "business name required"})
        if (!contactname) return res.status(400).json({message : "contact name required"})
        if (!phoneno) return res.status(400).json({message : "phone number required"})
        if (!email) return res.status(400).json({message : "email required"})
        if (!password) return res.status(400).json({message : "password required"})
        if (!address) return res.status(400).json({message : "address required"})

        // checking user existence

        const findUser = await foodPartnerModel.findOne({email})
        if(findUser) return res.status(400).json({message : "user already exist"})

        // validating password

        const validatePassword = (password) => {
            const minChar = password.length >= 8;
            const upperCase = /[A-Z]/.test(password);
            const lowerCase = /[a-z]/.test(password);
            const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

            return minChar && upperCase && lowerCase && specialChar;
        };

        // if (!validatePassword(password)) {
        //         return res.status(400).json({
        //         message: "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one special character.",
        //     });
        // }

        // hashing password

        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password, salt)

        // creating user

        const user = await foodPartnerModel.create({
            businessname,
            contactname,
            phoneno,
            email,
            password : hashPass,
            address 
        })

        // generating token

        const token = jwt.sign({_id : user._id, email : user.email}, process.env.TOKEN_CODE)
        res.cookie("token", token, {httpOnly : true, secure : true, sameSite : "none"})
        user.token = token
        user.save()

        // sending response

        res.status(200).json({
            message : "user register successfully",
            user : {
                businessname : user.businessname,
                contactname : user.contactname,
                phoneno : user.phoneno, 
                email : user.email,
                address : user.address
            }
        })   

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "error in food partner register controller",
            error
        })
    }
}

const login = async (req, res) => {
    try {

        const {email, password} = req.body
        console.log(req.body)
        // return

        // checking required fields

        if (!email) return res.status(400).json({message : "email required"})
        if (!password) return res.status(400).json({message : "password required"})

        // checking user existence

        let isUserFound =  await foodPartnerModel.findOne({email})

        if (!isUserFound) return res.status(400).json({message : "Invalid email or password"})

        // checking password match

        let isPasswordMatch = await bcrypt.compare(password, isUserFound.password)

        if(!isPasswordMatch) return res.status(400).json({message : "Invalid email or password"})

        // generating token

        const token = jwt.sign({_id : isUserFound._id, email : isUserFound.email}, process.env.TOKEN_CODE)
        res.cookie("token", token, {httpOnly : true, secure : true, sameSite : "none"})
        isUserFound.token = token
        isUserFound.save()

        // sending response

        res.status(200).json({
            message : "user login successfully", 
            user : {
                name : isUserFound.name,
                email : isUserFound.email
            }
        })

        
    } catch (error) {
        res.status(500).json({
            message : "error in food partner login controller",
            error
        })
    }
}

const logout = async (req, res) => {
    try {

        // finding user

        const user = await foodPartnerModel.findOne({_id : req.user._id})
        // clearing token
        res.clearCookie("token")
        user.token = null
        user.save()
        // sending response
        res.status(201).json({message : "user logout successfully"})

        
    } catch (error) {
        res.status(500).json({
            message : "error in user logout controller",
            error
        })
    }
}

export {register, login, logout}