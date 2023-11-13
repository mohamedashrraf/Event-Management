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
export class CalendarComponent implements OnInit {
  // events: CalendarEvent[] = [];
  selected!: Date;
  todayDate: Date = new Date();
  now = new Date();
  @Output() userSelectDate: EventEmitter<Date> = new EventEmitter();

  constructor(
    private authService: AuthService,
    private eventHttpService: EventHttpService
  ) {}

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      if (!user.isAuthenticated) {
        this.authService.redirectToLogin();
      }
    });

    // this.eventHttpService.getEvents().subscribe(
    //   (events) => {
    //     this.events = events.map(
    //       (event: {
    //         title: any;
    //         createdAt: string | number | Date;
    //         end: string | number | Date;
    //       }) => ({
    //         title: event.title,
    //         start: startOfDay(new Date(event.createdAt)),
    //         end: event.end ? endOfDay(new Date(event.end)) : undefined,
    //       })
    //     );
    //   },
    //   (error) => {
    //     console.error('Error fetching items', error);
    //   }
    // );
  }

  selectDate(date: Date) {
    // console.log(e);
    this.selected = date;

    this.userSelectDate.emit(date);
  }
}
