import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubscribeWith } from 'src/app/shared/interfaces/user';
import { GetTokenDataService } from 'src/app/shared/services/get-token-data.service';
import { SocketService } from 'src/app/shared/socket.service';

@Component({
  selector: 'app-shating-layout',
  templateUrl: './shating-layout.component.html',
  styleUrls: ['./shating-layout.component.scss']
})
export class ShatingLayoutComponent  implements OnInit  {
  eventId?:string
  subscribeWith!:SubscribeWith[]
  constructor(private getTokenData:GetTokenDataService,private socket:SocketService,private activeRoute: ActivatedRoute){
    console.log(getTokenData.tokenData)
    const _id =getTokenData.tokenData._id
    this.socket.emit("get_events_rooms",_id)
    
    this.socket.on("events_rooms",(subscribeWith: SubscribeWith[])=>{
      this.subscribeWith = subscribeWith
    })
  }
  ngOnInit(): void {
    this.activeRoute.url.subscribe(()=>{

      if( this.activeRoute.firstChild){
   
       this.activeRoute.firstChild.params.subscribe((pram) => {
          
          this.eventId = pram['id']
          console.log(this.eventId)})
   
      }else{
       console.log("no Cild")
      }
    })
    
  }
  
}

