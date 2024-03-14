const mongoose = require("mongoose")
const EnrollmentSchema = new mongoose.Schema({
  studentUsername: {
    type: String,
    required: true,
  },
  studentnumber: {
    type: String,
  },
  course: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Courses'
}],
});

module.exports = mongoose.model("EnrollementStudent", EnrollmentSchema);