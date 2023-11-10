import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageCreated } from 'src/app/shared/interfaces/user';
import { GetTokenDataService } from 'src/app/shared/services/get-token-data.service';
import { SocketService } from 'src/app/shared/socket.service';

@Component({
  selector: 'app-shating',
  templateUrl: './shating.component.html',
  styleUrls: ['./shating.component.scss']
})
export class ShatingComponent implements OnDestroy, OnInit {
  eventId!: string;
  messagesListStore!: MessageCreated[]
  editMod:boolean=false
  messageEdit !:MessageCreated
  formSender!:FormGroup;
formEditer!:FormGroup;

constructor(private activeRoute: ActivatedRoute, private socket: SocketService, private getTokenData: GetTokenDataService ,private fb: FormBuilder) {
  this.formSender= this.fb.group({
    shat_text:["",Validators.required]
  })
  this.formEditer= this.fb.group({
    shat_text_edit:["",Validators.required]
  })
  
  this.activeRoute.params.subscribe((pram) => {
      this.socket.emit("leave_room", this.eventId)
      this.eventId = pram['id']
      this.messagesListStore = []
      const errorHandler = (messagesListStore: MessageCreated[]) => {
        console.log(messagesListStore)
        if (!messagesListStore) {
          this.messagesListStore = []
        } else {
          this.messagesListStore = [...messagesListStore]

        }
      }
      this.socket.emit("join_room", this.eventId, errorHandler)
    })
    this.socket.on("new_message", (messageCreated: MessageCreated) => {
      const username = this.getTokenData.tokenData.userName
      console.log("new_message", messageCreated)
      const isFind = this.messagesListStore.find((message, i) => {
        if (message._id == messageCreated._id) {
          this.messagesListStore[i] = messageCreated
          return true
        }
        return false
      });
      if (!isFind) {
        this.messagesListStore.unshift(messageCreated)
      }

    })
    this.socket.editMod.subscribe((editMod)=>{
      this.editMod = editMod
    })
    this.socket.messageToEdit.subscribe((message)=>{
      this.messageEdit = message
    })
  }
  ngOnInit(): void {
    console.log("init ShatingComponent")
  }
  sendMessage() {
    if (this.formSender.valid) {
      const message = this.formSender.value.shat_text
      console.log(message)
      const userName = this.getTokenData.tokenData.userName
      console.log(userName)
      const selfMessage = (messageCreated: MessageCreated) => {
        console.log(messageCreated)
        this.messagesListStore.push(messageCreated)
      }
      this.socket.emit("send_message", this.eventId, message, selfMessage)
      this.formSender.reset()

    }
  }
  editMessage() {
    console.log(this.formEditer.valid)
    console.log(this.formEditer)
    if (this.formEditer.valid) {
      const message = this.formEditer.value.shat_text_edit
      console.log(message)
      const userName = this.getTokenData.tokenData.userName
      console.log(userName)
      this.socket.emit("edit_message", this.eventId, this.messageEdit._id,message)
      this.formEditer.reset()
      this.socket.editMod.next(false);
      this.socket.messageToEdit.next({...this.messageEdit,message})

    }
  }
  ngOnDestroy(): void {
    this.socket.emit("leave_room", this.eventId)
  }
}
