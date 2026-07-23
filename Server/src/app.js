import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import User from "../models/user.model.js";
import userRoutes from "../routes/user.route.js"
const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(cookieParser());
app.use(express.urlencoded({extended : true, limit:"20kb"}))
app.use(express.json({limit:"20kb"}));

// users routes from Router 
app.use("/api/v1/users", userRoutes);



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
