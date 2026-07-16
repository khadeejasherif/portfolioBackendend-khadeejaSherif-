//Attaches that verified user object directly to the request object as req.use

function isAdmin(req, res, next) {
    if (req.user.role !== "admin") return res.status(403).send(" Action Forbidden");
    next();
  }

  module.exports={isAdmin}