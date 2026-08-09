import { converUrlToEmbed, uploadVideo } from "../controllers/url.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router()

router.post("/convert",verifyJWT,  converUrlToEmbed)
router.post("/upload", verifyJWT,  upload.fields([{name : "video", maxCount :1}]), uploadVideo)
export default router