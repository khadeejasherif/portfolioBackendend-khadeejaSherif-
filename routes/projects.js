const express= require("express");
const projectRouter=express.Router();
const {getProjects,getProject ,addProjects,updateProjects,deleteProjects}=require("../controllers/project");
const {isAdmin}=require('../middleware/iaAdmin');
const {isAuth}=require('../middleware/isAuth');

projectRouter.get("/", getProjects);
projectRouter.get("/:id", getProject);
projectRouter.post("/",isAuth,isAdmin, addProjects);
projectRouter.put("/:id",isAuth,isAdmin, updateProjects);
projectRouter.delete("/:id",isAuth,isAdmin, deleteProjects);

module.exports = { projectRouter };