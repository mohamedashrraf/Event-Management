import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import UserInfo from '../../shared/interfaces/user-info';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-abouts',
  templateUrl: './abouts.component.html',
  styleUrls: ['./abouts.component.scss'],
})
export class AboutsComponent implements OnInit {
  user!: UserInfo;
  editMode: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
    const whoiam = localStorage.getItem('whoiam');
    // if (!whoiam) this.router.navigate(['/login']);
    this.user = JSON.parse(whoiam!);

    this.authService.user.subscribe((user) => {
      !user.isAuthenticated && this.authService.redirectToLogin();

      this.user = user;
      const tokenData = jwtDecode(this.user.token!) as any;
      this.user = { ...this.user, ...tokenData };
    });
  }

  ngOnInit(): void {}

  editProfile() {
    this.editMode = true;
  }

  saveChanges() {
    // After saving, set editMode to false.
    this.editMode = false;
  }
}

