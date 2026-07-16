const {cvModel} = require('../models/cv');
const { cloudinary } = require('../config/cloudinaryconfig');




let getCv = async (req, res) => {
  try {
    const cv = await cvModel.findOne();
    if (!cv) {
      return res.status(404).json({ message: "No CV uploaded yet." });
    }
    res.status(200).json(cv);
  } catch (err) {
    res.status(500).json({ message: "Server error fetching CV", error: err.message });
    console.log(err)
  }
};




let uploadCv = async (req, res) => {
  try {
   
    // 1. Check if a file was actually passed from the frontend
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a valid PDF file." });
    }

    // 2. Look up if an existing CV is already in the database
    let existingCv = await cvModel.findOne();

    // 3. If a CV already exists, delete the old file from Cloudinary first
    if (existingCv && existingCv.cloudinaryId) {
      await cloudinary.uploader.destroy(existingCv.cloudinaryId, { resource_type: 'raw' });
    }

    // 4. Open an upload stream to pipe the file bytes directly from RAM into Cloudinary
    cloudinary.uploader.upload_stream(
      {
        folder: 'portfolio_cvs',
        resource_type: 'raw', // "raw" is required by Cloudinary for PDFs
        public_id: `cv_${Date.now()}.pdf` // Gives the file a clean unique timestamp name
      },
      async (error, result) => {
        if (error) {
          return res.status(500).json({ message: "Cloudinary upload failed", error: error.message });
        }

        // 5. If a CV already exists, overwrite it with the new links
        if (existingCv) {
          existingCv.title = req.body.title || "Khadeeja_Sherif_CV";
          existingCv.fileUrl = result.secure_url;   // The public viewing link
          existingCv.cloudinaryId = result.public_id; // Saved for future deletion
          
          await existingCv.save();
          return res.status(200).json({ message: "CV updated successfully!", cv: existingCv });
        } else {
          // 6. If no CV exists, create the brand new entry
          const newCv = new cvModel({
            title: req.body.title || "Khadeeja_Sherif_CV",
            fileUrl: result.secure_url,
            cloudinaryId: result.public_id
          });
          
          await newCv.save();
          return res.status(201).json({ message: "CV uploaded successfully!", cv: newCv });
          console.log( "CV uploaded successfully!"+newCv )
        }
      }
    ).end(req.file.buffer); // Pass the raw file bytes into the upload stream

  } catch (error) {
    res.status(500).json({ message: "Server error uploading CV", error: error.message });
    console.log('Server error uploading CV'+ error);
  }
};


module.exports={getCv,uploadCv}
