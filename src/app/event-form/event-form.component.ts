import { Component, Output, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';

import { EventService } from '../services/event.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent {
  @Output() clickSubmit = new EventEmitter<string>();
  eventName: string;
  eventDate: string;
  eventLink = '';
  eventType = 'Event Type';
  showEdit = false;
  currentForm = 'Add';
  operation = '';
  nameError = false;

  constructor(private es: EventService, private afd: AngularFireDatabase) { }

  addOrEditEvent(data) {
    const currentEvent = {
      id: this.eventDate + this.eventName,
      originalStart: this.eventDate,
      originalTitle: this.eventName,
      title: this.eventName,
      start: this.eventDate,
      color: this.eventType,
      url: this.eventLink
    };
    console.log('//////////////////////////////////////');
    console.log(currentEvent);
    if (this.currentForm === 'Add') {
      this.es.eventArray.push(currentEvent);
      this.clickSubmit.emit('add');
      // Save it to Firebase
      const thisSaved = this;
      this.afd.database.ref('/calendars/' + this.es.currentCalender.title + '/events').push(currentEvent);
    }
    else {
      this.es.eventBeingEdited.start._i = this.eventDate;
      this.es.eventBeingEdited.title = this.eventName;
      this.es.eventBeingEdited.url = this.eventLink;
      this.es.eventBeingEdited.color = this.eventType;
      this.clickSubmit.emit('');
      this.showEdit = false;
      this.currentForm = 'Add';
      //update the datebase with using the object currentEvent
    }
    this.eventDate = '';
    this.eventName = '';
    this.eventType = 'Event Type';
    this.eventLink = '';
  }

  editEvent(data) {
    this.showEdit = true;
    this.currentForm = 'Edit';
    this.es.eventBeingEdited = data;
    console.log(data);
    this.eventDate = data.start._i;
    this.eventName = data.title;
    this.eventLink = data.url;
    this.eventType = data.color;
  }

  deleteEvent() {
    this.clickSubmit.emit('delete');

  }
  setAction(action) {
    this.operation = action;
  }
  chooseAction() {
    console.log(this.eventDate);
    if (this.eventName === '' || this.eventName === undefined) {
      this.nameError = true;
    }
    else {
      if (this.eventDate === undefined || this.eventDate ==='') {
        this.nameError = true;
      }
      else {
        if (this.operation === 'addOrEdit') {
          this.nameError = false;
          this.addOrEditEvent(this.currentForm);

        }
        else {
          this.nameError = false;
          this.deleteEvent();
        }
      }
    }
  }

  switchToAdd(){
    this.showEdit = false;
    this.currentForm = 'Add';
    this.eventDate = '';
    this.eventName = '';
    this.eventType = 'Event Type';
    this.eventLink = '';
  }

}
