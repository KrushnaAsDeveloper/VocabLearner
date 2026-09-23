import { Router } from "express";
import {addAnswerToDb} from "../controllers/answers.controller.js"
const router = Router()


router.post("/saveAllAnswers", addAnswerToDb)

export default router