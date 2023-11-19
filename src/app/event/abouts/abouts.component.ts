import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import UserInfo from '../../shared/interfaces/user-info';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-abouts',
  templateUrl: './abouts.component.html',
  styleUrls: ['./abouts.component.scss'],
})
export class AboutsComponent implements OnInit {
  userInfo!: UserInfo;
  editMode: boolean = false;

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {}

  async ngOnInit() {
    const user = await this.authService.user();
    this.userInfo = user!;
  }
  editProfile() {
    this.editMode = true;
  }

  saveChanges() {
    this.editMode = false;

    const updatedData = {
      name: this.userInfo.name,
      phoneNumber: this.userInfo.phoneNumber,
    };

    this.httpClient
      .patch(
        'https://events-app-api-faar.onrender.com/api/v1/user/',
        updatedData
      )
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      )
      .subscribe((data) => {});
  }
}
