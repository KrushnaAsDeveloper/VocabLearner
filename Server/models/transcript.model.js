import mongoose from "mongoose";


const TranscriptSchema = new mongoose.Schema({
    segmentId : {
        type : String, 
        required : true
    }, 
    text : {
        type : String, 
        required : true
    }, 
    start : {
        type : Number, 
        required : true
    }, 
    end : {
        type : Number, 
        required : true
    }, 
    sourceType : {
        type : String, 
        enum : ["youtube", "whisper"]
    },
    user : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : "user"
    }, 
     
    videoId : {
        type : String, 
        required : true 
    }, 
    video : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "Video"
    }
} , {timestamps : true} )


export const Transcript = mongoose.model("Transcript", TranscriptSchema)