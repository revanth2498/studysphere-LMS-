const mongoose = require("mongoose");

const AnnouncementSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  instructorId: {
    type: String
  },
  name: {
    type: String
  },
  announcementTitle:{
    type:String
  }
});

module.exports = mongoose.model("Announcement", AnnouncementSchema);
