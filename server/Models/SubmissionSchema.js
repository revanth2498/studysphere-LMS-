const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema({
  studentusername: {
    type: String,
  },
  studentSubmittedFile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File',
  },
  studentSubmittedText: {
    type: String,
  },
  studentSubmittedMedia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File',
  },
  grade:{
    type:Number,
  },
  assignmentName:{
    type:String,
  },
  courseCode:{
    type: String,
  },
});

module.exports = mongoose.model("Submissions", SubmissionSchema);
