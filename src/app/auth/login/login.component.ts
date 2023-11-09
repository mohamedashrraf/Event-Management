import { Component } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import UserInfo from 'src/app/event/profile/interfaces/userInfo';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  showPass = false;
  constructor(private router: Router, private authService: AuthService) {
    this.authService.user.subscribe((user) => {
      user.isAuthenticated && this.authService.redirectToHome();
    });
  }

  redirectToSignup() {
    this.router.navigate(['signup']);
  }

  async handleFormSubmit(form: FormGroup) {
    try {
      const res = await fetch('http://localhost:4000/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form.value),
      });
      if (res.status === 200) {
        const resData = await res.json();
        console.log('response from login', resData);
        const userInfo: UserInfo = resData.data._doc;
        console.log(userInfo, 'userInfo');
        this.authService.login({
          name: userInfo.name,
          email: userInfo.email,
          userName: userInfo.userName,
          isAuthenticated: true,
          token: resData.token,
          isVerify: userInfo.isVerify,
          subscripeWith: userInfo.subscripeWith,
        });
        this.authService.redirectToHome();
      } else {
        const resErr = await res.json();
        console.log('Unexpected response', resErr);
        if (resErr.message === 'email or password is wrong')
          form.setErrors({
            invalidLogin: 'Email or password is wrong',
          });
      }
    } catch (err) {
      console.log('Unexpected error', err);
    }
  }

  toggleShowPass(e: Event) {
    this.showPass = !this.showPass;

    console.log(e.target);

    console.log(this.showPass);
    const input = document.getElementById('password-input');
    const inputType = input?.getAttribute('type');
    if (inputType === 'password') input?.setAttribute('type', 'text');
    else input?.setAttribute('type', 'password');
  }
}
