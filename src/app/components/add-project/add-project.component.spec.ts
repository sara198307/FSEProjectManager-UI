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
      'Project': 'Project NAme',
      'Priority': 0,
      'startDate': '2019-05-08',
      'endDate': '2019-05-18',
      'Manager': 'Divya',
      'edit': false,
      'checked': false
    };
    component.reset();
    fixture.detectChanges();
    expect(component.project.Project).toBe('Project NAme');
    expect(component.project.Priority).toBe(0);
  });

  it('should check defaults when checkbox is selected', () => {
    component.project.checked = true;
    component.assignDefault();
    expect(component.project.startDate).toBe('2019-05-09');
    expect(component.project.endDate).toBe('2019-05-10');
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
      '_id': '4521d55f2dd',
      'Priority': 5,
      'Project': 'Validations',
      'Start_Date': '2019-05-15',
      'End_Date': '2019-05-18',
      'Manager': 'Anil'
    }
    component.EditProject(proj);
    fixture.detectChanges();
    expect(component.project.Project).toBe('Validations');
    expect(component.project.startDate).toBe('2019-05-15');
    expect(component.project.endDate).toBe('2019-05-18');
    expect(component.Priority).toBe(5);
    expect(component.project.Manager).toBe('Anil');
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
      'Project': 'Divya', '_id': 'fsfs45123'
    },
    {
      'Project': 'Sravanthi', '_id': 'dsadad822a'
    }, {
      'Project': 'Dineesh', '_id': 'asdsdrfv535dv'
    }];

    component.getTasksList();
    fixture.detectChanges();
    expect(backendApiService.getTasksList).toHaveBeenCalled();
  });

  it('should filterProjects', () => {
    component.projectsCopy = [{
      'Project': 'Divya'
    },
    {
      'Project': 'Sravanthi'
    }, {
      'Project': 'Dineesh'
    }
    ];
    const response = [{
      'Project': 'Dineesh'
    },
    {
      'Project': 'Divya'
    }, {
      'Project': 'Sravanthi'
    }
    ];
    component.filterProjects('Project');
    fixture.detectChanges();
    expect(component.projects).toEqual(response);
  });

  it('should checkDateErr', () => {

    component.checkDateErr('2019-05-08', '2019-05-18');
    fixture.detectChanges();
  });

  it('should selectManager', () => {
    var user = {
      First_Name: 'Divya',
      Last_Name: 'Chig'
    };
    component.selectManager(user);
    fixture.detectChanges();
    expect(component.project.Manager).toBe('Divya Chig')
  });

});
