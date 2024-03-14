const mongoose = require("mongoose");

const LoginTokenSchema = new mongoose.Schema({
  loginId: {
    type: String,
  },
  token: {
    type: String,
  },
});

module.exports = mongoose.model("LoginTokens", LoginTokenSchema);
