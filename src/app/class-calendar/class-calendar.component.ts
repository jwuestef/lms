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
    fixedWeekCount: false,
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    events: this.events.eventArray
  };
  renderEvents() {
    console.log('renderEvents called');
    const currentEvent = this.events.eventArray[this.events.eventArray.length - 1];
    $('#calendar').fullCalendar('renderEvent', currentEvent);

  }
  loadCalendar() {
    console.log(this.events.eventArray);
    console.log('load new calendar');
    $('#calendar').fullCalendar( 'removeEvents');
    $('#calendar').fullCalendar( 'addEventSource', this.events.eventArray);
    $('#calendar').fullCalendar( 'rerenderEvents');
  }
  onCalendarInit() {
    console.log('calendar init');
     jQuery('#calendar').on( 'click', '.fc-event', function(e){
    e.preventDefault();
    window.open( jQuery(this).attr('href'), '_blank' );
});
  }


}

