const crud = require("./crud");
const {skillsModel}=require('../models/skills');

const getSkills = crud.getAll(skillsModel, "Skills");
const getSkill = crud.getOne(skillsModel, "Skills");
const addSkills = crud.createOne(skillsModel, "Skills");
const updateSkill  = crud.updateOne(skillsModel, "Skills");
const deleteSkill  = crud.deleteOne(skillsModel, "Skills");

module.exports={getSkills ,getSkill,addSkills,updateSkill ,deleteSkill };