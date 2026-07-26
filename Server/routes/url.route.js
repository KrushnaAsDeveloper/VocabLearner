import { converUrlToEmbed } from "../controllers/url.controller.js";
import { Router } from "express";
const router = Router()

router.post("/convert", converUrlToEmbed)

export default router