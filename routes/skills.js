const express = require("express");
const { isAuth } = require("../middleware/isAuth");
const { isAdmin } = require("../middleware/iaAdmin");
const skillsRoutes = express.Router();
const {getSkills ,getSkill,addSkills,updateSkill ,deleteSkill }=require('../controllers/skills');


skillsRoutes.get('/',getSkills )  ;
skillsRoutes.get('/:id',getSkill)  ;
skillsRoutes.post('/',isAuth,isAdmin,addSkills);
skillsRoutes.put('/:id',isAuth,isAdmin,updateSkill);
skillsRoutes.delete('/:id',isAuth,isAdmin,deleteSkill );

module.exports={skillsRoutes};