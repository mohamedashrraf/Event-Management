import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageCreated } from 'src/app/shared/interfaces/user';
import { GetTokenDataService } from 'src/app/shared/services/get-token-data.service';
import { SocketService } from 'src/app/shared/socket.service';

@Component({
  selector: 'app-shating-message',
  templateUrl: './shating-message.component.html',
  styleUrls: ['./shating-message.component.scss']
})
export class ShatingMessageComponent implements OnInit {
@Input("message")message!:MessageCreated
isMe?:boolean
 constructor(private socket:SocketService ,private tokenData:GetTokenDataService){
  this.socket.messageToEdit.subscribe((message)=>{
    if(message._id==this.message?._id){
      this.message.message = message.message
    }
  })
  
}
  ngOnInit(): void {
    
    this.isMe = this.tokenData.tokenData.userName == this.message.name
  }
activEdeiMod(){
  this.socket.editMod.next(true)
  this.socket.messageToEdit.next({
    _id: this.message._id,
    createdAt: '',
    message: this.message.message,
    name: '',
    updatedAt: ''
  })
 }
}
