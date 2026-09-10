import { v2 as cloudinary } from "cloudinary";
import { ApiError } from "./ApiError.js";
import fs from "fs";
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});
import multer, { memoryStorage, MulterError } from "multer";

export const uploadFileOnCloudinary = async (fileBuffer, resourceType = "video") => {
  try {
    if (!fileBuffer) {
      return null;
    }

    const response = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: resourceType },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(fileBuffer);
    });

    return response;
  } catch (error) {
    throw new ApiError(500, error?.message || "Error while uploading file");
  }
};


// we are now also uploading the video so we here also we have to check of duplicates and also if we are delete form the frontedn then is should be also delete from cloudinary 


