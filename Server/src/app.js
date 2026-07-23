import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import User from "../models/user.model.js";
const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(cookieParser());
app.use(express.urlencoded({extended : true, limit:"20kb"}))
app.use(express.json({limit:"20kb"}));



export { app };
