import { Component, Output, ViewChild } from '@angular/core';
import { EventFormComponent } from '../event-form/event-form.component';
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
<<<<<<< HEAD
=======
        addEvents(eventArray) {
   console.log('addEventsCalled');
   console.log(this.events.eventArray);
   this.calendar.renderEvents();
  }


>>>>>>> 40f61da3c5647e40ad36584e0d2991802914f9cb
}
