import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ViewTaskComponent } from './components/view-task/view-task.component';
import { FormsModule }   from '@angular/forms';
import { RestApiService } from './services/rest-api.service';
import { FilterPipe} from './pipes/filter.pipe';
import { OrderModule } from 'ngx-order-pipe'; 

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
    AddProjectComponent,
    AddTaskComponent,
    AddUserComponent,
    ViewTaskComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(APP_ROUTES),
    HttpModule,
    OrderModule
  ],
  providers: [RestApiService,FilterPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
