import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { User } from '../models/user';
import { LoginComponent } from '../login/login.component';
import { EventService } from '../services/event.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Output() changeCalendar = new EventEmitter<Object>();
  user: User;
  navbarUsername: string;
  newCalendarTitle: string;
  listOfCalendarsAsObject;
  arrayOfCalendars = [];
  isAdmin: boolean;
  thisSaved;



  constructor(
    private router: Router,
    private afa: AngularFireAuth,
    private afd: AngularFireDatabase,
    private es: EventService
  ) {
    this.navbarUsername = localStorage.getItem('navbarUsername');
    const thisSaved = this;
    this.afd.database.ref('/calendars').once('value').then(function (listOfCalendarsFromDB) {
      thisSaved.listOfCalendarsAsObject = listOfCalendarsFromDB.val();
      Object.keys(thisSaved.listOfCalendarsAsObject).forEach(function (key) {
        thisSaved.arrayOfCalendars.push(thisSaved.listOfCalendarsAsObject[key]);
      });
      // Now that we have our array full of calendars, let's see which ones they are allowed to see.
      // Check if they are on the isAdmin table
      thisSaved.afd.database.ref('/isAdmin').once('value').then(function (isAdminTable) {
        const objectOfAdmins = isAdminTable.val();
        const authData = thisSaved.afa.auth.currentUser.email;
        const atSign = authData.search('@');
        const userToCheckIfAdmin = authData.slice(0, atSign);
        thisSaved.isAdmin = objectOfAdmins.hasOwnProperty(userToCheckIfAdmin);  // isAdmin is boolean true/false
        // If they are an admin, do nothing
        // Otherwise, query the 'student' table, which returns object full of calendar names they are authorized to view
        // Iterate over thisSaved.arrayOfCalendars, and any calender that doesn't have it's name on the list, erase
        if (!thisSaved.isAdmin) {
          // console.log('You aren\'t an admin, so we need to find out which calendars you are allowed to view!');
          thisSaved.afd.database.ref('/students').once('value').then(function (studentsTable) {
            const objectOfStudents = studentsTable.val();
            // console.log('The calendars you are authorized to view are:');
            // console.log(objectOfStudents[thisSaved.navbarUsername]);
            for (let i = 0; i < thisSaved.arrayOfCalendars.length; i++) {
              const iteratingCalendarTitle = thisSaved.arrayOfCalendars[i]['title'];
              if (objectOfStudents[thisSaved.navbarUsername].hasOwnProperty(iteratingCalendarTitle)) {
                // Do nothing
              } else {
                thisSaved.arrayOfCalendars[i] = null;
              }
            }
            // Loop over array and erase all null values
            thisSaved.arrayOfCalendars = thisSaved.arrayOfCalendars.filter(function(n){ return n !== null; });
          });
        }
      });
    });

  } // End of constructor



  selectCalender(event) {
    const thisSaved = this;
    this.afd.database.ref('/calendars/' + event.target.innerText).once('value').then(function (selectedCalender) {
      thisSaved.es.currentCalender = selectedCalender.val();
      thisSaved.changeCalendar.emit(null);
    });
  }


  createNewCalendar() {
    const creatorWithAtSign = this.afa.auth.currentUser.email;
    const atSign = creatorWithAtSign.search('@');
    const creator = creatorWithAtSign.slice(0, atSign);
    this.afd.database.ref('/calendars/' + this.newCalendarTitle).set({
      title: this.newCalendarTitle,
      creator: creator
    });
    const thisSaved = this;
    this.afd.database.ref('/calendars').once('value').then(function (listOfCalendarsFromDB) {
      thisSaved.listOfCalendarsAsObject = listOfCalendarsFromDB.val();
      let counterOfCalendars = 0;
      Object.keys(thisSaved.listOfCalendarsAsObject).forEach(function (key) {
        // console.log(key, thisSaved.listOfCalendarsAsObject[key]);
        thisSaved.arrayOfCalendars[counterOfCalendars] = thisSaved.listOfCalendarsAsObject[key];
        counterOfCalendars++;
        // console.log(thisSaved.arrayOfCalendars);
      });
    });
  }


  signout() {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }



} // End of component
