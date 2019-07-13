import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Http, Headers, Response, BaseRequestOptions, ResponseOptions } from '@angular/http';
import { of } from 'rxjs';
import { BackendApiService } from './backend-api.service';
import { MockBackend, MockConnection } from '@angular/http/testing';

describe('BackendApiService', () => {
  let service: BackendApiService;
  let backend: MockBackend;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpModule],
    providers: [
      BackendApiService,
      MockBackend,
      BaseRequestOptions,
      {
        provide: Http,
        useFactory: (backend, options) => new Http(backend, options),
        deps: [MockBackend, BaseRequestOptions]
      }
    ]
  }));

  beforeEach(() => {
    backend = TestBed.get(MockBackend);
    service = TestBed.get(BackendApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('setData', () => {
    let data = {
      'Task': 'Parent Task'
    };
    service.setData(data);
    var getData = service.getData();
    expect(getData).toEqual(data);
  });

  it(' should return getUsersList', fakeAsync(() => {
    let response = {
      "resultCount": 1,
      "results": [
        {
          "artistId": 78500,
          "artistName": "U2",
          "trackName": "Beautiful Day",
          "artworkUrl60": "image.jpg",
        }]
    };
    backend.connections.subscribe(connection => {
      connection.mockRespond(new Response(<ResponseOptions>{
        body: JSON.stringify(response)
      }));
    });

    service.getUsersList().subscribe(users => {
      expect(users).toEqual(response, 'expected')
    });
    tick();
  }));

  it(' should return addUser', fakeAsync(() => {
    let user = {
      'First_Name': 'Divya',
      'Last_Name': 'Chi',
      'Employee_Id': '602814'
    };
    backend.connections.subscribe(connection => {
      connection.mockRespond(new Response(<ResponseOptions>{
        body: JSON.stringify({ 'success': true })
      }));
    });

    service.addUser(user).subscribe(res => {
      expect(res).toEqual({ 'success': true });
    });
    tick();
  }));

  it(' should return updateUser', fakeAsync(() => {
    let user = {
      'First_Name': 'Divya',
      'Last_Name': 'Chigullapalli',
      'Employee_Id': '602814'
    };
    backend.connections.subscribe(connection => {
      connection.mockRespond(new Response(<ResponseOptions>{
        body: JSON.stringify({ 'success': true })
      }));
    });

    service.updateUser(user).subscribe(res => {
      expect(res).toEqual({ 'success': true });
    });
    tick();
  }));

  it(' should return deleteUser', fakeAsync(() => {
    let user = {
      '_id': '602814ssssgfjuss'
    };
    backend.connections.subscribe(connection => {
      connection.mockRespond(new Response(<ResponseOptions>{
        body: JSON.stringify({ 'success': true })
      }));
    });

    service.deleteUser(user._id).subscribe(res => {
      expect(res).toEqual({ 'success': true });
    });
    tick();
  }));



  it(' should return addProject', fakeAsync(() => {
    let proj = {
      'Project': 'Project Angular Proj',
      'Start_Date': '2019-05-8',
      'End_Date': '2019-05-15',
      'Priority': 2
    };
    backend.connections.subscribe(connection => {
      connection.mockRespond(new Response(<ResponseOptions>{
        body: JSON.stringify({ 'success': true })
      }));
    });

    service.addProject(proj).subscribe(res => {
      expect(res).toEqual({ 'success': true });
    });
    tick();
  }));

  it(' should return getProjectsList', fakeAsync(() => {
    let response = {
      "resultCount": 1,
      "results": [
        {
          "Project": "Project Angular Proj"
        }]
    };
    backend.connections.subscribe(connection => {
      connection.mockRespond(new Response(<ResponseOptions>{
        body: JSON.stringify(response)
      }));
    });

    service.getProjectsList().subscribe(users => {
      expect(users).toEqual(response, 'expected')
    });
    tick();
  }));

  it(' should return updateProject', fakeAsync(() => {
    let proj = {
      'Project': 'Project Name',
      'Start_Date': '2019-05-8',
      'End_Date': '2019-05-15',
      'Priority': 2
    };
    backend.connections.subscribe(connection => {
      connection.mockRespond(new Response(<ResponseOptions>{
        body: JSON.stringify({ 'success': true })
      }));
    });

    service.updateProject(proj).subscribe(res => {
      expect(res).toEqual({ 'success': true });
    });
    tick();
  }));

  it(' should return deleteProject', fakeAsync(() => {
    let proj = {
      '_id': '6028ss14ssssgfjuss'
    };
    backend.connections.subscribe(connection => {
      connection.mockRespond(new Response(<ResponseOptions>{
        body: JSON.stringify({ 'success': true })
      }));
    });

    service.deleteProject(proj._id).subscribe(res => {
      expect(res).toEqual({ 'success': true });
    });
    tick();
  }));

  it(' should return addTask', fakeAsync(() => {
    let task = {
      'Task': 'Angular Proj',
      'Start_Date': '2019-05-8',
      'End_Date': '2019-05-15',
      'Priority': 2
    };
    backend.connections.subscribe(connection => {
      connection.mockRespond(new Response(<ResponseOptions>{
        body: JSON.stringify({ 'success': true })
      }));
    });

    service.addTask(task).subscribe(res => {
      expect(res).toEqual({ 'success': true });
    });
    tick();
  }));

  it('should return getTasksList', fakeAsync(() => {
    const id = "knkniona4d422dd";
    let response = {
      "results": [
        {
          "Task": "Project Angular Proj"
        },
        {
          "Task": "Validations"
        }]
    };
    backend.connections.subscribe(connection => {
      connection.mockRespond(new Response(<ResponseOptions>{
        body: JSON.stringify(response)
      }));
    });

    service.getTasksList(id).subscribe(tasks => {
      expect(tasks).toEqual(response, 'expected')
    });
    tick();
  }));

  it('should return getParentTasksList', fakeAsync(() => {
    let response = {
      "results": [
        {
          "Parent_Task": "Project Angular Proj"
        },
        {
          "Parent_Task": "Validations"
        }]
    };
    backend.connections.subscribe(connection => {
      connection.mockRespond(new Response(<ResponseOptions>{
        body: JSON.stringify(response)
      }));
    });

    service.getParentTasksList().subscribe(ptasks => {
      expect(ptasks).toEqual(response, 'expected')
      expect(ptasks.results.length).toBe(2);
    });
    tick();
  }));

  it('should return updateTask', fakeAsync(() => {
    let task = {
      'Task': 'Project Name',
      'Start_Date': '2019-05-8',
      'End_Date': '2019-05-15',
      'Priority': 2
    };
    backend.connections.subscribe(connection => {
      connection.mockRespond(new Response(<ResponseOptions>{
        body: JSON.stringify({ 'success': true })
      }));
    });

    service.updateTask(task).subscribe(res => {
      expect(res).toEqual({ 'success': true });
    });
    tick();
  }));

});
