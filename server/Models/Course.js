const mongoose = require("mongoose");
const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  code: {
    type: String,
  },
  instructorId: {
    type: String,
  },
  semester: {
    type: String,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  announcements: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Announcement'
}],
modules: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Module'
}],
assignments: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Assignment'
}]
});

module.exports = mongoose.model("Courses", CourseSchema);
