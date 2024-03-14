const JWT = require("jsonwebtoken");
const Responses = require("../Services/ResponseService");
const LoginToken = require("../Models/LoginToken");
const addToken = async (userObj) => {
  try {
    const Token = JWT.sign({ id: userObj._id }, "SECRETKEY");
    const payLoad = { loginId: userObj._id, token: Token };
    const status = await LoginToken.create(payLoad);
    if (status) {
      return Token;
    } else {
      return Responses.Error(
        "Some error occured while saving your login token!"
      );
    }
  } catch (err) {
    console.log(err.toString());
    return Responses.Error("Some unusal error occured!");
  }
};

const verifyToken = async (token) => {
  try {
    const status1 = await LoginToken.findOne({ token: token });
    if (status1) {
      return status1.loginId;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err.toString());
    return false;
  }
};

module.exports = {
  verifyToken,
  addToken,
};
