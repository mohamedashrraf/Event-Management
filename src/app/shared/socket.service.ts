import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';
import { MessageCreated } from './interfaces/user';
@Injectable({
  providedIn: 'root',
})
export class SocketService extends Socket {
  numNot =  new BehaviorSubject<number>(0) 
  arrayOfNotifi = new BehaviorSubject<any[]>([])
  editMod = new BehaviorSubject<boolean>(false);
  messageToEdit = new BehaviorSubject<MessageCreated>({_id:"",createdAt:"",message:"",name:"",updatedAt:""});
  constructor() {
    super({ url: 'http://localhost:4000', options: {
       reconnection:false,
      extraHeaders: {
        Authorization: JSON.parse(localStorage.getItem("whoiam")!)?.token
      }
    } });
    console.log(JSON.parse(localStorage.getItem("whoiam")!)?.token)
    
  }

}
