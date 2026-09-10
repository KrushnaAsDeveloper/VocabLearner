import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadFileOnCloudinary } from "../utils/cloudinary.js";
import {fetchTranscript} from "youtube-transcript"
import { Transcript } from "../models/transcript.model.js";


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
         const transcript = await fetchTranscript(videoId)
            const store =  transcript.map((elem, idx) =>(
                    {segmentId : idx, 
                    start : ((elem.offset / 1000) / 60).toFixed(2), 
                    end : (((elem.duration + elem.offset) / 1000) / 60).toFixed(2), 
                    text : elem.text, 
                    sourceType : "youtube",
                    videoId : videoId
                    }
            ))
        const transExisted = await Transcript.findOne({videoId : videoId})
        if (transExisted === null) {
                 await Transcript.insertMany(store, {ordered : true})
            }
        
        if(existed === null){
            
            existed = await Video.create({
                url : url,
                user : req.user._id, 
                resourceType : "url", 
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

    const response = await uploadFileOnCloudinary(req.file.buffer, "video")
    console.log(response) // whole cloudinary response
    if(!response){
        throw new ApiError(501, "Error while uploading on cloudinery")
        
    }
    let videoThumbnail = await response.url.replace(".mp4", ".jpg")
    if(!videoThumbnail){
        return
    }
    // console.log(videoThumbnail) upload video thumbnail 
    let vMetaData = await Video.findOne({etag : response.etag, user :req.user._id })
     
    if(!vMetaData){
        vMetaData =  await Video.create({
        url : response.url, 
        videoDuration : response.duration, 
        etag : response.etag, 
        resourceType : "upload", 
        user : req.user._id, 
        title : title, 
        thumbnail : videoThumbnail

        
    }) 
    }

    res.status(200).json(new ApiResponse(200,vMetaData, "Video Uploaded Successfully !" ))    
})