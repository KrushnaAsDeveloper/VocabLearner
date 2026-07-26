import mongoose, { Schema } from "mongoose";

const youtubeLinkSchema = new Schema({
    url: {
        type: String,
    },
});

youtubeLinkSchema.pre("save", function getYouTubeEmbedUrl() {
        let videoId = null;

        // youtu.be/VIDEO_ID
        let match = this.url.match(/youtu\.be\/([^?&/]+)/);
        if (match) videoId = match[1];

        // youtube.com/watch?v=VIDEO_ID
        if (!videoId) {
            match = this.url.match(/[?&]v=([^?&/]+)/);
            if (match) videoId = match[1];
        }

        // youtube.com/embed/VIDEO_ID (already embed format)
        if (!videoId) {
            match = this.url.match(/youtube\.com\/embed\/([^?&/]+)/);
            if (match) videoId = match[1];
        }

        // youtube.com/shorts/VIDEO_ID
        if (!videoId) {
            match = this.url.match(/youtube\.com\/shorts\/([^?&/]+)/);
            if (match) videoId = match[1];
        }

        if (!videoId) return null;
        this.url =  `https://www.youtube.com/embed/${videoId}`;
    })
    

export const Url = mongoose.model("Url", youtubeLinkSchema);
