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



  constructor(public afd: AngularFireDatabase, public es: EventService, public fms: FlashMessagesService) {
    console.log('StudentManagementComponent loaded!');
  }



  addStudent() {
    const newCalendarTitle = this.es.currentCalender.title;
    const thisSaved = this;
    this.afd.database.ref('/students/' + this.newStudentUsername).child(newCalendarTitle).set({
      dummyVariable: 1
    }).then(function() {
      thisSaved.fms.show(
        '\'' + thisSaved.newStudentUsername + '\' added to ' + '\'' + thisSaved.es.currentCalender.title + '\'',
        {
          cssClass: 'alert-success',
          timeout: 1500
        }
      );
      thisSaved.newStudentUsername = '';
    }).catch(function(err) {
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
