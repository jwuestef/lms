import { Component, Output, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';
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

  constructor(private events: EventService){}

  addEvent() {
    this.events.eventArray.push({
      title: this.eventName,
      start: this.eventDate,
      color: this.eventType,
      url: this.eventLink
    });
    this.clickSubmit.emit(null);
  }
}
