import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { SocketService } from '../socket.service';
import { NotificationNewMessage } from '../interfaces/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isAuthenticated = false;
  numberNot!: number;
  arrayOfNotifi!: any[];
  notificationNewMessage!: NotificationNewMessage[];
  constructor(private authService: AuthService, private socket: SocketService) {
    this.socket.notificationNewMessage.subscribe((notificationNewMessage) => {
      this.notificationNewMessage = notificationNewMessage
    })
    this.socket.on('new_event', (event: any) => {
      console.log(event);
      this.socket.numNot.next(this.numberNot + 1);
      this.arrayOfNotifi.push(event);
      console.log(this.arrayOfNotifi);
      this.socket.arrayOfNotifi.next(this.arrayOfNotifi);
    });
    this.authService.user.subscribe((user) => {
      this.isAuthenticated = user.isAuthenticated;
    });
    this.socket.on('connect_error', (err: any) => {
      console.log(`connect_error due to ${err}`);
    });
    this.socket.on("notification_new_message", (eventId: string) => {
      console.log("notification_new_message")
      console.log(eventId)
      console.log(this.notificationNewMessage)
      const index = this.notificationNewMessage.findIndex((notification) => {
       return notification._id == eventId
      })
      console.log(index)
      if(index>=0){
        console.log("notification_found")
        ++this.notificationNewMessage[index].NotifiNum
      }else{
        console.log("notification_notfound")
        this.notificationNewMessage.push({_id:eventId,NotifiNum:1})
      }

    })
  }

  logout() {
    this.authService.logout();
  }
  ngOnInit() {
    this.socket.numNot.subscribe((num) => {
      this.numberNot = num;
    });
    this.socket.arrayOfNotifi.subscribe((arr) => {
      this.arrayOfNotifi = arr;
    });
  }
}
