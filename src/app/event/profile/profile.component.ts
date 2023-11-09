import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import UserInfo from './interfaces/userInfo';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  userInfo!: UserInfo;
  loading: boolean = true;
  constructor(private authService: AuthService) {
    this.authService.user.subscribe((user) => {
      this.loading = false;
      !user.isAuthenticated && this.authService.redirectToLogin();
      this.userInfo = user;
    });
  }

  changePhoto(event: Event) {
    const targetEl = event.target as HTMLElement;
    const clickEvent = new MouseEvent('click');
    targetEl.children.item(0)?.dispatchEvent(clickEvent);
  }
}
