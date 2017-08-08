import { Component, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { EventFormComponent } from '../event-form/event-form.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ClassCalendarComponent } from '../class-calendar/class-calendar.component';
import { EventService } from '../services/event.service';
import { StudentService } from '../services/student.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  @ViewChild('classCalendar') calendar: ClassCalendarComponent;
  isEvent = true;
  isStudent = false;



  constructor(public router: Router, public afd: AngularFireDatabase, public afa: AngularFireAuth, public es: EventService) {
    const thisSaved = this;
    this.afd.database.ref('/isAdmin').once('value').then(function (isAdminTable) {
      const arrayOfAdmins = isAdminTable.val();
      const authData = thisSaved.afa.auth.currentUser.email;
      const atSign = authData.search('@');
      const userToCheckIfAdmin = authData.slice(0, atSign);
      const isAdmin = arrayOfAdmins.hasOwnProperty(userToCheckIfAdmin);
      if (!isAdmin) {
        thisSaved.router.navigateByUrl('/student');
      }
    });
  }



  addEvents(eventArray) {
    console.log('addEventsCalled');
    console.log(this.es.eventArray);
    this.calendar.renderEvents();
  }



  loadEvents() {
    this.es.eventArray = [];
    console.log('loadEvents Calles');
    console.log(this.es.currentCalender);
    const thisSaved = this;
    let counterOfEvents = 0;
    Object.keys(thisSaved.es.currentCalender.events).forEach(function (key) {
      thisSaved.es.eventArray[counterOfEvents] = thisSaved.es.currentCalender.events[key];
      counterOfEvents++;
    });

    this.calendar.loadCalendar();
  }



  showEventForm() {
    this.isStudent = false;
    this.isEvent = true;
  }



  showStudentForm() {
    this.isEvent = false;
    this.isStudent = true;

  }



} // End of component
