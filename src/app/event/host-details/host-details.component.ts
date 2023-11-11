import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import UserInfo from '../../shared/interfaces/user-info';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import HostDetails from 'src/app/shared/interfaces/host-info';
import EventInfo from 'src/app/shared/interfaces/event-info';

@Component({
  selector: 'app-host-details',
  templateUrl: './host-details.component.html',
  styleUrls: ['./host-details.component.scss'],
})
export class HostDetailsComponent {
  loadingGet: boolean = false;
  loadingPost: boolean = false;
  eventForm!: FormGroup;
  userInfo!: UserInfo;
  events: EventInfo[] = [];
  hostId!: string;
  hostDetails!: HostDetails;
  addAdminForm!: any;

  constructor(
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private httpClint: HttpClient
  ) {
    this.authService.user.subscribe((user) => {
      this.userInfo = user;
      !user.isAuthenticated && this.authService.redirectToLogin();
    });

    this.eventForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      category: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      dateTime: new FormControl('', [Validators.required]),
      ticketCount: new FormControl('', [Validators.required]),
      place: new FormControl('', [Validators.required]),
      poster: new FormControl('', [Validators.required]),
    });

    this.hostId = this.activeRoute.snapshot.params['hostId'];

    console.log('this.hostDetails', this.hostDetails);
  }

  ngOnInit() {
    this.getHost(this.hostId);

    setTimeout(() => {
      const dateInput = document.getElementById('dateTime-input');
      console.log(
        dateInput?.setAttribute('min', new Date().toISOString().slice(0, 16))
      );
    }, 1000);
  }

  async getHost(hostId: string) {
    //TODO: Get Host details
    this.loadingGet = true;
    try {
      ////////////////////////////////

      const res = await fetch(
        `http://localhost:4000/api/v1/host/hosts/${hostId}`,
        {
          method: 'GET',
          headers: {
            Authorization: this.userInfo.token!,
          },
        }
      );
      if (!res.ok)
        console.log('res from get dpecific host in not ok', await res.json());

      const data: { message: string; data: HostDetails } = await res.json();

      console.log('data from get specific host', data);
      this.hostDetails = data.data;
      this.events = data.data.events;

      console.log('this.hostDetails', this.hostDetails);

      this.eventForm.addControl('host', new FormControl(this.hostDetails._id));
    } catch (err) {
      console.log('err from get specific host', err);
    }
    this.loadingGet = false;
  }
  async createEvent(form: FormGroup) {
    const formData = new FormData();
    for (let key in this.eventForm.controls) {
      const { value } = this.eventForm.controls[key];
      formData.append(key, value);
    }

    try {
      this.httpClint
        .post('http://localhost:4000/api/v1/event', formData, {
          headers: {
            Authorization: this.userInfo.token!,
          },
        })
        .subscribe(
          (data) => {
            console.log('data from create event', data);
            this.getHost(this.hostId);
          },
          (err) => {
            console.log(err);
            console.log('res is not ok from create event', err);
          }
        );

      // const res = await fetch('http://localhost:4000/api/v1/event', {
      //   method: 'POST',
      //   headers: {
      //     Authorization: this.userInfo.token!,
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });

      // console.log('res from create event', res);
      // if (res.ok) {
      //   const data = await res.json();
      //   console.log('data from create event', data);
      // } else {
      //   console.log('res is not ok from create event', await res.json());
      // }
    } catch (error) {}
  }
  handleAddAdmin(form: FormGroup) {}

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.eventForm.setControl(
        'poster',
        new FormControl(event.target.files[0])
      );
    }
  }
}
