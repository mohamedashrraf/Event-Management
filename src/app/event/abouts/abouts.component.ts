import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/shared/interfaces/user';
import UserInfo from '../profile/interfaces/userInfo';

@Component({
  selector: 'app-abouts',
  templateUrl: './abouts.component.html',
  styleUrls: ['./abouts.component.scss'],
})
export class AboutsComponent implements OnInit {
  user!: UserInfo;
  constructor(private router: Router, private authService: AuthService) {
    // const whoiam = localStorage.getItem('whoiam');
    // if (!whoiam) this.router.navigate(['/login']);
    // else this.user = JSON.parse(whoiam);

    this.authService.user.subscribe((user) => {
      !user.isAuthenticated && this.authService.redirectToLogin();

      this.user = user;
    });
  }
  ngOnInit(): void {}
}
