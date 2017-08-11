import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { FlashMessagesService } from 'angular2-flash-messages';

import { EventService } from '../services/event.service';


@Component({
  selector: 'app-student-management',
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.css']
})
export class StudentManagementComponent {
  newStudentUsername = '';



  // The contructor function runs automatically on component load, each and every time it's called
  constructor(public afd: AngularFireDatabase, public es: EventService, public fms: FlashMessagesService) { }



  // Add a calendar to a student, giving the student permission to see this calendar
  addStudent() {
    // Set the new calendar's title, and make the new user's username all lowercase
    const newCalendarTitle = this.es.currentCalender.title;
    this.newStudentUsername = this.newStudentUsername.toLowerCase();
    // Make a new child for that student with the calendar's name, via a .child() and .set() call to Firebase
    // The calendar's name is populated with a dummy object, so it acts as a folder and correctly loads into Firebase
    const thisSaved = this;
    this.afd.database.ref('/students/' + this.newStudentUsername).child(newCalendarTitle).set({
      dummyVariable: 1
    }).then(function () {
      // Show a success message upon successful calendar addition
      thisSaved.fms.show(
        '\'' + thisSaved.newStudentUsername + '\' added to ' + '\'' + thisSaved.es.currentCalender.title + '\'',
        {
          cssClass: 'alert-success',
          timeout: 1500
        }
      );
      thisSaved.newStudentUsername = '';
    }).catch(function (err) {
      // We couldn't add the calendar name to this student for some reason, show error message
      console.log('Error in addStudent function inside student-management.component.ts is:');
      console.log(err);
      thisSaved.fms.show(
        '\'' + thisSaved.newStudentUsername + '\' added to ' + '\'' + thisSaved.es.currentCalender.title + '\'',
        {
          cssClass: 'alert-danger',
          timeout: 1500
        }
      );
    });
  }



}  // End of component
