import { converUrlToEmbed, uploadVideo } from "../controllers/video.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";
import multer, { memoryStorage } from "multer";
const router = Router()
const storage = multer.memoryStorage()
const upload = multer({storage})
router.post("/youtube",verifyJWT,  converUrlToEmbed)
router.post("/upload", verifyJWT,  upload.single("video"), uploadVideo)
export default router