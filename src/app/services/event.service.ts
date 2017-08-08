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
    color: ''
  };
}
