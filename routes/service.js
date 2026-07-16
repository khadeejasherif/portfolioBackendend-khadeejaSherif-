const express = require("express");
const { isAuth } = require("../middleware/isAuth");
const { isAdmin } = require("../middleware/iaAdmin");
const serviceRoutes = express.Router();
const { getServices,getService, addService, updateService, deleteService }=require('../controllers/services');


serviceRoutes.get('/',getServices)  ;
serviceRoutes.get('/:id',getService)  ;
serviceRoutes.post('/',isAuth,isAdmin,addService);
serviceRoutes.put('/:id',isAuth,isAdmin,updateService);
serviceRoutes.delete('/:id',isAuth,isAdmin,deleteService);


module.exports={serviceRoutes};


   
   
   