import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { ResBody } from 'src/app/shared/interfaces/res-body';
import { GetTokenDataService } from 'src/app/shared/services/get-token-data.service';
import { User } from 'src/app/shared/interfaces/user';
import UserInfo from 'src/app/shared/interfaces/user-info';
import PlaceInfo from 'src/app/shared/interfaces/place-info';
import { Whoiam } from 'src/app/shared/interfaces/whoiam';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss'],
})
export class PlacesComponent {
  @ViewChild('close') cloas!: ElementRef;
  places: PlaceInfo[] = [];
  isLoding: boolean = true;
  userInfo!: UserInfo;
  morText: boolean = false;
  file: any;
  handleCreate: any;
  isVIP = this.getTokenData.tokenData.isVIP;

  whoiam!: Whoiam;

  constructor(
    private authService: AuthService,
    private httpClint: HttpClient,
    private getTokenData: GetTokenDataService,
    private router: Router
  ) {
    this.authService.whoiam.subscribe((value) => {
      this.whoiam = value;
      !this.whoiam.isAuthenticated && this.authService.redirectToLogin();
    });
  }

  async ngOnInit() {
    this.getPlaces();
    const user = await this.authService.user();
    this.userInfo = user!;
  }

  async getPlaces() {
    this.isLoding = true;
    const res = await fetch(
      `https://events-app-api-faar.onrender.com/api/v1/place/all_user_place`,
      {
        method: 'GET',
        headers: {
          Authorization: this.whoiam.token!,
        },
      }
    );
    const data = await res.json();
    this.places = data.data;
    this.isLoding = false;
  }

  async createPlace(placeForm: FormGroup) {
    // placeForm.control.markAllAsTouched();
    // placeForm.control.valid
    const formData = new FormData();
    Object.keys(placeForm.controls).forEach((key) => {
      const control = placeForm.controls[key];
      if (control.value && key != 'placPhoto') {
        formData.append(key, control.value);
      }
    });
    if (this.file) {
      formData.append('placPhoto', this.file);
    }

    try {
      this.httpClint
        .post<ResBody>(
          'https://events-app-api-faar.onrender.com/api/v1/place/',
          formData,
          {
            headers: {
              Authorization: this.whoiam.token!,
            },
          }
        )
        .subscribe(
          async (res) => {
            if (res.message === 'place created') {
              this.places.push(res.data);
              this.removeModal();
            }
            if (res.message === 'chang your plan to add more place') {
              placeForm.setErrors({
                limited: 'Upgrade your plan to create more places',
              });
            }
          },
          (err) => {
            console.log('err from create place', err);

            if (err.error.message === 'chang user plan to add more host') {
              placeForm.setErrors({
                limited: 'Upgrade your plan to create more places',
              });
            }
          }
        );
    } catch (error) {
      console.error('An error occurred outside the observable:', error);
    }
  }

  getFiles(event: any) {
    this.file = event.target.files[0];
  }

  removeModal() {
    const clickEvent = new MouseEvent('click');
    document.getElementById('close-modal')?.dispatchEvent(clickEvent);
  }

  async handleUpdatePlaces(id: string) {
    try {
      const res = await fetch(
        'https://events-app-api-faar.onrender.com/api/v1/place/with_admin/' +
          id,
        {
          method: 'DELETE',
          headers: {
            Authorization: this.whoiam.token!,
          },
        }
      );
      const data = await res.json();
      if (data.message === 'place deleted') {
        this.places = this.places.filter((place) => place._id !== id);
      } else if (data.message === 'You can not delete this place')
        alert(data.message);
    } catch (error) {}
  }
}
