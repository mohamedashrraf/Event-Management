import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import UserInfo from '../event/profile/interfaces/userInfo';

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
export class AuthService {
  private whoiam = new BehaviorSubject<UserInfo>(
    JSON.parse(localStorage.getItem('whoiam')!) || {
      name: '',
      email: '',
      isAuthenticated: false,
      userName: '',
    }
  );

  constructor(private router: Router) {}

  get user(): BehaviorSubject<UserInfo> {
    return this.whoiam;
  }

  login(user: UserInfo) {
    this.whoiam.next(user);
    localStorage.setItem('whoiam', JSON.stringify(user));
  }

  logout() {
    this.whoiam.next({
      name: '',
      email: '',
      userName: '',
      isAuthenticated: false,
      isVerify: false,
      phoneNumber: ""
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
