import { Url } from "../models/youtubeLink.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const converUrlToEmbed = asyncHandler(async (req, res) =>{
    const {url} = req.body
    if(!url){
        throw new ApiError(404, "Url not found")
    }
    if(!url.includes("youtu.be") && !url.includes("youtube.com") ){
        throw new ApiError(400, "Enter the valid youtube link")
    }
    const saveUrl = await Url.create({
        url : url
    })
    

    res.status(201).json(new ApiResponse(201, saveUrl, "Url converted successfully"))

    


})