import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EventHttpService } from '../services/event-http.service';
import { Router } from '@angular/router';
import EventInfo from 'src/app/shared/interfaces/event-info';
import UserInfo from 'src/app/shared/interfaces/user-info';
import { Whoiam } from 'src/app/shared/interfaces/whoiam';

@Component({
  selector: 'app-event-home',
  templateUrl: './event-home.component.html',
  styleUrls: ['./event-home.component.scss'],
})
export class EventHomeComponent implements OnInit {
  events: EventInfo[];
  allEvents!: EventInfo[];
  userInfo!: UserInfo;
  whoiam!: Whoiam;
  URL: any;
  loading: boolean = true;

  constructor(
    private authService: AuthService,
    private eventHttpService: EventHttpService,
    private router: Router
  ) {
    this.authService.whoiam.subscribe((value) => {
      this.whoiam = value;
      !this.whoiam.isAuthenticated && this.authService.redirectToLogin();
    });
    this.events = [];
  }
  handleClick(id: string) {
    // Navigate to the target page when the card is clicked
    this.router.navigate(['event', id]);
  }
  async ngOnInit() {
    // Get user info
    const user = await this.authService.user();
    this.userInfo = user!;

    this.loading = true;
    this.eventHttpService.getEvents().subscribe(
      (res) => {
        this.loading = false;
        this.events = this.allEvents = res.data;
      },
      (error: any) => {
        console.error('Error fetching items', error);
      }
    );
  }

  isAteende(id: string) {
    return this.userInfo.subscribeWith?.find((eventId) => eventId === id);
  }

  selectDateHandel(data: Date) {
    this.events = this.allEvents;
    const selectedDate = new Date(data).toString().slice(0, 15);
    this.events = this.events.filter((event) => {
      const eventDate = new Date(event.dateTime).toString().slice(0, 15);
      return selectedDate === eventDate;
    });
  }

  resetDate() {
    this.events = this.allEvents;
  }
}
