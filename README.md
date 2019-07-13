# Mean Project Manager App

 This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.8.
 This application is about Project Manager where user can add/edit/delete project, add/edit/delete user,add tasks and view tasks, edit any task and even end task. 
    Find complete code here :https://github.com/divyachigullapalli/project-Manager


#### Data Communication 
* Create projectManager Database
* Create table schema for momgodb

## Development server
First run this command before starting node `npm run build` creates build project in dist folder.
Run `ng start` for a dev server. Navigate to `http://localhost:1335/`. The app will automatically reload if you change any of the source files.

#### Prequisites
* Install node, npm is installed as a part of node. Run npm -v to test that npm is installed correctly. 
* For the following debugging, you will only need to run the following command to bring down dependencies to node_modules directory
  `npm install` 
* create a database named taskManager. 

#### Post Install 

* Note: If you want to run packages outside of npm scripts on the command line, you need to install those globally
  * Available NPM scripts
    * `npm start` runs the server launch the application.
    * `npm run test` runs spec files. 
    * `npm run build` build project in dist folder. 
* Before starting project make sure mongo db is running. Go to program files/mongodb folder bin and run command "mongod". 


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
