import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Answer } from "../models/answers.model.js";
import {ApiError} from "../utils/ApiError.js"
export const addAnswerToDb = asyncHandler(async (req, res) => {
  const { allAnswers, vocabId } = req.body;

  if (!allAnswers?.length) {
    throw new ApiError(404, "No Answers Found!");
  }

  const answersOnly = allAnswers.map((item) => item.ans);

  const final = await Answer.create({
    user: req.user?._id,
    questions: vocabId,
    answers: answersOnly,
  });

  res.status(200).json(new ApiResponse(200, final, "Answers are added to db"));
});