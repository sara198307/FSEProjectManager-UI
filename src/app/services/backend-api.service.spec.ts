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
      'task': 'Parent Task'
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
     // expect(users).toEqual(response, 'expected')
    });
    tick();
  }));

  it(' should return addUser', fakeAsync(() => {
    let user = {
      'firstName': 'Saravanan',
      'lastName': 'Pandian',
      'empId': '602814'
    };
    backend.connections.subscribe(connection => {
      connection.mockRespond(new Response(<ResponseOptions>{
       // body: JSON.stringify({ 'success': true })
      }));
    });

    service.addUser(user).subscribe(res => {
     // expect(res).toEqual({ 'success': true });
    });
    tick();
  }));

  it(' should return updateUser', fakeAsync(() => {
    let user = {
	   'userId':'44235',
      'firstName': 'Saravanan',
      'lastName': 'Pandian',
      'empId': '602814'
    };
    backend.connections.subscribe(connection => {
      connection.mockRespond(new Response(<ResponseOptions>{
       // body: JSON.stringify({ 'success': true })
      }));
    });

    service.updateUser(user,user.userId).subscribe(res => {
     // expect(res).toEqual({ 'success': true });
    });
    tick();
  }));

  it(' should return deleteUser', fakeAsync(() => {
    let user = {
      'userId': '602814ssssgfjuss'
    };
    backend.connections.subscribe(connection => {
      connection.mockRespond(new Response(<ResponseOptions>{
        body: JSON.stringify({ 'success': true })
      }));
    });

    service.deleteUser(user.userId).subscribe(res => {
      //expect(res).toEqual({ 'Success': true });
    });
    tick();
  }));



  it(' should return addProject', fakeAsync(() => {
    let proj = {
      'project': 'Project Angular Proj',
      'startDate': '2019-07-17',
      'endDate': '2019-07-23',
      'priority': 2
    };
    backend.connections.subscribe(connection => {
      connection.mockRespond(new Response(<ResponseOptions>{
       // body: JSON.stringify({ 'success': true })
      }));
    });

    service.addProject(proj).subscribe(res => {
     // expect(res).toEqual({ 'success': true });
    });
    tick();
  }));

  it(' should return getProjectsList', fakeAsync(() => {
    let response = {
      "resultCount": 1,
      "results": [
        {
          "project": "Project Angular Proj"
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
	  'projectId':'322434',
      'project': 'Project Name',
      'startDate': '2019-07-17',
      'endDate': '2019-07-23',
      'priority': 2
    };
    backend.connections.subscribe(connection => {
      connection.mockRespond(new Response(<ResponseOptions>{
      //  body: JSON.stringify({ 'Success': true })
      }));
    });

    service.updateProject(proj,proj.projectId).subscribe(res => {
//expect(res).toEqual({ 'Success': true });
    });
    tick();
  }));

  it(' should return deleteProject', fakeAsync(() => {
    let proj = {
      'projectId': '6028ss14ssssgfjuss'
    };
    backend.connections.subscribe(connection => {
      connection.mockRespond(new Response(<ResponseOptions>{
       // body: JSON.stringify({ 'success': true })
      }));
    });

    service.deleteProject(proj.projectId).subscribe(res => {
      //expect(res).toEqual({ 'Success': true });
    });
    tick();
  }));

  it(' should return addTask', fakeAsync(() => {
    let task = {
      'task': 'Angular Proj',
      'startDate': '2019-07-17',
      'endDate': '2019-07-23',
      'priority': 2
    };
    backend.connections.subscribe(connection => {
      connection.mockRespond(new Response(<ResponseOptions>{
       // body: JSON.stringify({ 'success': true })
      }));
    });

    service.addTask(task).subscribe(res => {
      //expect(res).toEqual({ 'success': true });
    });
    tick();
  }));

  it('should return getTasksList', fakeAsync(() => {
    const id = "knkniona4d422dd";
    let response = {
      "results": [
        {
          "task": "Project Angular Proj"
        },
        {
          "task": "Validations"
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
          "parentTask": "Project Angular Proj"
        },
        {
          "parentTask": "Validations"
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
	  'taskId':'42342',
      'task': 'Project Name',
      'startDate': '2019-07-17',
      'endDate': '2019-07-23',
      'priority': 2
    };
    backend.connections.subscribe(connection => {
      connection.mockRespond(new Response(<ResponseOptions>{
       // body: JSON.stringify({ 'success': true })
      }));
    });

    service.updateTask(task,task.taskId).subscribe(res => {
      //expect(res).toEqual({ 'success': true });
    });
    tick();
  }));

});
