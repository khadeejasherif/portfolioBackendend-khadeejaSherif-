const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {userModel}=require("../models/user");
const crud=require('./crud');

//admin
function getUsers(req, res) {
  userModel.find()
    .then((data) => {
      res.status(200).json({ msg: "users fetched successfully", data: data });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ msg: "Error handling fetching users", error: err });
    });
}

//getuser by id
const getUser=crud.getOne(userModel,'User');


//signup
function addUser(req, res) {
  const { name, email, password } = req.body;
  const safeUserData = { name, email, password };

  userModel.create(safeUserData)
    .then((createdUser) => {
      res.json({ msg: "user added ", data: createdUser });
    })
    .catch((err) => {
      // 1. Check if it's a MongoDB duplicate key error
      if (err.code === 11000) {
        return res.status(400).json({ 
          msg: "Registration failed", 
          error: "An account with this email address already exists." 
        });
      }

      // 2. Handle any other generic server errors
      console.log("Error while adding new user", err);
      res.status(500).json({ msg: "Error handling new user", error: err.message });
    });
}

//login
function login(req,res){
    const loginEmail=req.body.email;
    const loginPassword=req.body.password;
    console.log(loginEmail,loginPassword);
    if (!loginEmail || !loginPassword){
        return res.status(400).json({message:"please enter emain & password"})
    }

    userModel.findOne({email:loginEmail})
    .then((userDocument)=>{
 if (!userDocument){
    return res.status(401).json({message:"invalid email or password "})
    console.log(" email not found in db");
 }
 return bcrypt 
 .compare(loginPassword,userDocument.password)
 .then((isvalid)=>{
    //check if user password is the same in db
    if (!isvalid){
     return res.status(401).json("invalid email or password");
     console.log("password entered is not found in database");
    }
     
    //token generated
     const token =jwt.sign({id:userDocument._id,email:userDocument.email,role:userDocument.role},process.env.secret);
    res.status(200).json({ msg: "login successfully", token: token });
 
    })

    }).catch((err) => {
      console.log("err while FINDING email", err);
      res.status(500).json({ msg: "error while finding email", err: err });
    });

}

//update user ==> admin
function updateUsers(req,res){
    let id =req.params.id;
    let newUpdate= req.body;

 // { new: true } returns the updated document instead of the old one   
    userModel.findByIdAndUpdate(id,newUpdate,{ new: true })
    .then((data)=>{
          console.log(`user of id : ${id} is updated`)
      res.json({ msg: `user of id : ${id} is updated`, project: data });

    })
    .catch((err)=>{
          console.log(`Error updating  user of id :${id}`, err);
      res.status(500).json({ msg: `Error updating  user of id :${id}`, error: err });

    })


}


//delete user ==> admin
function deleteUsers(req,res){
    let id =req.params.id;
      userModel.findByIdAndDelete(id)
    .then((deletedUser)=>{
 if (!deletedUser) {
        return res.status(404).json({ 
          message: "Could not delete. user not found!" 
        });
      }

    console.log(`user of id : ${id} is deleted`)
      res.json({ msg: `user of id : ${id} is deleted`, user: deletedUser });

  
  })
    .catch((err)=>{
          console.log(`Error deleting  user of id :${id}`, err);
      res.status(500).json({ msg: `Error  deleting   user of id :${id}`, error: err });

    })

}

function getLoggedInProfile(req,res){
    res.json({ 
    message: "Welcome to your profile", 
    user: req.user 
  });

}

module.exports={getUsers,deleteUsers,updateUsers,login,addUser,getLoggedInProfile,getUser}