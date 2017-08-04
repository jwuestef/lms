import { Component } from '@angular/core';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent {
  eventName: string;
  eventDate: string;

  addEvent(){
    console.log(this.eventName);
    console.log(this.eventDate);
  }
}
