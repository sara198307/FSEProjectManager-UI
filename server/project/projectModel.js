var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
  Project_ID: Number,
  Project: String,
  Start_Date: String,
  End_Date: String,
  Priority: Number,
  Manager: String
});

module.exports = mongoose.model('Project', ProjectSchema);