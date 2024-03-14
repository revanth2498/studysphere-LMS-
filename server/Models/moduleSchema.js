const mongoose = require("mongoose");

const ModuleSchema = new mongoose.Schema({
  instructorId: {
    type: String
  },
  courseCode: {
    type: String
  },
  moduleName:{
    type: String
  },
  content:{
    type: String
  },
  courseId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Courses'
  },
  file:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'File'
  }
});

module.exports = mongoose.model("Module", ModuleSchema);
