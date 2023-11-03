import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth/auth-service.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  today: Date;
  year: number;
  month: number;
  monthTag: string[];
  day: number;
  selectedDay: Date | null;
  options: string | null;
  calendarRows: number[][] = [];

  constructor(private authService: AuthServiceService) {
    this.authService.user.subscribe((user) => {
      !user.isAuthenticated && this.authService.redirectToLogin();
    });

    this.today = new Date();
    this.year = this.today.getFullYear();
    this.month = this.today.getMonth();
    this.monthTag = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    this.day = this.today.getDate();
    this.selectedDay = null;
    this.options = this.getCookie('selected_day');
  }

  ngOnInit(): void {
    this.draw();
  }

  draw(): void {
    this.drawDays();
  }

  drawDays(): void {
    const startDay = new Date(this.year, this.month, 1).getDay();
    const nDays = new Date(this.year, this.month + 1, 0).getDate();
    let n = startDay;

    this.calendarRows = [];

    for (let i = 1; i <= nDays; i++) {
      if (!this.calendarRows[Math.floor(n / 7)]) {
        this.calendarRows[Math.floor(n / 7)] = [];
      }
      this.calendarRows[Math.floor(n / 7)][n % 7] = i;
      n++;
    }
  }

  preMonth(): void {
    if (this.month < 1) {
      this.month = 11;
      this.year = this.year - 1;
    } else {
      this.month = this.month - 1;
    }
    this.drawDays();
  }

  nextMonth(): void {
    if (this.month >= 11) {
      this.month = 0;
      this.year = this.year + 1;
    } else {
      this.month = this.month + 1;
    }
    this.drawDays();
  }
  clickDay(day: number): void {
    const expiredays = 30; // Set an expiration in days, you can adjust this as needed
    this.selectedDay = new Date(this.year, this.month, day);
    this.setCookie('selected_day', this.selectedDay.toISOString(), expiredays);
  }

  reset(): void {
    this.selectedDay = null;
    this.options = null;
    this.drawDays();
  }

  setCookie(name: string, value: string, expiredays: number): void {
    const date = new Date();
    date.setTime(date.getTime() + expiredays * 24 * 60 * 60 * 1000);
    const expires = '; expires=' + date.toUTCString();
    document.cookie = name + '=' + value + expires + '; path=/';
  }

  getCookie(name: string): string | null {
    const cookieName = name + '=';
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return null;
  }
}
