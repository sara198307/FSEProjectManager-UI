import { Component, OnInit } from '@angular/core';
import { OrderPipe } from 'ngx-order-pipe';
import { RestApiService } from '../../services/rest-api.service';
import { fail } from 'assert';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {

  project = {
    'Project': '',
    'Priority': 0,
    'startDate': '',
    'endDate': '',
    'Manager': '',
    'edit': false,
    'checked': false
  };
  currentDate: string;
  defaultEndDt: string;
  users: Object[];
  projects: Object[];
  projectsCopy: Object[];
  Priority: Number;
  constructor(private BackendApiService: RestApiService, private orderPipe: OrderPipe) { }

  ngOnInit() {
    this.currentDate = this.getcurrentDate().requestDt;
    this.defaultEndDt = this.getcurrentDate().defaultEndDt;
    this.Priority = 0;
    //this.getUersList();
    //this.getProjectsList();
  }
  getUersList = function () {
    this.BackendApiService.getUsersList().subscribe((res) => {
      this.users = res;
      this.usersCopy = res;
    })
  }
  getProjectsList = function () {
    this.BackendApiService.getProjectsList().subscribe((res) => {
      this.projects = res;
      this.projectsCopy = res;
      this.getTasksList();
    })
  }
  getTasksList = function () {
    this.projects.forEach(element => {
      let count = 0;
      let id = element._id;
      element.NumOfTasksComp = count;
      this.BackendApiService.getTasksList(id).subscribe((res) => {
        this.tasks = res;
        element.NumOfTasks = res.length;
        res.forEach(task => {
          (task.Status == true) ? count++ : count;
          element.NumOfTasksComp = count;
        });
      })
    });
  }
  selectManager = function (user) {
    this.project.Manager = user.First_Name + " " + user.Last_Name;
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
  reset = function () {
    document.getElementById('reset').click();
    this.Priority = 0;
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



}
