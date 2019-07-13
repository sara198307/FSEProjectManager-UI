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
  'First_Name': 'Divya'
},
{
  'First_Name': 'Sravanthi'
}, {
  'First_Name': 'Dineesh'
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
      'firstName': 'Divya',
      'lastName': 'Chi',
      'employeeID': '559988',
      'edit': false
    };
    component.reset();
    expect(component.user.firstName).toBe('Divya');
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
      'First_Name': 'Divya'
    },
    {
      'First_Name': 'Sravanthi'
    }, {
      'First_Name': 'Dineesh'
    }
    ];
    const response = [{
      'First_Name': 'Dineesh'
    },
    {
      'First_Name': 'Divya'
    }, {
      'First_Name': 'Sravanthi'
    }
    ];
    component.filterUsers('First_Name');
    fixture.detectChanges();
    expect(component.users).toEqual(response);
  });

  it('should EditUser', () => {
    let user = {
      '_id': '4521d55f2dd',
      'First_Name': 'Divya',
      'Last_Name': 'Chig',
      'Employee_ID': '602814'
    }
    component.EditUser(user);
    fixture.detectChanges();
    expect(component.user.firstName).toBe('Divya');
    expect(component.user.lastName).toBe('Chig');
    expect(component.user.employeeID).toBe('602814');
  });


  it('should updateUser', fakeAsync(() => {
    let user = {
      '_id': '4521d55f2dd',
      'First_Name': 'Divya',
      'Last_Name': 'Chig',
      'Employee_ID': '602814'
    }
    component.updateUser(user);
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
