const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  name: String,
  mimeType: String,
  file_data: Buffer
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
