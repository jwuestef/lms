import { NgModule } from '@angular/core';

// Modules
import { BrowserModule } from '@angular/platform-browser';

// Components
import { AppComponent } from './app.component';
import { CalendarComponent } from 'ap-angular2-fullcalendar';
import { ClassCalendarComponent } from './class-calendar/class-calendar.component';


@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    ClassCalendarComponent

  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
