import userModel from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const register = async (req, res) => {
    try {

        const {fullname, email, password} = req.body;

        // console.log(fullname, email, password)
        // return

        // check all the fields are coming or not

        if (!fullname) return res.status(400).json({message : "fullname required"})
        if (!email) return res.status(400).json({message : "email required"})
        if (!password) return res.status(400).json({message : "password required"})

        // check user already exist or not

        const findUser = await userModel.findOne({email})
        if(findUser) return res.status(400).json({message : "user already exist"})

        // password validation

        const validatePassword = (password) => {
            const minChar = password.length >= 8;
             const upperCase = /[A-Z]/.test(password);
             const lowerCase = /[a-z]/.test(password);
             const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

             return minChar && upperCase && lowerCase && specialChar;
        };

        // if (!validatePassword(password)) {
        //     return res.status(400).json({
        //     message: "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one special character.",
        //     });
        // }

        // hash password

        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password, salt)

        // create user

        const user = await userModel.create({
            fullname, 
            email,
            password : hashPass
        })

        // generate token

        const token = jwt.sign({_id : user._id, email : user.email}, process.env.TOKEN_CODE)
        res.cookie("token", token, {httpOnly : true, secure : true, sameSite : "none"})
        user.token = token
        user.save()

        // response

        res.status(200).json({
            message : "user register successfully",
            user : {
                fullname : user.fullname, 
                email : user.email
            }
        })
        
    } catch (error) {
        res.status(500).json({
            message : "error in user register controller", 
            error
        })
    }
}

const login = async (req, res) => {
    try {

        const {email, password} = req.body
        console.log(req.body)
        // return

        // check all the fields are coming or not

        if (!email) return res.status(400).json({message : "email required"})
        if (!password) return res.status(400).json({message : "password required"})

        // check user exist or not

        let isUserFound =  await userModel.findOne({email})

        if (!isUserFound) return res.status(400).json({message : "Invalid email or password"})

        // check password match

        let isPasswordMatch = await bcrypt.compare(password, isUserFound.password)

        if(!isPasswordMatch) return res.status(400).json({message : "Invalid email or password"})

        // generate token

        const token = jwt.sign({_id : isUserFound._id, email : isUserFound.email}, process.env.TOKEN_CODE)
        res.cookie("token", token, {httpOnly : true, secure : true, sameSite : "none"})
        isUserFound.token = token
        isUserFound.save()

        // response

        res.status(200).json({
            message : "user login successfully", 
            user : {
                fullname : isUserFound.fullname,
                email : isUserFound.email
            }
        })

        
    } catch (error) {
        res.status(500).json({
            message : "error in user login controller",
            error
        })
    }
}

const logout = async (req, res) => {
    try {

        // find user
        const user = await userModel.findOne({_id : req.user._id})
        // clear cookie and token
        res.clearCookie("token")
        user.token = null
        user.save()
        // response
        res.status(201).json({message : "user logout successfully"})

        
    } catch (error) {
        res.status(500).json({
            message : "error in user logout controller",
            error
        })
    }
}

export {register, login, logout}