import { Component, OnInit } from '@angular/core';
import { BackendApiService } from '../../services/backend-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  task = {
    'Project_ID':'',
    'Project':'',
    'parent':'',
    'Parent_ID':'',
    'user':'',
    'Priority':0,
    'startDate':'',
    'endDate':'',
    'TaskName':''
  };
  updateData: {
    '_id': '',
    'edit': false,
    'Task': '',
    'Start_Date': '',
    'End_Date': '',
    'Project_ID': '',
    'Priority': 0,
    'Parent_ID': ''
  };
  tasks: Object[];
  parentTasks: Object[];
  parentTasksCopy:Object[];
  projects: Object[];
  projectsCopy: Object[];
  users: Object[];
  request: object;
  currentDate: string;
  defaultEndDt: string;
  constructor(private BackendApiService: BackendApiService, private router: Router) { }

  ngOnInit() {
    this.currentDate = this.getcurrentDate().requestDt;
    this.defaultEndDt= this.getcurrentDate().defaultEndDt;
    this.updateData = this.BackendApiService.getData();
    if (this.updateData === undefined) {
      this.updateData = {
        '_id': '',
        'edit': false,
        'Task': '',
        'Start_Date': '',
        'End_Date': '',
        'Project_ID': '',
        'Priority': 0,
        'Parent_ID': ''
      };
    }
    this.task.Priority =0;
    this.task.startDate =this.currentDate;
    this.task.endDate =this.defaultEndDt;
    // this.task={
    //   'Priority': 0,
    //   'startDate':this.currentDate,
    //   'endDate':this.defaultEndDt
    // };
    this.getParentTasksList();
    this.getUersList();
    this.getProjectsList();
    if (this.updateData && this.updateData.edit) {
      this.task.Priority =this.updateData.Priority;
    this.task.startDate =this.updateData.Start_Date;
    this.task.endDate =this.updateData.End_Date;
    this.task.TaskName=this.updateData.Task;
      // this.task = {
      //   TaskName: this.updateData.Task,
      //   startDate: this.updateData.Start_Date,
      //   endDate: this.updateData.End_Date,
      //   Priority: this.updateData.Priority
      // }
    }
  }

  reset() {
    document.getElementById('reset').click();
    // this.task={
    //   'Priority': 0,
    //   'startDate':this.currentDate,
    //   'endDate':this.defaultEndDt
    // };
    this.task.Priority =0;
    this.task.startDate =this.currentDate;
    this.task.endDate =this.defaultEndDt;
  }

  getParentTasksList = function () {
    this.BackendApiService.getParentTasksList().subscribe((ptasks) => {
      this.parentTasks = ptasks;
      this.parentTasksCopy = ptasks;
      if (this.updateData && this.updateData.edit) {
        this.task.parent = this.getParentByFilter(this.updateData.Parent_ID);
      }

    });
  }

  getUersList = function () {
    this.BackendApiService.getUsersList().subscribe((users) => {
      this.users = users;
      this.usersCopy = users;
    });
  }

  getProjectsList = function () {
    this.BackendApiService.getProjectsList().subscribe((res) => {
      this.projects = res;
      this.projectsCopy = res;
      if (this.updateData && this.updateData.edit) {
        this.task.Project = this.getProjectByFilter(this.updateData.Project_ID);
      }
    })
  }

  addTask = function (task) {
    if (task.checked) {
      this.request = {
        'Parent_Task': this.task.TaskName,
      };
    } else {
      this.request = {
        'Parent_ID': this.task.Parent_ID,
        'Project_ID': this.task.Project_ID,
        'Task': this.task.TaskName,
        'Start_Date': this.task.startDate,
        'End_Date': this.task.endDate,
        'Priority': this.task.Priority
      };
    }
    this.BackendApiService.addTask(this.request)
      .subscribe(    //receive the data from service
        (value) => {
          document.getElementById('alert').innerHTML = 'Added Task Successfully!';
          document.getElementById('alert').classList.remove('d-none');
          this.reset();
          this.getParentTasksList();
        }
      );
    setTimeout(function () {
      document.getElementById('alert').classList.add('d-none');
    }, 5000);
  }


  selectProject = function (proj) {
    this.task.Project_ID = proj._id;
    this.task.Project = proj.Project;
    this.searchProject = '';
  }

  selectParent = function (parent) {
    this.task.Parent_ID = parent !== 'No Parent' ? parent._id : undefined;
    this.task.parent = parent !== 'No Parent' ? parent.Parent_Task : parent;
    this.searchParent = '';
  }

  selectUser = function (user) {
    this.task.user = user.First_Name + " " + user.Last_Name;
    this.searchUser = '';
  }

  getcurrentDate = function () {
    let currentDate = new Date();
    let date = "" + currentDate.getDate();
    if (+date < 10) { date = "0" + date }
    var nextdate = +date + 1
    var month = "" + (currentDate.getMonth() + 1);
    if (+month < 10) { month = "0" + month }
    var year = currentDate.getFullYear();
    var requestDt = year + "-" + month + "-" + date;
    var defaultEndDt = year + "-" + month + "-" + (nextdate < 10 ? "0" + nextdate : nextdate)
    return {
      requestDt: requestDt,
      defaultEndDt: defaultEndDt
    };
  }

  Cancel = function () {
    this.router.navigate(['viewtask']);
  }

  updateTask = function () {
    this.request = {
      '_id': this.updateData._id,
      'Parent_ID': this.task.Parent_ID,
      'Project_ID': this.updateData.Project_ID,
      'Task': this.task.TaskName,
      'Start_Date': this.task.startDate,
      'End_Date': this.task.endDate,
      'Priority': this.task.Priority
    };
    this.BackendApiService.updateTask(this.request)
      .subscribe(    //receive the data from service
        (value) => {
          document.getElementById('alert').innerHTML = 'Updated Task Successfully!';
          document.getElementById('alert').classList.remove('d-none');
          this.reset();
        }
      );
    setTimeout(function () {
      document.getElementById('alert').classList.add('d-none');
    }, 5000);
  }

  getParentByFilter = function (id) {
    let parent = this.parentTasksCopy.find(x => x._id === id);
    return parent.Parent_Task;
  }

  getProjectByFilter = function (id) {
    let project = this.projectsCopy.find(x => x._id === id);
    return project.Project;
  }

}
