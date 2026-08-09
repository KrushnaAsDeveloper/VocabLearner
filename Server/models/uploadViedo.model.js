import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    videoUrl : {
        type : String, 
        required : true
    }, 
    videoDuration : {
        type : Number,
        required : true
    }, 
    etag : {
        type : String,
        required : true
    }

}, {timestamps : true})



export const Video = mongoose.model("Video", videoSchema)

