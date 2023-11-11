import { Component } from '@angular/core';
import { EventHttpService } from '../services/event-http.service';
import { GetTokenDataService } from 'src/app/shared/services/get-token-data.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent {
  isGitLink:boolean=false
  constructor(private eventHttp:EventHttpService,private tokenData:GetTokenDataService){}
VIPPaypal() {
  this.isGitLink = true
this.eventHttp.getPaypal(this.tokenData.tokenData._id).subscribe((res)=>{
  console.log(res.data.link)
  const link = res.data.link
  location.href = link
  // this.isGitLink = false
});
}

}
