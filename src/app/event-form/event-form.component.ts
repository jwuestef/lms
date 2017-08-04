import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent {
  @Input() eventsArray = [];
  @Output() change = new EventEmitter<Array<Object>>();
  eventName: string;
  eventDate: string;
  eventType = 'Event Type';


  addEvent() {
    this.eventsArray.push({
      title: this.eventName,
      start: this.eventDate
    });
    this.change.emit(this.eventsArray);
    console.log(this.eventsArray);
  }
}
