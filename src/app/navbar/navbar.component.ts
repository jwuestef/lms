import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { User } from '../models/user';
import { LoginComponent } from '../login/login.component';
import { EventService } from '../services/event.service';
import { StudentService } from '../services/student.service';
import { AuthService } from '../services/auth.service';


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
  duplicateCalendarTitle: string;
  calendarToDuplicate;
  duplicateStartDate;
  skipWeekends = true;
  optionalSkipDates;
  listOfCalendarsAsObject;
  arrayOfCalendars = [];
  isAdmin: boolean;
  thisSaved;
  help = false;


  // The contructor function runs automatically on component load, each and every time it's called
  constructor(
    private router: Router,
    private afa: AngularFireAuth,
    private afd: AngularFireDatabase,
    private es: EventService,
    private serviceStudent: StudentService,
    private as: AuthService
  ) {
    // Pulls current user out of the local storage to show in navbar
    this.navbarUsername = localStorage.getItem('navbarUsername');
    // Query database to obtain list of calendars, to populate dropdown menu with
    const thisSaved = this;
    this.afd.database.ref('/calendars').once('value').then(function (listOfCalendarsFromDB) {
      thisSaved.listOfCalendarsAsObject = listOfCalendarsFromDB.val();
      // Iterate over object and turn it into an array of calendars
      Object.keys(thisSaved.listOfCalendarsAsObject).forEach(function (key) {
        thisSaved.arrayOfCalendars.push(thisSaved.listOfCalendarsAsObject[key]);
      });
      // Now that we have our array full of calendars, let's see which ones the user is allowed to see.
      // Check if they are on the isAdmin table
      thisSaved.afd.database.ref('/isAdmin').once('value').then(function (isAdminTable) {
        const objectOfAdmins = isAdminTable.val();
        const authData = thisSaved.afa.auth.currentUser.email;
        const atSign = authData.search('@');
        const userToCheckIfAdmin = authData.slice(0, atSign);
        // isAdmin is boolean true/false, based on whether the Firebase table has this username
        thisSaved.isAdmin = objectOfAdmins.hasOwnProperty(userToCheckIfAdmin);
        thisSaved.serviceStudent.isAdmin = thisSaved.isAdmin;
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
                // Then the current user doesn't have this calendar added, so we need to erase this calendar from the array, set to null
                thisSaved.arrayOfCalendars[i] = null;
              }
            }
            // Loop over array and erase all null values
            thisSaved.arrayOfCalendars = thisSaved.arrayOfCalendars.filter(function (n) { return n !== null; });
            // Check if the array only has 1 value, if so, we should select that calendar automatically
            if (thisSaved.arrayOfCalendars.length === 1) {
              thisSaved.es.currentCalender = thisSaved.arrayOfCalendars[0];
              thisSaved.changeCalendar.emit(null);
            }
          });
        }
      });
    });
  }  // End of constructor



  // Query the database for the calendar with a given name
  // Set whole calendar to value in service
  // Fires event that tells calendar component to load new calendar
  selectCalender(event) {
    const thisSaved = this;
    this.afd.database.ref('/calendars/' + event.target.innerText).once('value').then(function (selectedCalender) {
      thisSaved.es.currentCalender = selectedCalender.val();
      thisSaved.changeCalendar.emit(null);
    });
  }



  // Handles the logic for creating a new calendar in Firebase
  createNewCalendar() {
    // Pulls current user out of authentication data, sets as the creator for this calendar
    const creatorWithAtSign = this.afa.auth.currentUser.email;
    const atSign = creatorWithAtSign.search('@');
    const creator = creatorWithAtSign.slice(0, atSign);
    // Create the calendar in the database, populated with the title and creator
    this.afd.database.ref('/calendars/' + this.newCalendarTitle).set({
      title: this.newCalendarTitle,
      creator: creator
    });
    // Query database for all calendars, so the dropdown menu will populate with this new calendar
    const thisSaved = this;
    this.afd.database.ref('/calendars').once('value').then(function (listOfCalendarsFromDB) {
      thisSaved.listOfCalendarsAsObject = listOfCalendarsFromDB.val();
      // Iterate over the returned object and turn it into an array of calendars
      let counterOfCalendars = 0;
      Object.keys(thisSaved.listOfCalendarsAsObject).forEach(function (key) {
        thisSaved.arrayOfCalendars[counterOfCalendars] = thisSaved.listOfCalendarsAsObject[key];
        counterOfCalendars++;
      });
    });
  }



  // Duplicates an existing calendar per selected options
  duplicateNewCalendar() {
    // Pulls current user out of authentication data, sets as the creator for this calendar
    const creatorWithAtSign = this.afa.auth.currentUser.email;
    const atSign = creatorWithAtSign.search('@');
    const creator = creatorWithAtSign.slice(0, atSign);
    // Parse textarea content into array of dates to be skipped
    if (this.optionalSkipDates) {
      this.optionalSkipDates = this.optionalSkipDates.split(/\r?\n/);
    } else {
      this.optionalSkipDates = [];
    }
    const thisSaved = this;
    // Get contents of the old calendar
    this.afd.database.ref('/calendars/' + this.calendarToDuplicate).once('value').then(function (duplicateContents) {
      // Save those contents under the new name
      thisSaved.afd.database.ref('/calendars/' + thisSaved.duplicateCalendarTitle).set(duplicateContents.val());
      // Update the 'creator' and 'title' fields
      thisSaved.afd.database.ref('/calendars/' + thisSaved.duplicateCalendarTitle).update({
        title: thisSaved.duplicateCalendarTitle,
        creator: creator
      }).then(function () {
        // Now we need to loop over events and pull out list of all dates
        let arrayOfDates = [];
        // Iterate over the returned object and pull out the dates for each event
        let counterOfDates = 0;
        Object.keys(duplicateContents.val().events).forEach(function (key) {
          arrayOfDates[counterOfDates] = duplicateContents.val().events[key].start;
          counterOfDates++;
        });
        // Sort this array of dates and filter out duplicates
        arrayOfDates = arrayOfDates.sort().filter(function (item, pos, ary) {
          return !pos || item !== ary[pos - 1];
        });
        // Loop over that array of dates, updating based on this value
        for (let i = 0; i < arrayOfDates.length; i++) {
          // Loop over the calendar's events
          counterOfDates = 0;
          Object.keys(duplicateContents.val().events).forEach(function (key) {
            // For each event, if the start date matches the date we're updating
            if (duplicateContents.val().events[key].start === arrayOfDates[i]) {
              // We need to update that event in the DB then, with the new starting date
              thisSaved.afd.database.ref('/calendars/' + thisSaved.duplicateCalendarTitle + '/events/' + key).update({
                start: thisSaved.duplicateStartDate.toString()
              }).then(function () {
                // console.log('Should be updated!');
              });
              // If the dates don't match
            } else {
              // console.log('No match using event date:');
              // console.log(duplicateContents.val().events[key].start);
            }
            // Increment the variable we use to iterate over the events object
            counterOfDates++;
          });
          // Update duplicateStartDate to next day
          // Convert the date into a computer-friendly date variable
          const newDate = new Date(
            Number(thisSaved.duplicateStartDate.substring(0, 4)),
            Number(thisSaved.duplicateStartDate.substring(5, 7)) - 1,
            Number(thisSaved.duplicateStartDate.substring(8, 10))
          );
          // Add 1 day to the date
          newDate.setDate(newDate.getDate() + 1);
          // If this new date is on the optionalSkipDates or a weekend (if option chosen) then we need to keep adding 1 until fixed
          // If we are skipping weekends, then filter like such:
          if (thisSaved.skipWeekends) {
            while (
              thisSaved.optionalSkipDates.includes(newDate.toJSON().substring(0, 10)) ||
              newDate.getDay() === 0 ||
              newDate.getDay() === 6
            ) {
              // console.log('BANNED DATE FOUND! We should skip it, add one to the date!');
              newDate.setDate(newDate.getDate() + 1);
            }
          } else {
            // Otherwise, if we aren't skipping weekends, just filter based on optionalSkipDates
            while (
              thisSaved.optionalSkipDates.includes(newDate.toJSON().substring(0, 10))
            ) {
              // console.log('BANNED DATE FOUND! We should skip it, add one to the date!');
              newDate.setDate(newDate.getDate() + 1);
            }
          }
          // Convert date back to YYYY-MM-DD format
          thisSaved.duplicateStartDate = newDate.toJSON().substring(0, 10);
        } // End of For loop, going over arrayOfDates
        // Query database for all calendars, so the dropdown menu will populate with this new calendar
        thisSaved.afd.database.ref('/calendars').once('value').then(function (listOfCalendarsFromDB) {
          thisSaved.listOfCalendarsAsObject = listOfCalendarsFromDB.val();
          // Iterate over the returned object and turn it into an array of calendars
          let counterOfCalendars = 0;
          Object.keys(thisSaved.listOfCalendarsAsObject).forEach(function (key) {
            thisSaved.arrayOfCalendars[counterOfCalendars] = thisSaved.listOfCalendarsAsObject[key];
            counterOfCalendars++;
          });
        });
      });
    });
  }



  // Signs user out by clearing the local storage, then navigates back to login
  signout() {
    this.as.signout();
  }



  showHelp() {
    this.help = true;
  }


  hideHelp() {
    this.help = false;
  }


} // End of component
