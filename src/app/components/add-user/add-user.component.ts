import { Component, OnInit } from '@angular/core';
import { BackendApiService } from '../../services/backend-api.service';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user = {
    firstName: '',
    lastName: '',
    employeeID: '',
    edit: false
  };
  users: Object[];
  usersCopy: Object[];
  request: object;
  sortedCollection: any[];
  constructor(private BackendApiService: BackendApiService, private orderPipe: OrderPipe) { }

  ngOnInit() {
    this.getUersList();
  }

  reset = function () {
    document.getElementById('reset').click();
  }
  cancel= function(){
    this.user={};
    this.user.edit = false;
  }

  getUersList = function () {
    this.BackendApiService.getUsersList().subscribe((users) => {
      this.users = users;
      this.usersCopy = users;
    });
  }

  registerUser() {
    this.request = {
      'First_Name': this.user.firstName,
      'Last_Name': this.user.lastName,
      'Employee_ID': this.user.employeeID
    };
    this.BackendApiService.addUser(this.request)
      .subscribe(    //receive the data from service
        (value) => {
          document.getElementById('alert').innerHTML = 'Added User Successfully!';
          document.getElementById('alert').classList.remove('d-none');
          this.reset();
          this.getUersList();
        }
      );
    setTimeout(function () {
      document.getElementById('alert').classList.add('d-none');
    }, 5000);

  }

  filterUsers = function (searchby) {
      if (searchby) {
        this.users = this.orderPipe.transform(this.usersCopy, searchby)
      }
  }

  EditUser = function (user) {
    this.user = {
      'edit': true
    };
    this.user._id = user._id;
    this.user.firstName = user.First_Name;
    this.user.lastName = user.Last_Name;
    this.user.employeeID = user.Employee_ID;
  }

  updateUser = function (user) {
    this.BackendApiService.updateUser(user).subscribe((res) => {
      document.getElementById('alert').innerHTML = 'Updated User Successfully!';
      document.getElementById('alert').classList.remove('d-none');
      this.getUersList();
      this.cancel();
    });
    setTimeout(function () {
      document.getElementById('alert').classList.add('d-none');
    }, 5000);
  }

  deleteUser = function (id) {
    this.BackendApiService.deleteUser(id).subscribe((res) => {
      document.getElementById('alert').innerHTML = 'Deleted User Successfully!';
      document.getElementById('alert').classList.remove('d-none');
      this.getUersList();
    });
    setTimeout(function () {
      document.getElementById('alert').classList.add('d-none');
    }, 5000);
  }

  ngOnDestroy() {
    console.log("Testing destroy");
  }


}
