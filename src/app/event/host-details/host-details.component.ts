import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-host-details',
  templateUrl: './host-details.component.html',
  styleUrls: ['./host-details.component.scss'],
})
export class HostDetailsComponent {
  constructor(private authService: AuthService) {
    this.authService.user.subscribe((user) => {
      !user.isAuthenticated && this.authService.redirectToLogin();
    });
  }
}
