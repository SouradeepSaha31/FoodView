import Router from 'express';
import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js';
import foodPartnerModel from '../models/foodPartner.model.js';
const protectedRouter = Router();

protectedRouter.route('/').get(async (req, res) => {
  const token = req.cookies.token;
  if (token) {
    const decoded = jwt.verify(token, process.env.TOKEN_CODE);
    const user = await userModel.findById(decoded._id).populate("cartId")
    if (user) {
      return res.status(200).json({ message : {
        loggedIn: true, 
        user : true,
        foodPartner : false,
        detailes : {
          _id : user._id,
          fullname : user.fullname, 
          email : user.email,
          cart : user.cartId
        }
      } });
    } else {
        const foodPartner = await foodPartnerModel.findById(decoded._id);
        return res.status(200).json({ message : {
        loggedIn: true, 
        user : false,
        foodPartner : true,
        detailes : {
          _id : foodPartner._id, 
          businessname : foodPartner.businessname, 
          contactname : foodPartner.contactname,
          phoneno : foodPartner.phoneno, 
          address : foodPartner.address,
          image : foodPartner.avatar
        }
      } });
    }
  } else {
    return res.status(200).json({ message : {
        loggedIn: false, 
        user : false,
        foodPartner : false
      } });
  }
});

export default protectedRouter;