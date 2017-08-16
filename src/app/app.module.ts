import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

// Modules
import { BrowserModule } from '@angular/platform-browser';
import { FlashMessagesModule } from 'angular2-flash-messages';

// Components
import { AppComponent } from './app.component';
import { StudentComponent } from './student/student.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CalendarComponent } from 'ap-angular2-fullcalendar';
import { ClassCalendarComponent } from './class-calendar/class-calendar.component';
import { EventFormComponent } from './event-form/event-form.component';
import { StudentManagementComponent } from './student-management/student-management.component';

// Configuration
import { routes } from './services/routes';
import { firebaseConfig } from '../environments/firebase.config';

// Services
import { AuthService } from './services/auth.service';
import { EventService } from './services/event.service';
import { StudentService } from './services/student.service';


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
    StudentManagementComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    FlashMessagesModule
  ],
  providers: [
    AuthService,
    AngularFireAuth,
    AngularFireDatabase,
    EventService,
    StudentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
