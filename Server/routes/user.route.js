import { Router } from "express";
import { loginUser, registerNewUser ,logoutUser, refreshAccessToken, editUserRoute, isLoggedIn} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";
const router = Router();
// register user route
router.post("/register",registerNewUser  )
// login user route
router.post("/login", loginUser)
// logout user route
router.get("/logout", verifyJWT,  logoutUser)
// refresh access token 
router.get("/re-login", refreshAccessToken)
// edit password 
router.post("/edit-user-pass",verifyJWT, editUserRoute)
export default router