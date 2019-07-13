import { TestBed, async } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FilterPipe} from './pipes/filter.pipe';
import { OrderModule } from 'ngx-order-pipe'; 

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { ViewTaskComponent } from './components/view-task/view-task.component';
import { BackendApiService } from './services/backend-api.service';
import { RouterModule, Routes } from '@angular/router';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        AddUserComponent,
        AddProjectComponent,
        AddTaskComponent,
        ViewTaskComponent,
        FilterPipe
      ],
      imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        OrderModule,
        RouterModule.forRoot(
          [ { path: '', component: AddUserComponent },
          { path: 'adduser', component: AddUserComponent }, 
          { path: 'addproject', component: AddProjectComponent },
          { path: 'addtask', component: AddTaskComponent },
          { path: 'viewtask', component: ViewTaskComponent }
        ]
        )
      ],
      providers: [BackendApiService]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'mean-project-manager-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Project Manager App');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Project Manager!');
  });
});
