const mongoose=require('mongoose');

const fileSchema = new mongoose.Schema({
    filename:String,
    s3_key:String,
    url:String
});

module.exports=mongoose.model("File",fileSchema);