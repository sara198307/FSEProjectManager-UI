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
    'projectId':'',
    'project':'',
    'parent':'',
    'parentId':'',
    'user':'',
    'priority':0,
    'startDate':'',
    'endDate':'',
    'task':''
  };
  updateData: {
    'taskId': '',
    'edit': false,
    'task': '',
    'startDate': '',
    'endDate': '',
    'projectId': '',
    'priority': 0,
    'parentId': ''
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
        'taskId': '',
        'edit': false,
        'task': '',
        'startDate': '',
        'endDate': '',
        'projectId': '',
        'priority': 0,
        'parentId': ''
      };
    }
    this.task.priority =0;
    this.task.startDate =this.currentDate;
    this.task.endDate =this.defaultEndDt;
    
    this.getParentTasksList();
    this.getUersList();
    this.getProjectsList();
    if (this.updateData && this.updateData.edit) {
      this.task.priority =this.updateData.priority;
    this.task.startDate =this.updateData.startDate;
    this.task.endDate =this.updateData.endDate;
    this.task.task=this.updateData.task;
    }
  }

  reset() {
    document.getElementById('reset').click();
    this.task.priority =0;
    this.task.startDate =this.currentDate;
    this.task.endDate =this.defaultEndDt;
  }

  getParentTasksList = function () {
    this.BackendApiService.getParentTasksList().subscribe((ptasks) => {
      this.parentTasks = ptasks;
      this.parentTasksCopy = ptasks;
      if (this.updateData && this.updateData.edit) {
        this.task.parent = this.getParentByFilter(this.updateData.parentId);
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
        this.task.Project = this.getProjectByFilter(this.updateData.projectId);
      }
    })
  }

  addTask = function (task) {
    if (task.checked) {
      this.request = {
        'parentTask': this.task.task,
      };
      this.BackendApiService.addParentTask(this.request)
      .subscribe(    //receive the data from service
        (value) => {
          document.getElementById('alert').innerHTML = 'Added Parent Task Successfully!';
          document.getElementById('alert').classList.remove('d-none');
          this.reset();
          this.getParentTasksList();
        }
      );
    } else {
      this.request = {
        'parentId': this.task.parentId,
        'projectId': this.task.projectId,
        'task': this.task.task,
        'startDate': this.task.startDate,
        'endDate': this.task.endDate,
        'priority': this.task.priority,
        'status': "Active"
      };
      this.BackendApiService.addTask(this.request)
      .subscribe(    //receive the data from service
        (value) => {
          document.getElementById('alert').innerHTML = 'Added Task Successfully!';
          document.getElementById('alert').classList.remove('d-none');
          this.reset();
          this.getParentTasksList();
        }
      );
    }
  
    setTimeout(function () {
      document.getElementById('alert').classList.add('d-none');
    }, 5000);
  }


  selectProject = function (proj) {
    this.task.projectId = proj.projectId;
    this.task.project = proj.project;
    this.searchProject = '';
  }

  selectParent = function (parent) {
    this.task.parentId = parent !== 'No Parent' ? parent.parentId : undefined;
    this.task.parent = parent !== 'No Parent' ? parent.parentTask : parent;
    this.searchParent = '';
  }

  selectUser = function (user) {
    this.task.user = user.firstName + " " + user.lastName;
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
      'taskId': this.updateData.taskId,
      'parentId': this.task.parentId,
      'projectId': this.updateData.projectId,
      'task': this.task.task,
      'startDate': this.task.startDate,
      'endDate': this.task.endDate,
      'priority': this.task.priority
    };
    this.BackendApiService.updateTask(this.request,this.updateData.taskId)
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
    let parent = this.parentTasksCopy.find(x => x.parentId === id);
    return parent.parentTask;
  }

  getProjectByFilter = function (id) {
    let project = this.projectsCopy.find(x => x.projectId === id);
    return project.project;
  }

}
