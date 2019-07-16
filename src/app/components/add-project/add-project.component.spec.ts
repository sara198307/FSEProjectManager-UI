import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BackendApiService } from '../../services/backend-api.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { OrderPipe } from 'ngx-order-pipe';
import { FilterPipe } from '../../pipes/filter.pipe';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { AddProjectComponent } from './add-project.component';

const projects = [];
const users = [];
const tasks = [];
describe('AddProjectComponent', () => {
  let backendApiService: BackendApiService;
  let component: AddProjectComponent;
  let fixture: ComponentFixture<AddProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddProjectComponent, FilterPipe],
      imports: [FormsModule, HttpModule],
      providers: [BackendApiService, FilterPipe, OrderPipe],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    backendApiService = TestBed.get(BackendApiService);
    spyOn(backendApiService, 'getUsersList').and.returnValue(of(users))
    spyOn(backendApiService, 'getProjectsList').and.returnValue(of(projects))
    spyOn(backendApiService, 'getTasksList').and.returnValue(of(tasks))
    spyOn(backendApiService, 'addProject').and.returnValue(of({ 'success': true }))
    spyOn(backendApiService, 'updateProject').and.returnValue(of({ 'success': true }))
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset proj', () => {

    component.project = {
      'project': 'ProjectTest',
      'priority': 5,
      'startDate': '2019-07-16',
      'endDate': '2019-07-23',
      'manager': 'Saravanan',
      'edit': false,
      'checked': false
    };
    component.reset();
    fixture.detectChanges();
    expect(component.project.project).toBe('ProjectTest');
    expect(component.project.priority).toBe(5);
  });

  it('should check defaults when checkbox is selected', () => {
    component.project.checked = true;
    component.assignDefault();
    expect(component.project.startDate).toBe('2019-07-17');
    expect(component.project.endDate).toBe('2019-07-23');
  });

  it('should check defaults when checkbox is not selected', () => {
    component.project.checked = false;
    component.assignDefault();
    expect(component.project.startDate).toBe('');
    expect(component.project.endDate).toBe('');
  });


  it('should addProject', fakeAsync(() => {
    component.addProject();
    var ele = fixture.debugElement.query(By.css('#alert')).nativeElement;
    ele.classList.remove('d-none');
    tick(5000);
    fixture.detectChanges();
    expect(backendApiService.addProject).toHaveBeenCalled();
    //expect(component.users).toEqual(users);
  }));


  it('should EditProject', () => {
    let proj = {
      'projectId': '',
      'priority': 5,
      'project': 'Validations',
      'startDate': '2019-07-17',
      'endDate': '2019-07-23',
      'manager': 'Saravanan'
    }
    component.EditProject(proj);
    fixture.detectChanges();
    expect(component.project.project).toBe('Validations');
    expect(component.project.startDate).toBe('2019-07-17');
    expect(component.project.endDate).toBe('2019-07-23');
    expect(component.priority).toBe(5);
    expect(component.project.manager).toBe('Saravanan');
  });


  it('should updateProject', fakeAsync(() => {
    component.updateProject();
    var ele = fixture.debugElement.query(By.css('#alert')).nativeElement;
    ele.classList.remove('d-none');
    tick(5000);
    fixture.detectChanges();
    expect(backendApiService.updateProject).toHaveBeenCalled();
  }));

  it('should getUsersList user', () => {
    component.getUersList();
    fixture.detectChanges();
    expect(backendApiService.getUsersList).toHaveBeenCalled();
    expect(component.users).toEqual(users);
  });

  it('should getProjectsList user', () => {
    component.getProjectsList();
    fixture.detectChanges();
    expect(backendApiService.getProjectsList).toHaveBeenCalled();
  });

  it('should getTasksList user', () => {
    component.projects = [{
      'project': 'Saravanan', 'projectId': '343423'
    },
    {
      'project': 'Test', 'projectId': 'dsasff'
    }, {
      'project': 'Testone', 'projectId': 'asdrerer'
    }];

    component.getTasksList();
    fixture.detectChanges();
    expect(backendApiService.getTasksList).toHaveBeenCalled();
  });

  it('should filterProjects', () => {
    component.projectsCopy = [{
      'project': 'Saravanan'
    },
    {
      'project': 'Test'
    }, {
      'project': 'TestOne'
    }
    ];
    const response = [{
      'project': 'Test'
    },
    {
      'project': 'Saravanan'
    }, {
      'project': 'TestOne'
    }
    ];
    component.filterProjects('project');
    fixture.detectChanges();
    expect(component.projects).toEqual(response);
  });

  it('should checkDateErr', () => {

    component.checkDateErr('2019-07-17', '2019-07-23');
    fixture.detectChanges();
  });

  it('should selectManager', () => {
    var user = {
      firstName: 'Saravanan',
      lastName: 'Pandian'
    };
    component.selectManager(user);
    fixture.detectChanges();
    expect(component.project.manager).toBe('Saravanan')
  });

});
