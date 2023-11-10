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
      const index = this.notificationNewMessage.findIndex((notification) => {
        notification._id == eventId
      })
      if(index){
        ++this.notificationNewMessage[index].NotifiNum
      }else{
        this.notificationNewMessage.push({_id:eventId,NotifiNum:1})
      }

    })
    this.socket.notificationNewMessage.subscribe((notificationNewMessage) => {
      this.notificationNewMessage = notificationNewMessage
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
