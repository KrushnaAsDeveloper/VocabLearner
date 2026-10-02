import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Vocab } from "../models/vocabulary.model.js";
import { Answer } from "../models/answers.model.js";
import mongoose from "mongoose";
import { Video } from "../models/video.model.js";


export const dashboad_data = asyncHandler(async (req, res)=>{
    const dash_data_watched_video = await Answer.distinct("videoId", {user : req.user._id})
    const dash_data_word_learned = await Answer.find({user : req.user._id}).select("-_id -questions -user -videoId")
    res.status(200).json(new ApiResponse(200, {watched : dash_data_watched_video.length, words : dash_data_word_learned}, "we got the join data of the vocab and answers"))
})