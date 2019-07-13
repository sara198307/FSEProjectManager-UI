import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  

  constructor(private httpService: Http) { }
  private messageSource;
  setData(data: Object) {
    this.messageSource = data;
  }
  getData(){
    return this.messageSource;
  }
  
  addUser(user) {
    return this.httpService.post("/api/adduser", user)
      .pipe(map(response => {    //receive the resp from rest api 
        return response.json();   //sending it back to component thru service
      }));
  }

  getUsersList() {
    return this.httpService.get("/api/users")
      .pipe(map(response => {    //receive the resp from rest api 
        return response.json();   //sending it back to component thru service
      }));
  }


  updateUser(newObj) {
    return this.httpService.put("/api/updateUser", newObj)
      .pipe(map(response => {    //receive the resp from rest api 
        return response.json();   //sending it back to component thru service
      }));
  }


  deleteUser(userId) {
    return this.httpService.delete("/api/users/" + userId)
      .pipe(map(response => {    //receive the resp from rest api 
        return response.json();   //sending it back to component thru service
      }));
  }

  // add Project
  addProject(project) {
    return this.httpService.post("/api/addproject", project)
      .pipe(map(response => {    //receive the resp from rest api 
        return response.json();   //sending it back to component thru service
      }));
  }

  // get Projects List
  getProjectsList() {
    return this.httpService.get("/api/projects")
      .pipe(map(response => {    //receive the resp from rest api 
        return response.json();   //sending it back to component thru service
      }));
  }

  //update Project
  updateProject(newObj) {
    return this.httpService.put("/api/updateProject", newObj)
      .pipe(map(response => {    //receive the resp from rest api 
        return response.json();   //sending it back to component thru service
      }));
  }

  // Delete Project
  deleteProject(projectId) {
    return this.httpService.delete("/api/projects/:" + projectId)
      .pipe(map(response => {    //receive the resp from rest api 
        return response.json();   //sending it back to component thru service
      }));
  }

  addTask(task) {
    return this.httpService.post("/api/addtask", task)
      .pipe(map(response => {    //receive the resp from rest api 
        return response.json();   //sending it back to component thru service
      }));
  }
  
  getTasksList(id) {
    return this.httpService.get("/api/tasks/"+id)
      .pipe(map(response => {    //receive the resp from rest api 
        return response.json();   //sending it back to component thru service
      }));
  }

  getParentTasksList() {
    return this.httpService.get("/api/parenttasks")
      .pipe(map(response => {    //receive the resp from rest api 
        return response.json();   //sending it back to component thru service
      }));
  }


  updateTask(newObj) {
    return this.httpService.put("/api/updatetask", newObj)
      .pipe(map(response => {    //receive the resp from rest api 
        return response.json();   //sending it back to component thru service
      }));
  }
}
