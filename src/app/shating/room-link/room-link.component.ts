import { Component, Input, OnInit } from '@angular/core';
import { NotificationNewMessage, SubscribeWith } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-room-link',
  templateUrl: './room-link.component.html',
  styleUrls: ['./room-link.component.scss']
})
export class RoomLinkComponent implements OnInit {
@Input("event")event!:SubscribeWith;
@Input("notificationNewMessage")notificationNewMessage!: NotificationNewMessage[];
notification?:NotificationNewMessage
constructor(){
}
  ngOnInit(): void {

    this.notification = this.notificationNewMessage.find((notification)=>{
    return notification._id == this.event._id
  })
  if(!this.notification){
    this.notification={
      _id:this.event._id,
      NotifiNum:0
    }
    this.notificationNewMessage.push(this.notification)
  }
    

  }
}
