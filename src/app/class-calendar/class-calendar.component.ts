import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery';
import { StudentService } from '../services/student.service';
import { EventService } from '../services/event.service';


@Component({
  selector: 'app-class-calendar',
  templateUrl: 'class-calendar.component.html',
  styleUrls: ['class-calendar.component.css']
})
export class ClassCalendarComponent {
  currentCalendarTitle = 'Choose a calendar from the dropdown.';
  calendarOptions: object;
  @Output() eventEdit = new EventEmitter<object>();



  constructor(public events: EventService, public serviceStudent: StudentService) {
    const currentCalendar = this;

    this.calendarOptions = {
      fixedWeekCount: false,
      editable: false,
      eventLimit: true, // allow "more" link when too many events
      events: this.events.eventArray,
      eventClick: function (event, element) {
        console.log('this is the event');
        console.log(event);
        currentCalendar.eventEdit.emit(event);
      }
    };

  }



  renderEvents() {
    console.log('renderEvents called');
    const currentEvent = this.events.eventArray[this.events.eventArray.length - 1];
    $('#calendar').fullCalendar('renderEvent', currentEvent);
  }



  updateEvents() {
    console.log('call update');
    $('#calendar').fullCalendar('removeEvents', this.events.eventBeingEdited.id);
    console.log(this.events.eventBeingEdited.id);
    const currentEvent = {
      id: this.events.eventBeingEdited.id,
      title: this.events.eventBeingEdited.title,
      start: this.events.eventBeingEdited.start._i,
      color: this.events.eventBeingEdited.color,
      url: this.events.eventBeingEdited.url,
    };
    $('#calendar').fullCalendar('renderEvent', currentEvent);
  }



  deleteEvents() {
    $('#calendar').fullCalendar('removeEvents', this.events.eventBeingEdited.id);
  }



  loadCalendar() {
    this.currentCalendarTitle = this.events.currentCalender.title;
    console.log('this.events.currentCalender.title is:');
    console.log(this.events.currentCalender.title);
    console.log(this.events.eventArray);
    console.log('load new calendar');
    $('#calendar').fullCalendar('removeEvents');
    $('#calendar').fullCalendar('addEventSource', this.events.eventArray);
    $('#calendar').fullCalendar('rerenderEvents');
  }



  onCalendarInit() {
    const calendar = this;
    console.log('calendar init');
    jQuery('#calendar').on('click', '.fc-event', function (e) {
      if (jQuery(this).attr('href')) {
        e.preventDefault();
        if (calendar.serviceStudent.isAdmin === false) {
          window.open(jQuery(this).attr('href'), '_blank');
        }
      }
    });
  }



}  // End of component

