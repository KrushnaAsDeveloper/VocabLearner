import { Router } from "express";
import {addAnswerToDb} from "../controllers/answers.controller.js"
import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";
const router = Router()


router.post("/saveAllAnswers", verifyJWT,  addAnswerToDb)

export default router