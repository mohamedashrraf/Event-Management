import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/auth/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isAuthenticated = false;
  constructor(private authService: AuthServiceService) {
    this.authService.user.subscribe((user) => {
      this.isAuthenticated = user.isAuthenticated;
    });
  }

  logout() {
    this.authService.logout();
  }
}
