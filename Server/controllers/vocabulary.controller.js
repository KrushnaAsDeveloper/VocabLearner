import { Vocab } from "../models/vocabulary.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import data from '../utils/SampleData.json' with { type: 'json' };
import { Transcript } from "../models/transcript.model.js";
export const save_data = asyncHandler(async (req, res)=>{

 
res.status(200).json(new ApiResponse(200, data, "data saved !"))
}) 

