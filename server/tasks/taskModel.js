var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
  Task_ID: Number,
  Parent_ID: String,
  Project_ID: String,
  Task: String,
  Start_Date: String,
  End_Date: String,
  Priority: Number,
  Status:Boolean  
});

module.exports = mongoose.model('Task', TaskSchema);