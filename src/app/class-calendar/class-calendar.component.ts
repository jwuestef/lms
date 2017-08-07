import { Component, Input } from '@angular/core';
import { EventService } from '../services/event.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-class-calendar',
  templateUrl: 'class-calendar.component.html',
  styleUrls: ['class-calendar.component.css']
})
export class ClassCalendarComponent {

  constructor(private events: EventService) { }
  calendarOptions: Object = {
    //height: 'auto',
    fixedWeekCount: false,
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    events: this.events.eventArray
    //[
    // {
    //   title: 'All Day Event',
    //   start: '2016-09-01'
    // },
    // {
    //   title: 'Long Event',
    //   start: '2016-09-07',
    //   end: '2016-09-10'
    // },
    // {
    //   id: 999,
    //   title: 'Repeating Event',
    //   start: '2016-09-09T16:00:00'
    // },
    // {
    //   id: 999,
    //   title: 'Repeating Event',
    //   start: '2016-09-16T16:00:00'
    // },
    // {
    //   title: 'Conference',
    //   start: '2016-09-11',
    //   end: '2016-09-13'
    // },
    // {
    //   title: 'Meeting',
    //   start: '2016-09-12T10:30:00',
    //   end: '2016-09-12T12:30:00'
    // },
    // {
    //   title: 'Lunch',
    //   start: '2016-09-12T12:00:00'
    // },
    // {
    //   title: 'Meeting',
    //   start: '2016-09-12T14:30:00'
    // },
    // {
    //   title: 'Happy Hour',
    //   start: '2016-09-12T17:30:00'
    // },
    // {
    //   title: 'Dinner',
    //   start: '2016-09-12T20:00:00'
    // },
    // {
    //   title: 'Birthday Party',
    //   start: '2016-09-13T07:00:00'
    // },
    // {
    //   title: 'Click for Google',
    //   url: 'http://google.com/',
    //   start: '2016-09-28'
    // }
    //]
  };
  //$('angular2-fullcalendar').fullcalendar('renderEvents', this.events.currentEvents);
  renderEvents() {
    console.log('renderEvents called');
    $('#calendar').fullCalendar('renderEvent', this.events.eventArray[this.events.eventArray.length - 1]);
  }
  loadCalendar(){
    $('#calendar').fullCalendar('renderEvents', this.events.eventArray);
  }


}

