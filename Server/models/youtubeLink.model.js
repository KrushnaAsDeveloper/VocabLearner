import mongoose, { Schema } from "mongoose";
import { ApiError } from "../utils/ApiError.js";

const youtubeLinkSchema = new Schema({
    VideoId : {
        type : String, 
    }, 
    url: {
        type: String,
    },
    student : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : "User"
    }
});

youtubeLinkSchema.pre("save", function getYouTubeEmbedUrl() {
    if (!this.isModified("url")) return 

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
    this.VideoId = videoId
    this.url = `https://www.youtube.com/embed/${videoId}`;
    return
});
    

export const Url = mongoose.model("Url", youtubeLinkSchema);
