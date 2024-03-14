const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
  },
  displayName: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  otp: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
    strictQuery: false,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
  },
});

module.exports = mongoose.model("UserSigned", UserSchema);
