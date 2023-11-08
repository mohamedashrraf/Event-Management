import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/auth/auth-service.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss'],
})
export class PlacesComponent {
  places: any[] = [];
  userInfo: any;
  constructor(private _athService: AuthServiceService) {
    this._athService.user.subscribe((user) => {
      this.userInfo = user;
      console.log(user);
    });
  }

  async getPlaces() {
    const res = await fetch(
      `http://localhost:4000/api/v1/place/all_user_place`,
      {
        method: 'GET',
        headers: {
          Authorization: this.userInfo.token,
        },
      }
    );
    console.log('token', this.userInfo.token);
    console.log(res);
    const data = await res.json();
    console.log('data from back', data);
    this.places = data.data;
  }
  ngOnInit() {
    this.getPlaces();
  }
  async createPlace(placeForm: any) {
    const res = await fetch(`http://localhost:4000/api/v1/place`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.userInfo.token,
      },
      body: JSON.stringify(placeForm.value),
    });
    const data = await res.json();
    await this.getPlaces();
    console.log('data from create host', res);
    console.log('data from create host data', data);
    console.log(this.places);
    console.log('forming', placeForm.value);
  }
}
