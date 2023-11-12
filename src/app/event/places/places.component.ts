import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { ResBody } from 'src/app/shared/interfaces/res-body';
import { GetTokenDataService } from 'src/app/shared/services/get-token-data.service';
import { User } from 'src/app/shared/interfaces/user';


@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss'],
})
export class PlacesComponent {
  @ViewChild('close') cloas!: ElementRef;
  places: any[] = [];
  isLoding: boolean = true;
  userInfo: any;
  morText: boolean = false;
  file: any;
  handleCreate: any;
  isVIP =this.getTokenData.tokenData.isVIP;

  constructor(private _athService: AuthService, private httpClint: HttpClient, private getTokenData: GetTokenDataService, private router:Router) {
    this._athService.user.subscribe((user) => {
      !user.isAuthenticated && this._athService.redirectToLogin();
      this.userInfo = user;
      console.log(user);
      console.log(this.isVIP)
    });
  }

  async getPlaces() {
    this.isLoding = true;
    const res = await fetch(
      `https://events-app-api-faar.onrender.com/api/v1/place/all_user_place`,
      {
        method: 'GET',
        headers: {
          Authorization: this.userInfo.token,
        },
      }
    );
    this.isLoding = false;
    console.log('token', this.userInfo.token);
    console.log(res);
    const data = await res.json();
    console.log('data from back', data);
    this.places = data.data;
  }
  ngOnInit() {
    this.getPlaces();
  }
  ngAfterViewInit() {
    console.log(this.cloas.nativeElement);
  }

  async createPlace(placeForm: NgForm) {


    placeForm.control.markAllAsTouched();
    // placeForm.control.valid
    const formData = new FormData();
    Object.keys(placeForm.controls).forEach((key) => {
      const control = placeForm.controls[key];
      if (control.value && key != 'placePhoto') {
        formData.append(key, control.value);
      }
    });
    if (this.file) {
      formData.append('placePhoto', this.file);
    }

  try {
    this.httpClint.post<ResBody>('https://events-app-api-faar.onrender.com/api/v1/place', formData, {
      headers: {
        Authorization: this.userInfo.token,
      },
    }).subscribe(async (res) => {
      console.log(res);
      const data = res;
      const isLimit = res.message == 'you cant add more than 5 places';

      await this.getPlaces();
      console.log('data from create host', res);
      console.log('data from create host data', data);
      console.log(this.places);
      console.log('forming', placeForm.value);
      this.cloas.nativeElement.click();
    });
    } catch (error) {
      console.error("An error occurred outside the observable:", error);
    }

  }

  getFiles(event: any) {
    this.file = event.target.files[0];
  }
}
