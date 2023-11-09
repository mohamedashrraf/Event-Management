import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import UserInfo from './interfaces/userInfo';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  userInfo!: UserInfo;
  imgSrc:string="http://localhost:4000/api/v1/user/ProPicPath/"
  constructor(private authService: AuthService) {
    this.authService.user.subscribe((user) => {
      !user.isAuthenticated && this.authService.redirectToLogin();
      this.userInfo = user;
    });
    const whoiam = localStorage.getItem('whoiam');
  const token = JSON.parse(whoiam!).token;

      console.log(jwtDecode(token!))
      const tokenData = jwtDecode(token!)as any
      this.imgSrc+=tokenData._id
  }

  changePhoto(event: Event) {
    const targetEl = event.target as HTMLElement;
    const clickEvent = new MouseEvent('click');
    targetEl.children.item(0)?.dispatchEvent(clickEvent);
  
  }
}
