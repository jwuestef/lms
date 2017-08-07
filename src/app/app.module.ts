import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

// Modules
import { BrowserModule } from '@angular/platform-browser';

// Components
import { AppComponent } from './app.component';
import { StudentComponent } from './student/student.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { routes } from './services/routes';
import { FirebaseService } from './services/auth.service';
import { firebaseConfig } from '../environments/firebase.config';
import { CalendarComponent } from 'ap-angular2-fullcalendar';
import { ClassCalendarComponent } from './class-calendar/class-calendar.component';
import { EventFormComponent } from './event-form/event-form.component';
<<<<<<< HEAD
import { StudentManagementComponent } from './student-management/student-management.component';

=======
import { EventService } from './services/event.service';
>>>>>>> 40f61da3c5647e40ad36584e0d2991802914f9cb


@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    AdminComponent,
    LoginComponent,
    NavbarComponent,
    CalendarComponent,
    ClassCalendarComponent,
    EventFormComponent,
    StudentManagementComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
    FirebaseService,
    AngularFireAuth,
    AngularFireDatabase,
    EventService
   ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
