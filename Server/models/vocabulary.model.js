import mongoose from "mongoose";

const vocabularySchema = new mongoose.Schema({
    videoId : {
        type : String, 
        required :true
    }, 
    segmentId : {
        type : Number, 
        required : true
    }, 
    vocabulary : {
        type : String, 
        required : true
    }, 
    meaning : {
        type : String, 
        required : true
    }, 
    type : {
        type : String, 
        required : true
    }, 
    example : { 
        type : String,  
        required : true
    }, 
    revisionQuestions : {
        type : [String], 
        required : true
    }
})


export const Vocab = mongoose.model("Vocab", vocabularySchema); 


