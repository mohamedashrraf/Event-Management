import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import UserInfo from '../../shared/interfaces/user-info';
import { jwtDecode } from 'jwt-decode';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-abouts',
  templateUrl: './abouts.component.html',
  styleUrls: ['./abouts.component.scss'],
})
export class AboutsComponent implements OnInit {
  user!: UserInfo;
  editMode: boolean = false;

  constructor(private router: Router, private authService: AuthService, private httpClient: HttpClient) {
    // this.authService.user.subscribe((user) => {
    //   if (!user.isAuthenticated) {
    //     this.authService.redirectToLogin();
    //     return;
    //   }

    //   this.user = user;
    //   const tokenData = jwtDecode(this.user.token!) as any;
    //   this.user = { ...this.user, ...tokenData };
    // });

    this.fetchUserData();
  }

  ngOnInit(): void {}

  fetchUserData() {
    this.httpClient.get('https://events-app-api-faar.onrender.com/api/v1/user/')
      .pipe(
        catchError((error) => {
          console.error('Error getting profile', error);
          return throwError(error);
        })
      )
      .subscribe(
        (res: any) => {
          console.log('Profile fetched successfully', res);
          this.user = res.data;
        }
      );
  }

  editProfile() {
    this.editMode = true;
  }

  saveChanges() {
  this.editMode = false;

  const updatedData = {
    name: this.user.name,
    phoneNumber: this.user.phoneNumber,
  };

  this.httpClient.patch('https://events-app-api-faar.onrender.com/api/v1/user/', updatedData)
    .pipe(
      catchError((error) => {
        console.error('Error updating profile', error);
        return throwError(error);
      })
    )
    .subscribe(
      (data) => {
        console.log('Profile updated successfully', data);
      }
    );
}

}
