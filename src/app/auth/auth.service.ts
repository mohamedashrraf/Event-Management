import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import UserInfo from '../shared/interfaces/user-info';
import { Whoiam } from '../shared/interfaces/whoiam';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = new BehaviorSubject<Whoiam>(
    JSON.parse(localStorage.getItem('whoiam')!) || {
      isAuthenticated: false,
      token: '',
    }
  );

  constructor(private router: Router) {}

  async user() {
    const whoiam: Whoiam = JSON.parse(localStorage.getItem('whoiam')!);
    if (!whoiam?.token) {
      this.logout();
    }
    const res = await fetch(environment.API_URL + '/user/', {
      method: 'GET',
      headers: {
        Authorization: whoiam.token!,
      },
    });
    if (res.status === 200) {
      const userData: { message: string; data: UserInfo } = await res.json();
      return userData.data;
    } else {
      return this.logout();
    }
  }

  get whoiam() {
    return this.auth;
  }

  login(token: string) {
    const whoiam = {
      isAuthenticated: true,
      token,
    };
    this.auth.next(whoiam);
    localStorage.setItem('whoiam', JSON.stringify(whoiam));
    this.redirectToHome();
  }

  logout() {
    this.auth.next({
      isAuthenticated: false,
      token: '',
    });
    localStorage.removeItem('whoiam');
    this.redirectToLogin();
  }

  redirectToHome() {
    this.router.navigate(['home']);
  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }
}
