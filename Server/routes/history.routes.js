import { Router } from "express";
import { histroyData, uploadData } from "../controllers/history.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";

const router = Router();


router.get('/youtube',verifyJWT,  histroyData )
router.get('/upload',verifyJWT,  uploadData )


export default router