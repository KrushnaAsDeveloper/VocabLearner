import { Video } from "../models/video.model.js";
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
        throw new ApiError(404, "Enter the valid youtube link")
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
    
    let existed = await Video.findOne({VideoId : videoId, user : req.user._id});
    if(existed === null){

        existed = await Video.create({
            url : url,
            user : req.user._id, 
            resourceType : "url"
        })
    }
    

    res.status(201).json(new ApiResponse(201, existed , "Url converted successfully"))

    


})

export const uploadVideo = asyncHandler(async (req, res)=>{
    const {title} = req.body
    if(!title) {
        throw new ApiError(400, "Enter title for your video")
    }
    if (!req.file) {
      throw new ApiError(400, "Upload The File First")
    }

    const localFilePath = req.file.path
    if(!localFilePath){
        throw new ApiError(501, "Error while uploading multer file, local file path not found")
    }

    const response = await uploadFileOnCloudinary(localFilePath)
    console.log(response)
    if(!response){
        throw new ApiError(501, "Error while uploading on cloudinery")
    }

    let vMetaData = await Video.findOne({etag : response.etag, user :req.user._id })
     
    if(!vMetaData){
        vMetaData =  await Video.create({
        url : response.url, 
        videoDuration : response.duration, 
        etag : response.etag, 
        resourceType : "upload", 
        user : req.user._id, 
        title : title
    }) 
    }

    res.status(200).json(new ApiResponse(200,vMetaData, "Video Uploaded Successfully !" ))    
})