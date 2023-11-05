import { Component } from '@angular/core';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatDatepickerModule, MatNativeDateModule,CommonModule],
})
export class CalendarComponent {
  selected: Date | null | undefined;
  todayDate: Date = new Date();
   constructor() {
    // Initialize the selected date to today's date
    this.selected = this.todayDate;
  }
}
