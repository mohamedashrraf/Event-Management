import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Whoiam } from '../shared/interfaces/whoiam';

@Injectable({ providedIn: 'root' })
export class LogoutGuard {
  whoiam!: Whoiam;
  constructor(private authService: AuthService) {
    this.authService.whoiam.subscribe((value) => {
      this.whoiam = value;
    });
  }
  canActivate() {
    if (this.whoiam.isAuthenticated) {
      this.authService.redirectToHome();
    }
    // return true; pass to component
    // return false; not pass to component
  }
}
