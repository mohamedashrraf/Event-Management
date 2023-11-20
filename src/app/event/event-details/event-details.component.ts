import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventHttpService } from '../services/event-http.service';
import EventInfo from 'src/app/shared/interfaces/event-info';
import { AuthService } from 'src/app/auth/auth.service';
import UserInfo from 'src/app/shared/interfaces/user-info';
import { BehaviorSubject } from 'rxjs';
import { Whoiam } from 'src/app/shared/interfaces/whoiam';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent {
  url = location.pathname;
  activeId = new BehaviorSubject('');
  foundEvent!: EventInfo;
  foundPhoto!: string;
  loading: boolean = true;
  userAttende = false;

  whoiam!: Whoiam;
  userInfo!: UserInfo;
  allEvents!: EventInfo[];
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private eventHttp: EventHttpService,
    private authService: AuthService
  ) {
    this.authService.whoiam.subscribe((value) => {
      this.whoiam = value;
    });
  }

  async ngOnInit() {
    const user = await this.authService.user();
    this.userInfo = user!;

    this.activeRoute.params.subscribe((queryParams) => {
      this.activeId.next(queryParams['id']);

      this.getEventInfo();

      this.getRelatedEvents();
    });
  }

  async getEventInfo() {
    this.loading = true;
    this.eventHttp.getEventDetails(this.activeId.value).subscribe(
      (res) => {
        if (res.message === 'not find events')
          this.router.navigate(['not-found']);
        else {
          this.foundEvent = res.data;
          this.loading = false;
          this.foundPhoto = this.foundEvent.posterPath;
          this.foundEvent.posterPath = `'${this.foundEvent.posterPath}'`;
          const userAttended = this.foundEvent.subscribers.find(
            (user: UserInfo) => user._id === this.userInfo._id
          );
          if (userAttended) {
            this.userAttende = true;
          } else this.userAttende = false;
        }
      },
      (error) => {
        this.loading = false;
        this.router.navigate(['not-found']);
      }
    );
  }

  async getRelatedEvents() {
    try {
      const res = await fetch(
        `https://events-app-api-faar.onrender.com/api/v1/event/all`,
        {
          headers: {
            Authorization: this.whoiam.token!,
          },
        }
      );
      if (res.ok) {
        const data: { message: string; data: EventInfo[] } = await res.json();
        const randomNum = Math.round(Math.random() * 10) + 1;
        const randomNum2 = Math.round(data.data.length / randomNum);
        this.allEvents = data.data.slice(randomNum2, randomNum2 + 4);
      } else console.log('res not ok ', await res.json());
    } catch (error) {
      console.log('error from get all event ', error);
    }
  }

  //////attendee
  async attendee() {
    try {
      if (!this.userAttende) {
        const res = await fetch(
          `https://events-app-api-faar.onrender.com/api/v1/event/subscribe/${this.activeId.value}`,

          {
            method: 'PATCH',
            headers: {
              Authorization: this.whoiam.token!,
            },
          }
        );
        if (res.ok) {
          this.userAttende = true;
          this.userInfo.subscribeWith?.push(this.foundEvent._id);
        } else console.log('res not ok ', await res.json());
      } else {
        const res = await fetch(
          `https://events-app-api-faar.onrender.com/api/v1/event/unsubscribe/${this.activeId.value}`,

          {
            method: 'PATCH',
            headers: {
              Authorization: this.whoiam.token!,
            },
          }
        );
        if (res.ok) {
          console.log('res ok ', await res.json());
          this.userAttende = false;
          this.userInfo.subscribeWith = this.userInfo.subscribeWith?.filter(
            (eventId) => eventId !== this.foundEvent._id
          );
        } else {
          console.log('res not ok ', await res.json());
        }
      }
    } catch (error) {}
  }
}
