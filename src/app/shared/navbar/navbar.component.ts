import { Component, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { SocketService } from '../socket.service';
import { NotificationNewMessage } from '../interfaces/user';
import { Whoiam } from '../interfaces/whoiam';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnDestroy {
  numberNot: number = 0;
  arrayOfNotifi!: any[];
  notificationNewMessage!: NotificationNewMessage[];
  whoiam!: Whoiam;
  constructor(private authService: AuthService, private socket: SocketService) {
    this.authService.whoiam.subscribe((value) => {
      this.whoiam = value;
    });
    this.socket.notificationNewMessage.subscribe((notificationNewMessage) => {
      this.notificationNewMessage = notificationNewMessage;
    });
    this.socket.on('new_event', (event: any) => {
      this.socket.numNot.next(this.numberNot + 1);
      this.arrayOfNotifi.push(event);
      this.socket.arrayOfNotifi.next(this.arrayOfNotifi);
    });

    this.socket.on('connect_error', (err: any) => {
      console.log(`connect_error due to ${err}`);
    });
    this.socket.on('notification_new_message', (eventId: string) => {
      console.log('notification_new_message');
      console.log(eventId);
      console.log(this.notificationNewMessage);
      const index = this.notificationNewMessage.findIndex((notification) => {
        return notification._id == eventId;
      });
      console.log(index);
      if (index >= 0) {
        console.log('notification_found');
        ++this.notificationNewMessage[index].NotifiNum;
      } else {
        console.log('notification_notfound');
        this.notificationNewMessage.push({ _id: eventId, NotifiNum: 1 });
      }
    });
  }

  logout() {
    setTimeout(() => {
      this.authService.logout();
      this.authService.redirectToLogin();
    }, 400);
  }
  ngOnInit() {
    this.socket.numNot.subscribe((num) => {
      this.numberNot = num;
    });
    this.socket.arrayOfNotifi.subscribe((arr) => {
      this.arrayOfNotifi = arr;
    });
  }
  ngOnDestroy(): void {
    this.socket.emit('disconnect');
  }
}
