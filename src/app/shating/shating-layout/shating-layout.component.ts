import { Component } from '@angular/core';
import { GetTokenDataService } from 'src/app/shared/services/get-token-data.service';

@Component({
  selector: 'app-shating-layout',
  templateUrl: './shating-layout.component.html',
  styleUrls: ['./shating-layout.component.scss']
})
export class ShatingLayoutComponent {
  subscribeWith!:string[]
  constructor(private getTokenData:GetTokenDataService){
    console.log(getTokenData.tokenData.subscribeWith)
   this.subscribeWith = getTokenData.tokenData.subscribeWith
  }
}
