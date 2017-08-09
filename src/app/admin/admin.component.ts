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
  @ViewChild('eventForm') eventForm: EventFormComponent;
  isEvent = true;
  isStudent = false;
  constructor(public router: Router, public afd: AngularFireDatabase, public afa: AngularFireAuth, private events: EventService) {
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



  addOrEditEvents(operation) {
    console.log(operation);
    if (operation === 'add') {
      this.calendar.renderEvents();
    } else if (operation === 'delete') {
      this.calendar.deleteEvents();
    } else {
      this.calendar.updateEvents();
    }
  }



  loadEvents() {
    this.events.eventArray = [];
    console.log('loadEvents Calles');
    console.log(this.events.currentCalender);
    const thisSaved = this;
    let counterOfEvents = 0;
    Object.keys(thisSaved.events.currentCalender.events).forEach(function (key) {
      thisSaved.events.eventArray[counterOfEvents] = thisSaved.events.currentCalender.events[key];
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



  alertEventForm(data) {
    this.eventForm.editEvent(data);
  }



} // End of component
