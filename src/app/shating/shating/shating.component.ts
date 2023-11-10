import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from 'src/app/shared/socket.service';

@Component({
  selector: 'app-shating',
  templateUrl: './shating.component.html',
  styleUrls: ['./shating.component.scss']
})
export class ShatingComponent implements OnDestroy , OnInit {
  eventId!: string;
  messagesListStore: any ={"eventId":["hi"]}
  constructor(private activeRoute: ActivatedRoute, private socket: SocketService) {

   this.activeRoute.params.subscribe((pram)=>{
    this.socket.emit("leave_room", this.eventId)
    this.eventId =pram['id']
    if(!this.messagesListStore[this.eventId]){
      this.messagesListStore[this.eventId]=[]
    }
    function errorHandler(err: string) {
      console.log(err)
    }
    this.socket.emit("join_room", this.eventId, errorHandler)
  })
  this.socket.on("new_message", (message: string) => {
    console.log("new_message", message)
    this.messagesListStore[this.eventId!].unshift(message)
    
  })
  }
  ngOnInit(): void {
   console.log("init ShatingComponent")
  }
  ngOnDestroy(): void {
    this.socket.emit("leave_room", this.eventId)
  }
  sendMessage(messageForm: NgForm) {
    if (messageForm.valid) {
      const message = messageForm.value.shat_text
      console.log(message)
      this.messagesListStore[this.eventId!].unshift(message)
      this.socket.emit("send_message", this.eventId, message)
      messageForm.resetForm()

    }
  }
}
