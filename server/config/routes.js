// require taskHandler
var taskHandler = require('../tasks/taskHandler.js');
var userHandler = require('../users/usersHandler.js');
var projectHandler = require('../project/projectHandler.js');

// export function
module.exports = function (app, express) {

    // GET- All Tasks based on project
     app.get('/api/tasks/:id', taskHandler.getTasksList);
   // GET- All Parent Tasks
    app.get('/api/parenttasks', taskHandler.getParentTasksList);

    // PUT - for updating Task
    app.put('/api/updatetask', taskHandler.updateTask);

    // POST - addTask
    app.post('/api/addtask', taskHandler.addTask);

    // // POST - addUser
     app.post('/api/adduser', userHandler.addUser);

    // // GET- All Users
     app.get('/api/users', userHandler.getUsersList);

    // // PUT - for updating User
     app.put('/api/updateUser', userHandler.updateUser);

    // // delete - for deleting User
     app.delete('/api/users/:id', userHandler.deleteUser);

    //  // POST - addproject
      app.post('/api/addproject', projectHandler.addProject);

    //  // GET- All Projects
      app.get('/api/projects', projectHandler.getProjectsList);
 
     //PUT - for updating project
    app.put('/api/updateProject', projectHandler.updateProject);
 
    // delete - for deleting project
    app.delete('/api/projects/:id', projectHandler.deleteProject);

};