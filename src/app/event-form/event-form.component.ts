import { Component, Input } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent {
  @Input() eventsArray = [];
  eventName: string;
  eventDate: string;
  eventType = 'Event Type';


  addEvent() {
    this.eventsArray.push({
      title: this.eventName,
      start: this.eventDate
    })
  }
}
