import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import router from "../routes/user.route.js";
import { Video } from "../models/video.model.js";

export const histroyData = asyncHandler(async (req, res)=>{
    if (!req.user) {
        throw new ApiError(401, "Unauthorize User")
    }
    const user = await Video.find({user : req.user._id, resourceType : "url"})
    // database call for all data 

    res.status(200).json(new ApiResponse(200, user, "History data of youtube url's are fetched sucessfully !"))

})
export const fetchVideo =  asyncHandler(async(req, res)=>{
    const videoId = req.paramse
    const videos = await Video.find({ VideoId : videoId})

    if(!videos){
        throw new ApiError(404, "Video not found")
    }

    res.status(200).json(new ApiResponse(200, videos, "Video fetched !"))
})
export const uploadData = asyncHandler(async (req, res)=>{
    if (!req.user) {
        throw new ApiError(401, "Unauthorize User")
    }
    const user = await Video.find({user : req.user._id, resourceType : "upload"})
    // database call for all data 

    res.status(200).json(new ApiResponse(200, user, "History data of uploaded videos are fetched successfully !"))

})

export const deleteHistory = asyncHandler(async (req, res)=>{
    const {id} = req.params
    const deleteCard = await Video.findByIdAndDelete(id)
    res.status(200).json(new ApiResponse(200, "History Item Deleted Successfully "))
})

export default router