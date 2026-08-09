import { v2 as cloudinary } from "cloudinary";
import { ApiError } from "./ApiError.js";
import fs from "fs";
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

export const uploadFileOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            throw new ApiError(501, "Error while uploading file");
        }
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "video",
        });
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath);
        throw new ApiError(500, error);
        return null;
    }
};


// we are now also uploading the video so we here also we have to check of duplicates and also if we are delete form the frontedn then is should be also delete from cloudinary 


