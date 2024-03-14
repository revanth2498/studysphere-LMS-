const AuthenticationService = require("../Services/AuthService");
const Responses = require("../Services/ResponseService");
const login = async (req, res) => {
  try {
    const status = await AuthenticationService.login(
      req.body.username,
      req.body.password
    );
    if (status[0]) {
      await res.cookie("LoginId", status, {
        expires: new Date(Date.now() + 258920),
        httpOnly: true,
      });
      await res.cookie("OURTOKEN", {
        secure: true,
        httpOnly: false,
        sameSite: "None",
        domain: "localhost:3000",
      });
      return res.json(Responses.Success("Successfully logged in!", status[1]));
    } else return res.json(Responses.Error("Wrong username or password!"));
  } catch (err) {
    console.log(err.toString());
    return res.json(Responses.Error("Some error occurred!"));
  }
};

const signUp = async (req, res) => {
  try {
    console.log(req.body);
    const status = await AuthenticationService.register(
      req.body.username,
      req.body.email,
      req.body.password
    );

    if (status) {
      return res.json(status);
    } else {
      throw "Status unknown in signup";
    }
  } catch (err) {
    console.log(err.toString());
    return res.json(Responses.Error("Some error occurred!"));
  }
};

const forgotPassword = async (req, res) => {
  try {
    const status = await AuthenticationService.verifyOTP(
      req.body.username,
      req.body.otp,
      req.body.password,
      req.body.confirmPassword
    );
    console.log(status);
    return res.json(status);
  } catch (err) {
    console.log(err.toString());
    return res.json(Responses.Error("Some error occurred!"));
  }
};

const requestOTP = async (req, res) => {
  try {
    console.log("herein req otp");
    console.log(req.body);
    const status = await AuthenticationService.requestOTP(req.body.username);
    if (status) {
      return res.json(Responses.Success("OTP sent successfully!!"));
    } else {
      throw "Status unkown in requestOTP";
    }
  } catch (err) {
    console.log(err.toString());
    return res.json(Responses.Error("Some error occurred!"));
  }
};

module.exports = {
  requestOTP,
  forgotPassword,
  signUp,
  login,
};
