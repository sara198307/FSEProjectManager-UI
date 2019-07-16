import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BackendApiService } from '../../services/backend-api.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { OrderPipe } from 'ngx-order-pipe';
import { FilterPipe } from '../../pipes/filter.pipe';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { AddUserComponent } from './add-user.component';

const users = [{
  'firstName': 'Saravanan'
},
{
  'firstName': 'Pandian'
}, {
  'firstName': 'Sara'
}
];
describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let backendApiService: BackendApiService;
  let fixture: ComponentFixture<AddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddUserComponent, FilterPipe],
      imports: [FormsModule, HttpModule],
      providers: [BackendApiService, FilterPipe, OrderPipe],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    backendApiService = TestBed.get(BackendApiService);
    spyOn(backendApiService, 'getUsersList').and.returnValue(of(users))
    spyOn(backendApiService, 'addUser').and.returnValue(of({ 'success': true }))
    spyOn(backendApiService, 'updateUser').and.returnValue(of({ 'success': true }))
    spyOn(backendApiService, 'deleteUser').and.returnValue(of({ 'success': true }))
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should reset user', () => {
    fixture.detectChanges();
    component.user = {
      'firstName': 'Saravanan',
      'lastName': 'Chi',
      'empId': '559988',
      'edit': false
    };
    component.reset();
    expect(component.user.firstName).toBe('Saravanan');
  });

  it('should Cancel ', () => {
    component.cancel();
    expect(component.user.edit).toBe(false);
  });

  it('should getUsersList user', () => {
    component.getUersList();
    fixture.detectChanges();
    expect(backendApiService.getUsersList).toHaveBeenCalled();
    expect(component.users).toEqual(users);
  });

  it('should registerUser', fakeAsync(() => {
    component.registerUser();
    var ele = fixture.debugElement.query(By.css('#alert')).nativeElement;
    ele.classList.remove('d-none');
    tick(5000);
    fixture.detectChanges();
    expect(backendApiService.addUser).toHaveBeenCalled();
    expect(component.users).toEqual(users);
  }));

  it('should filterUsers', () => {
    component.usersCopy = [{
      'firstName': 'Saravanan'
    },
    {
      'firstName': 'Pandian'
    }, {
      'firstName': 'Sara'
    }
    ];
    const response = [{
      'firstName': 'Sara'
    },
    {
      'firstName': 'Saravanan'
    }, {
      'firstName': 'Pandian'
    }
    ];
    component.filterUsers('firstName');
    fixture.detectChanges();
    expect(component.users).toEqual(response);
  });

  it('should EditUser', () => {
    let user = {
      'userId': '4521d55f2dd',
      'firstName': 'Saravanan',
      'Last_Name': 'Chig',
      'empId': '602814'
    }
    component.EditUser(user);
    fixture.detectChanges();
    expect(component.user.firstName).toBe('Saravanan');
    expect(component.user.lastName).toBe('Chig');
    expect(component.user.empId).toBe('602814');
  });


  it('should updateUser', fakeAsync(() => {
    let user = {
      'userId': '4521d55f2dd',
      'firstName': 'Saravanan',
      'Last_Name': 'Chig',
      'empId': '602814'
    }
    component.updateUser(user,user.userId);
    var ele = fixture.debugElement.query(By.css('#alert')).nativeElement;
    ele.classList.remove('d-none');
    tick(5000);
    fixture.detectChanges();
    expect(backendApiService.updateUser).toHaveBeenCalled();
  }));


  it('should deleteUser', fakeAsync(() => {
    component.deleteUser('4521d55f2dd');
    var ele = fixture.debugElement.query(By.css('#alert')).nativeElement;
    ele.classList.remove('d-none');
    tick(5000);
    fixture.detectChanges();
    expect(backendApiService.deleteUser).toHaveBeenCalled();
  }));
});
