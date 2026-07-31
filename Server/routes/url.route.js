import { converUrlToEmbed } from "../controllers/url.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";
const router = Router()

router.post("/convert",verifyJWT,  converUrlToEmbed)

export default router