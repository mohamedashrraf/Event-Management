import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationNewMessage, SubscribeWith } from 'src/app/shared/interfaces/user';
import { SocketService } from 'src/app/shared/socket.service';

@Component({
  selector: 'app-room-link',
  templateUrl: './room-link.component.html',
  styleUrls: ['./room-link.component.scss']
})
export class RoomLinkComponent implements OnInit {
  @Input("event") event!: SubscribeWith;
  @Input("notificationNewMessage") notificationNewMessage!: NotificationNewMessage[];
  notification?: NotificationNewMessage
  eventId: any;
  constructor(private socket: SocketService, private activeRoute: ActivatedRoute) {
  }
  ngOnInit(): void {
    
    this.socket.notificationNewMessage.subscribe((notificationNewMessage) => {
      this.notificationNewMessage = notificationNewMessage
    })
    this.activeRoute.url.subscribe(() => {
      if (this.activeRoute.firstChild) {
        this.activeRoute.firstChild.params.subscribe((pram) => {
          this.eventId = pram['id']
          if (this.eventId) {

            const index = this.notificationNewMessage.findIndex((message) => {
              return message._id == this.eventId
            })
            if (index >= 0) {

              this.notificationNewMessage[index].NotifiNum = 0
            } else {
              this.notificationNewMessage.push({ _id: this.eventId, NotifiNum: 0 })
            }
            console.log(this.eventId)
          }
        })

      } else {
        console.log("no Cild")
      }
    })
    this.notification = this.notificationNewMessage.find((notification) => {
      return notification._id == this.event._id
    })
    if (!this.notification) {
      this.notification = {
        _id: this.event._id,
        NotifiNum: 0
      }
      this.notificationNewMessage.push(this.notification)
    }
    this.socket.on("notification_new_message",(_id:string)=>{
      if(this.eventId==_id&&this.notification){
          this.notification.NotifiNum = 0
        
      }
    })


  }
}
