const Responses = require("../Services/ResponseService");
const AdminIdentifierMiddleware = (req, res, next) => {
  try {
    if (req.role == "admin") {
      next();
    } else {
      return res.json(Responses.Error("You cannot access this route!"));
    }
  } catch (err) {
    console.log(err.toString());
    return res.json(Responses.Error("User cannot be identified!"));
  }
};
module.exports = { AdminIdentifierMiddleware };
