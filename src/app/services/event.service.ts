// this is a storage location for variables that need to be accessed by multiple components

import { Injectable } from '@angular/core';


@Injectable()
export class EventService {
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
