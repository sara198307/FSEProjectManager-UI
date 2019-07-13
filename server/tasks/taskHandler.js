// require  helper, Task
var helper = require('../config/helper.js');
var Task = require('./taskModel.js');
var parentTask = require('./parentTaskModel.js');

// export function
module.exports = {

  addTask: function (req, res) {
    var task = req.body.Task;
    var parent = req.body.Parent_Task;
    var newTaskObj = req.body;
    if(parent){ // for parent task
      parentTask.findOne({ 'Parent_Task': parent }, function (err, ptask) {
        if (err) { // notifies if error is thrown
          helper.sendError(err, req, res);
        } else {
          if (ptask) { // notifies if ptask is already taken
            helper.sendError("ptask already taken", req, res);
          } else {
            parentTask.create(newTaskObj, function (err, ptask) {
              if (err) { // notifies if error is thrown
                helper.sendError(err, req, res);
              } else { 
                res.json({
                  'ptaskid': ptask['id']
                });
              }
            });
          }
        }
      });
    } else{ // child task
      Task.findOne({ 'Task': task }, function (err, task) {
        if (err) { // notifies if error is thrown
          helper.sendError(err, req, res);
        } else {
          if (task) { // notifies if task is already taken
            helper.sendError("task already taken", req, res);
          } else {
            Task.create(newTaskObj, function (err, task) {
              if (err) { // notifies if error is thrown
                helper.sendError(err, req, res);
              } else { 
                res.json({
                  'taskid': task['id']
                });
              }
            });
          }
        }
      });
    }
    
  },

  getTasksList: function (req, res) {
    var id=req.params.id;
    Task.find({'Project_ID':id})
      .then(function (tasks) {
        res.json(tasks);
      });
  },

  getParentTasksList: function (req, res) {
    parentTask.find({})
      .then(function (ptasks) {
        res.json(ptasks);
      });
  },

  updateTask: function (req, res) {
    var id = req.body._id;
    var status = req.body.Status;
    var newvalues;
    if(status){
      newvalues = { $set: { Status: status} };
    } else{
      newvalues = { $set: { Task: req.body.Task, Parent_ID: req.body.Parent_ID, Project_ID: req.body.Project_ID,Start_Date: req.body.Start_Date, End_Date: req.body.End_Date, Priority: req.body.Priority } };
    }
    Task.update({ _id: id }, newvalues, function (err, results) {
      if (err) { helper.sendError(err, req, res) } else {
        res.json(results)
      }
    });

  }

};