import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
export const verifyJWT = asyncHandler(async (req, res, next)=>{
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET )
    
    const user = await User.findById(decode._id).select("-password -refreshToken")
    req.user = user;

    next();
})
