const express = require('express');
const cvRouter = express.Router();
const { getCv, uploadCv } = require('../controllers/cv')
const { isAuth } = require('../middleware/isAuth');
const { isAdmin } = require('../middleware/iaAdmin');
const { upload } = require('../config/cloudinaryconfig');

// Public route: Everyone can access the viewing link
cvRouter.get('/', getCv);

// Admin route: Expects a file field named "cvFile" inside the form data payload
cvRouter.post('/', isAuth, isAdmin, upload.single('cvFile'), uploadCv);

module.exports = { cvRouter };