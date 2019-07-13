import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
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


//creating routes with path and component
const APP_ROUTES: Routes = [
  { path: '', component: AddUserComponent },
  { path: 'adduser', component: AddUserComponent },
  { path: 'addproject', component: AddProjectComponent },
  { path: 'addtask', component: AddTaskComponent },
  { path: 'viewtask', component: ViewTaskComponent }
];

@NgModule({
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
    RouterModule.forRoot(APP_ROUTES),     //registering the routes
    HttpModule,
    OrderModule
  ],
  providers: [BackendApiService, FilterPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
