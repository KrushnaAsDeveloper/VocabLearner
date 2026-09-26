import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Vocab } from "../models/vocabulary.model.js";
import { Answer } from "../models/answers.model.js";
import mongoose from "mongoose";


export const dashboad_data = asyncHandler(async (req, res)=>{
   const data = await Answer.aggregate([
        {
            $match : {
                user : new mongoose.Types.ObjectId(req.user._id)
            }
        }, 
        {
            $lookup : {
                from : "vocabs", 
                localField : "questions", 
                foreignField : "_id", 
                as : "questionAnswers"
            }
        }, 
        {
            $addFields : {
                dataCounte : {$size : ""}
            }
        }
    ])

    res.status(200).json(new ApiResponse(200, data[0], "we got the join data of the vocab and answers"))
})