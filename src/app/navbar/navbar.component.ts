import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { User } from '../models/user';
import { LoginComponent } from '../login/login.component';
import { FirebaseService } from '../services/auth.service';
import { EventService } from '../services/event.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user: User;
  navbarUsername: string;
  newCalendarTitle: string;
  listOfCalendars;
  arrayOfCalendars = [0];
  isAdmin: boolean;
  @Output() changeCalendar =  new EventEmitter<Object>();
  thisSaved;


  selectCalender(event) {
    const thisSaved = this;
    this.afd.database.ref('/calendars/' + event.target.innerText).once('value').then(function(selectedCalender) {
      thisSaved.es.currentCalender = selectedCalender.val();
    });
    this.changeCalendar.emit(null);
  }


  createNewCalendar() {
    const creatorWithAtSign = this.afa.auth.currentUser.email;
    const atSign = creatorWithAtSign.search('@');
    const creator = creatorWithAtSign.slice(0, atSign);
    this.afd.database.ref('/calendars/' + this.newCalendarTitle).set({
      title: this.newCalendarTitle,
      creator: creator,
      events: [0],
      users: [0]
    });
    const thisSaved = this;
    this.afd.database.ref('/calendars').once('value').then(function(listOfCalendarsFromDB) {
      thisSaved.listOfCalendars = listOfCalendarsFromDB.val();
      let counterOfCalendars = 0;
      Object.keys(thisSaved.listOfCalendars).forEach(function(key) {
          // console.log(key, thisSaved.listOfCalendars[key]);
          thisSaved.arrayOfCalendars[counterOfCalendars] = thisSaved.listOfCalendars[key];
          counterOfCalendars++;
          // console.log(thisSaved.arrayOfCalendars);
      });
    });
  }


  signout() {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }


  constructor(
              private FirebaseService: FirebaseService,
              private router: Router,
              private afa: AngularFireAuth,
              private afd: AngularFireDatabase,
              private es: EventService
  ) {
    this.FirebaseService = FirebaseService;
    this.navbarUsername = localStorage.getItem('navbarUsername');
    const thisSaved = this;
    this.afd.database.ref('/calendars').once('value').then(function(listOfCalendarsFromDB) {
      thisSaved.listOfCalendars = listOfCalendarsFromDB.val();
      let counterOfCalendars = 0;
      Object.keys(thisSaved.listOfCalendars).forEach(function(key) {
          // console.log(key, thisSaved.listOfCalendars[key]);
          thisSaved.arrayOfCalendars[counterOfCalendars] = thisSaved.listOfCalendars[key];
          counterOfCalendars++;
          // console.log(thisSaved.arrayOfCalendars);
      });
    });
    this.afd.database.ref('/isAdmin').once('value').then(function(isAdminTable) {
      const arrayOfAdmins = isAdminTable.val();
      const authData = thisSaved.afa.auth.currentUser.email;
      const atSign = authData.search('@');
      const userToCheckIfAdmin = authData.slice(0, atSign);
      thisSaved.isAdmin = arrayOfAdmins.hasOwnProperty(userToCheckIfAdmin);
    });
  }

} // End of component
