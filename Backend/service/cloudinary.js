    // In a file like cloudinaryConfig.js
    const cloudinary = require('cloudinary').v2;
    require('dotenv').config();
    const fs=require('fs');

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    //upload function
    const uploadOnCloudinary=async (localFilePath)=>{
           try {
            if(!localFilePath || !fs.existsSync(localFilePath)){
                console.log("File doesn't exist :",localFilePath);
                return null;
            }

            const res=await cloudinary.uploader.upload(localFilePath,{
                resource_type:"auto",
                folder:"clubmate"
            });

            console.log("File uploaded successfully")
            fs.unlinkSync(localFilePath);
            return res;
           } catch (error) {
            console.log("Error uploading the file",error);
            return null;
            
           }
    }

    module.exports = uploadOnCloudinary;