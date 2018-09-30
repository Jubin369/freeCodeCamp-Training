const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Exercise data schema
let exerciseSchema=new Schema({
  userId:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  duration:{
    type:Number,
    default:0
  },
  date:{
    type:Date,
    required:true
  }
});

let Exercise = module.exports = mongoose.model('Exercise',exerciseSchema);