import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Whoiam } from '../shared/interfaces/whoiam';

@Injectable({ providedIn: 'root' })
export class LoginGuard {
  whoiam!: Whoiam;
  constructor(private authService: AuthService) {
    this.authService.whoiam.subscribe((value) => {
      this.whoiam = value;
    });
  }
  canActivate() {
    if (!this.whoiam.isAuthenticated) {
      this.authService.redirectToLogin();
    }
    // return true; pass to component
    // return false; not pass to component
  }
}
