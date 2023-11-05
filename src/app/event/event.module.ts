import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventHomeComponent } from './event-home/event-home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { PlacesComponent } from './places/places.component';
import { EventsComponent } from './events/events.component';
import { AboutsComponent } from './abouts/abouts.component';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [
    EventHomeComponent,
    LandingComponent,
    ProfileComponent,
    PlacesComponent,
    EventsComponent,
    AboutsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    CalendarComponent,
  ]
})
export class EventModule { }
