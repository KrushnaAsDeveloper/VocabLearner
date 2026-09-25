import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Answer } from "../models/answers.model.js";
import {ApiError} from "../utils/ApiError.js"
export const addAnswerToDb = asyncHandler(async (req, res)=>{
    const {allAnswers} = req.body;
    console.log("data", allAnswers)
    // if(!ans){
    //     throw new ApiError(404, "No Answers Found !")
    // }

    const final = await Answer.insertMany(allAnswers)


    res.status(200).json(new ApiResponse(200, final, "Answers are added to db"))

    
})