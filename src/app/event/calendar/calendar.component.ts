import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/auth/auth.service';
import { EventHttpService } from '../services/event-http.service';
import { CalendarEvent } from 'angular-calendar/modules/calendar.module';
import { endOfDay, startOfDay } from 'date-fns';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
  ],
})
export class CalendarComponent {
  selected!: Date;
  now = new Date();
  @Output() userSelectDate: EventEmitter<Date> = new EventEmitter();

  selectDate(date: Date) {
    this.selected = date;
    this.userSelectDate.emit(date);
  }
}
