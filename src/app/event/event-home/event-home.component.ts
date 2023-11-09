import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-event-home',
  templateUrl: './event-home.component.html',
  styleUrls: ['./event-home.component.scss'],
})
export class EventHomeComponent {
  constructor(private authService: AuthService) {
    this.authService.user.subscribe((user) => {
      !user.isAuthenticated && this.authService.redirectToLogin();
    });
  }
}
