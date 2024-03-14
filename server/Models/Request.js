const mongoose = require("mongoose")
const RequestSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  requestType:{
    type:String,
  },
  approved:{
    type:Boolean,
  },
  instructorId: {
    type: String,
  },
  approved:{
    type:String,
    default: "New"
    },
    courseName: {
      type: String,
    }
    
});

module.exports = mongoose.model("Requests", RequestSchema);
