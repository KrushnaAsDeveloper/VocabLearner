import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Answer } from "../models/answers.model.js";
import {ApiError} from "../utils/ApiError.js"
export const addAnswerToDb = asyncHandler(async (req, res) => {
  const { allAnswers, vocabId, videoId } = req.body;

  if (!allAnswers?.length) {
    throw new ApiError(404, "No Answers Found!");
  }

  let final = await Answer.find({user: req.user?._id, questions:vocabId })


  const answersOnly = allAnswers.map((ans) => ans.ans)
  if(final.length === 0){
     final = await Answer.create({
    user: req.user?._id,
    questions: vocabId,
    answers: answersOnly,
    videoId : videoId
  });
  }

  res.status(200).json(new ApiResponse(200, final, "Answers are added to db"));
});