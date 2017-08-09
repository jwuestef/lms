import { Component, Output, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { FlashMessagesService } from 'angular2-flash-messages';
import { EventService } from '../services/event.service';


@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent {
  @Output() clickSubmit = new EventEmitter<string>();
  eventName: string;
  eventDate: string;
  eventLink = '';
  eventType = 'Event Type';
  showEdit = false;
  currentForm = 'Add';
  operation = '';
  nameError = false;
  eventsListAsObject;



  constructor(private es: EventService, private afd: AngularFireDatabase, private fms: FlashMessagesService) { }



  addOrEditEvent(data) {

    const currentEvent = {
      id: this.eventDate + this.eventName,
      title: this.eventName,
      start: this.eventDate,
      color: this.eventType,
      url: this.eventLink
    };
    console.log('//////////////////////////////////////');
    console.log('currentEvent is:');
    console.log(currentEvent);
    if (this.currentForm === 'Add') {
      // Save it to Firebase
      const thisSaved = this;
      const dbRef = this.afd.database.ref('/calendars/' + this.es.currentCalender.title + '/events').push(currentEvent);
      // Assign object Id generated by db to object
      currentEvent.id = dbRef.key;
      this.es.eventArray.push(currentEvent);
      this.clickSubmit.emit('add');
    } else {
      console.log('about to break');
      this.es.eventBeingEdited.start._i = this.eventDate;
      console.log('i break here');
      this.es.eventBeingEdited.title = this.eventName;
      this.es.eventBeingEdited.url = this.eventLink;
      this.es.eventBeingEdited.color = this.eventType;
      this.clickSubmit.emit('');
      this.showEdit = false;
      this.currentForm = 'Add';
      // update the datebase with using the object currentEvent // Update the datebase with using the object currentEvent
      console.log('The item being updated (this.es.eventBeingEdited) is:');
      console.log(this.es.eventBeingEdited);

      const thisSaved = this;
      // query database for all events on this calendar, return object full of eventObjects
      this.afd.database.ref('/calendars/' + this.es.currentCalender.title + '/events').once('value').then(function (eventsListFromDB) {
        thisSaved.eventsListAsObject = eventsListFromDB.val();
        console.log('The returned object full of events (named "eventsListAsObject") is: ');
        console.log(thisSaved.eventsListAsObject);
        console.log('Now looping over object key/value pairs:');
        Object.keys(thisSaved.eventsListAsObject).forEach(function (key) {
          console.log(key + ' <--key has value --> ' + thisSaved.eventsListAsObject[key]);
          console.log(thisSaved.eventsListAsObject[key]);
          console.log('This event\'s title from the DB is:');
          console.log(thisSaved.eventsListAsObject[key]['title']);
          console.log('This event\'s start from the DB is:');
          console.log(thisSaved.eventsListAsObject[key]['start']);
          if (thisSaved.es.eventBeingEdited.id === key) {
            console.log('THIS IS THE EVENT TO EDIT');
            console.log(key);
            thisSaved.afd.database.ref('/calendars/' + thisSaved.es.currentCalender.title + '/events/' + key).update({
              title: thisSaved.es.eventBeingEdited.title,
              start: thisSaved.es.eventBeingEdited.start._i
            }).then(function () {
              console.log('Event edited!');
              thisSaved.fms.show(
                '\'' + thisSaved.es.eventBeingEdited.title + '\' edited in ' + '\'' + thisSaved.es.currentCalender.title + '\'',
                {
                  cssClass: 'alert-success',
                  timeout: 1500
                }
              );
            }).catch(function (err) {
              console.log('Error editing event!');
              console.log(err);
            });
          }
          else {
            console.log('if statement fialed');
            console.log(thisSaved.es.eventBeingEdited.id);
            console.log(key);
          }
        });
      });


    }
    this.eventDate = '';
    this.eventName = '';
    this.eventType = 'Event Type';
    this.eventLink = '';
  }



  editEvent(data) {
    this.showEdit = true;
    this.currentForm = 'Edit';
    console.log('"data" inside editEvent() function inside event-form.component.ts is:');
    console.log(data);
      this.es.eventBeingEdited = data;
      this.eventDate = data.start._i;
      this.eventName = data.title;
      this.eventLink = data.url;
      this.eventType = data.color;

  }



  deleteEvent() {
    this.clickSubmit.emit('delete');
    console.log('=====================================================================');
    console.log('=====================================================================');
    console.log('=====================================================================');
    console.log('=====================================================================');
    console.log('=====================================================================');

    console.log('We need to delete the event named "eventBeingEdited", which is:');
    console.log(this.es.eventBeingEdited);
    console.log('The title of the event we want to delete is:');
    console.log(this.es.eventBeingEdited.title);
    console.log('... and the date of the event we want to delete is:');
    console.log(this.es.eventBeingEdited.start._i);

    // query database for all events on this calendar, return object full of eventObjects
    console.log('query database for all events on this calendar, return object full of eventObjects');
    const thisSaved = this;
    this.afd.database.ref('/calendars/' + this.es.currentCalender.title + '/events').once('value').then(function (eventsListFromDB) {
      thisSaved.eventsListAsObject = eventsListFromDB.val();
      console.log('The returned object full of events (named "eventsListAsObject") is: ');
      console.log(thisSaved.eventsListAsObject);
      console.log('Now looping over object key/value pairs:');
      Object.keys(thisSaved.eventsListAsObject).forEach(function (key) {
        console.log(key + ' <--key has value --> ' + thisSaved.eventsListAsObject[key]);
        console.log(thisSaved.eventsListAsObject[key]);
        console.log('This event\'s title is:');
        console.log(thisSaved.eventsListAsObject[key]['title']);
        console.log('This event\'s start is:');
        console.log(thisSaved.eventsListAsObject[key]['start']);
        if (thisSaved.es.eventBeingEdited.id === key) {
          console.log('THIS IS THE EVENT TO DELETE');
          console.log(key);
          thisSaved.afd.database.ref('/calendars/' + thisSaved.es.currentCalender.title + '/events/' + key).remove().then(function () {
            console.log('Event removed!');
            thisSaved.fms.show(
              '\'' + thisSaved.es.eventBeingEdited.title + '\' removed from ' + '\'' + thisSaved.es.currentCalender.title + '\'',
              {
                cssClass: 'alert-success',
                timeout: 1500
              }
            );
          }).catch(function (err) {
            console.log('Error deleting event!');
            console.log(err);
          });
        }
      });
    });

  }



  setAction(action) {
    this.operation = action;
  }
  chooseAction() {// Form Validation
    console.log(this.eventDate);
    if (this.eventName === '' || this.eventName === undefined) {
      this.nameError = true;
    } else {
      if (this.eventDate === undefined || this.eventDate === '') {
        this.nameError = true;
      } else {
        if (this.operation === 'addOrEdit') {
          this.nameError = false;
          this.addOrEditEvent(this.currentForm);

        } else {
          this.nameError = false;
          this.deleteEvent();
        }
      }
    }
  }

  switchToAdd() {
    this.showEdit = false;
    this.currentForm = 'Add';
    this.eventDate = '';
    this.eventName = '';
    this.eventType = 'Event Type';
    this.eventLink = '';
  }



}  // End of component
