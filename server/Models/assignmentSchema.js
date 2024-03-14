const mongoose = require("mongoose");

const AssignmentSchema = new mongoose.Schema({
  assignmentName: {
    type: String,
  },
  assignmentContentDisplayed: {
    type: String,
  },
  deadline: {
    type: Date,
  },
  datePublished:{
    type: Date,
  },
  courseName:{
    type:String,
  },
  courseCode:{
    type: String,
  },
  instructorId:{
    type: String,
  },
  semester:{
    type:String,
  },
  courseId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Courses'
  },
  assignmentFile:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'File'
  },
  submissions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Submissions'
  }],
});

module.exports = mongoose.model("Assignment", AssignmentSchema);
