import { Router } from "express";
import { histroyData, uploadData, deleteHistory, fetchVideo } from "../controllers/history.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";

const router = Router();


router.get('/youtube',verifyJWT,  histroyData )
router.get('/upload',verifyJWT,  uploadData )
router.get('/get_video/:id', fetchVideo)
router.delete('/delete-history/:id', deleteHistory)
export default router