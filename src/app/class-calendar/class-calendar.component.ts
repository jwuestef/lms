import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery';

import { StudentService } from '../services/student.service';
import { EventService } from '../services/event.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-class-calendar',
  templateUrl: 'class-calendar.component.html',
  styleUrls: ['class-calendar.component.css']
})
export class ClassCalendarComponent {
  @Output() eventEdit = new EventEmitter<object>();  // Create a custom event for when a event is clicked
  currentCalendarTitle = 'Choose a calendar from the dropdown.';  // Initialize a title
  calendarOptions: object;



  // The contructor function runs automatically on component load, each and every time it's called
  constructor(public es: EventService, public serviceStudent: StudentService, private afd: AngularFireDatabase) {
    const currentCalendar = this;
    this.serviceStudent.currentStudentUsername = localStorage.getItem('navbarUsername');
    // Set FullCalendar options
    this.calendarOptions = {
      fixedWeekCount: false,
      editable: false,
      eventLimit: true,  // Allow "more" link when too many events
      events: this.es.eventArray,
      eventClick: function (event, element) {  // Override default eventClick action with our own action
        // console.log('this is the event');
        // console.log(event);
        currentCalendar.es.eventBeingEdited = event;
        currentCalendar.eventEdit.emit(event);  // Custom event fires
      }
    };
  }



  // Gets called when the Add button is clicked
  renderEvents() {
    const currentEvent = this.es.eventArray[this.es.eventArray.length - 1];  // Chooses this new event, which is the last one in the array
    $('#calendar').fullCalendar('renderEvent', currentEvent);  // Renders the new event visible on the calendar
  }



  // Gets called with the Edit button is clicked
  updateEvents() {
    $('#calendar').fullCalendar('removeEvents', this.es.eventBeingEdited.id);  // Remove the event we're editing from the calendar view
    const currentEvent = {
      id: this.es.eventBeingEdited.id,
      title: this.es.eventBeingEdited.title,
      start: this.es.eventBeingEdited.start._i,  // Fixes the start property so it can be re-added to the calendar
      color: this.es.eventBeingEdited.color,
      url: this.es.eventBeingEdited.url,
    };
    const thisSaved = this;
    let counter = 0;
    // This loop searches for the selected event in the local array then edits it with the new value.
    this.es.eventArray.forEach(function (element) {
      if (element.id === currentEvent.id) {
        thisSaved.es.eventArray[counter] = currentEvent;
      }
      counter++;
    });
    $('#calendar').fullCalendar('renderEvent', currentEvent);  // Render the new event onto the calendar view
  }

  strikeThroughEvent() {
    $('#calendar').fullCalendar('removeEvents', this.es.eventBeingEdited.id);
    const currentEvent = {
      id: this.es.eventBeingEdited.id,
      title: this.es.eventBeingEdited.title,
      start: this.es.eventBeingEdited.start._i,  // Fixes the start property so it can be re-added to the calendar
      color: this.es.eventBeingEdited.color,
      url: this.es.eventBeingEdited.url,
      originalColor: this.es.eventBeingEdited.originalColor
    };
    // If the event is already struck-through (gray) then remove that from the student's 'done list'
    // Else, add that event's ID to the student's 'done list'
    if (this.es.eventBeingEdited.color === 'darkgray') {
      currentEvent.color = this.es.eventBeingEdited.originalColor;
      this.afd.database.ref('/students/' + this.serviceStudent.currentStudentUsername + "/" + this.es.currentCalender.title + "/" + currentEvent.id).remove();
    } else {
      currentEvent.color = 'darkgray';
      this.afd.database.ref('/students/' + this.serviceStudent.currentStudentUsername + "/" + this.es.currentCalender.title).update({ [currentEvent.id]: currentEvent.id });
    }
    const thisSaved = this;
    let counter = 0;
    // This loop searches for the selected event in the local array then edits it with the new value.
    this.es.eventArray.forEach(function (element) {
      if (element.id === currentEvent.id) {
        thisSaved.es.eventArray[counter] = currentEvent;
      }
      counter++;
    });

    $('#calendar').fullCalendar('renderEvent', currentEvent);  // Render the new event onto the calendar view
  }



  // Deletes current edited event from calendar then renders the lack of event on that day/spot
  deleteEvents() {
    let counter = 0;
    const thisSaved = this;
    this.es.eventArray.forEach(function (element) {
      if (element.id === thisSaved.es.eventBeingEdited.id) {
        thisSaved.es.eventArray.splice(counter, 1);
      }
      counter++;
    });
    $('#calendar').fullCalendar('removeEvents', this.es.eventBeingEdited.id);
  }



  // Loads a calendar - removed existing events, and then renders new calendar with new events
  loadCalendar() {
    let counter = 0;
    const thisSaved = this;
    this.currentCalendarTitle = this.es.currentCalender.title;
    if (this.serviceStudent.isAdmin == false) {
      this.afd.database.ref('/students/' + this.serviceStudent.currentStudentUsername + '/' + this.es.currentCalender.title).once('value').then(function (EventsStruckThrough) {
        Object.keys(EventsStruckThrough.val()).forEach(function (id) {
          for (let i = 0; i < thisSaved.es.eventArray.length; i++) {
            if (id == thisSaved.es.eventArray[i].id) {
              thisSaved.es.eventArray[i].color = 'darkgray';
            }
          }
          counter++;
        });
        $('#calendar').fullCalendar('removeEvents');  // Removes all events locally before switching to a new calendar
        $('#calendar').fullCalendar('addEventSource', thisSaved.es.eventArray);  // Adds a new set of events
        $('#calendar').fullCalendar('rerenderEvents');  // Rerenders all events on the calendar using the new set of events
      });
    } else {
      $('#calendar').fullCalendar('removeEvents');  // Removes all events locally before switching to a new calendar
      $('#calendar').fullCalendar('addEventSource', thisSaved.es.eventArray);  // Adds a new set of events
      $('#calendar').fullCalendar('rerenderEvents');  // Rerenders all events on the calendar using the new set of events
    }
  }


  // Link handling for events
  onCalendarInit() {
    const calendar = this;
    jQuery('#calendar').on('click', '.fc-event', function (e) {  // Fires every time an event is clicked
      if (e.ctrlKey || e.metaKey && calendar.serviceStudent.isAdmin === false) {
         e.preventDefault();
        calendar.strikeThroughEvent();
      } else {
        // If the event has an href
        if (jQuery(this).attr('href')) {
          // Prevent the default action - stops FullCalendar from performing its click-event
          e.preventDefault();
          // If the user is a student, then open the link in a new tab
          if (calendar.serviceStudent.isAdmin === false) {
            window.open(jQuery(this).attr('href'), '_blank');
          }
        }
      }
    });
    // When the calendar month is changed, this handles re-rendering events
    jQuery('#calendar').on('click', '.fc-button-group', function (e) {
      $('#calendar').fullCalendar('removeEvents');  // Removes all events locally
      $('#calendar').fullCalendar('addEventSource', calendar.es.eventArray);  // Adds a new set of events
      $('#calendar').fullCalendar('rerenderEvents');  // Re-renders all events on the calendar using the new set of events
    });
  }



}  // End of component
