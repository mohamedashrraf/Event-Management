import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SocketService extends Socket {
  numNot =  new BehaviorSubject<number>(0) 
  arrayOfNotifi = new BehaviorSubject<any[]>([])
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
