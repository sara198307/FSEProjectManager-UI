import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BackendApiService } from '../../services/backend-api.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { OrderPipe } from 'ngx-order-pipe';
import { FilterPipe } from '../../pipes/filter.pipe';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { AddTaskComponent } from './add-task.component';

const tasks = [];
const parentTasks = [];
const projects = [];
const users = [];

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;
  let backendApiService: BackendApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddTaskComponent, FilterPipe],
      imports: [FormsModule, HttpModule, RouterTestingModule],
      providers: [BackendApiService, FilterPipe, OrderPipe]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    backendApiService = TestBed.get(BackendApiService);
    spyOn(backendApiService, 'getUsersList').and.returnValue(of(users))
    spyOn(backendApiService, 'getParentTasksList').and.returnValue(of(parentTasks))
    spyOn(backendApiService, 'getProjectsList').and.returnValue(of(projects))
    spyOn(backendApiService, 'addTask').and.returnValue(of({ 'success': true }))
    spyOn(backendApiService, 'updateTask').and.returnValue(of({ 'success': true }))
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset', () => {
    component.reset();
    expect(component.task.priority).toBe(0);
  });

  it('should getParentTasksList', () => {
    component.getParentTasksList();
    fixture.detectChanges();
    expect(backendApiService.getParentTasksList).toHaveBeenCalled();
  });

  it('should getUersList', () => {
    component.getUersList();
    fixture.detectChanges();
    expect(backendApiService.getUsersList).toHaveBeenCalled();
  });

  it('should getProjectsList', () => {
    component.getProjectsList();
    fixture.detectChanges();
    expect(backendApiService.getProjectsList).toHaveBeenCalled();
  });

  it('should addTask', fakeAsync(() => {
    var task = {};
    component.addTask(task);
    var ele = fixture.debugElement.query(By.css('#alert')).nativeElement;
    ele.classList.remove('d-none');
    tick(5000);
    fixture.detectChanges();
    expect(backendApiService.addTask).toHaveBeenCalled();
  }));

  it('should updateTask', fakeAsync(() => {
    component.updateTask();
    var ele = fixture.debugElement.query(By.css('#alert')).nativeElement;
    ele.classList.remove('d-none');
    tick(5000);
    fixture.detectChanges();
    expect(backendApiService.updateTask).toHaveBeenCalled();
  }));

  it('should selectProject', () => {
    let proj = {
      projectId: '3434343',
      project: 'Angular6',

    }
    component.selectProject(proj);
    expect(component.task.projectId).toBe('testone');
    expect(component.task.project).toBe('Angular6');
  });

  it('should selectParent', () => {
    let parent = {
      parentId: 'testone',
      parentTask: 'Parent task',
    };
    component.selectParent(parent);
    expect(component.task.parentId).toBe('testone');
    expect(component.task.parent).toBe('Parent task');
  });

  it('should selectUser', () => {
    let user = { firstName: 'Saravanan', lastName: 'P' };
    component.selectUser(user);
    expect(component.task.user).toBe('Saravanan P');
  });

  it('should getcurrentDate', () => {
    var date = component.getcurrentDate();
    expect(date).toEqual({ requestDt: '2019-05-09', defaultEndDt: '2019-05-10' });
  });

  it('should Cancel', () => {
    //component.Cancel();
  });

  it('should getParentByFilter', () => {
    component.parentTasksCopy=[
      {parentId:'mkd1f5sdfdfsf','parentTask':'Project Structure'},{parentId:'mkd1f5sdsdfgfdfsf','parentTask':'Project Backend'},{parentId:'22225ftgjjjkf5sdfdfsf','parentTask':'Project Middleware'}
    ]
    let id = 'mkd1f5sdfdfsf';
    let response=component.getParentByFilter(id);
    expect(response).toBe('Project Structure');
  });

  it('should getProjectByFilter', () => {
    component.projectsCopy=[
      {projectId:'mkd1f5sdfdfsf','project':'Project Structure'},{projectId:'mkd1f5sdsdfgfdfsf','project':'Project Backend'},{projectId:'22225ftgjjjkf5sdfdfsf','project':'Project Middleware'}
    ];
    let id = 'mkd1f5sdfdfsf';
    let response=component.getProjectByFilter(id);
    expect(response).toBe('Project Structure');
  });






});
