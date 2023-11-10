import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationNewMessage, SubscribeWith } from 'src/app/shared/interfaces/user';
import { GetTokenDataService } from 'src/app/shared/services/get-token-data.service';
import { SocketService } from 'src/app/shared/socket.service';

@Component({
  selector: 'app-shating-layout',
  templateUrl: './shating-layout.component.html',
  styleUrls: ['./shating-layout.component.scss']
})
export class ShatingLayoutComponent implements OnInit {
  eventId?: string
  subscribeWith!: SubscribeWith[]
  notificationNewMessage!: NotificationNewMessage[];
  constructor(private getTokenData: GetTokenDataService, private socket: SocketService, private activeRoute: ActivatedRoute) {
    console.log(getTokenData.tokenData)
    const _id = getTokenData.tokenData._id
    this.socket.emit("get_events_rooms", _id)

    this.socket.on("events_rooms", (subscribeWith: SubscribeWith[]) => {
      this.subscribeWith = subscribeWith
    })
    this.socket.notificationNewMessage.subscribe((notificationNewMessage) => {
      this.notificationNewMessage = notificationNewMessage
    })
  }
  ngOnInit(): void {
    this.activeRoute.url.subscribe(() => {

      if (this.activeRoute.firstChild) {

        this.activeRoute.firstChild.params.subscribe((pram) => {

          this.eventId = pram['id']
          if(this.eventId){

            const index = this.notificationNewMessage.findIndex((message) => {
              return message._id == this.eventId
            })
            if(index>=0){
  
              this.notificationNewMessage[index].NotifiNum=0
            }else{
              this.notificationNewMessage.push({_id:this.eventId,NotifiNum:0})
            }
            console.log(this.eventId)
          }
        })

      } else {
        console.log("no Cild")
      }
    })

  }

}

