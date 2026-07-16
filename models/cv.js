const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "Khadeeja_Sherif_CV"
  },
  fileUrl: {
    type: String,
    required: true
  },
  cloudinaryId: {
    type: String,
    required: true
  }
}, { timestamps: true });
const cvModel=mongoose.model('CV', cvSchema);

module.exports = {cvModel};