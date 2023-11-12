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
  constructor(
    private _athService: AuthService,
    private httpClint: HttpClient,
    private getTokenData: GetTokenDataService
  ) {
    this._athService.user.subscribe((user) => {
      !user.isAuthenticated && this._athService.redirectToLogin();
      this.userInfo = user;
      console.log(user);
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
    const isVip = this.getTokenData.tokenData.isVip;
    console.log(isVip);

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

    //  const res = await fetch(`https://events-app-api-faar.onrender.com/api/v1/place`, {
    //    method: 'POST',
    //    headers: {
    //      Accept: 'application/json',
    //      'Access-Control-Allow-Origin': '*',
    //      'Content-Type': 'multipart/form-data',
    //      Authorization: this.userInfo.token,
    //     },
    //     body: JSON.stringify(formData),
    //   });
    if (isVip) {
      this.httpClint
        .post<ResBody>(
          'https://events-app-api-faar.onrender.com/api/v1/place',
          formData,
          {
            headers: {
              Authorization: this.userInfo.token,
            },
          }
        )
        .subscribe(async (res) => {
          console.log(res);
          const data = res;
          const isLimit = res.message == 'you cant add more then 5 place';

          await this.getPlaces();
          console.log('data from create host', res);
          console.log('data from create host data', data);
          console.log(this.places);
          console.log('forming', placeForm.value);
          this.cloas.nativeElement.click();
        });
    }
  }

  getFiles(event: any) {
    this.file = event.target.files[0];
  }
}
