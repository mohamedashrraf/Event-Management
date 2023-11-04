import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventHomeComponent } from './event-home/event-home.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    EventHomeComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EventModule { }
