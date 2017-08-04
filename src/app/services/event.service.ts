import {Injectable} from '@angular/core';

@Injectable()
export class EventService {
    eventArray = [];

    insertData(event: object){
        this.eventArray.unshift(event);
    }
}
