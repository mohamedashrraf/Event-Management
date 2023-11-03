import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/auth/auth-service.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  constructor(private authService: AuthServiceService) {
    this.authService.user.subscribe((user) => {
      user.isAuthenticated && this.authService.redirectToHome();
    });
  }
}
