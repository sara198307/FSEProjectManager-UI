var mongoose = require('mongoose');

var parentTaskSchema = new mongoose.Schema({
    Parent_ID: Number,
    Parent_Task: String
});

module.exports = mongoose.model('parentTask', parentTaskSchema);