import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageCreated } from 'src/app/shared/interfaces/user';
import { SocketService } from 'src/app/shared/socket.service';

@Component({
  selector: 'app-shating-message',
  templateUrl: './shating-message.component.html',
  styleUrls: ['./shating-message.component.scss']
})
export class ShatingMessageComponent {
@Input("message")message!:MessageCreated

 constructor(private socket:SocketService ,){
  this.socket.messageToEdit.subscribe((message)=>{
    if(message._id==this.message?._id){
      this.message.message = message.message
      
    }
  })
 
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
