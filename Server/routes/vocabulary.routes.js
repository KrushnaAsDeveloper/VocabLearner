import { Router } from "express";
import { save_data } from "../controllers/vocabulary.controller.js";
const router = Router()


router.get("/save", save_data)

export default router