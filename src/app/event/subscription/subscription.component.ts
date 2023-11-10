import { HttpEvent } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { GetTokenDataService } from 'src/app/shared/services/get-token-data.service';
import { EventHttpService } from '../services/event-http.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent {

  activeId:any
  vip: any;
  constructor(private activeRoute: ActivatedRoute,private router: Router, private getTokenData: GetTokenDataService, private eventHttp: EventHttpService) {

     this.activeId = this.getTokenData.tokenData._id;
    console.log(this.activeId);
  }

  ngOnInit() {

    this.eventHttp.vipPlan(this.activeId).subscribe(
      (res) => {
        this.vip = res.data;
        console.log(this.vip);
        // location.href = this.vip;
      },
      (error) => {
        console.log(error);
          // this.router.navigate(['/notfound']);
      }
    )
  }


}
