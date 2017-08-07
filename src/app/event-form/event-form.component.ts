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
  @Output() clickSubmit = new EventEmitter<Array<Object>>();
  eventName: string;
  eventDate: string;
  eventLink: string;
  eventType = 'Event Type';

  constructor(private es: EventService, private afd: AngularFireDatabase) {}

  addEvent() {
    const currentEvent = {
      title: this.eventName,
      start: this.eventDate,
      color: this.eventType,
      url: this.eventLink
    };
    this.es.eventArray.push(currentEvent);
    this.clickSubmit.emit(null);
    // Save it to Firebase
    const thisSaved = this;
    this.afd.database.ref('/calendars/' + this.es.currentCalender.title + '/events').push(currentEvent);
  }
}
