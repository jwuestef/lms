import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';

import { EventService } from '../services/event.service';


@Component({
  selector: 'app-student-management',
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.css']
})
export class StudentManagementComponent {
  newStudentUsername = '';



  constructor(public afd: AngularFireDatabase, public es: EventService) {
    console.log('StudentManagementComponent loaded!');
  }



  addStudent() {
    console.log('addStudent called with newStudentUsername:');
    console.log(this.newStudentUsername);
  }




}
