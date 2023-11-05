import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventHomeComponent } from './event-home/event-home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
    declarations: [
        EventHomeComponent,
        LandingComponent,
        ProfileComponent
    ],
    imports: [
        CommonModule,
        CalendarComponent
    ]
})
export class EventModule { }
