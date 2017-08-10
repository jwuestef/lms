import { Component, ViewChild, Output } from '@angular/core';
import { ClassCalendarComponent } from '../class-calendar/class-calendar.component';
import { EventService } from '../services/event.service';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
  @ViewChild('classCalendar') calendar: ClassCalendarComponent;
  constructor(public events: EventService) {}

   loadEvents() {
    this.events.eventArray = [];
    console.log('loadEvents in studentComponent Called');
    console.log(this.events.currentCalender);
    const thisSaved = this;
    let counterOfEvents = 0;
    console.log(thisSaved.events.currentCalender.events);
    if (thisSaved.events.currentCalender.events !== undefined) {
      Object.keys(thisSaved.events.currentCalender.events).forEach(function (key) {
        thisSaved.events.eventArray[counterOfEvents] = thisSaved.events.currentCalender.events[key];
        thisSaved.events.eventArray[counterOfEvents].id = key;
        counterOfEvents++;
      });
    }
    this.calendar.loadCalendar();
  }
}
