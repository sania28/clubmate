const express = require("express");
const router = express.Router();

const upload = require("../middleware/multer");
const uploadOnCloudinary = require("../utils/cloudinary");

const fs = require("fs");
const path = require("path");

router.post("/document", upload.single("file"), async (req, res) => {
  try {
            if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
    const filePath = req.file.path;
    const result=await uploadOnCloudinary(filePath);
    if (!result) {
      return res.status(500).json({ message: "Cloudinary upload failed" });
    }

    res.status(200).json({
      message: "File uploaded successfully",
      url: result.secure_url, //shareable link
    });
  } catch (error) {
    console.log(error);
    console.log("Upload Fail");

    res.status(500).json({ message: "Upload failed", error });
  }
});

module.exports = router;
