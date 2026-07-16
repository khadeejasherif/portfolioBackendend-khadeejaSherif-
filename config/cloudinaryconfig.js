const cloudinary = require('cloudinary').v2;
const multer = require('multer');



// Connect to Cloudinary account 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Set up Multer to store incoming file data in temporary RAM memory buffer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = { upload, cloudinary };