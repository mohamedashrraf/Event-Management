import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  showPass = false;
  constructor(private router: Router, private authService: AuthService) {}

  // redirectToSignup() {
  //   this.router.navigate(['signup']);
  // }

  async handleFormSubmit(form: FormGroup) {
    try {
      const res = await fetch(environment.API_URL + '/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form.value),
      });
      if (res.status === 200) {
        const data = await res.json();
        this.authService.login(data.token);
      } else {
        const resErr = await res.json();
        if (resErr.message === 'email or password is wrong')
          form.setErrors({
            invalidLogin: 'Email or password is wrong',
          });
        else if (resErr.message === 'varify your email')
          form.setErrors({
            invalidLogin: 'Please verify your email',
          });
        else if (resErr.message === 'your account is banned')
          form.setErrors({
            invalidLogin: 'Your account is banned',
          });
      }
    } catch (err) {}
  }

  toggleShowPass(e: Event) {
    this.showPass = !this.showPass;
    const input = document.getElementById('password-input');
    const inputType = input?.getAttribute('type');
    if (inputType === 'password') input?.setAttribute('type', 'text');
    else input?.setAttribute('type', 'password');
  }

  goToSignup() {
    this.router.navigate(['signup']);
  }
}
