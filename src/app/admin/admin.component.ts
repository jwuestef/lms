import { Component, Output, ViewChild } from '@angular/core';
import { EventFormComponent } from '../event-form/event-form.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ClassCalendarComponent } from '../class-calendar/class-calendar.component';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { EventService} from '../services/event.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})

export class AdminComponent {
 @ViewChild('classCalendar') calendar: ClassCalendarComponent;

  constructor(public router: Router, public afd: AngularFireDatabase, public afa: AngularFireAuth, private events: EventService) {
        const thisSaved = this;
        this.afd.database.ref('/isAdmin').once('value').then(function(isAdminTable) {
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
   console.log(this.events.eventArray);
   this.calendar.renderEvents();
  }

    loadEvents() {
      console.log('loadEvents Calles');
      console.log(this.events.currentCalender);
      // this.events.eventArray = this.events.currentCalender.events;
      const thisSaved = this;
      let counterOfEvents = 0;
      Object.keys(thisSaved.events.currentCalender.events).forEach(function(key) {
          // console.log(key, thisSaved.listOfCalendars[key]);
          thisSaved.events.eventArray[counterOfEvents] = thisSaved.events.currentCalender.events[key];
          counterOfEvents++;
          console.log(thisSaved.events.eventArray);
      });

      this.calendar.loadCalendar();
    }


}
