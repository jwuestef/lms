import { Component, Output } from '@angular/core';
import { EventFormComponent } from '../event-form/event-form.component';
import { ClassCalendarComponent } from '../class-calendar/class-calendar.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})

export class AdminComponent {
  events = [];
  eventForm = new EventFormComponent;
  calendar = new ClassCalendarComponent;

  addEvents(eventArray) {
    this.events = eventArray;
    console.log('addEvents called');
    console.log(this.events);
  }
}
