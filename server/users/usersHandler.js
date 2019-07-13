// require  helper, Task
var helper = require('../config/helper.js');
var User = require('./usersModel.js');

// export function
module.exports = {

 addUser: function (req, res) {
    var employeeID = req.body.employeeID;
    var newUserObj = req.body
    User.findOne({ 'Employee_ID': employeeID }, function (err, user) {
      if (err) { // notifies if error is thrown
        helper.sendError(err, req, res);
      } else {
        if (user) { // notifies if User is already taken
          helper.sendError("User already taken", req, res);
        } else {
          User.create(newUserObj, function (err, user) {
            if (err) { // notifies if error is thrown
              helper.sendError(err, req, res);
            } else { 
              res.json({
                'userid': user['id']
              });
            }
          });
        }
      }
    });
  },

  getUsersList: function (req, res) {
    User.find({})
      .then(function (users) {
        res.json(users);
      });
  },

  updateUser: function (req, res) {
    var id = req.body._id;
    var newvalues = { $set: { First_Name: req.body.firstName, Last_Name: req.body.lastName, Employee_ID: req.body.employeeID } };
    User.update({ _id: id }, newvalues, function (err, results) {
      if (err) { helper.sendError(err, req, res) } else {
        res.json(results)
      }
    });

  },

   //delete user
   deleteUser: function(req, res){
    var userid = req.params.id;

    User.remove({'_id': userid}, function(err, result){
      if (err) { // notifies if error is thrown
        console.log("mongo deleteOne list err: ", err);
        helper.sendError(err, req, res);
      } else { // delete successful, sends result of operation
        res.json(result);
      }
    });
  }

};