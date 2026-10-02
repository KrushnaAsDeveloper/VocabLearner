import mongoose from "mongoose";


const answersScheme = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : "User", 
        required :true
    }, 
    questions : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Vocab"
    }, 
    answers : {
        type : [String],
        default : []
    }, 
    videoId :{
        type : String, 
        required:true
    }
        
}, {timestamps : true})

export const Answer = mongoose.model("Answer", answersScheme)