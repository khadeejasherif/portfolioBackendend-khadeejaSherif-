const mongoose=require("mongoose");

const projectSchema =new mongoose.Schema({
    title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    required: true,
    trim: true
  },
  // tags ( ['React', 'TypeScript', 'Angular']) for filtering on the frontend
  tags: {
    type: [String],
    default: []
  },
  demoUrl: {
    type: String,
    trim: true
    ,
   validate: {
      validator: function(v) {
        return v === '' || /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },
  githubUrl: {
    type: String,
    trim: true,
   validate: {
      validator: function(v) {
        return v === '' || /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  
  },
  //  to manually order projects on  frontend 
  order: {
    type: Number,
    default: 0
  },
  //to put it first
  featured: {
    type: Boolean,
    default: false
  }
}, { timestamps: true }

);

//to be visible in mongo
let projectModel = mongoose.model("projects", projectSchema);

module.exports={ projectModel };


























