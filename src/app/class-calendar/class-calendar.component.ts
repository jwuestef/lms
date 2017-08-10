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
  currentCalendarTitle = 'Choose a calendar from the dropdown.'; // initialize a title
  calendarOptions: object;
  @Output() eventEdit = new EventEmitter<object>(); // create a custom event for when a event is clicked;



  constructor(public events: EventService, public serviceStudent: StudentService) {
    const currentCalendar = this;

    this.calendarOptions = {
      fixedWeekCount: false,
      editable: false,
      eventLimit: true, // allow "more" link when too many events
      events: this.events.eventArray,
      eventClick: function (event, element) { // override default eventClick action with our own action
        console.log('this is the event');
        console.log(event);
        currentCalendar.eventEdit.emit(event); // custom event fires
      }
    };

  }


// gets called when the add button is clicked
  renderEvents() {
    console.log('renderEvents called');
    const currentEvent = this.events.eventArray[this.events.eventArray.length - 1];
    $('#calendar').fullCalendar('renderEvent', currentEvent); // renders the new event visible on the calendar
  }



  updateEvents() {
    console.log('call update');
    $('#calendar').fullCalendar('removeEvents', this.events.eventBeingEdited.id);
    console.log(this.events.eventBeingEdited.id);
    const currentEvent = {
      id: this.events.eventBeingEdited.id,
      title: this.events.eventBeingEdited.title,
      start: this.events.eventBeingEdited.start._i, // fixes the start property so it can be re-added to the calendar
      color: this.events.eventBeingEdited.color,
      url: this.events.eventBeingEdited.url,
    };
    $('#calendar').fullCalendar('renderEvent', currentEvent);
  }


// deletes current edited event from calendar then renders it
  deleteEvents() {
    $('#calendar').fullCalendar('removeEvents', this.events.eventBeingEdited.id);
  }



  loadCalendar() {
    this.currentCalendarTitle = this.events.currentCalender.title;
    console.log('this.events.currentCalender.title is:');
    console.log(this.events.currentCalender.title);
    console.log(this.events.eventArray);
    console.log('load new calendar');
    $('#calendar').fullCalendar('removeEvents'); // removes all events locally before switching to a new calendar
    $('#calendar').fullCalendar('addEventSource', this.events.eventArray); // adds a new set of events
    $('#calendar').fullCalendar('rerenderEvents'); // rerenders all events on the calendar using the new set of events
  }


 // Link handling for events
  onCalendarInit() {
    const calendar = this;
    console.log('calendar init');
    jQuery('#calendar').on('click', '.fc-event', function (e) { // fires when a event is clicked
      if (jQuery(this).attr('href')) {
        e.preventDefault(); // prevent the default action
        if (calendar.serviceStudent.isAdmin === false) { // check if user is a student
          window.open(jQuery(this).attr('href'), '_blank'); // if user is student open link in a new tab
        }
      }
    });
  }



}  // End of component

