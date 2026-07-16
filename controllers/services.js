const {serviceModel}=require("../models/Service");
const crud = require("./crud");


const getServices = crud.getAll(serviceModel, "Service");
const getService = crud.getOne(serviceModel, "Service");
const addService = crud.createOne(serviceModel, "Service");
const updateService = crud.updateOne(serviceModel, "Service");
const deleteService = crud.deleteOne(serviceModel, "Service");

module.exports = {
    getServices,
    getService,
    addService,
    updateService,
    deleteService
};