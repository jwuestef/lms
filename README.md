# Learning Management System
### by HAJ Casino

The Learning Management System "LMS" is a course curriculum management website using [Angular 4](https://angular.io/) and [Firebase](https://firebase.google.com/).

The purpose of this website is to allow instructors to create a calendar to organize topics, workshops, and assignments for multi-month long classes. 

Students can view this calendar and click on the calendar events to access resources, and can mark events as "completed". 

Instructors can review events and view which students have completed them.

## View a deployed version
See a [deployed version](https://lms-by-haj.firebaseapp.com/).

## View user manual
View an in-depth [user manual](https://docs.google.com/document/d/1inWpugtxjnkL31oBsdBdP9H6GDv_H6cae_Gd-ozrQsk/edit#).

## Cloning this repository
Clone this Github repository, run `npm install` to install the dependancies, and then `ng serve` to build the app.
Navigate to `http://localhost:4200/` to view the website.

## Deploying this website
Ensure you have [Firebase Tools](https://github.com/firebase/firebase-tools) installed globally on your system.
Deploy to Firebase - [this is a good tutorial](https://alligator.io/angular/deploying-angular-app-to-firebase/).
The relevant commands are:
 - `ng build`
 - `firebase init`
     - You will have to login with your Firebase credentials, and choose/create a Firebase project
     - Choose the `Hosting` option
     - When it asks about the `public`, enter `dist` instead
 - `firebase deploy`
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
## Angular CLI References

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.6.

### Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

### Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

### Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
