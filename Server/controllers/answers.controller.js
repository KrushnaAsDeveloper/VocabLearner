import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Answer } from "../models/answers.model.js";
import {ApiError} from "../utils/ApiError.js"
export const addAnswerToDb = asyncHandler(async (req, res)=>{
    const {ans} = req.body;
    if(!ans){
        throw new ApiError(404, "No Answers Found !")
    }

    const allAnswers = await Answer.insertMany(ans)


    res.status(200).json(new ApiResponse(200, allAnswers, "Answers are added to db"))

    
})