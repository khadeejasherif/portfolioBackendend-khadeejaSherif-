const {projectModel}=require('../models/projectsModel');
const crud=require('./crud');

//get
function getProjects(req,res){
projectModel.find()
.then((data)=>{
    console.log(` project fetched -->projects ${data}`)
    res.status(200).json({message:"project fetched successfully!",projects: data})
})
.catch((err)=>{
 console.log(` error fetching projects ${err}`)
    res.status(200).json({message:"error fetching projects",error: err})
})
}

//getbyId
const getProject=crud.getOne(projectModel,'project');


//post=>create
function addProjects(req,res){
console.log(req.body);
  let newProject= req.body;

  projectModel.create(newProject)
    .then(() => {
        console.log("project added")
      res.json({ msg: "project added ", project: newProject });
    })
    .catch((err) => {
      console.log("Error adding new project", err);
      res.status(500).json({ msg: "Error adding new project", error: err });
    });

}

//put => update >>> findByIdAndUpdate(id)
function updateProjects(req,res){
    let id =req.params.id;
    let newUpdate= req.body;

 // { new: true } returns the updated document instead of the old one   
    projectModel.findByIdAndUpdate(id,newUpdate,{ new: true })
    .then((data)=>{
          console.log(`project of id : ${id} is updated`)
      res.json({ msg: `project of id : ${id} is updated`, project: data });

    })
    .catch((err)=>{
          console.log(`Error updating  project of id :${id}`, err);
      res.status(500).json({ msg: `Error updating  project of id :${id}`, error: err });

    })


}


//delete  >>> findByIdAndDelete(id)
function deleteProjects(req,res){
    let id =req.params.id;
      projectModel.findByIdAndDelete(id)
    .then((deletedProject)=>{
 if (!deletedProject) {
        return res.status(404).json({ 
          message: "Could not delete. Project not found!" 
        });
      }else{

    console.log(`project of id : ${id} is deleted`)
      res.json({ msg: `project of id : ${id} is deleted`, project: deletedProject });

    }})
    .catch((err)=>{
          console.log(`Error deleting  project of id :${id}`, err);
      res.status(500).json({ msg: `Error  deleting   project of id :${id}`, error: err });

    })

}


module.exports={getProjects,getProject,addProjects,updateProjects,deleteProjects}