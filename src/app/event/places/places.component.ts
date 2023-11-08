import { HttpClient } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from 'src/app/auth/auth-service.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss'],
})
export class PlacesComponent {
  @ViewChild('poster') poster!:HTMLInputElement;
  places: any[] = [];
  userInfo: any;
  morText:boolean =false
  file: any;
  constructor(private _athService: AuthServiceService,private httpClint:HttpClient) {
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
      console.log(this.poster) 
      this.getPlaces();
  }
  async createPlace(placeForm: NgForm) {
    placeForm.control.markAllAsTouched()
    placeForm.control.valid
   const formData = new FormData()
   Object.keys(placeForm.controls).forEach((key)=>{
    const control = placeForm.controls[key];
    if (control.value &&key!="placPhoto") {
      formData.append(key, control.value);
    }
   })
   if(this.file){

     formData.append("placPhoto",this.file)
   }
   
   
  //  const res = await fetch(`http://localhost:4000/api/v1/place`, {
  //    method: 'POST',
  //    headers: {
  //      Accept: 'application/json',
  //      'Access-Control-Allow-Origin': '*',
  //      'Content-Type': 'multipart/form-data',
  //      Authorization: this.userInfo.token,
  //     },
  //     body: JSON.stringify(formData),
  //   });
    this.httpClint.post("http://localhost:4000/api/v1/place",formData,{
      headers:{
        Authorization: this.userInfo.token,
      }
    }).subscribe(async (res)=>{

      const data =  res;
      await this.getPlaces();
      console.log('data from create host', res);
      console.log('data from create host data', data);
      console.log(this.places);
      console.log('forming', placeForm.value);
    })
  }
  getFiles(event:any) {
   this.file = event.target.files[0];
}
}
