import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
} from '@angular/forms';

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

  constructor(private fb: FormBuilder, private router: Router) {}

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
        name: ['', [Validators.required, Validators.minLength(3)]],
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
        profile: ['client'],
      },
      {
        validator: passwordMatchValidator,
      }
    );
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      // console.log('Registration successful!');
      delete this.registrationForm.value.confirmPassword;
      console.log(this.registrationForm.value);
      // this.redirectToLogin();
    } else {
      console.log('Form has validation errors.');
    }
  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }
}
