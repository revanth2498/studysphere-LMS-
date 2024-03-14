const Responses = require("../Services/ResponseService");
const InstructorIdentifierMiddleware = (req, res, next) => {
  try {
    if (req.role == "instructor") {
      next();
    } else {
      return res.json(Responses.Error("You cannot access this route!"));
    }
  } catch (err) {
    console.log(err.toString());
    return res.json(Responses.Error("User cannot be identified!"));
  }
};
module.exports = { InstructorIdentifierMiddleware };
