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
  addAdminForm!: FormGroup;
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
        `https://events-app-api-faar.onrender.com/api/v1/host/hosts/${hostId}`,
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
          'https://events-app-api-faar.onrender.com/api/v1/event',
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
            this.loadingPost = false;
            if (data.message === 'event created') {
              this.hostDetails.events.push(data.data);
              console.log(this.hostDetails.events);
              const clickEvent = new MouseEvent('click');
              document
                .getElementById('close-event-form')
                ?.dispatchEvent(clickEvent);
              this.eventForm.reset();
              this.eventForm.addControl(
                'host',
                new FormControl(this.hostDetails._id)
              );
            } else if (data.message === 'chang your plan to add more event') {
              setTimeout(() => {
                this.eventForm.setErrors({
                  limited: 'Upgrade your plan to create more hosting',
                });
              });
            }
          },
          (err) => {
            if (err.error.message === 'chang your plan to add more event') {
              setTimeout(() => {
                this.eventForm.setErrors({
                  limited: 'Upgrade your plan to create more hosting',
                });
              });
            }

            console.log('res is not ok from create event', err);
            this.loadingPost = false;
          }
        );
    } catch (error) {
      this.loadingPost = false;
    }
  }

  // 3) TODO: Add admin
  async handleAddAdmin(form: FormGroup) {
    try {
      console.log(form.value);
      console.log(this.userInfo);
      const res = await fetch(
        `https://events-app-api-faar.onrender.com/api/v1/host/add_admin/${this.hostDetails._id}`,
        {
          method: 'PATCH',
          body: JSON.stringify(form.value),
          headers: {
            Authorization: this.userInfo.token!,
            'Content-Type': 'application/json',
          },
        }
      );

      const data: { message: string; data: HostDetails } = await res.json();
      console.log('data from add admin', data);
      if (data.message == 'not found user') {
        form.setErrors({
          notFound: 'The email you entered does not match any user',
        });
      } else if (data.message === 'admin added') {
        // this.hostDetails.admins.push(data.data);
        this.getHostDetails(this.hostId);
        form.reset();
      } else if ((data.message = 'chang user plan to add more host'))
        form.setErrors({
          notFound: 'You cannot add this user to the administrators list',
        });
    } catch (err) {
      console.log('err from add admin', err);
    }
  }
  // 4)TODO: Remove admin
  async handleARemoveAdmin(id: string) {
    try {
      console.log(this.userInfo);
      const res = await fetch(
        `https://events-app-api-faar.onrender.com/api/v1/host//remov_admin/${this.hostDetails._id}/${id}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: this.userInfo.token!,
          },
        }
      );

      const data: { message: string; data: any } = await res.json();
      console.log('data from remove admin', data);
      if (data.message === 'admin remove') {
        this.hostDetails.admins = this.hostDetails.admins.filter(
          (admin) => admin._id !== id
        );
        console.log(this.hostDetails.admins);
      }
    } catch (err) {
      console.log('err from add admin', err);
    }
  }

  // 5) Get all places
  async getPlaces() {
    const res = await fetch(
      'https://events-app-api-faar.onrender.com/api/v1/place/all',
      {
        method: 'GET',
        headers: {
          Authorization: this.userInfo.token!,
        },
      }
    );

    if (res.ok) {
      // console.log('get all places ok', await res.json());
      const data: { message: string; data: PlaceInfo[] } = await res.json();

      this.listOfPlaces = data.data;
    } else {
      console.log('get all places not ok', await res.json());
    }
  }

  handleMin() {
    const dateInput = document.getElementById('dateTime-input');
    dateInput?.setAttribute('min', new Date().toISOString().slice(0, 16));
  }
}
