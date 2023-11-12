import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventHttpService } from '../services/event-http.service';
import EventInfo from 'src/app/shared/interfaces/event-info';
import { AuthService } from 'src/app/auth/auth.service';
import UserInfo from 'src/app/shared/interfaces/user-info';
import { BehaviorSubject } from 'rxjs';

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
  userInfo!: UserInfo;
  allEvents!: EventInfo[];

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private eventHttp: EventHttpService,
    private authService: AuthService
  ) {
    this.authService.user.subscribe((user) => {
      this.userInfo = user;
      !user.isAuthenticated && this.authService.redirectToLogin();
    });
    this.activeRoute.params.subscribe((queryParams) => {
      this.activeId.next(queryParams['id']);

      this.getEventInfo();

      this.getRelatedEvents();
    });
  }

  async ngOnInit() {}

  async getEventInfo() {
    this.loading = true;
    this.foundPhoto = `https://events-app-api-faar.onrender.com/api/v1/event/photo/${this.activeId.value}`;
    console.log(this.foundPhoto);
    this.eventHttp.getEventDetails(this.activeId.value).subscribe(
      (res) => {
        this.foundEvent = res.data;
        this.loading = false;
        console.log(this.foundEvent);

        // this.foundEvent.subscribers.forEach((user: UserInfo) => {
        //   console.log('user on subscripers', user);
        //   if (user._id === this.userInfo._id) {
        //     this.userAttende = true;
        //   } else this.userAttende = false;
        // });
        const userAttended = this.foundEvent.subscribers.find(
          (user: UserInfo) => user._id === this.userInfo._id
        );
        if (userAttended) {
          this.userAttende = true;
        } else this.userAttende = false;
        console.log(userAttended);
        console.log('this.foundEvent.subscribers', this.foundEvent.subscribers);
        console.log('this.userInfo', this.userInfo);
      },
      (error) => {
        console.log(error);
        this.loading = false; // Set loading to false on error
        this.router.navigate(['/notfound']);
      }
    );
  }

  async getRelatedEvents() {
    try {
      const res = await fetch(
        `https://events-app-api-faar.onrender.com/api/v1/event/all`,
        {
          headers: {
            Authorization: this.userInfo.token!,
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
              Authorization: this.userInfo.token!,
            },
          }
        );
        if (res.ok) {
          console.log('res ok ', await res.json());
          this.userAttende = true;
        } else {
          console.log('res not ok ', await res.json());
        }
      } else {
        const res = await fetch(
          `https://events-app-api-faar.onrender.com/api/v1/event/unsubscribe/${this.activeId.value}`,

          {
            method: 'PATCH',
            headers: {
              Authorization: this.userInfo.token!,
            },
          }
        );
        if (res.ok) {
          console.log('res ok ', await res.json());
          this.userAttende = false;
        } else {
          console.log('res not ok ', await res.json());
        }
      }
    } catch (error) {}
  }
}
