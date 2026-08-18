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
     
    videoId : {
        type : String, 
        required : true 
    }, 
} , {timestamps : true} )


export const Transcript = mongoose.model("Transcript", TranscriptSchema)