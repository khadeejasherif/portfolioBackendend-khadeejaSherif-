const { contactModel } = require("../models/contact");
const crud = require("./crud");
const sendEmail = require("../utils/sendEmail");

function addContact(req,res){

        contactModel.create(req.body)
        .then(async (data) => {

            await sendEmail(data);

            res.status(201).json({
                message: "Message sent successfully.",
                contact: data
            });
        })
        .catch((err) => {
            res.status(400).json({
                message: "Error sending message.",
                error: err
            });
        });
}



const getContacts = crud.getAll(contactModel, "Contacts");
const getContact = crud.getOne(contactModel, "Contact");
const deleteContact = crud.deleteOne(contactModel, "Contact");

module.exports = {
    addContact,
    getContacts,
    getContact,
    deleteContact
};