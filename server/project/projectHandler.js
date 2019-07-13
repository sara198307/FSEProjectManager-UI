// require  helper, Task
var helper = require('../config/helper.js');
var Project = require('./projectModel.js');

// export function
module.exports = {

  // insert i.e add project
  addProject: function (req, res) {
    var project = req.body.Project;
    var newProjectObj = req.body
    Project.findOne({ 'Project': project }, function (err, project) {
      if (err) { // notifies if error is thrown
        helper.sendError(err, req, res);
      } else {
        if (project) { // notifies if email is already taken
          helper.sendError("project already taken", req, res);
        } else {
          Project.create(newProjectObj, function (err, project) {
            if (err) { // notifies if error is thrown
              helper.sendError(err, req, res);
            } else { // signup success, assigns jwt session token
              res.json({
                'projectid': project['id']
                // anything else to send back on success?
              });
            }
          });
        }
      }
    });
  },

  //get all projects
  getProjectsList: function (req, res) {
    Project.find({})
      .then(function (projects) {
        res.json(projects);
      });
  },

  //update project
  updateProject: function (req, res) {
    var id = req.body._id;
    var newvalues = { $set: { End_Date: req.body.End_Date, Manager: req.body.Manager, Priority: req.body.Priority, Project: req.body.Project,Start_Date: req.body.Start_Date } };
    Project.update({ _id: id }, newvalues, function (err, results) {
      if (err) { helper.sendError(err, req, res) } else {
        res.json(results)
      }
    });
  },

  //delete Project
  deleteProject: function (req, res) {
    var projectId = req.params.id;

    Project.remove({ '_id': projectId }, function (err, result) {
      if (err) { // notifies if error is thrown
        helper.sendError(err, req, res);
      } else { // delete successful, sends result of operation
        res.json(result);
      }
    });
  }

};