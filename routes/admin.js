const express = require("express");
const User = require("../models/User");
const { isAuth} = require("../middleware/isAuth");
const { isAdmin }=require("../middleware/iaAdmin");
const { getUsers,deleteUsers,updateUsers,login,addUser,getLoggedInProfile,getUser }=require('../controllers/user');

const adminRoutes = express.Router();



// Get all users - admin only
adminRoutes.get("/users", isAuth, isAdmin,getUsers);

//get user by id
adminRoutes.get("/users/:id", isAuth, isAdmin,getUser);


// Promote/demote a user - admin only
adminRoutes.put("/users/:id/role", isAuth, isAdmin, updateUsers);

//delete users
adminRoutes.delete("/users/:id", isAuth, isAdmin,deleteUsers);


module.exports = {adminRoutes};