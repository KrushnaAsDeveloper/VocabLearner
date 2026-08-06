import { Url } from "../models/youtubeLink.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import router from "../routes/user.route.js";

export const histroyData = asyncHandler(async (req, res)=>{
    if (!req.user) {
        throw new ApiError(401, "Unauthorize User")
    }
    const user = await Url.find({student : req.user._id})
    // database call for all data 

    res.status(200).json(new ApiResponse(200, user, "History data according to user creation"))

})

export default router