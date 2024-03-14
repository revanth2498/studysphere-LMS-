const PermissionService = require("../Services/PermissionService");
const Responses = require("../Services/ResponseService");
var User = require("../Models/User");

const changePermission = async (req, res) => {
  try {
    const status = await PermissionService.changePermission(
      req.user,
      req.body.usie,
      req.body.role
    );
    return res.json(status);
  } catch (err) {
    console.log(err.toString());
    return res.json(Responses.Error("Some error occurred!"));
  }
};

const assignInstructorRole = async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    console.log(user);
    res.status(400).send({ message: "user not found" });
    return;
  } else {
    try {
      //await User.findOneAndUpdate({ username: username, role: "Instructor" });
      await User.findOneAndUpdate(
        { username: username }, 
        { $set: { role: "Instructor" } },
        { new: true } 
      );
      res.status(200).send({ status: "success", message: "Request approved" });
      return;
    } catch (e) {
      res.status(500).send({ message: "error" });
    }
  }
};

module.exports = { changePermission, assignInstructorRole };
