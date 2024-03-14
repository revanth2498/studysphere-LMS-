const mongoose = require("mongoose");
const Module = require("./moduleSchema");
const Assignment = require("./assignmentSchema");

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
  content: {
    modules: [Module.schema], // Use Module schema here
    assignments: [Assignment.schema], // Use Assignment schema here
  },
  approved: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Course", CourseSchema);
