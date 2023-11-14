import { HttpEvent } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { GetTokenDataService } from 'src/app/shared/services/get-token-data.service';
import { EventHttpService } from '../services/event-http.service';
import { AuthService } from 'src/app/auth/auth.service';
import UserInfo from 'src/app/shared/interfaces/user-info';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
})
export class SubscriptionComponent {
  isGitLink: boolean = false;
  activeId: any;
  userInfo!: UserInfo;
  isSubscribe = false;
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private getTokenData: GetTokenDataService,
    private eventHttp: EventHttpService,

    private authService: AuthService
  ) {
    this.activeId = this.getTokenData.tokenData._id;
    console.log(this.activeId);
    this.authService.user.subscribe((user) => {
      !user.isAuthenticated && this.authService.redirectToLogin();
      this.userInfo = user;
      if (this.userInfo.isVIP) this.isSubscribe = true;
    });
  }
  VIPPaypal() {
    this.isGitLink = true;
    this.eventHttp
      .getPaypal(this.getTokenData.tokenData._id)
      .subscribe((res) => {
        console.log(res.data.link);
        const link = res.data.link;
        location.href = link;

        // this.isGitLink = false
      });
  }
}
