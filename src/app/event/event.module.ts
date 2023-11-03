import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventHomeComponent } from './event-home/event-home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { LandingComponent } from './landing/landing.component';



@NgModule({
  declarations: [
    EventHomeComponent,
    CalendarComponent,
    LandingComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EventModule { }
