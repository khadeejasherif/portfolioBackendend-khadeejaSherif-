require('dotenv').config(); 
const express=require('express');
const app=express();
const mongoose = require("mongoose");
const {projectRouter}=require("./routes/projects");
const { userRoutes }=require("./routes/user");
const {adminRoutes}=require("./routes/admin");
const{serviceRoutes}=require('./routes/service');
const { cvRouter } = require('./routes/cv');
const{skillsRoutes}=require('./routes/skills');
const{contactRouter}=require('./routes/contact');
const cors = require("cors");

app.use(cors());

///middleware//express
app.use(express.json());




// 1. IMPROVED DATABASE CONNECTION
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  await mongoose.connect(process.env.mongoUrl);
};
// 2. CONNECT BEFORE PROCESSING
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    return res.status(500).json({
      message: "Database connection failed",
      error: err.message,
    });
  }
});

app.get("/", (req, res) => {
  res.json({
    message: "Backend is running",
    mongoConnected: mongoose.connection.readyState,
  });
});

// endpoints /ROUTES//
app.use("/projects",projectRouter)
app.use("/api/users", userRoutes);  
app.use("/api/admin", adminRoutes);
app.use('/api/cv', cvRouter);
app.use('/services',serviceRoutes);
app.use('/Skills',skillsRoutes);
app.use('/contactUs',contactRouter);
app.get('/favicon.ico', (req, res) => res.status(204).end());
app.get('/favicon.png', (req, res) => res.status(204).end());


//========error handling======/
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: "server error!!!! ", err });
});

//=====notfound routes======/
app.use((req, res, next) => {
  res.status(404).json("route is not found");
});


//db connection to mongo
// mongoose
//   .connect(
//     process.env.mongoUrl,
//   )
//   .then(() => {
//     console.log("connected to MONGO DB successfully ");
//   })
//   .catch((err) => {
//     console.log("cant connect to mongo",err);
//   });
app.listen(process.env.port,(err)=>{
    if(err){
        console.log("can't listen on the port");
    }else{
        console.log("listen on port successfully");
    }

});

// 3. EXPORT FOR VERCEL (Remove app.listen)
module.exports = app;




