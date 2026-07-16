const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image_url: {
    type: String,
    required: true,
    trim: true
  }
  ,category: { 
    type: String, 
    
    enum: ['Frontend', 'Backend', 'Database', 'Tools', 'Other'] 
  },
 
}, { timestamps: true });

const skillsModel=mongoose.model('Skills', skillSchema);
module.exports={skillsModel};