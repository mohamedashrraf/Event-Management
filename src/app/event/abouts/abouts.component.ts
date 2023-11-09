import { Component } from '@angular/core';
import UserInfo from '../profile/interfaces/userInfo';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-abouts',
  templateUrl: './abouts.component.html',
  styleUrls: ['./abouts.component.scss'],
})
export class AboutsComponent {
  userInfo!: UserInfo;
  constructor(private authService: AuthService) {
    this.authService.user.subscribe((user) => {
      this.userInfo = user;
    });
  }
}
