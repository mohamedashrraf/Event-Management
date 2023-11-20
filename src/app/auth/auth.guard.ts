import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Whoiam } from '../shared/interfaces/whoiam';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  whoiam!: Whoiam;
  protectRoutes: string[] = ['home', 'profile', 'event', 'subscribe', 'chat'];
  constructor(private authService: AuthService) {
    this.authService.whoiam.subscribe((value) => {
      this.whoiam = value;
    });
  }
  canActivate(_: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isProtected = this.protectRoutes.find((route) =>
      state.url.includes(route)
    );
    if (isProtected)
      !this.whoiam.isAuthenticated && this.authService.redirectToLogin();
    else this.whoiam.isAuthenticated && this.authService.redirectToHome();

    // return true; pass to component
    // return false; not pass to component
  }
}
