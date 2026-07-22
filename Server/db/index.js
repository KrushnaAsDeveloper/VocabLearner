import mongoose from "mongoose";
import { db_name } from "../src/constant.js";
export const connectDB = async()=>{
    try {
        const connection= await mongoose.connect(`${process.env.MONGO_ATLAS_URL}/${db_name}`);  
        console.log(`MONGO ATLAS CONNECTED ${connection.connection.host}` )
        
    } catch (error) {
        console.log("MONOGO ATLAS CONNECTION ERROR");
        process.exit(1);
    }
}