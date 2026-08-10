import mongoose from "mongoose";
import axios from "axios"
import { ApiError } from "../utils/ApiError.js";

const videoSchema = new mongoose.Schema({
    url : {
        type : String, 
        required : true
    }, 
     VideoId : {
        type : String, 
        
    }, 
    title : {
        type : String, 
    }, 
    thumbnail: {
        type : String, 
        
    }, 
    resourceType : {
        type : String, 
        enum : ["url" , "upload"], 
        required : true
    }, 
    videoDuration : {
        type : Number,
    }, 
    etag : {
        type : String,
    }, 
    user : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : "User", 
        required :true
    }

}, {timestamps : true})

videoSchema.pre("validate", async function getYouTubeEmbedUrl() {

    if (!this.isModified("url")) return 
    if(this.url.includes('http://res.cloudinary.com')) return

    
    let videoId = null;
    const patterns = [
        /youtu\.be\/([^?&/]+)/,
        /[?&]v=([^?&/]+)/,
        /youtube\.com\/embed\/([^?&/]+)/,
        /youtube\.com\/shorts\/([^?&/]+)/,
    ];

    for (const pattern of patterns) {
        const match = this.url.match(pattern);
        if (match) {
            videoId = match[1];
            break;
        }
    }

    if (!videoId) throw new ApiError(404, "invalid youtube url")
    
    // axios call for youtube data api v3 

    const res = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.YOUTUBE_API_KEY_V3}`) 

    this.title = res.data.items[0].snippet.title
    this.thumbnail = res.data.items[0].snippet.thumbnails.maxres.url
    this.VideoId = videoId
    this.url = `https://www.youtube.com/embed/${videoId}`;
    return
});



export const Video = mongoose.model("Video", videoSchema)

