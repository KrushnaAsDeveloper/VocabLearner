import { Video } from "../models/uploadViedo.model.js";
import { Url } from "../models/youtubeLink.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadFileOnCloudinary } from "../utils/cloudinary.js";

export const converUrlToEmbed = asyncHandler(async (req, res) =>{
    const {url} = req.body
    if(!url){
        throw new ApiError(404, "Please enter the url")
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
    
    let existed = await Url.findOne({VideoId : videoId, student : req.user._id});
    if(existed === null){

        existed = await Url.create({
            url : url,
            student : req.user._id
        })
    }
    

    res.status(201).json(new ApiResponse(201, existed , "Url converted successfully"))

    


})

export const uploadVideo = asyncHandler(async (req, res)=>{
    const localFilePath = req.files.video[0].path
    if(!localFilePath){
        throw new ApiError(501, "Error while uploading multer file, local file path not found")
    }

    const response = await uploadFileOnCloudinary(localFilePath)
    console.log(response)
    if(!response){
        throw new ApiError(501, "Error while uploading on cloudinery")
    }

    const vMetaData = await Video.findOne({etag : response.etag})
     
    if(!vMetaData){
        vMetaData =  await Video.create({
        videoUrl : response.url, 
        videoDuration : response.duration, 
        etag : response.etag
    }) 
    }

    res.status(200).json(new ApiResponse(200,vMetaData, "Video Uploaded Successfully !" ))    
})