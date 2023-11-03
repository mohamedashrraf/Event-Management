import { Component } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private router: Router) {}

  redirectToSignup() {
    this.router.navigate(['signup']);
  }

  async handleFormSubmit(form: FormGroup) {
    console.log(form.value);

    try {
      const res = await fetch('http://localhost:4000/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form.value),
      });
      console.log(res);
      if (res.status === 200) this.router.navigate(['home']);
      else {
        const error = await res.json();
        if (error.message === 'email or password is wrong')
          //TODO: show error for user
          alert(error.message);
      }
    } catch (err) {
      console.log(err);
    }
  }
}
