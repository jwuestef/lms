import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EventService } from '../services/event.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-class-calendar',
  templateUrl: 'class-calendar.component.html',
  styleUrls: ['class-calendar.component.css']
})
export class ClassCalendarComponent {
  currentCalendarTitle;
  calendarOptions: object;
  @Output() eventEdit = new EventEmitter<object>();

  constructor(private events: EventService) {
    const currentCalendar = this;

    this.calendarOptions = {
      fixedWeekCount: false,
      editable: false,
      eventLimit: true, // allow "more" link when too many events
      events: this.events.eventArray,
      eventClick: function (event, element) {
        currentCalendar.eventEdit.emit(event);
        //$('#calendar').fullCalendar('updateEvent', event);
      }
    };

  };
  renderEvents() {
    console.log('renderEvents called');
    const currentEvent = this.events.eventArray[this.events.eventArray.length - 1];
    $('#calendar').fullCalendar('renderEvent', currentEvent);

  }
  updateEvents() {
    console.log('call update');
    $('#calendar').fullCalendar('removeEvents', this.events.eventBeingEdited);
  }
  loadCalendar() {
    console.log(this.events.eventArray);
    console.log('load new calendar');
    $('#calendar').fullCalendar('removeEvents');
    $('#calendar').fullCalendar('addEventSource', this.events.eventArray);
    $('#calendar').fullCalendar('rerenderEvents');

    this.currentCalendarTitle = this.events.currentCalender.title;
  }
  onCalendarInit() {
    const calendar = this;
    console.log('calendar init');
    jQuery('#calendar').on('click', '.fc-event', function (e) {
      if (jQuery(this).attr('href')) {
        e.preventDefault();
        calendar.eventEdit.emit();
        window.open(jQuery(this).attr('href'), '_blank');
      }
    });
  }


}

