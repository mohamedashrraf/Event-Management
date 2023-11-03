import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

interface User {
  name: string;
  email: string;
  username: string;
  isAuthenticated: boolean;
  token?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private whoiam = new BehaviorSubject<User>(
    JSON.parse(localStorage.getItem('whoiam')!) || {
      name: '',
      email: '',
      username: '',
      isAuthenticated: false,
    }
  );

  constructor(private router: Router) {}

  get user(): BehaviorSubject<User> {
    return this.whoiam;
  }

  login(user: User) {
    this.whoiam.next(user);
    localStorage.setItem('whoiam', JSON.stringify(user));
  }

  logout() {
    this.whoiam.next({
      name: '',
      email: '',
      username: '',
      isAuthenticated: false,
    });
    localStorage.removeItem('whoiam');
  }

  redirectToHome() {
    this.router.navigate(['home']);
  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }
}
