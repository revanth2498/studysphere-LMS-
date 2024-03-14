const Responses = require("../Services/ResponseService");
const LoginTokenService = require("../Services/LoginTokenService");
const AuthService = require("../Services/AuthService");
const IdentifyUserMiddleware = async (req, res, next) => {
  try {
    // Read the cookie
    console.log(req.cookies);
    const LoginToken = await req.cookies.LoginId;
    // Verify the token
    const userId = await LoginTokenService.verifyToken(LoginToken);
    if (userId) {
      const userObj = await AuthService.getuserById(userId);
      req.role = userObj.role;
      req.user = userObj;
      // req.userType = userObj.role
      next();
    } else {
      return res.json(Responses.Error("Error authenticating you!!"));
    }
  } catch (err) {
    console.log(err.toString());
    return res.json(Responses.Error("User cannot be identified!"));
  }
};
module.exports = { IdentifyUserMiddleware };
