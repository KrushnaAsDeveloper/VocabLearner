import { Router } from "express";
import { histroyData } from "../controllers/history.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";

const router = Router();


router.get('/histroy-data',verifyJWT,  histroyData )


export default router