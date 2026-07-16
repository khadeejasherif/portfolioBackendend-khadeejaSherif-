const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const serviceModel=mongoose.model('Service', serviceSchema);
module.exports = {serviceModel};
