import { Component, ViewChild, Output } from '@angular/core';

import { ClassCalendarComponent } from '../class-calendar/class-calendar.component';
import { EventService } from '../services/event.service';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
  // In the HTML element with id classCalendar, which is of type ClassCalendarComponent, and we'll refer to it as 'calendar'...
  // The @ViewChild gives us access to all of the variables and functions/methods inside this child component
  @ViewChild('classCalendar') calendar: ClassCalendarComponent;



  // The contructor function runs automatically on component load, each and every time it's called
  constructor(public events: EventService) { }



  // This is called when a calendar is selected from the dropdown
  loadEvents() {
    // Clears events array
    this.events.eventArray = [];
    const thisSaved = this;
    let counterOfEvents = 0;
    // Checks if the calendar has existing events, if so, then iterate over the events object and turn it into an array of events
    if (thisSaved.events.currentCalender.events !== undefined) {
      Object.keys(thisSaved.events.currentCalender.events).forEach(function (key) {
        thisSaved.events.eventArray[counterOfEvents] = thisSaved.events.currentCalender.events[key];
        thisSaved.events.eventArray[counterOfEvents].id = key;
        counterOfEvents++;
      });
    }
    // Call loadCalendar() function inside ClassCalendarComponent, a child of this component, which the @ViewChild above gives us access to
    this.calendar.loadCalendar();
  }
}
