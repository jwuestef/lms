import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth'

// Modules
import { BrowserModule } from '@angular/platform-browser';

// Components
import { AppComponent } from './app.component';
import { StudentComponent } from './student/student.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { routes } from './services/routes';
import { firebaseConfig } from '../environments/firebase.config';
import { CalendarComponent } from 'ap-angular2-fullcalendar';
import { ClassCalendarComponent } from './class-calendar/class-calendar.component';



@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    AdminComponent,
    LoginComponent,
    NavbarComponent,
    CalendarComponent,
    ClassCalendarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
