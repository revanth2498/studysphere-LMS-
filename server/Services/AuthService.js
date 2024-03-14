const UserModel = require("../Models/User");
const SHA256 = require("crypto-js/sha256");
const Responses = require("./ResponseService");
const MailerService = require("./MailerService");
const LoginTokenService = require("./LoginTokenService");

const getuserById = async (userId) => {
  try {
    const userObj = await UserModel.findOne({ _id: userId });
    if (userObj) {
      return userObj;
    }
    return false;
  } catch (err) {
    console.log(err.toString());
    return false;
  }
};
const getUser = async (username) => {
  try {
    const user = await UserModel.findOne({ username });
    if (user) return user;
    else return false;
  } catch (err) {
    console.log(err.toString());
    return false;
  }
};
const updateUser = async (username, payload) => {
  try {
    const status = await UserModel.updateOne({ username }, { $set: payload });
    if (status.acknowledged) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err.toString());
    return false;
  }
};

const login = async (username, password) => {
  try {
    const pwd = SHA256(password).toString();
    const user = await UserModel.findOne({ username: username, password: pwd });
    if (user) {
      const token = await LoginTokenService.addToken(user);
      if (token) {
        return [token, user];
      }
      return [false, false];
    } else {
      return [false, false];
    }
  } catch (err) {
    console.log(err.toString());
    return [false, false];
  }
};
const register = async (username, email, password) => {
  try {
    const status2 = await UserModel.findOne({ username: username });
    if (status2) {
      return Responses.Error(
        "We already have a user registered with that username."
      );
    }

    console.log(email);
    const status1 = await UserModel.findOne({ email: email });
    console.log("hellop", JSON.parse(JSON.stringify(status1)));
    if (status1)
      return Responses.Error(
        "We already have a user registered with that mail ID."
      );

    const user = new UserModel({
      username,
      email,
      role: "student",
      password: SHA256(password).toString(),
    });
    const status = await user.save();
    if (status) return Responses.Success("User registered successfully");
    return Responses.Error("Error signing you up!");
  } catch (err) {
    console.log(err.toString());
    return Responses.Error("Some error occured");
  }
};

const generateOTP = (len) => {
  var digits = "0123456789";
  ans = "";
  for (let i = 0; i < len; i++) {
    ans += digits[Math.floor(Math.random() * 10)];
  }
  return ans;
};

const requestOTP = async (username) => {
  try {
    const User = await getUser(username);
    if (User) {
      // Generate new otp
      const otp = generateOTP(6);
      // Update the user's OTP
      User.otp = otp;
      // Update user
      mailDetails = {
        to: [User.email],
        mailingDetails: {
          subject: "OTP Request for password change",
          header: "Your OTP for password change",
          body: "Your OTP is :" + otp,
        },
      };
      const status1 = await MailerService.sendMail(mailDetails);
      if (status1.Status != "S") {
        return false;
      }
      const status = await updateUser(username, { otp: String(otp) });
      console.log(status);
      if (status) return true;
      else return false;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err.toString());
    return false;
  }
};
const verifyOTP = async (username, otp, password, confirmPassword) => {
  try {
    // Fetch the user object
    const User = await getUser(username);
    if (User) {
      if (User.otp == otp) {
        if (password == confirmPassword) {
          const newPassword = SHA256(password).toString();
          const payLoad = { password: newPassword };
          const status = await updateUser(username, payLoad);
          if (status) {
            return Responses.Success("Successfully changed the password!");
          } else {
            return Responses.Error("Error updating your password!");
          }
        } else {
          return Responses.Error(
            "Password and confirm password does not match!"
          );
        }
      } else {
        return Responses.Error("wrong otp");
      }
    } else return Responses.Error("No user with this username found!");
  } catch (err) {
    console.log(err.toString());
    return false;
  }
};

module.exports = {
  getUser,
  updateUser,
  register,
  requestOTP,
  verifyOTP,
  login,
  getuserById,
};
