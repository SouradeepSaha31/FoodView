import jwt from "jsonwebtoken"

const isLoggedIn = (req, res, next) => {
    if(!req.cookies.token){
        res.status(404).json({message : "You need to login first"})
    } else {
        let data = jwt.verify(req.cookies.token, process.env.TOKEN_CODE)
        req.user = data
        next()
    }
}

export default isLoggedIn;