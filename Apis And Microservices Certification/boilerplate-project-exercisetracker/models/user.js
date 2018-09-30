const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//User data schema
let userSchema=new Schema({
  userName:{
    type:String,
    required:true
  }
});

let User = module.exports = mongoose.model('User',userSchema);