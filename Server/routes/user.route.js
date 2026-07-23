import { Router } from "express";
import { loginUser, registerNewUser } from "../controllers/user.controller.js";
const router = Router();
// register user route
router.post("/register",registerNewUser  )
// login user route
router.post("/login", loginUser)
// logout user route


export default router