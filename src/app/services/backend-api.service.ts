import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {

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
    return this.httpService.get("http://localhost:8080/getAllUsers")
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
    console.log("Saved Project"+JSON.stringify(project));
    return this.httpService.post("http://localhost:8080/addProject", project)
      .pipe(map(response => {    //receive the resp from rest api 
        return response.json();   //sending it back to component thru service
      }));
  }

  // get Projects List
  getProjectsList() {
    return this.httpService.get("http://localhost:8080/getAllProjects")
      .pipe(map(response => {    //receive the resp from rest api 
        return response.json();   //sending it back to component thru service
      }));
  }

  //update Project
  updateProject(newObj,projectId) {
    return this.httpService.put("http://localhost:8080/updateProject/" + projectId, newObj)
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
    return this.httpService.post("http://localhost:8080/addTask", task)
      .pipe(map(response => {    //receive the resp from rest api 
        return response.json();   //sending it back to component thru service
      }));
  }
  
  getTasksList(id) {
    return this.httpService.get("http://localhost:8080/getTask/"+id)
      .pipe(map(response => {    //receive the resp from rest api 
        return response.json();   //sending it back to component thru service
      }));
  }
  addParentTask(task) {
    return this.httpService.post("http://localhost:8080/addParentTask", task)
      .pipe(map(response => {    //receive the resp from rest api 
        return response.json();   //sending it back to component thru service
      }));
  }

  getParentTasksList() {
    return this.httpService.get("http://localhost:8080/getAllParent")
      .pipe(map(response => {    //receive the resp from rest api 
        return response.json();   //sending it back to component thru service
      }));
  }


  updateTask(newObj,taskId) {
    return this.httpService.put("http://localhost:8080/updateTask/", newObj,taskId)
      .pipe(map(response => {    //receive the resp from rest api 
        return response.json();   //sending it back to component thru service
      }));
  }

}
