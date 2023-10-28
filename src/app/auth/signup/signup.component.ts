import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';

// matching passwords
function passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) return null;

  if (password.value !== confirmPassword.value) {
    return { 'passwordMismatch': true };
  }

  return null;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
   registrationForm!: FormGroup;

  constructor(private fb: FormBuilder,private router: Router) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.pattern(/^\S*$/)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@*%$#])[A-Za-z\d@*%$#]+$/)
        ]
      ],
      confirmPassword: ['', Validators.required]
    }, {
      validator: passwordMatchValidator
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('Registration successful!');
      console.log(this.registrationForm.value);
    } else {
      console.log('Form has validation errors.');
    }
  }

   redirectToLogin() {
    this.router.navigate(['login']);
  }
}
