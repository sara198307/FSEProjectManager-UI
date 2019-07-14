import { Component, OnInit } from '@angular/core';
import { BackendApiService } from '../../services/backend-api.service';
import { OrderPipe } from 'ngx-order-pipe';
import { fail } from 'assert';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  project = {
    'project': '',
    'priority': 0,
    'startDate': '',
    'endDate': '',
    'manager': '',
    'edit': false,
    'checked': false
  };
  currentDate: string;
  defaultEndDt: string;
  users: Object[];
  projects: Object[];
  projectsCopy: Object[];
  Priority: Number;
  constructor(private RestApiService: BackendApiService, private orderPipe: OrderPipe) { }

  ngOnInit() {
    this.currentDate = this.getcurrentDate().requestDt;
    this.defaultEndDt = this.getcurrentDate().defaultEndDt;
    this.Priority = 0;
    this.getUersList();
    this.getProjectsList();
  }

  reset = function () {
    document.getElementById('reset').click();
    this.priority = 0;
  }

  assignDefault = function () {
    if (this.project.checked) {
      this.project.startDate = this.currentDate;
      this.project.endDate = this.defaultEndDt;
    } else {
      this.project.startDate = '';
      this.project.endDate = '';
    }
  }


  addProject = function () {
    var request = {
      'project': this.project.project,
      'startDate': this.project.startDate,
      'endDate': this.project.endDate,
      'priority': this.priority,
      'manager': this.project.manager
    };
    this.RestApiService.addProject(request).subscribe((res) => {
      document.getElementById('alert').innerHTML = 'Added Project Successfully!';
      document.getElementById('alert').classList.remove('d-none');
      this.reset();
      this.getProjectsList();
    });
    setTimeout(function () {
      document.getElementById('alert').classList.add('d-none');
    }, 5000);

  }

  EditProject = function (proj) {
    this.project = {
      'edit': true
    };
    this.project.projectId = proj.projectId;
    this.priority = proj.priority;
    this.project.project = proj.project;
    this.project.startDate = proj.atartDate;
    this.project.endDate = proj.endDate;
    this.project.manager = proj.manager;
  }

  updateProject = function () {
    var request = {
      'projectId': this.project.projectId,
      'project': this.project.project,
      'startDate': this.project.startDate,
      'endDate': this.project.endDate,
      'priority': this.priority,
      'manager': this.project.manager
    };
    this.RestApiService.updateProject(request,this.project.projectId).subscribe((res) => {
      document.getElementById('alert').innerHTML = 'Updated Project Successfully!';
      document.getElementById('alert').classList.remove('d-none');
      this.reset();
      this.project.edit = false;
      this.getProjectsList();
    });
    setTimeout(function () {
      document.getElementById('alert').classList.add('d-none');
    }, 5000);

  }

  suspend = function () {
    var request = {
      'projectId': this.project.projectId,
      'project': this.project.project,
      'startDate': this.project.startDate,
      'endDate': this.project.endDate,
      'priority': this.priority,
      'manager': this.project.manager
    };
    this.RestApiService.deleteProject(this.project.projectId).subscribe((res) => {
      document.getElementById('alert').innerHTML = 'Project Suspended Successfully!';
      document.getElementById('alert').classList.remove('d-none');
      this.reset();
      this.project.edit = false;
      this.getProjectsList();
    });
    setTimeout(function () {
      document.getElementById('alert').classList.add('d-none');
    }, 5000);

  }

  getProjectsList = function () {
    this.RestApiService.getProjectsList().subscribe((res) => {
      this.projects = res;
      this.projectsCopy = res;
      this.getTasksList();
    })
  }

  getUersList = function () {
    this.RestApiService.getUsersList().subscribe((res) => {
      this.users = res;
      this.usersCopy = res;
    })
  }

  getTasksList = function () {
    this.projects.forEach(element => {
      let count = 0;
      let id = element.projectId;
      element.NumOfTasksComp = count;
      this.RestApiService.getTasksbyProjectId(id).subscribe((res) => {
        this.tasks = res;
        element.NumOfTasks = res.length;
        res.forEach(task => {
          (task.status == 'Completed') ? count++ : count;
          element.NumOfTasksComp = count;
        });
      })
    });
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

  selectManager = function (user) {
    this.project.manager = user.firstName + " " + user.lastName;
    this.searchManager = '';
  }

  filterProjects = function (searchby) {
    if (searchby) {
      this.projects = this.orderPipe.transform(this.projectsCopy, searchby)
    }
  }

  checkDateErr = function (startDate, endDate) {
    this.errMessage = '';
    if (Date.parse(startDate) >= Date.parse(endDate)) {
      this.errMessage = 'End Date should be greater than start date';
      this.project.endDate = '';
      return false;
    }
  }

}
