const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const {userModel}=require("../models/user");

async function isAuth(req, res, next) {
  let token = req.headers.token;
  
  // 1. CRITICAL: Add 'return' so execution stops if there is no token
  if (!token) {
    return res.status(401).json({ msg: "YOU ARE NOT AUTHORIZED, PLEASE LOGIN FIRST" });
  }

  try {
    // Verify the token
    let decode = await promisify(jwt.verify)(token, process.env.secret);

    console.log("Decoded Token Data:", decode);
    const freshUser = await userModel.findById(decode.id);
  if (!freshUser) {
    return res.status(401).json({ msg: "The user belonging to this token no longer exists." });
  }

  req.user = freshUser;



    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ msg: "YOU ARE NOT AUTHORIZED, try login again", err: err });
  }
}

module.exports = { isAuth };