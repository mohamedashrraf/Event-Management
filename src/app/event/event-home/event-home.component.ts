import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EventHttpService } from '../services/event-http.service';
import { Router } from '@angular/router';
import EventInfo from 'src/app/shared/interfaces/event-info';
import UserInfo from 'src/app/shared/interfaces/user-info';

@Component({
  selector: 'app-event-home',
  templateUrl: './event-home.component.html',
  styleUrls: ['./event-home.component.scss'],
})
export class EventHomeComponent implements OnInit {
  events: EventInfo[];
  allEvents!: EventInfo[];
  userInfo!: UserInfo;
  URL: any;
  loading: boolean = true;

  constructor(
    private authService: AuthService,
    private eventHttpService: EventHttpService,
    private router: Router
  ) {
    this.authService.user.subscribe((user) => {
      !user.isAuthenticated && this.authService.redirectToLogin();
      this.userInfo = user;
      console.log(this.userInfo);
    });
    this.events = [];
  }
  handleClick(id: string) {
    // Navigate to the target page when the card is clicked
    this.router.navigate(['event', id]);
  }
  ngOnInit(): void {
    this.loading = true;
    this.eventHttpService.getEvents().subscribe(
      (res) => {
        this.loading = false;
        this.events = this.allEvents = res.data;
        console.log(this.events);
        console.log(this.allEvents);
      },
      (error: any) => {
        console.error('Error fetching items', error);
      }
    );
  }

  isAteende(id: string) {
    return this.userInfo.subscribeWith?.find((sub) => sub._id === id);
  }

  selectDateHandel(data: Date) {
    this.events = this.allEvents;
    const selectedDate = new Date(data).toISOString().slice(0, 10);
    this.events = this.events.filter((event) => {
      const eventDate = new Date(event.dateTime).toISOString().slice(0, 10);
      console.log('selectedDate ', selectedDate, 'eventDate', eventDate);
      return selectedDate === eventDate;
    });
  }

  resetDate() {
    this.events = this.allEvents;
  }
}
