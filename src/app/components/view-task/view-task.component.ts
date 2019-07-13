import { Component, OnInit } from '@angular/core';
import { BackendApiService } from '../../services/backend-api.service';
import { Router } from '@angular/router';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  task = {};
  tasks: Object[];
  tasksCopy: Object[];
  projects: Object[];
  Project: string;
  Project_ID:string;
  parentTasksCopy: Object[];
  constructor(private BackendApiService: BackendApiService, private router: Router, private orderPipe: OrderPipe) { }

  ngOnInit() {
    this.getProjectsList();
    this.getParentTasksList();
  }

  getProjectsList = function () {
    this.BackendApiService.getProjectsList().subscribe((res) => {
      this.projects = res;
      this.projectsCopy = res;
    })
  }
  getParentTasksList = function () {
    this.BackendApiService.getParentTasksList().subscribe((ptasks) => {
      this.parentTasks = ptasks;
      this.parentTasksCopy = ptasks;
    });
  }

  getParentByFilter = function (id) {
    let parent = this.parentTasksCopy.find(x => x.parentId === id);
    return parent.parentTask;
  }

  getTasksList = function (id) {
    this.BackendApiService.getTasksbyProjectId(id).subscribe((res) => {
      this.tasks = res;
      this.tasksCopy = res;
    })
  }

  selectProject = function (proj) {
    this.projectId = proj.projectId;
    this.project = proj.project;
    this.searchProject = '';
    this.getTasksList(this.projectId);
  }

  EndTask = function(id){
    var request={
      'taskId':id,
      'Status': "Completed"
    };
    this.BackendApiService.updateTask(request,id).subscribe((res) => {
    })
  }

  EditTask = function(task){
    task.edit=true;
    this.BackendApiService.setData(task);
    this.router.navigate(['addtask']);
  }

  filterUsers = function (searchby) {
      if (searchby) {
        this.tasks = this.orderPipe.transform(this.tasksCopy, searchby)
      }
  }

}
