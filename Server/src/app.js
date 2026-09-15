import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import User from "../models/user.model.js";
import userRoutes from "../routes/user.route.js"
import urlRoute from "../routes/video.route.js"
import historyRoute from "../routes/history.routes.js"
import vocabularyExtraction from "../routes/vocabulary.routes.js"
const app = express();

app.use(cors({
   origin :  process.env.CLIENT_URL_LOCAL, 
  credentials: true, 
}));
app.use(cookieParser());
app.use(express.urlencoded({extended : true, limit:"20kb"}))
app.use(express.json({limit:"20kb"}));
app.use(express.static("public"))
// users routes from Router 
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/video", urlRoute)
app.use("/api/v1/history", historyRoute)
app.use("/api/v1/vocab", vocabularyExtraction )
app.use((err, req, res, next)=>{
  const statusCode = err.statusCode || 500
  res.status(statusCode).json({
    success : false, 
    message : err.message || "Internal Server Error", 
    stack : err.stack , 
    errors : err.errors || [], 
  })
})
export { app };
