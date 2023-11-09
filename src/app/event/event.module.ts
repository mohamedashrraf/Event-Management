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
import { SharedModule } from '../shared/shared.module';

import { EventDetailsComponent } from './event-details/event-details.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { PlaceCardComponent } from './place-card/place-card.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    EventHomeComponent,
    LandingComponent,
    ProfileComponent,
    PlacesComponent,
    EventsComponent,
    AboutsComponent,
    EventDetailsComponent,
    SubscriptionComponent,
    PlaceCardComponent,
  ],
  imports: [CommonModule, AppRoutingModule, CalendarComponent, SharedModule,HttpClientModule],
})
export class EventModule {}
