const express = require("express");
const contactRouter = express.Router();
const  { addContact,  getContacts,getContact,deleteContact}= require("../controllers/contact");
const {isAdmin}=require('../middleware/iaAdmin');
const {isAuth}=require('../middleware/isAuth');




contactRouter.post("/", addContact);

// // Admin only
contactRouter.get("/",isAuth,isAdmin, getContacts);
contactRouter.get("/:id",isAuth,isAdmin, getContact);
contactRouter.delete("/:id",isAuth,isAdmin, deleteContact);

module.exports = {contactRouter};