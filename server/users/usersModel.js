var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  User_ID: Number,
  First_Name: String,
  Last_Name: String,
  Employee_ID: Number,
  Project_ID: Number,
  Task_ID: Number
});

module.exports = mongoose.model('User', UserSchema);