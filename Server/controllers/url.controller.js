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
     let videoId = null;
    const patterns = [
        /youtu\.be\/([^?&/]+)/,
        /[?&]v=([^?&/]+)/,
        /youtube\.com\/embed\/([^?&/]+)/,
        /youtube\.com\/shorts\/([^?&/]+)/,
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) {
            videoId = match[1];
            break;
        }
    }

    if (!videoId) throw new ApiError(404, "invalid youtube url || url controller")
    
    let existed = await Url.findOne({VideoId : videoId});
    console.log(existed)    
    if(existed === null){

        existed = await Url.create({
            url : url,
            student : req.user._id
        })
    }
    

    res.status(201).json(new ApiResponse(201, existed , "Url converted successfully"))

    


})