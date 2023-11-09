import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from 'src/app/shared/socket.service';

@Component({
  selector: 'app-shating',
  templateUrl: './shating.component.html',
  styleUrls: ['./shating.component.scss']
})
export class ShatingComponent implements OnDestroy {
  eventId: string;
  messagesList: string[] = ["hi"]
  constructor(private activeRoute: ActivatedRoute, private socket: SocketService) {

    this.eventId = this.activeRoute.snapshot.params["id"]
    function errorHandler(err: string) {
      console.log(err)
    }
    this.socket.emit("join_room", this.eventId, errorHandler)
    this.socket.on("new_message", (message: string) => {
      console.log("new_message", message)
      this.messagesList.unshift(message)
    })
  }
  ngOnDestroy(): void {
    this.socket.emit("leave_room", this.eventId)
  }
  sendMessage(messageForm: NgForm) {
    if (messageForm.valid) {
      const message = messageForm.value.shat_text
      console.log(message)
      this.messagesList.unshift(message)
      this.socket.emit("send_message", this.eventId, message)
      messageForm.resetForm()

    }
  }
}
