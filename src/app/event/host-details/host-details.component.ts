import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import UserInfo from '../../shared/interfaces/user-info';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import HostDetails from 'src/app/shared/interfaces/host-info';
import EventInfo from 'src/app/shared/interfaces/event-info';
import PlaceInfo from 'src/app/shared/interfaces/place-info';
import { Whoiam } from 'src/app/shared/interfaces/whoiam';
import { environment } from 'src/environments/environment';

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
  avtarImg = './assets/images/avatar.jpg';
  placeSelected = '';

  whoiam!: Whoiam;
  constructor(
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private httpClint: HttpClient,
    private router: Router
  ) {
    this.authService.whoiam.subscribe((value) => {
      this.whoiam = value;
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

  async ngOnInit() {
    const user = await this.authService.user();
    this.userInfo = user!;
  }

  //1) Get details of host
  async getHostDetails(hostId: string) {
    this.loadingGet = true;
    try {
      const res = await fetch(environment.API_URL + `/host/hosts/${hostId}`, {
        method: 'GET',
        headers: {
          Authorization: this.whoiam.token!,
        },
      });

      const data: { message: string; data: HostDetails } = await res.json();

      if (!res.ok || !data.data) {
        this.router.navigate(['not-found']);
      } else this.hostDetails = data.data;

      this.eventForm.addControl('host', new FormControl(this.hostDetails?._id));
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
          environment.API_URL + '/event',
          formData,
          {
            headers: {
              Authorization: this.whoiam.token!,
            },
          }
        )
        .subscribe(
          (data) => {
            this.loadingPost = false;
            if (data.message === 'event created') {
              this.hostDetails.events.push(data.data);
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
                  limited: 'Upgrade your plan to create more events',
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
      const res = await fetch(
        environment.API_URL + `/host/add_admin/${this.hostDetails._id}`,
        {
          method: 'PATCH',
          body: JSON.stringify(form.value),
          headers: {
            Authorization: this.whoiam.token!,
            'Content-Type': 'application/json',
          },
        }
      );

      const data: { message: string; data: HostDetails } = await res.json();
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
    } catch (err) {}
  }
  // 4)TODO: Remove admin
  async handleARemoveAdmin(id: string) {
    try {
      const res = await fetch(
        environment.API_URL +
          `/host//remov_admin/${this.hostDetails._id}/${id}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: this.whoiam.token!,
          },
        }
      );

      const data: { message: string; data: any } = await res.json();
      if (data.message === 'admin remove') {
        this.hostDetails.admins = this.hostDetails.admins.filter(
          (admin) => admin._id !== id
        );
      }
    } catch (err) {
      console.log('err from add admin', err);
    }
  }

  // 5) Get all places
  async getPlaces() {
    const res = await fetch(environment.API_URL + '/place/all', {
      method: 'GET',
      headers: {
        Authorization: this.whoiam.token!,
      },
    });

    if (res.ok) {
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

  async handleARemoveEvent(e: Event, id: string) {
    e.stopPropagation();
    e.preventDefault();
    try {
      const res = await fetch(environment.API_URL + '/event/' + id, {
        method: 'DELETE',
        headers: {
          Authorization: this.whoiam.token!,
        },
      });
      const data = await res.json();
      console.log('data from remove host', data);
      if (data.message === 'delete event')
        this.hostDetails.events = this.hostDetails.events.filter(
          (host) => host._id !== id
        );
      else if (data.message === 'You can not delete this event')
        alert(data.message);
    } catch (error) {}
  }

  selectPlaceHandle(id: string) {
    this.placeSelected = id;
    this.eventForm.setControl('place', new FormControl(id));
  }
}
