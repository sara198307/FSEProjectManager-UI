import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BackendApiService } from '../../services/backend-api.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { OrderPipe } from 'ngx-order-pipe';
import { FilterPipe } from '../../pipes/filter.pipe';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ViewTaskComponent } from './view-task.component';
import { convertPropertyBinding } from '@angular/compiler/src/compiler_util/expression_converter';

const tasks=[];
const parentTasks=[];
const projects=[];
const users=[];
describe('ViewTaskComponent', () => {
  let component: ViewTaskComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;
  let backendApiService: BackendApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTaskComponent ,FilterPipe],
      imports: [FormsModule, HttpModule, RouterTestingModule],
      providers: [BackendApiService, FilterPipe, OrderPipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    backendApiService = TestBed.get(BackendApiService);
    spyOn(backendApiService, 'getParentTasksList').and.returnValue(of(parentTasks))
    spyOn(backendApiService, 'getProjectsList').and.returnValue(of(projects))
    spyOn(backendApiService, 'getTasksList').and.returnValue(of({ 'success': true }))
    spyOn(backendApiService, 'updateTask').and.returnValue(of({ 'success': true }))
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getProjectsList', () => {
    component.getProjectsList();
    fixture.detectChanges();
    expect(backendApiService.getProjectsList).toHaveBeenCalled();
  });

  it('should getParentTasksList', () => {
    component.getParentTasksList();
    fixture.detectChanges();
    expect(backendApiService.getParentTasksList).toHaveBeenCalled();
  });


  it('should getParentByFilter', () => {
    component.parentTasksCopy=[
      {_id:'mkd1f5sdfdfsf','Parent_Task':'Project Structure'},{_id:'mkd1f5sdsdfgfdfsf','Parent_Task':'Project Backend'},{_id:'22225ftgjjjkf5sdfdfsf','Parent_Task':'Project Middleware'}
    ]
    let id = 'mkd1f5sdfdfsf';
    let response=component.getParentByFilter(id);
    expect(response).toBe('Project Structure');
  });


  it('should getTasksList', () => {
    let id='ddsd5522vv';
    component.getTasksList(id);
    fixture.detectChanges();
    expect(backendApiService.getTasksList).toHaveBeenCalled();
  });

  it('should selectProject', () => {
    var proj={
      _id:'152s2dfsdfsdf',
      Project:'Project Structure'
    }
    spyOn(component,'getTasksList');
    component.selectProject(proj);
    expect(component.Project).toBe('Project Structure');
    expect(component.getTasksList).toHaveBeenCalledWith('152s2dfsdfsdf');
  });

  it('should EndTask', () => {
    var request={
      '_id':'123dddd2132',
      'Status': true
    };
    component.EndTask(request);
    expect(backendApiService.updateTask).toHaveBeenCalled();
  });

  it('should EditTask', () => {
    let task={};
    spyOn(backendApiService,'setData');
    component.EditTask(task);
   // expect(component.task.edit).toBe('true');
    expect(backendApiService.setData).toHaveBeenCalled();
  });

  it('should filterUsers', () => {
    component.tasksCopy = [{
      'Task': 'Divya'
    },
    {
      'Task': 'Sravanthi'
    }, {
      'Task': 'Dineesh'
    }
    ];
    const response = [{
      'Task': 'Dineesh'
    },
    {
      'Task': 'Divya'
    }, {
      'Task': 'Sravanthi'
    }
    ];
    component.filterUsers('Task');
    fixture.detectChanges();
    expect(component.tasks).toEqual(response);
  });




});
