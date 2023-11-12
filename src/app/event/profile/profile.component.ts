import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import UserInfo from '../../shared/interfaces/user-info';
import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  userInfo!: UserInfo;
  loading: boolean = true;
  imgSrc: string = 'http://localhost:4000/api/v1/user/ProPicPath/';
  constructor(private authService: AuthService, private httpClint: HttpClient) {
    this.authService.user.subscribe((user) => {
      this.loading = false;
      !user.isAuthenticated && this.authService.redirectToLogin();
      this.userInfo = user;
    });
    const whoiam = localStorage.getItem('whoiam');
    const token = JSON.parse(whoiam!).token;

    console.log(jwtDecode(token!));
    const tokenData = jwtDecode(token!) as any;
    this.imgSrc += tokenData._id;
  }

  changePhoto(event: any) {
    const targetEl = event.target as HTMLElement;
    const clickEvent = new MouseEvent('click');
    targetEl.children.item(0)?.dispatchEvent(clickEvent);
  }
  sendNewPhoto(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('proPic', file);
    this.httpClint
      .patch('http://localhost:4000/api/v1/user/', formData)
      .subscribe((res) => {
        console.log(res);
        const reader = new FileReader();

        reader.onload = (event: any) => {
          this.imgSrc = event.target.result! as string;
        };

        reader.readAsDataURL(file);
      });
  }
}
