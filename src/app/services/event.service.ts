import { Injectable } from '@angular/core';


@Injectable()
export class EventService {
  // This is a storage location for variables that need to be accessed by multiple components
  eventArray = [];
  currentCalender;
  eventBeingEdited = {
    id: '',
    start: {
      _i: ''
    },
    title: '',
    url: '',
    color: '',
  };
}
