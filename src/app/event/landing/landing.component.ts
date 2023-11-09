import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  constructor(private authService: AuthService) {
    this.authService.user.subscribe((user) => {
      user.isAuthenticated && this.authService.redirectToHome();
    });
  }
}
