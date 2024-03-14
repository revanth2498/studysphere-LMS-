const mongoose = require("mongoose")
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
  semester:{
    type:String,
  },
  content:{
    type:{
      modules:{
        type:Array,
        of: Object
      },
      assignments:{
        type:Array,
        of: Object
      }
    }
  },
  approved:{
  type:Boolean,
  default: false
  }
    
});

module.exports = mongoose.model("DummyCourses", CourseSchema);
