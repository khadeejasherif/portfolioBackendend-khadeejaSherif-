const express = require("express");
const {userModel} = require("../models/user");
const { isAuth } = require("../middleware/isAuth");
const { addUser,login,getLoggedInProfile }=require('../controllers/user')


const  userRoutes=express.Router();

userRoutes.post("/Register" ,addUser);
userRoutes.post("/Login" ,login);
userRoutes.get("/profile",isAuth,getLoggedInProfile);


module.exports={ userRoutes };