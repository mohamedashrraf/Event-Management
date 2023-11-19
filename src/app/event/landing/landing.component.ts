import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Whoiam } from 'src/app/shared/interfaces/whoiam';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  whoiam!: Whoiam;
  constructor(private authService: AuthService) {
    this.authService.whoiam.subscribe((value) => {
      this.whoiam = value;
      this.whoiam.isAuthenticated && this.authService.redirectToHome();
    });
  }
}
