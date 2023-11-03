import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';

// matching passwords
function passwordMatchValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (!password?.value || !confirmPassword?.value) return null;
  if (password.value !== confirmPassword.value) {
    return { passwordMismatch: true };
  }
  return null;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthServiceService
  ) {
    this.authService.user.subscribe((user) => {
      user.isAuthenticated && this.authService.redirectToHome();
    });
  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group(
      {
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/
            ),
          ],
        ],
        name: ['', [Validators.required, Validators.minLength(5)]],
        username: ['', [Validators.required, Validators.pattern(/^\S*$/)]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/
            ),
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/
            ),
          ],
        ],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
        ],
      },
      {
        validator: passwordMatchValidator,
      }
    );
  }

  async onSubmit() {
    delete this.registrationForm.value.confirmPassword;
    // TODO: Cancel remove username
    delete this.registrationForm.value.username;
    try {
      const res = await fetch('http://localhost:4000/api/v1/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.registrationForm.value),
      });
      if (res.status === 201) this.authService.redirectToLogin();
      else {
        const resErr = await res.json();
        console.log('Unexpected response', resErr);
      }
    } catch (err) {
      console.log('Unexpected error', err);
    }
  }

  redirectToLogin() {
    this.authService.redirectToLogin();
  }
}
