import mongoose, { Schema } from "mongoose";


const answersScheme = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : "User"
    }, 
    questions : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Vocab"
    }, 
    answers : {
        type : [String],
        default : []
    }
}, {timestamps : true})

export const Answer = mongoose.model("Answer", answersScheme)