import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import UserInfo from '../../shared/interfaces/user-info';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import HostDetails from 'src/app/shared/interfaces/host-info';
import EventInfo from 'src/app/shared/interfaces/event-info';
import PlaceInfo from 'src/app/shared/interfaces/place-info';

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
  hostId!: string;
  hostDetails!: HostDetails;
  addAdminForm!: any;
  listOfPlaces: PlaceInfo[] = [];

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
    this.getHostDetails(this.hostId);
    this.getPlaces();
  }

  async ngOnInit() {
    setTimeout(() => {
      const dateInput = document.getElementById('dateTime-input');

      dateInput?.setAttribute('min', new Date().toISOString().slice(0, 16));
    }, 1000);
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.eventForm.setControl(
        'poster',
        new FormControl(event.target.files[0])
      );
    }
  }

  //1) Get details of host
  async getHostDetails(hostId: string) {
    this.loadingGet = true;
    try {
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
      this.hostDetails = data.data;
      console.log('this.hostDetails', this.hostDetails);

      this.eventForm.addControl('host', new FormControl(this.hostDetails._id));
    } catch (err) {
      console.log('err from get specific host', err);
    }
    this.loadingGet = false;
  }

  // 2) Create new event
  async createEvent(form: FormGroup) {
    const formData = new FormData();
    for (let key in this.eventForm.controls) {
      const { value } = this.eventForm.controls[key];
      formData.append(key, value);
    }
    this.loadingPost = true;
    try {
      this.httpClint
        .post<{ message: string; data: EventInfo }>(
          'http://localhost:4000/api/v1/event',
          formData,
          {
            headers: {
              Authorization: this.userInfo.token!,
            },
          }
        )
        .subscribe(
          (data) => {
            console.log('data from create event', data);
            this.hostDetails.events.push(data.data);

            console.log(this.hostDetails.events);
            this.loadingPost = false;
            const clickEvent = new MouseEvent('click');
            document
              .getElementById('close-event-form')
              ?.dispatchEvent(clickEvent);
            this.eventForm.reset();
            this.eventForm.addControl(
              'host',
              new FormControl(this.hostDetails._id)
            );
          },
          (err) => {
            console.log(err);
            console.log('res is not ok from create event', err);
            this.loadingPost = false;
          }
        );
    } catch (error) {
      this.loadingPost = false;
    }
  }

  // 3) TODO: Add admin
  handleAddAdmin(form: FormGroup) {}
  // 4)TODO: Remove admin
  handleARemoveAdmin() {}

  // 5) Get all places
  async getPlaces() {
    const res = await fetch('http://localhost:4000/api/v1/place/all', {
      method: 'GET',
      headers: {
        Authorization: this.userInfo.token!,
      },
    });

    if (res.ok) {
      // console.log('get all places ok', await res.json());
      const data: { message: string; data: PlaceInfo[] } = await res.json();

      this.listOfPlaces = data.data;
    } else {
      console.log('get all places not ok', await res.json());
    }
  }
}
