const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {
        type: String, required: true, trim: true,
        minlength: [2, "Name must be at least 2 characters long"],
        maxlength: [50, "Name cannot exceed 50 characters"]
    },
    email: {
        type: String, required: true, unique: true, trim: true,
        lowercase: true, 
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"]
    },
    password: {
        type: String, required: true

    },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    createdAt: { type: Date, default: Date.now }
});

//hashing password
userSchema.pre("save", async function (next) {
    console.log("password from model ", this.password);
    //hashed pass + salt
    try {
        const salt = await bcrypt.genSalt(10);
        console.log("salt", salt);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        console.log("hashedPassword", hashedPassword);
        this.password = hashedPassword;
        // next();
    }
    catch (err) {
        console.log("error hashing password", err)
    }

});


const userModel = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = { userModel };