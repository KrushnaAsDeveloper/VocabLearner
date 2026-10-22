import { Router } from "express";
import {
  dashboad_data,
  getDashboardOverview,
} from "../controllers/dashboard.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";

const router = Router();

router.get("/data", verifyJWT, dashboad_data);
router.get("/overview", verifyJWT, getDashboardOverview); 

export default router;