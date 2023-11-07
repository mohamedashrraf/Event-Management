import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isAuthenticated = false;
  numberNot:number = 0
  constructor(
    private authService: AuthServiceService,
    private socket: SocketService
  ) {
    this.authService.user.subscribe((user) => {
      this.isAuthenticated = user.isAuthenticated;
    });
  }

  logout() {
    this.authService.logout();
  }
  ngOnInit() {
    this.socket.on('new_event', (event: any) => {
      console.log(event);
      this.socket.numNot.next(this.numberNot+1)
      this.socket.numNot.subscribe((num)=>{
        this.numberNot = num
        console.log(this.numberNot)
      })
    });
  }
}
