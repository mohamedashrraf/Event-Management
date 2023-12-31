import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Whoiam } from 'src/app/shared/interfaces/whoiam';
import { environment } from 'src/environments/environment';

// matching passwords
function passwordMatchValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (password?.value?.length < 8 || confirmPassword?.value?.length < 8)
    return null;
  if (password?.value !== confirmPassword?.value) {
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
  foucusInput = {
    password: false,
    confirmPassword: false,
  };
  showPass = false;
  showRePass = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

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
        userName: ['', [Validators.required, Validators.pattern(/^\S*$/)]],
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
      },
      {
        validator: passwordMatchValidator,
      }
    );
  }

  async onSubmit() {
    delete this.registrationForm.value.confirmPassword;

    const formData = new FormData();
    for (let key in this.registrationForm.controls) {
      const { value } = this.registrationForm.controls[key];
      formData.append(key, value);
    }
    try {
      const res = await fetch(environment.API_URL + '/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.registrationForm.value),
      });
      if (res.status === 201) {
        const data = await res.json();
        this.authService.redirectToLogin();
      } else {
        const resErr = await res.json();
        if (resErr.message === 'unique err')
          this.registrationForm.setErrors({
            userExists: true,
          });
      }
    } catch (err) {}
  }

  focusInput(e: Event) {
    const targetEl = e.target as HTMLElement;
    if (targetEl.id === 'password-input') {
      this.foucusInput.password = true;
      this.foucusInput.confirmPassword = false;
    }
    if (targetEl.id === 'confirmPassword-input') {
      this.foucusInput.confirmPassword = true;
      this.foucusInput.password = false;
    }
  }

  toggleShowPass(e: Event) {
    this.showPass = !this.showPass;
    const input = document.getElementById('password-input');
    const inputType = input?.getAttribute('type');
    if (inputType === 'password') input?.setAttribute('type', 'text');
    else input?.setAttribute('type', 'password');
  }
  toggleShowRePass(e: Event) {
    this.showRePass = !this.showRePass;

    const input = document.getElementById('confirmPassword-input');
    const inputType = input?.getAttribute('type');
    if (inputType === 'password') input?.setAttribute('type', 'text');
    else input?.setAttribute('type', 'password');
  }

  redirectToLogin() {
    this.authService.redirectToLogin();
  }
}
