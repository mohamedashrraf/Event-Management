import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventHomeComponent } from './event-home/event-home.component';
import { CalendarComponent } from './calendar/calendar.component';



@NgModule({
  declarations: [
    EventHomeComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EventModule { }
